#!/usr/bin/env python3
"""
video-decompose: Extract unique keyframes from screen recordings and align with transcript.

Converts video requirements (Loom recordings) into structured frames + transcript
that can be fed into LLM conversations.

LLM-friendly: use --json for structured output on stdout. All progress goes to stderr.
"""

import argparse
import base64
import glob
import json
import os
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim


def log(msg: str) -> None:
    """Print progress message to stderr. Keeps stdout clean for --json."""
    print(msg, file=sys.stderr)


def error_exit(msg: str, code: int = 1) -> None:
    """Print error to stderr and exit with code."""
    print(f"Error: {msg}", file=sys.stderr)
    sys.exit(code)


@dataclass
class TranscriptSegment:
    start: float  # seconds
    end: float  # seconds
    text: str


@dataclass
class Keyframe:
    index: int
    timestamp: float  # seconds when this frame appears
    frame: np.ndarray  # the image data
    filename: str  # saved filename


def download_video(url: str, output_dir: str) -> tuple[str, str | None]:
    """Download video and subtitles from a URL using yt-dlp.

    Returns (video_path, transcript_path). transcript_path may be None if
    no subtitles are available.
    """
    if not shutil.which("yt-dlp"):
        error_exit("yt-dlp is not installed. Install with: brew install yt-dlp")

    download_dir = Path(output_dir) / "_downloads"
    download_dir.mkdir(parents=True, exist_ok=True)

    log("Downloading video and subtitles...")

    cmd = [
        "yt-dlp",
        "--write-subs",
        "--write-auto-subs",
        "--sub-langs", "en",
        "--sub-format", "vtt",
        "--merge-output-format", "mp4",
        "-o", str(download_dir / "%(title)s.%(ext)s"),
        url,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        error_exit(f"Download failed:\n{result.stderr}")

    video_files = glob.glob(str(download_dir / "*.mp4"))
    if not video_files:
        error_exit("No mp4 file found after download.")

    video_path = video_files[0]
    log(f"  Video: {os.path.basename(video_path)}")

    transcript_path = None
    for ext in ["*.vtt", "*.srt"]:
        sub_files = glob.glob(str(download_dir / ext))
        if sub_files:
            transcript_path = sub_files[0]
            break

    if transcript_path:
        log(f"  Subtitles: {os.path.basename(transcript_path)}")
    else:
        log("  Warning: No subtitles found. Output will have frames only.")

    return video_path, transcript_path


def parse_timestamp(ts: str) -> float:
    """Parse SRT/VTT timestamp to seconds. Handles HH:MM:SS.mmm and HH:MM:SS,mmm."""
    ts = ts.strip().replace(",", ".")
    parts = ts.split(":")
    if len(parts) == 3:
        h, m, s = parts
        return int(h) * 3600 + int(m) * 60 + float(s)
    elif len(parts) == 2:
        m, s = parts
        return int(m) * 60 + float(s)
    else:
        return float(parts[0])


def parse_vtt(filepath: str) -> list[TranscriptSegment]:
    """Parse a WebVTT transcript file."""
    segments = []
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r"^WEBVTT.*?\n\n", "", content, flags=re.DOTALL)
    blocks = re.split(r"\n\n+", content.strip())

    for block in blocks:
        lines = block.strip().split("\n")
        if not lines:
            continue

        ts_line = None
        text_lines = []
        for i, line in enumerate(lines):
            if "-->" in line:
                ts_line = line
                text_lines = lines[i + 1 :]
                break

        if not ts_line:
            continue

        match = re.match(r"([\d:.,]+)\s*-->\s*([\d:.,]+)", ts_line)
        if not match:
            continue

        start = parse_timestamp(match.group(1))
        end = parse_timestamp(match.group(2))

        text = " ".join(text_lines)
        text = re.sub(r"<v\s+\d+>", "", text)
        text = re.sub(r"</v>", "", text)
        text = text.strip()

        if text:
            segments.append(TranscriptSegment(start=start, end=end, text=text))

    return segments


def parse_srt(filepath: str) -> list[TranscriptSegment]:
    """Parse an SRT transcript file."""
    segments = []
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.split(r"\n\n+", content.strip())

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 2:
            continue

        ts_line = None
        text_start = 0
        for i, line in enumerate(lines):
            if "-->" in line:
                ts_line = line
                text_start = i + 1
                break

        if not ts_line:
            continue

        match = re.match(r"([\d:.,]+)\s*-->\s*([\d:.,]+)", ts_line)
        if not match:
            continue

        start = parse_timestamp(match.group(1))
        end = parse_timestamp(match.group(2))
        text = " ".join(lines[text_start:]).strip()

        if text:
            segments.append(TranscriptSegment(start=start, end=end, text=text))

    return segments


def parse_transcript(filepath: str) -> list[TranscriptSegment]:
    """Parse transcript file, auto-detecting format."""
    with open(filepath, "r", encoding="utf-8") as f:
        first_line = f.readline().strip()

    if first_line.startswith("WEBVTT") or filepath.endswith(".vtt"):
        return parse_vtt(filepath)
    else:
        return parse_srt(filepath)


def format_time(seconds: float) -> str:
    """Format seconds as M:SS or H:MM:SS."""
    seconds = int(seconds)
    if seconds >= 3600:
        h = seconds // 3600
        m = (seconds % 3600) // 60
        s = seconds % 60
        return f"{h}:{m:02d}:{s:02d}"
    else:
        m = seconds // 60
        s = seconds % 60
        return f"{m}:{s:02d}"


def format_time_filename(seconds: float) -> str:
    """Format seconds for filename like 01m04s."""
    seconds = int(seconds)
    m = seconds // 60
    s = seconds % 60
    return f"{m:02d}m{s:02d}s"


def extract_keyframes(
    video_path: str,
    threshold: float = 0.80,
    sample_rate: int = 1,
    min_gap: float = 3.0,
) -> list[Keyframe]:
    """Extract unique keyframes from video using SSIM-based deduplication."""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        error_exit(f"Cannot open video file: {video_path}")

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / fps
    frame_interval = int(fps / sample_rate)

    log(f"Video: {fps:.0f} fps, {total_frames} frames, {format_time(duration)} duration")
    log(f"Sampling every {frame_interval} frames ({sample_rate} fps)")
    log(f"SSIM threshold: {threshold}, min gap: {min_gap}s")

    # First pass: collect candidate frames that differ from previous
    candidates = []
    last_kept_gray = None
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval != 0:
            frame_count += 1
            continue

        timestamp = frame_count / fps
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        is_different = False
        if last_kept_gray is None:
            is_different = True
        else:
            similarity = ssim(last_kept_gray, gray)
            if similarity < threshold:
                is_different = True

        if is_different:
            candidates.append((timestamp, frame, gray))
            last_kept_gray = gray

        frame_count += 1

    cap.release()

    log(f"  Found {len(candidates)} candidate frames, applying {min_gap}s minimum gap...")

    # Second pass: enforce minimum gap. Keep last frame in each cluster.
    keyframes = []
    i = 0
    while i < len(candidates):
        cluster_end = i
        while cluster_end + 1 < len(candidates) and \
              candidates[cluster_end + 1][0] - candidates[cluster_end][0] < min_gap:
            cluster_end += 1

        if i == 0 and cluster_end > 0:
            ts, frame, gray = candidates[0]
            keyframe_index = len(keyframes) + 1
            filename = f"frame_{keyframe_index:03d}_{format_time_filename(ts)}.png"
            keyframes.append(Keyframe(index=keyframe_index, timestamp=ts, frame=frame, filename=filename))

            ts, frame, gray = candidates[cluster_end]
            keyframe_index = len(keyframes) + 1
            filename = f"frame_{keyframe_index:03d}_{format_time_filename(ts)}.png"
            keyframes.append(Keyframe(index=keyframe_index, timestamp=ts, frame=frame, filename=filename))
        else:
            ts, frame, gray = candidates[cluster_end]
            keyframe_index = len(keyframes) + 1
            filename = f"frame_{keyframe_index:03d}_{format_time_filename(ts)}.png"
            keyframes.append(Keyframe(index=keyframe_index, timestamp=ts, frame=frame, filename=filename))

        i = cluster_end + 1

    for kf in keyframes:
        pct = (kf.timestamp / duration) * 100
        log(f"  [+] Keyframe {kf.index} at {format_time(kf.timestamp)} ({pct:.0f}%)")

    log(f"\nExtracted {len(keyframes)} keyframes from {format_time(duration)} video")
    return keyframes


def align_transcript(
    keyframes: list[Keyframe],
    segments: list[TranscriptSegment],
    video_duration: float,
) -> list[tuple[Keyframe, float, float, str]]:
    """Align transcript segments to keyframe time ranges."""
    results = []

    for i, kf in enumerate(keyframes):
        appear = kf.timestamp
        disappear = keyframes[i + 1].timestamp if i + 1 < len(keyframes) else video_duration

        matched_texts = []
        for seg in segments:
            if seg.start < disappear and seg.end > appear:
                matched_texts.append(seg.text)

        transcript = " ".join(matched_texts) if matched_texts else "(No narration during this segment)"
        results.append((kf, appear, disappear, transcript))

    return results


def generate_summary(
    results: list[tuple[Keyframe, float, float, str]],
    video_filename: str,
    video_duration: float,
) -> str:
    """Generate the summary.md content."""
    date_str = __import__("datetime").date.today().isoformat()

    lines = [
        f"# Video Decomposition: {video_filename}",
        f"Generated: {date_str} | Frames extracted: {len(results)} | Duration: {format_time(video_duration)}",
        "",
        "## How to Read This Document",
        "This document contains keyframes extracted from a screen recording, "
        "presented in chronological order. Each frame represents a distinct "
        "screen state (page change, modal, UI transition). The timestamp range "
        "shows how long this screen was visible. The transcript below each "
        "frame is what was being said during that time. Use the frames as "
        "visual context and the transcript as the speaker's intent/explanation.",
        "",
        "---",
        "",
    ]

    for i, (kf, appear, disappear, transcript) in enumerate(results, 1):
        lines.append(f"## Frame {i} — {format_time(appear)} to {format_time(disappear)}")
        lines.append(f"![{kf.filename}](frames/{kf.filename})")
        lines.append("")
        lines.append("**Transcript:**")
        words = transcript.split()
        quote_lines = []
        current_line = ">"
        for word in words:
            if len(current_line) + len(word) + 1 > 80:
                quote_lines.append(current_line)
                current_line = "> " + word
            else:
                current_line += " " + word
        quote_lines.append(current_line)
        lines.extend(quote_lines)
        lines.append("")
        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def generate_json_output(
    results: list[tuple[Keyframe, float, float, str]],
    video_filename: str,
    video_duration: float,
    output_dir: str,
    include_base64: bool = False,
) -> dict:
    """Generate structured JSON output for LLM consumption.

    When include_base64=True, each frame includes a base64-encoded PNG
    so the entire result is self-contained (no file references needed).
    """
    date_str = __import__("datetime").date.today().isoformat()

    frames_data = []
    for i, (kf, appear, disappear, transcript) in enumerate(results, 1):
        frame_entry = {
            "index": i,
            "filename": kf.filename,
            "file_path": str(Path(output_dir) / "frames" / kf.filename),
            "timestamp_start": round(appear, 2),
            "timestamp_end": round(disappear, 2),
            "duration_seconds": round(disappear - appear, 2),
            "timestamp_start_formatted": format_time(appear),
            "timestamp_end_formatted": format_time(disappear),
            "transcript": transcript,
        }

        if include_base64:
            _, buf = cv2.imencode(".png", kf.frame)
            frame_entry["image_base64"] = base64.b64encode(buf).decode("utf-8")

        frames_data.append(frame_entry)

    return {
        "status": "success",
        "video": {
            "filename": video_filename,
            "duration_seconds": round(video_duration, 2),
            "duration_formatted": format_time(video_duration),
        },
        "output": {
            "directory": output_dir,
            "summary_file": str(Path(output_dir) / "summary.md"),
            "frames_directory": str(Path(output_dir) / "frames"),
        },
        "extraction": {
            "total_frames": len(results),
            "generated_date": date_str,
        },
        "frames": frames_data,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Extract unique keyframes from screen recordings and align with transcript.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # From a URL (downloads video + subtitles automatically):
  video-decompose --url https://www.loom.com/share/abc123

  # From local files:
  video-decompose --video demo.mp4 --transcript demo.vtt

  # JSON output for LLM agents (structured data on stdout):
  video-decompose --video demo.mp4 --transcript demo.vtt --json

  # JSON with embedded base64 images (fully self-contained):
  video-decompose --video demo.mp4 --transcript demo.vtt --json --base64

  # Pipe JSON to another tool:
  video-decompose --video demo.mp4 --transcript demo.vtt --json | jq '.frames[].transcript'
        """,
    )
    parser.add_argument("--url", help="URL to download video from (Loom, YouTube, etc). Uses yt-dlp.")
    parser.add_argument("--video", help="Path to local mp4 video file")
    parser.add_argument("--transcript", help="Path to local SRT or VTT transcript file")
    parser.add_argument("--output", default="./output", help="Output directory (default: ./output)")
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.80,
        help="SSIM threshold 0-1 (default: 0.80). Lower = fewer frames (only major changes).",
    )
    parser.add_argument(
        "--min-gap",
        type=float,
        default=3.0,
        help="Minimum seconds between kept frames (default: 3). Collapses rapid transitions.",
    )
    parser.add_argument(
        "--sample-rate",
        type=int,
        default=1,
        help="Frames to sample per second (default: 1)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        dest="json_output",
        help="Output structured JSON to stdout (progress goes to stderr).",
    )
    parser.add_argument(
        "--base64",
        action="store_true",
        help="Include base64-encoded frame images in JSON output. Use with --json.",
    )

    args = parser.parse_args()

    # Validate inputs
    if not args.url and not args.video:
        parser.error("Provide either --url to download or --video for a local file.")

    if args.base64 and not args.json_output:
        parser.error("--base64 requires --json.")

    # Create output directories
    output_dir = Path(args.output)
    frames_dir = output_dir / "frames"
    frames_dir.mkdir(parents=True, exist_ok=True)

    # Stage 0: Download if URL provided
    if args.url:
        log("=" * 50)
        log("Stage 0: Downloading video...")
        log("=" * 50)
        video_path, transcript_path = download_video(args.url, str(output_dir))
        if args.video:
            video_path = args.video
        if args.transcript:
            transcript_path = args.transcript
    else:
        video_path = args.video
        transcript_path = args.transcript

    # Validate resolved paths
    if not os.path.exists(video_path):
        error_exit(f"Video file not found: {video_path}")
    if transcript_path and not os.path.exists(transcript_path):
        error_exit(f"Transcript file not found: {transcript_path}")

    # Stage 1: Extract keyframes
    log("\n" + "=" * 50)
    log("Stage 1: Extracting keyframes...")
    log("=" * 50)
    keyframes = extract_keyframes(video_path, args.threshold, args.sample_rate, args.min_gap)

    if not keyframes:
        error_exit("No keyframes extracted. Try lowering the threshold.", code=2)

    # Save frames to disk
    for kf in keyframes:
        frame_path = frames_dir / kf.filename
        cv2.imwrite(str(frame_path), kf.frame)

    # Get video duration
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    video_duration = total_frames / fps
    cap.release()

    # Stage 2: Parse transcript
    log("\n" + "=" * 50)
    log("Stage 2: Parsing transcript...")
    log("=" * 50)
    if transcript_path:
        segments = parse_transcript(transcript_path)
        log(f"Parsed {len(segments)} transcript segments")
    else:
        segments = []
        log("No transcript provided — frames will have no narration text")

    # Stage 3: Align transcript to frames
    log("\n" + "=" * 50)
    log("Stage 3: Aligning transcript to frames...")
    log("=" * 50)
    results = align_transcript(keyframes, segments, video_duration)
    log(f"Aligned {len(results)} frames with transcript")

    # Generate markdown summary (always written to disk)
    video_filename = os.path.basename(video_path)
    summary = generate_summary(results, video_filename, video_duration)
    summary_path = output_dir / "summary.md"
    summary_path.write_text(summary, encoding="utf-8")

    # Output
    if args.json_output:
        # Structured JSON to stdout
        json_data = generate_json_output(
            results, video_filename, video_duration,
            str(output_dir), include_base64=args.base64,
        )
        print(json.dumps(json_data, indent=2))
    else:
        # Human-readable summary to stdout
        print("\n" + "=" * 50)
        print("Done!")
        print("=" * 50)
        print(f"Output: {output_dir}")
        print(f"  Frames: {len(results)} PNGs in {frames_dir}/")
        print(f"  Summary: {summary_path}")


if __name__ == "__main__":
    main()

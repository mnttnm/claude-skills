---
name: video-decompose
description: >
  Convert screen recording videos (Loom, mp4) into structured keyframes + transcript
  for LLM consumption. Use when the user provides a video URL or local video file and
  wants to extract product requirements, document a feature walkthrough, or convert
  video content into a format Claude can analyze. Triggers on "decompose this video",
  "extract frames from video", user shares a Loom or video URL and wants requirements
  extracted, "convert this video to requirements", or user mentions video-based product
  requirements or feature walkthroughs they need analyzed.
---

# Video Decompose

Convert screen recordings into structured frames + aligned transcript for LLM analysis.

## Prerequisites

Verify before proceeding:

```bash
python3 -c "import cv2, skimage; print('OK')"
# If missing: pip install opencv-python scikit-image numpy
# For URL downloads: which yt-dlp (install with: brew install yt-dlp)
```

## Workflow

### 1. Determine Input

Ask the user for:
- **URL** — a Loom or other video URL (requires yt-dlp)
- **Local files** — mp4 video + optional SRT/VTT transcript

### 2. Run Decomposition

Execute the script from this skill's `scripts/` directory:

```bash
# From URL
python3 scripts/video_decompose.py --url <URL> --output ./output/<name> --json

# From local files
python3 scripts/video_decompose.py --video <path.mp4> --transcript <path.vtt> --output ./output/<name> --json
```

Tuning (adjust if frame count is too high/low):
- `--threshold 0.80` — Lower (0.70) = fewer frames, higher (0.90) = more frames
- `--min-gap 3.0` — Increase to 5+ if too many rapid-transition frames
- `--sample-rate 1` — Raise to 2 for fast-paced demos

### 3. Review Output

Read `output/<name>/summary.md` and spot-check 2-3 frame images. If frame count is off, re-run with adjusted flags.

Expected output:
```
output/<name>/
├── frames/          # PNG keyframes
├── summary.md       # Markdown mapping frames to transcript
└── product-requirements.md  # (if step 4 is performed)
```

### 4. Extract Requirements (Optional)

When the user wants structured product requirements, read `references/requirements-extraction-prompt.md` for the extraction template. Read `summary.md`, view all frame images, and produce a requirements document following that template. Save as `product-requirements.md` in the output directory.

## JSON Output

With `--json`, stdout contains structured data (progress on stderr):

```json
{
  "status": "success",
  "video": { "filename": "...", "duration_seconds": 529.0 },
  "extraction": { "total_frames": 14 },
  "frames": [
    {
      "index": 1,
      "filename": "frame_001_00m00s.png",
      "file_path": "./output/frames/frame_001_00m00s.png",
      "timestamp_start": 0.0,
      "timestamp_end": 171.0,
      "transcript": "..."
    }
  ]
}
```

Add `--base64` to embed frame images as base64 in JSON (self-contained, no file references).

## Error Handling

| Exit code | Meaning | Action |
|-----------|---------|--------|
| 0 | Success | Proceed |
| 1 | Input error (missing file, bad URL) | Check paths/URL, retry |
| 2 | Processing error (no frames) | Lower threshold or check video format |

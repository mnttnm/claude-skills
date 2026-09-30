#!/usr/bin/env bash
# Verify a finished demo video before it goes to anyone.
#
#   verify_video.sh <out_dir> [run.log]
#
# <out_dir> holds <name>.mp4 style output: <name>.mp4, <name>.srt and timeline.json
# (demo-video/out). Pass --name=<basename> as a third argument if the file is not "demo".
# Set FFMPEG_PATH if ffmpeg is not on the PATH.
#
# Checks: picture and voice agree in length, loudness near -16 LUFS, no clipping,
# every subtitle timestamp valid and in order, and a contact sheet with one frame from
# the middle of each beat (and the last two seconds of the final beat, where a caption
# can sit on top of a footer). Look at the contact sheets; numbers do not replace eyes.
set -u
OUT="${1:?usage: verify_video.sh <out_dir> [run.log]}"
LOG="${2:-}"
NAME="demo"
for a in "$@"; do case "$a" in --name=*) NAME="${a#--name=}";; esac; done
FF="${FFMPEG_PATH:-ffmpeg}"
MP4="$OUT/$NAME.mp4"; SRT="$OUT/$NAME.srt"; TL="$OUT/timeline.json"
SHEETS="$OUT/verify"; mkdir -p "$SHEETS"; rm -f "$SHEETS"/*.png

[ -f "$MP4" ] || { echo "No $MP4"; exit 1; }
if [ -n "$LOG" ] && [ -f "$LOG" ]; then
  echo "== drift warnings from the recording"
  grep '!' "$LOG" | grep -v '^ *[a-z0-9-]*#' || echo "  none"
fi

echo "== length: picture and voice must agree to within a second"
python3 - "$FF" "$MP4" "$TL" <<'PY'
import json, re, subprocess, sys
ff, mp4, tl = sys.argv[1:4]
out = subprocess.run([ff, "-hide_banner", "-i", mp4], capture_output=True, text=True).stderr
m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
video = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
d = json.load(open(tl))
gap = abs(video - d["duration"])
print(f"  video {video:.2f}s, timeline {d['duration']:.2f}s, gap {gap:.2f}s {'OK' if gap < 1 else 'DRIFT'}")
empty = [b["beat"] for b in d["timeline"] if b["end"] <= b["start"]]
print("  beats without a duration:", empty or "none")
PY

echo "== loudness (target about -16 LUFS integrated) and peak (must stay below 0 dB)"
"$FF" -hide_banner -nostats -i "$MP4" -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary:" | grep -E "I:|Peak:" | sed 's/^/  /'
"$FF" -hide_banner -nostats -i "$MP4" -af volumedetect -vn -f null - 2>&1 | grep max_volume | sed 's/.*max_volume/  max_volume/'

echo "== subtitles"
python3 - "$SRT" <<'PY'
import re, sys
t = open(sys.argv[1], encoding="utf-8").read()
stamps = re.findall(r"(\d\d):(\d\d):(\d\d),(\d+) --> (\d\d):(\d\d):(\d\d),(\d+)", t)
def sec(h, m, s, ms): return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000
bad = [s for s in stamps if len(s[3]) != 3 or len(s[7]) != 3 or int(s[3]) > 999 or int(s[7]) > 999]
cues = [(sec(*s[:4]), sec(*s[4:])) for s in stamps]
overlap = [round(a[0], 1) for a, b in zip(cues, cues[1:]) if a[1] > b[0] + 0.01]
print(f"  {len(cues)} cues, invalid timestamps: {len(bad)}, overlapping: {len(overlap)}")
PY

echo "== contact sheets"
python3 - "$FF" "$MP4" "$TL" "$SHEETS" <<'PY'
import json, subprocess, sys
ff, mp4, tl, out = sys.argv[1:5]
beats = json.load(open(tl))["timeline"]
for i, b in enumerate(beats):
    t = b["start"] + (b["end"] - b["start"]) * 0.5
    subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{t:.2f}", "-i", mp4, "-frames:v", "1", "-vf", "scale=640:-1", f"{out}/f{i:02d}.png"])
last = beats[-1]["end"] - 2.5
subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{last:.2f}", "-i", mp4, "-frames:v", "1", f"{out}/last_beat_full.png"])
n = len(beats)
for k in range(0, n, 6):
    chunk = list(range(k, min(k + 6, n)))
    inputs = [x for i in chunk for x in ("-i", f"{out}/f{i:02d}.png")]
    layout = "|".join(["0_0", "w0_0", "0_h0", "w0_h0", "0_h0+h0", "w0_h0+h0"][: len(chunk)])
    if len(chunk) == 1:
        subprocess.run(["cp", f"{out}/f{chunk[0]:02d}.png", f"{out}/sheet_{k // 6 + 1}.png"])
    else:
        subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y", *inputs, "-filter_complex", f"xstack=inputs={len(chunk)}:layout={layout}", f"{out}/sheet_{k // 6 + 1}.png"])
print(f"  wrote {out}/sheet_*.png (six beats each) and {out}/last_beat_full.png")
PY

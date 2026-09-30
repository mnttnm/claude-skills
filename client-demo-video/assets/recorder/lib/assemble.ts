import { execFile } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

export type Clip = { file: string; startsAt: number }
export type Cue = { start: number; end: number; text: string }

/** Turn captured frames (which only exist where the screen changed) into steady 30 fps video. */
export async function encodeVideo(
  ffmpeg: string,
  frames: { file: string; ts: number }[],
  duration: number,
  workDir: string,
  out: string,
) {
  // Lay the frames on an exact 30 fps grid. Left as-is, bursts of frames a
  // millisecond apart are each rounded up by the encoder and the picture ends
  // up seconds longer than the narration it has to match.
  const FPS = 30
  const total = Math.max(1, Math.round(duration * FPS))
  const list: string[] = []
  let pointer = 0
  let pending: { file: string; ticks: number } | null = null
  const flush = () => {
    if (pending) list.push(`file '${pending.file}'`, `duration ${(pending.ticks / FPS).toFixed(5)}`)
  }
  for (let tick = 0; tick < total; tick += 1) {
    const at = tick / FPS
    while (pointer + 1 < frames.length && frames[pointer + 1].ts <= at) pointer += 1
    const file = frames[pointer]?.file
    if (!file) continue
    if (pending && pending.file === file) pending.ticks += 1
    else {
      flush()
      pending = { file, ticks: 1 }
    }
  }
  flush()
  const last = pending as { file: string } | null
  if (last) list.push(`file '${last.file}'`)
  const listFile = path.join(workDir, 'frames.txt')
  writeFileSync(listFile, list.join('\n'))
  await run(
    ffmpeg,
    [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-f', 'concat', '-safe', '0', '-i', listFile,
      '-vf', 'fps=30,scale=1920:1080:flags=lanczos,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '17',
      '-movflags', '+faststart', out,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  )
}

/** Lay every narration clip at the moment it started, and join them to the picture. */
export async function muxNarration(
  ffmpeg: string,
  video: string,
  clips: Clip[],
  duration: number,
  out: string,
) {
  const inputs = clips.flatMap((clip) => ['-i', clip.file])
  const delays = clips
    .map((clip, index) => {
      const ms = Math.max(0, Math.round(clip.startsAt * 1000))
      return `[${index + 1}:a]adelay=${ms}|${ms}[a${index}]`
    })
    .join(';')
  const labels = clips.map((_, index) => `[a${index}]`).join('')
  const filter = `${delays};${labels}amix=inputs=${clips.length}:normalize=0:duration=longest,loudnorm=I=-16:TP=-1.5:LRA=11,apad[aout]`
  await run(
    ffmpeg,
    [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-i', video, ...inputs,
      '-filter_complex', filter,
      '-map', '0:v', '-map', '[aout]',
      '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
      '-t', duration.toFixed(3), '-movflags', '+faststart', out,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  )
}

const stamp = (seconds: number, comma: boolean) => {
  // Round to whole milliseconds first, so 55.9996 seconds cannot become "55,1000".
  const all = Math.max(0, Math.round(seconds * 1000))
  const h = Math.floor(all / 3_600_000)
  const m = Math.floor((all % 3_600_000) / 60_000)
  const s = Math.floor((all % 60_000) / 1000)
  const ms = all % 1000
  const pad = (n: number, w = 2) => String(n).padStart(w, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}${comma ? ',' : '.'}${pad(ms, 3)}`
}

export function writeSubtitles(cues: Cue[], srtFile: string, vttFile: string) {
  writeFileSync(
    srtFile,
    cues
      .map((cue, i) => `${i + 1}\n${stamp(cue.start, true)} --> ${stamp(cue.end, true)}\n${cue.text}\n`)
      .join('\n'),
  )
  writeFileSync(
    vttFile,
    `WEBVTT\n\n${cues.map((cue) => `${stamp(cue.start, false)} --> ${stamp(cue.end, false)}\n${cue.text}\n`).join('\n')}`,
  )
}

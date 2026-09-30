import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { config } from 'dotenv'
import { type Cue, encodeVideo, muxNarration, writeSubtitles } from './lib/assemble.ts'
import { setTempo, sleep, Stage, writeJson } from './lib/stage.ts'
import {
  type Alignment,
  estimate,
  type Narration,
  SECONDS_PER_CHARACTER,
  setSecondsPerCharacter,
  speak,
  stripTags,
} from './lib/tts.ts'
import { demo } from './demo.config.ts'
import { type Beat, storyboard } from './storyboard.ts'

/**
 * Records a narrated walkthrough of the running app as a finished video.
 *
 *   pnpm demo:video                 narrated, if ELEVENLABS_API_KEY is set
 *   pnpm demo:video --draft         silent, captions on: to review the pacing
 *   pnpm demo:video --upto=<beat>   stop after one beat while you iterate
 *   pnpm demo:video --no-captions   leave the on-screen captions off
 *   pnpm demo:video --trace         print, for every step, when it was said and when it was done
 *   pnpm demo:video --turbo         no pacing, no output worth watching: checks every step still works
 *
 * The app must already be running. What "ready" means for this project lives in demo.config.ts.
 */
config({ path: ['.env.local', '.env'] })

const args = process.argv.slice(2)
const flag = (name: string) => args.includes(`--${name}`)
const option = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]

const root = path.resolve(import.meta.dirname)
const outDir = path.join(root, 'out')
const name = demo.outputName
const app = process.env.APP_URL ?? demo.appUrl
const ffmpeg = process.env.FFMPEG_PATH ?? 'ffmpeg'
const apiKey = process.env.ELEVENLABS_API_KEY
const narrated = Boolean(apiKey) && !flag('draft')
const captions = !flag('no-captions')
const upto = option('upto')
const turbo = flag('turbo')
const trace = flag('trace')
const chromiumPath =
  process.env.CHROMIUM_PATH ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)
const LATE = 0.6 // seconds an action may start after its sentence before it is reported
const OVERRUN = 1.0 // seconds an action may run past the end of its sentence before it is reported

const LEAD = 0.5 // seconds of picture before the voice starts
const ANTICIPATE = 0.25 // start an action just before its sentence, as a person would
const TAIL = 0.9 // breathing room after the last word

function need(ok: boolean, message: string) {
  if (!ok) {
    console.error(`\n${message}\n`)
    process.exit(1)
  }
}

async function reachable(url: string) {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(4000) })).status < 500
  } catch {
    return false
  }
}

async function main() {
  need(await reachable(`${app}${demo.healthPath ?? '/'}`), `The app is not answering at ${app}. ${demo.startHint ?? 'Start it first.'}`)
  for (const check of demo.checks ?? []) need(await reachable(check.url), check.message)
  try {
    execFileSync(ffmpeg, ['-version'], { stdio: 'ignore' })
  } catch {
    need(false, 'ffmpeg was not found. Install it, or set FFMPEG_PATH to its location.')
  }

  const beats: Beat[] = upto
    ? storyboard.slice(0, storyboard.findIndex((b) => b.id === upto) + 1)
    : storyboard
  need(beats.length > 0, `No beat called "${upto}". Beats: ${storyboard.map((b) => b.id).join(', ')}`)

  if (turbo) setTempo(0.06)
  if (demo.warmUp) {
    console.log('Warming the app up, so nothing compiles on camera...')
    await demo.warmUp({ app, chromiumPath })
  }
  if (demo.prepare) {
    console.log('Putting the demo back to its starting state...')
    await demo.prepare()
  }

  // ---- narration -------------------------------------------------------
  const textOf = (beat: Beat) => beat.steps.flatMap((s) => (s.say ? [s.say] : [])).join(' ')
  const narrations = new Map<string, Narration>()
  let characters = 0
  for (const [index, beat] of beats.entries()) {
    const text = textOf(beat)
    if (!text) continue
    characters += text.length
    if (narrated) {
      const previous = beats.slice(0, index).reverse().map(textOf).find(Boolean)
      const next = beats.slice(index + 1).map(textOf).find(Boolean)
      process.stdout.write(`Narrating ${beat.id} (${text.length} characters)... `)
      narrations.set(
        beat.id,
        await speak(
          {
            apiKey: apiKey as string,
            voiceId: process.env.ELEVENLABS_VOICE_ID ?? demo.voice.voiceId,
            modelId: process.env.ELEVENLABS_MODEL ?? demo.voice.modelId ?? 'eleven_v4',
            settings: demo.voice.settings,
            seed: demo.voice.seed,
            textNormalization: demo.voice.textNormalization,
            cacheDir: path.join(root, '.cache', 'audio'),
            ffmpeg,
          },
          text,
          { previous: previous?.slice(-300), next: next?.slice(0, 300) },
        ),
      )
      console.log(`${narrations.get(beat.id)?.duration.toFixed(1)}s`)
    } else {
      narrations.set(beat.id, estimate(text))
    }
  }
  if (narrated && characters > 0) {
    const seconds = [...narrations.values()].reduce((sum, n) => sum + n.duration, 0)
    const rate = seconds / characters
    console.log(`Measured speech rate: ${rate.toFixed(3)} s per character (estimates assume ${SECONDS_PER_CHARACTER}). Set it in the script checker with --rate ${rate.toFixed(3)}.`)
    setSecondsPerCharacter(rate)
  }
  console.log(
    narrated
      ? `Narration ready: ${characters} characters.`
      : `Draft mode: no audio, pacing estimated from ${characters} characters.`,
  )

  // ---- recording -------------------------------------------------------
  rmSync(path.join(outDir, 'frames'), { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })
  const stage = await Stage.open({
    workDir: root,
    captions,
    chromiumPath,
  })
  let quietAt = 0
  const waitVideo = async (t: number) => {
    if (turbo) return
    while (stage.now() < t) await sleep(Math.min(200, (t - stage.now()) * 1000 + 5))
  }
  const ctx = {
    s: stage,
    page: stage.page,
    app,
    ...(demo.context?.() ?? {}),
    /** Wait for the narrator to finish the sentence before this one, so a jump cut never lands mid-sentence. */
    quiet: async () => waitVideo(quietAt),
  }
  const clips: { file: string; startsAt: number }[] = []
  const cues: Cue[] = []
  const timeline: unknown[] = []

  const waitUntil = async (t: number) => waitVideo(t)

  await stage.page.goto('about:blank')
  await stage.startRecording()
  await stage.whenRecording()

  let failure: unknown = null
  try {
  for (const beat of beats) {
    const beatStart = stage.now()
    if (beat.card) await stage.card(demo.cards[beat.card](), 0)

    const narration = narrations.get(beat.id)
    const text = textOf(beat)
    const audioStart = beatStart + LEAD

    // Where each sentence begins and ends inside the narration.
    let cursor = 0
    const segments = beat.steps.map((step) => {
      if (!step.say) return null
      const start = cursor
      cursor += step.say.length + 1
      const alignment: Alignment | null = narration?.alignment ?? null
      const from = alignment ? (alignment.starts[start] ?? 0) : start * SECONDS_PER_CHARACTER
      const to = alignment
        ? (alignment.ends[Math.min(start + step.say.length, alignment.ends.length) - 1] ?? from)
        : (start + step.say.length) * SECONDS_PER_CHARACTER
      return { text: stripTags(step.say), from: audioStart + from, to: audioStart + to }
    })

    if (narration && text) {
      if (narration.file) clips.push({ file: narration.file, startsAt: audioStart })
      for (const seg of segments) {
        if (seg) cues.push({ start: seg.from, end: seg.to, text: seg.text })
      }
    }

    // Captions and the chapter chip follow the voice, on the video's own clock
    // (which stands still during a jump cut), whatever the actions are doing.
    const due: { at: number; fn: () => void }[] = []
    const firstSay = segments.find(Boolean)
    if (beat.chapter && firstSay) {
      const chapter = beat.chapter
      due.push({ at: firstSay.from - 0.3, fn: () => void stage.chapter(chapter.n, chapter.title) })
    }
    segments.forEach((seg, index) => {
      if (!seg) return
      due.push({ at: seg.from, fn: () => void stage.caption(seg.text) })
      if (!segments.slice(index + 1).some(Boolean)) {
        due.push({ at: seg.to + 0.5, fn: () => void stage.caption(null) })
      }
    })
    const ticker = setInterval(() => {
      const ready = due.filter((item) => item.at <= stage.now())
      for (const item of ready) {
        due.splice(due.indexOf(item), 1)
        item.fn()
      }
    }, 40)

    for (const [index, step] of beat.steps.entries()) {
      const seg = segments[index]
      const spokenBefore = segments.slice(0, index).filter(Boolean).at(-1)
      quietAt = spokenBefore ? spokenBefore.to + 0.35 : 0
      let began = stage.now()
      if (seg) {
        await waitUntil(seg.from - ANTICIPATE)
        began = stage.now()
        // The previous step (usually a navigation) overran, so the voice is already ahead of the picture.
        const late = stage.now() - (seg.from - ANTICIPATE)
        if (!turbo && late > LATE) {
          console.warn(`  ! "${beat.id}" step ${index} started ${late.toFixed(1)}s after its sentence began`)
        }
      }
      if (step.run) {
        try {
          await step.run(ctx)
        } catch (error) {
          const shot = path.join(outDir, `failure-${beat.id}-${index}.png`)
          await stage.page.screenshot({ path: shot }).catch(() => undefined)
          console.error(`\nStep ${index} of "${beat.id}" failed at ${stage.page.url()}\nScreenshot: ${shot}`)
          throw error
        }
      }
      const ended = stage.now()
      if (trace && !turbo) {
        const said = seg ? `${seg.from.toFixed(1)}-${seg.to.toFixed(1)}` : 'silent'
        console.log(`    ${beat.id}#${index}  said ${said}  did ${began.toFixed(1)}-${ended.toFixed(1)}`)
      }
      if (seg && !turbo && ended > seg.to + OVERRUN) {
        console.warn(`  ! "${beat.id}" step ${index} ran ${(ended - seg.to).toFixed(1)}s past the end of its sentence`)
      }
    }

    const spoken = narration && text ? audioStart + narration.duration + TAIL : stage.now() + 0.4
    await waitUntil(spoken)
    clearInterval(ticker)
    await stage.caption(null)
    timeline.push({ beat: beat.id, start: beatStart, end: stage.now() })
    console.log(`  ${beat.id.padEnd(12)} ${beatStart.toFixed(1)}s to ${stage.now().toFixed(1)}s`)
  }
  } catch (error) {
    // Keep what was recorded: a partial take is still worth reviewing.
    failure = error
    console.error(`\nTake stopped early: ${(error as Error).message.split('\n')[0]}`)
  }

  const { frames, duration } = await stage.stopRecording()
  await stage.close()
  writeJson(path.join(outDir, 'timeline.json'), { timeline, duration, frames: frames.length })

  // ---- assembly --------------------------------------------------------
  console.log(`Encoding ${frames.length} frames (${duration.toFixed(1)}s)...`)
  const silent = path.join(outDir, narrated ? 'picture.mp4' : `${name}-draft.mp4`)
  await encodeVideo(ffmpeg, frames, duration, outDir, silent)
  let final = silent
  if (narrated) {
    final = path.join(outDir, `${name}.mp4`)
    await muxNarration(ffmpeg, silent, clips, duration, final)
  }
  writeSubtitles(cues, path.join(outDir, `${name}.srt`), path.join(outDir, `${name}.vtt`))
  rmSync(path.join(outDir, 'frames'), { recursive: true, force: true })
  console.log(`\n${failure ? 'Partial take' : 'Done'}: ${final}`)
  if (failure) process.exitCode = 1
}

await main()

import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

/** Where each character of the spoken text falls in the audio, in seconds. */
export type Alignment = { starts: number[]; ends: number[] }

export type Narration = {
  file: string
  duration: number
  /** Character offsets into the text that was sent. Absent for an estimate. */
  alignment: Alignment | null
  estimated: boolean
}

export type VoiceSettings = {
  stability?: number
  similarity_boost?: number
  style?: number
  speed?: number
  use_speaker_boost?: boolean
}

export type VoiceConfig = {
  apiKey: string
  voiceId: string
  modelId: string
  cacheDir: string
  ffmpeg: string
  /** Overrides the defaults for the model. */
  settings?: VoiceSettings
  /** Same seed and same text gives the same take, which makes re-recording repeatable. */
  seed?: number
  /** "on" spells out numbers, dates and units; "off" trusts the text as written. Default: the API's own choice. */
  textNormalization?: 'auto' | 'on' | 'off'
}

/**
 * Models that reject `previous_text` / `next_text` (checked against the API:
 * "not yet supported with the 'eleven_v3' model"). Sending them is a 400, so
 * they are simply left out for these models.
 */
const NO_NEIGHBOUR_CONTEXT = new Set(['eleven_v3', 'eleven_v3_conversational'])

/** Only the v2 family understands `<break time="0.6s" />`. Newer models use punctuation and audio tags. */
export const supportsBreakTags = (modelId: string) => /_v2(_5)?$/.test(modelId) || modelId.includes('multilingual_v2')

/**
 * A starting point per model family, meant to be auditioned and adjusted by
 * ear (see references/elevenlabs-voice.md). Speed 1.0 is the voice's own pace.
 */
export function defaultSettings(modelId: string): VoiceSettings {
  if (modelId.startsWith('eleven_v4') || modelId.startsWith('eleven_v3')) {
    // "Natural" middle of the stability range: expressive without wandering.
    return { stability: 0.5, similarity_boost: 0.75, style: 0, speed: 1.0, use_speaker_boost: true }
  }
  return { stability: 0.4, similarity_boost: 0.75, style: 0.3, speed: 1.0, use_speaker_boost: true }
}

/** Roughly how long a person takes to say a character. Re-measure after the first narration (run.ts prints it). */
export let SECONDS_PER_CHARACTER = 0.072
export const setSecondsPerCharacter = (value: number) => {
  SECONDS_PER_CHARACTER = value
}

export function estimate(text: string): Narration {
  return {
    file: '',
    duration: text.length * SECONDS_PER_CHARACTER,
    alignment: null,
    estimated: true,
  }
}

/** Audio tags such as [thoughtful] shape the delivery but are not spoken, so captions drop them. */
export const stripTags = (text: string) => text.replace(/\[[^\]]+\]\s*/g, '').replace(/\s{2,}/g, ' ').trim()

export async function audioDuration(ffmpeg: string, file: string): Promise<number> {
  // ffmpeg has no separate probe binary in every build; -i alone prints the length.
  const { stderr } = await run(ffmpeg, ['-hide_banner', '-i', file]).catch(
    (error: { stderr?: string }) => ({ stderr: error.stderr ?? '' }),
  )
  const match = /Duration:\s*(\d+):(\d+):([\d.]+)/.exec(stderr)
  if (!match) throw new Error(`Could not read the length of ${file}`)
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])
}

/**
 * Speak one beat's narration with per-character timing, so the screen can act
 * on the exact word. The result is cached by everything that affects the
 * sound, so a re-run costs nothing and a changed line re-bills only that beat.
 * (Changing a beat also changes the neighbouring-text context of the beats on
 * either side of it, which re-bills those too. Small, but not zero.)
 */
export async function speak(
  config: VoiceConfig,
  text: string,
  context: { previous?: string; next?: string } = {},
): Promise<Narration> {
  mkdirSync(config.cacheDir, { recursive: true })
  const settings = { ...defaultSettings(config.modelId), ...config.settings }
  const useContext = !NO_NEIGHBOUR_CONTEXT.has(config.modelId)
  const neighbours = useContext ? context : {}
  const key = createHash('sha1')
    .update(
      JSON.stringify([config.voiceId, config.modelId, settings, config.seed ?? null, config.textNormalization ?? null, text, neighbours]),
    )
    .digest('hex')
    .slice(0, 20)
  const mp3 = path.join(config.cacheDir, `${key}.mp3`)
  const meta = path.join(config.cacheDir, `${key}.json`)

  if (!existsSync(mp3) || !existsSync(meta)) {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}/with-timestamps?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: { 'xi-api-key': config.apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
          text,
          model_id: config.modelId,
          voice_settings: settings,
          ...(config.seed === undefined ? {} : { seed: config.seed }),
          ...(config.textNormalization ? { apply_text_normalization: config.textNormalization } : {}),
          ...(neighbours.previous ? { previous_text: neighbours.previous } : {}),
          ...(neighbours.next ? { next_text: neighbours.next } : {}),
        }),
      },
    )
    if (!response.ok) {
      const detail = await response.text()
      throw new Error(`ElevenLabs answered ${response.status}: ${detail.slice(0, 300)}`)
    }
    const body = (await response.json()) as {
      audio_base64: string
      alignment?: {
        character_start_times_seconds: number[]
        character_end_times_seconds: number[]
      }
    }
    await writeFile(mp3, Buffer.from(body.audio_base64, 'base64'))
    await writeFile(
      meta,
      JSON.stringify({
        alignment: body.alignment
          ? {
              starts: body.alignment.character_start_times_seconds,
              ends: body.alignment.character_end_times_seconds,
            }
          : null,
      }),
    )
  }

  const saved = JSON.parse(await readFile(meta, 'utf8')) as { alignment: Alignment | null }
  return {
    file: mp3,
    duration: await audioDuration(config.ffmpeg, mp3),
    alignment: saved.alignment,
    estimated: false,
  }
}

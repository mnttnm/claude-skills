import type { Page } from '@playwright/test'
import type { VoiceSettings } from './lib/tts.ts'

/**
 * Everything about a recording that belongs to this project rather than to the
 * recorder. Copy this file into demo-video/ and fill it in.
 */
export const demo = {
  /** Base name of the files written to out/: <name>.mp4, <name>.srt, <name>.vtt. */
  outputName: 'demo',
  /** Where the app is running for the recording. APP_URL overrides it. */
  appUrl: 'http://localhost:3000',
  /** A path that answers when the app is ready, e.g. the sign-in page. */
  healthPath: '/',
  /** Shown when the app is not answering. */
  startHint: 'Start it with: pnpm dev',
  /** Other services the story needs (mail catcher, API). Each must answer before recording starts. */
  checks: [] as { url: string; message: string }[],

  /**
   * Visit every route the story uses once, off camera. In development the app
   * compiles a route on first visit, which can take many seconds; done on
   * camera it puts the picture behind the voice. Sign in inside this function
   * if the routes need a session. Best effort: swallow errors per route.
   */
  warmUp: undefined as undefined | ((options: { app: string; chromiumPath?: string }) => Promise<void>),

  /**
   * Put the demo data back to the state the recording starts from, so every
   * take is identical. Must refuse any database that is not local.
   */
  prepare: undefined as undefined | (() => Promise<void>),

  /** Extra helpers handed to every storyboard step, next to the stage, page and app URL. */
  context: undefined as undefined | (() => Record<string, unknown>),

  /** Full-screen cards, keyed by the `card` field of a beat. Each returns a complete HTML document. */
  cards: {
    title: () => '<!doctype html><meta charset="utf-8"><body style="font:600 56px system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#0b3c49;color:#fff">Project update</body>',
    recap: () => '<!doctype html><meta charset="utf-8"><body style="font:600 56px system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#0b3c49;color:#fff">Recap</body>',
  } as Record<string, () => string>,

  /**
   * The voice. Choose it by ear (scripts/audition.mjs), then put the id here.
   * ELEVENLABS_VOICE_ID and ELEVENLABS_MODEL override these per run.
   */
  voice: {
    voiceId: 'REPLACE_WITH_AUDITIONED_VOICE_ID',
    modelId: 'eleven_v4',
    settings: undefined as VoiceSettings | undefined,
    seed: undefined as number | undefined,
    textNormalization: undefined as 'auto' | 'on' | 'off' | undefined,
  },
}

export type { Page }

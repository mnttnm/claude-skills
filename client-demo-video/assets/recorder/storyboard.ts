import type { Page } from '@playwright/test'
import { sleep, type Stage } from './lib/stage.ts'

/**
 * The script. A beat is a stretch of narration cut into sentences; each
 * sentence can carry the on-screen action that happens while it is said. The
 * recorder starts an action when the narrator reaches its sentence, so screen
 * and voice stay together without hand-tuned timings.
 *
 * Read references/narration-style.md before writing a line, and run
 * scripts/check_script.py on this file before spending any voice credits.
 */
export type Ctx = {
  s: Stage
  page: Page
  app: string
  /** Wait for the narrator to finish the sentence before this one. */
  quiet: () => Promise<void>
}

export type Step = {
  /** What the presenter says. Audio tags like [thoughtful] are spoken as delivery, never shown in captions. */
  say?: string
  run?: (ctx: Ctx) => Promise<void>
}

export type Beat = {
  id: string
  chapter?: { n: number; title: string }
  /** Key into demo.cards in demo.config.ts. */
  card?: 'title' | 'recap'
  steps: Step[]
}

export const storyboard: Beat[] = [
  {
    id: 'title',
    card: 'title',
    steps: [{ say: 'This is the update for the reporting screens. I will go through what is built, and then what is still open.' }],
  },

  {
    id: 'example-screen',
    chapter: { n: 1, title: 'The reports screen' },
    steps: [
      // A leading navigation with no sentence: hide it in a jump cut so the
      // picture is ready when the voice starts.
      { run: async ({ s, app }) => s.cut(() => s.goto(`${app}/reports`, { settle: 1500 })) },
      {
        say: 'This is the reports screen. Each row is one report, with its owner and its status.',
        run: async ({ s, page }) => {
          await s.spot(page.getByRole('table').first(), 'One row per report')
          await sleep(4000)
          await s.unspot()
        },
      },
    ],
  },
]

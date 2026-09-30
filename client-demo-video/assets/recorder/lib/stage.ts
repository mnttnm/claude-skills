import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import {
  type BrowserContext,
  type CDPSession,
  chromium,
  type Locator,
  type Page,
} from '@playwright/test'
import { OVERLAY_SCRIPT } from './overlay.ts'

const run = promisify(execFile)

/** CSS pixels. At 1.3333x this records a crisp 1920x1080 frame. */
export const VIEWPORT = { width: 1440, height: 810 } as const
export const SCALE = 1920 / VIEWPORT.width

/** 1 for a real take. `--turbo` shrinks every pause so selectors can be checked in seconds. */
let tempo = 1
export const setTempo = (value: number) => {
  tempo = value
}
export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms * tempo))

type Frame = { file: string; ts: number }
type Point = { x: number; y: number }

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

/**
 * Everything the recording browser needs from outside this machine (the app's
 * web fonts and the map's background tiles) is fetched here and cached on
 * disk. That makes the recording look like the real product even where the
 * browser itself cannot reach the internet, and makes a second take identical
 * to the first.
 */
async function bridgeExternal(
  context: BrowserContext,
  cacheDir: string,
  userAgent: string,
) {
  mkdirSync(cacheDir, { recursive: true })
  await context.route(
    (url) =>
      /^https?:$/.test(url.protocol) && !LOCAL_HOSTS.has(url.hostname),
    async (route) => {
      const request = route.request()
      const range = request.headers().range
      const key = createHash('sha1')
        .update(`${request.method()} ${request.url()} ${range ?? ''}`)
        .digest('hex')
      const bodyFile = path.join(cacheDir, `${key}.body`)
      const metaFile = path.join(cacheDir, `${key}.json`)
      try {
        if (!existsSync(metaFile)) {
          const headerFile = path.join(cacheDir, `${key}.hdr`)
          const args = [
            '-sS', '-L', '--compressed', '-m', '45', '-A', userAgent,
            '-D', headerFile, '-o', bodyFile,
            ...(range ? ['-H', `Range: ${range}`] : []),
            request.url(),
          ]
          await run('curl', args)
          const blocks = readFileSync(headerFile, 'utf8').split(/\r?\n\r?\n/).filter(Boolean)
          const last = blocks.at(-1) ?? ''
          const status = Number(/^HTTP\/[\d.]+ (\d+)/.exec(last)?.[1] ?? 502)
          const type = /^content-type:\s*(.+)$/im.exec(last)?.[1]?.trim()
          const contentRange = /^content-range:\s*(.+)$/im.exec(last)?.[1]?.trim()
          await writeFile(metaFile, JSON.stringify({ status, type, contentRange }))
        }
        const meta = JSON.parse(await readFile(metaFile, 'utf8')) as {
          status: number
          type?: string
          contentRange?: string
        }
        await route.fulfill({
          status: meta.status,
          body: await readFile(bodyFile),
          headers: {
            ...(meta.type ? { 'content-type': meta.type } : {}),
            ...(meta.contentRange ? { 'content-range': meta.contentRange } : {}),
            'access-control-allow-origin': '*',
            'cache-control': 'max-age=3600',
          },
        })
      } catch {
        await route.abort().catch(() => undefined)
      }
    },
  )
}

export type StageOptions = {
  /** Where frames and downloaded assets go. */
  workDir: string
  captions: boolean
  chromiumPath?: string
}

/**
 * One browser window, recorded. Every action a viewer sees goes through here so
 * it moves at human speed: the cursor glides, clicks ripple, typing has rhythm.
 */
export class Stage {
  readonly page: Page
  private readonly context: BrowserContext
  private readonly cdp: CDPSession
  private readonly framesDir: string
  private readonly frames: Frame[] = []
  private readonly writes: Promise<unknown>[] = []
  private firstTs: number | null = null
  private wallFirst = 0
  private cutStart: number | null = null
  private cutTotal = 0
  private cursor: Point = { x: 720, y: 420 }
  private overlayState: { caption: string | null; chip: { n: string; title: string } | null } = {
    caption: null,
    chip: null,
  }

  private constructor(
    page: Page,
    context: BrowserContext,
    cdp: CDPSession,
    framesDir: string,
    private readonly captions: boolean,
  ) {
    this.page = page
    this.context = context
    this.cdp = cdp
    this.framesDir = framesDir
  }

  static async open(options: StageOptions): Promise<Stage> {
    const browser = await chromium.launch({
      executablePath: options.chromiumPath,
      args: ['--hide-scrollbars', '--force-color-profile=srgb', '--font-render-hinting=none'],
    })
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: SCALE,
      locale: 'en-GB',
      timezoneId: 'Asia/Kolkata',
    })
    const userAgent = await browser
      .newPage()
      .then(async (p) => {
        const ua = await p.evaluate(() => navigator.userAgent)
        await p.close()
        return ua
      })
    await bridgeExternal(context, path.join(options.workDir, '.cache', 'external'), userAgent)
    await context.addInitScript(OVERLAY_SCRIPT)
    const page = await context.newPage()
    const cdp = await context.newCDPSession(page)
    const framesDir = path.join(options.workDir, 'out', 'frames')
    mkdirSync(framesDir, { recursive: true })
    const stage = new Stage(page, context, cdp, framesDir, options.captions)
    page.on('load', () => void stage.reapplyOverlay())
    return stage
  }

  /** Begin capturing. Call once the first page is up. */
  async startRecording() {
    this.cdp.on('Page.screencastFrame', (event) => {
      const raw = event.metadata.timestamp ?? Date.now() / 1000
      void this.cdp.send('Page.screencastFrameAck', { sessionId: event.sessionId })
      // Inside a jump cut nothing is kept, so the picture skips straight over it.
      if (this.cutStart !== null) return
      if (this.firstTs === null) {
        this.firstTs = raw
        this.wallFirst = Date.now() / 1000
      }
      const ts = raw - this.firstTs - this.cutTotal
      const file = path.join(this.framesDir, `f${String(this.frames.length).padStart(6, '0')}.jpg`)
      this.frames.push({ file, ts })
      this.writes.push(writeFile(file, Buffer.from(event.data, 'base64')))
    })
    await this.cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 92,
      maxWidth: 1920,
      maxHeight: 1080,
      everyNthFrame: 1,
    })
  }

  /** Resolves once the browser has delivered its first frame, so timings start from zero. */
  async whenRecording(timeoutMs = 5000) {
    const until = Date.now() + timeoutMs
    while (this.firstTs === null && Date.now() < until) await sleep(25)
  }

  /** Seconds of video so far. Frozen while a jump cut is running. */
  now(): number {
    if (this.firstTs === null) return 0
    const wall = this.cutStart ?? Date.now() / 1000
    return wall - this.wallFirst - this.cutTotal
  }

  /**
   * Run something (a sign-out and sign-in, say) that the viewer should not sit
   * through. Nothing recorded during it reaches the video, and the video clock
   * stands still, so narration lined up on that clock stays lined up.
   */
  async cut<T>(fn: () => Promise<T>): Promise<T> {
    this.cutStart = Date.now() / 1000
    try {
      return await fn()
    } finally {
      this.cutTotal += Date.now() / 1000 - (this.cutStart ?? Date.now() / 1000)
      this.cutStart = null
      // The screen only sends a frame when something changes; nudge it so the
      // first frame after the cut shows where we landed, not where we left.
      await this.page.mouse.move(this.cursor.x + 1, this.cursor.y + 1)
      await this.page.mouse.move(this.cursor.x, this.cursor.y)
    }
  }

  async stopRecording(): Promise<{ frames: Frame[]; duration: number }> {
    const duration = this.now()
    await this.cdp.send('Page.stopScreencast').catch(() => undefined)
    await Promise.all(this.writes)
    return { frames: this.frames, duration }
  }

  async close() {
    await this.context.browser()?.close()
  }

  // ---------------------------------------------------------------------
  // Overlay
  // ---------------------------------------------------------------------

  private async overlayReady() {
    await this.page
      .waitForFunction(() => (window as unknown as { __demo?: { ready: boolean } }).__demo?.ready === true, undefined, { timeout: 4000 })
      .catch(() => undefined)
  }

  private async reapplyOverlay() {
    await this.overlayReady()
    const { caption, chip } = this.overlayState
    await this.page
      .evaluate(
        ([c, ch]) => {
          const d = (window as unknown as { __demo?: { caption(t: string | null): void; chip(c: unknown): void } }).__demo
          d?.caption(c as string | null)
          d?.chip(ch)
        },
        [caption, chip] as const,
      )
      .catch(() => undefined)
  }

  async caption(text: string | null) {
    this.overlayState.caption = this.captions ? text : null
    await this.overlayReady()
    await this.page
      .evaluate((t) => (window as unknown as { __demo: { caption(t: string | null): void } }).__demo.caption(t), this.overlayState.caption)
      .catch(() => undefined)
  }

  /** "Step 3" chip at the top of the screen for a few seconds. */
  async chapter(n: number, title: string, showMs = 3400, badge?: string) {
    this.overlayState.chip = { n: badge ?? String(n), title }
    await this.overlayReady()
    await this.page.evaluate((c) => (window as unknown as { __demo: { chip(c: unknown): void } }).__demo.chip(c), this.overlayState.chip).catch(() => undefined)
    setTimeout(() => {
      this.overlayState.chip = null
      void this.page.evaluate(() => (window as unknown as { __demo: { chip(c: unknown): void } }).__demo.chip(null)).catch(() => undefined)
    }, showMs)
  }

  /** A short tag saying who the screen belongs to now, e.g. after a jump cut. */
  async note(initials: string, text: string, showMs = 3200) {
    await this.chapter(0, text, showMs, initials)
  }

  /** Dim everything except these elements and (optionally) say why. */
  async spot(target: Locator | Locator[], label?: string) {
    const locators = Array.isArray(target) ? target : [target]
    let box: { x: number; y: number; w: number; h: number } | null = null
    for (const locator of locators) {
      await locator.first().scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => undefined)
      const b = await locator.first().boundingBox({ timeout: 3000 }).catch(() => null)
      if (!b) {
        console.warn(`  ! spotlight target not found: ${String(locator)}`)
        continue
      }
      box = box
        ? {
            x: Math.min(box.x, b.x),
            y: Math.min(box.y, b.y),
            w: Math.max(box.x + box.w, b.x + b.width) - Math.min(box.x, b.x),
            h: Math.max(box.y + box.h, b.y + b.height) - Math.min(box.y, b.y),
          }
        : { x: b.x, y: b.y, w: b.width, h: b.height }
    }
    if (!box) return
    await this.overlayReady()
    await this.page.evaluate(
      ([rect, text]) => (window as unknown as { __demo: { spot(r: unknown, l: unknown): void } }).__demo.spot(rect, text),
      [box, label ?? null] as const,
    )
  }

  async unspot() {
    await this.page
      .evaluate(() => (window as unknown as { __demo: { spot(r: null): void } }).__demo.spot(null))
      .catch(() => undefined)
  }

  // ---------------------------------------------------------------------
  // Human-paced input
  // ---------------------------------------------------------------------

  async goto(url: string, options: { settle?: number } = {}) {
    // A redirect or the app's own navigation can abort the first attempt; try once more.
    await this.page.goto(url, { waitUntil: 'load' }).catch(async () => {
      await sleep(600)
      await this.page.goto(url, { waitUntil: 'load' })
    })
    await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => undefined)
    await this.overlayReady()
    await sleep(options.settle ?? 700)
  }

  private async glide(to: Point, ms: number) {
    const from = this.cursor
    const distance = Math.hypot(to.x - from.x, to.y - from.y)
    if (distance < 2) return
    const duration = Math.max(280, Math.min(ms, 380 + distance * 0.9))
    const steps = Math.max(8, Math.round(duration / 16))
    // A slight arc, so it never travels in a ruler-straight line.
    const bend = Math.min(70, distance * 0.09) * (to.x >= from.x ? -1 : 1)
    const nx = -(to.y - from.y) / distance
    const ny = (to.x - from.x) / distance
    for (let i = 1; i <= steps; i += 1) {
      const t = i / steps
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
      const arc = Math.sin(Math.PI * eased) * bend
      const x = from.x + (to.x - from.x) * eased + nx * arc
      const y = from.y + (to.y - from.y) * eased + ny * arc
      await this.page.mouse.move(x, y)
      await sleep(duration / steps)
    }
    this.cursor = to
  }

  private async pointOf(target: Locator | Point, where: 'center' | 'left' = 'center'): Promise<Point> {
    if ('x' in target) return target
    await target.first().scrollIntoViewIfNeeded().catch(() => undefined)
    await sleep(120)
    const box = await target.first().boundingBox({ timeout: 8000 })
    if (!box) throw new Error(`Cannot find ${String(target)} on screen`)
    return {
      x: where === 'left' ? box.x + Math.min(40, box.width / 3) : box.x + box.width / 2,
      y: box.y + box.height / 2,
    }
  }

  async moveTo(target: Locator | Point, ms = 750) {
    await this.glide(await this.pointOf(target), ms)
  }

  async click(target: Locator | Point, options: { ms?: number; pause?: number } = {}) {
    const point = await this.pointOf(target)
    await this.glide(point, options.ms ?? 750)
    await sleep(140)
    await this.page.mouse.down()
    await sleep(70)
    await this.page.mouse.up()
    await sleep(options.pause ?? 450)
  }

  /** Click a field, then type into it with a person's rhythm. */
  async type(field: Locator, text: string, options: { fast?: boolean } = {}) {
    await this.click(field, { pause: 200 })
    const base = options.fast ? 26 : 62
    for (const char of text) {
      await this.page.keyboard.type(char)
      await sleep(base + Math.random() * base * 0.7)
    }
    await sleep(options.fast ? 120 : 260)
  }

  async press(key: string, pause = 300) {
    await this.page.keyboard.press(key)
    await sleep(pause)
  }

  async scrollBy(dy: number, ms = 900) {
    const steps = Math.round(ms / 16)
    for (let i = 0; i < steps; i += 1) {
      const t = (i + 1) / steps
      const prev = i / steps
      const ease = (v: number) => (v < 0.5 ? 2 * v * v : 1 - (-2 * v + 2) ** 2 / 2)
      await this.page.mouse.wheel(0, dy * (ease(t) - ease(prev)))
      await sleep(16)
    }
    await sleep(250)
  }

  /** Show a full-screen title or recap card (HTML) in the same recording. */
  async card(html: string, holdMs: number) {
    await this.page.goto('about:blank')
    await this.page.setContent(html, { waitUntil: 'load' })
    await this.page.evaluate(() => document.fonts?.ready).catch(() => undefined)
    await sleep(holdMs)
  }
}

export function writeJson(file: string, value: unknown) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(value, null, 2))
}

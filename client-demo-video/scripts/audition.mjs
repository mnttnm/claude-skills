#!/usr/bin/env node
/**
 * Audition ElevenLabs voices and models on the same passage, so a person can
 * pick by ear. Claude cannot hear, and "natural" is a judgement only a listener can make.
 *
 *   node audition.mjs --list-voices
 *   node audition.mjs --text "One passage..." --voices ID1,ID2 --models eleven_v4,eleven_multilingual_v2 --out ./auditions
 *   ... add --yes to spend the credits (without it, this only prints the plan and the cost)
 *
 * Options
 *   --text        the passage (use two or three real sentences from the script, about 200 characters)
 *   --voices      comma separated voice ids
 *   --models      comma separated model ids (default eleven_v4)
 *   --stability --similarity --style --speed --seed   voice settings, applied to every clip
 *   --max-credits refuse to run above this many credits (default 1500)
 *   --out         output folder (default ./auditions)
 *
 * Reads ELEVENLABS_API_KEY from the environment. The key is never printed.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`)
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d
}

const key = process.env.ELEVENLABS_API_KEY
if (!key) {
  console.error('ELEVENLABS_API_KEY is not set.')
  process.exit(1)
}
const api = (p, init = {}) =>
  fetch(`https://api.elevenlabs.io${p}`, { ...init, headers: { 'xi-api-key': key, ...(init.headers ?? {}) } })

const voices = await (await api('/v1/voices')).json()
if (!voices.voices) {
  console.error('Could not list voices:', JSON.stringify(voices).slice(0, 200))
  process.exit(1)
}
const byId = new Map(voices.voices.map((v) => [v.voice_id, v]))

if (flag('list-voices')) {
  for (const v of voices.voices) {
    const l = v.labels ?? {}
    console.log(
      [v.voice_id, v.name, v.category, [l.gender, l.age, l.accent].filter(Boolean).join(' '), l.descriptive ?? l.description ?? '', l.use_case ?? ''].join(' | '),
    )
  }
  process.exit(0)
}

const text = opt('text')
const voiceIds = (opt('voices') ?? '').split(',').filter(Boolean)
const models = (opt('models') ?? 'eleven_v4').split(',').filter(Boolean)
if (!text || voiceIds.length === 0) {
  console.error('Need --text and --voices. Use --list-voices to see the ids.')
  process.exit(1)
}
for (const id of voiceIds) {
  if (!byId.has(id)) console.error(`Voice ${id} is not in this account. Add it from the voice library first (that changes the account, so ask the owner).`)
}

const modelList = await (await api('/v1/models')).json()
const multiplier = (m) => modelList.find((x) => x.model_id === m)?.model_rates?.character_cost_multiplier ?? 1
const clips = voiceIds.filter((id) => byId.has(id)).flatMap((v) => models.map((m) => ({ voice: v, model: m })))
const credits = clips.reduce((sum, c) => sum + Math.ceil(text.length * multiplier(c.model)), 0)
const cap = Number(opt('max-credits', 1500))

console.log(`${clips.length} clips of ${text.length} characters: about ${credits} credits (cap ${cap}).`)
for (const c of clips) console.log(`  ${byId.get(c.voice).name} on ${c.model}`)
if (credits > cap) {
  console.error('Over the cap. Shorten the passage, use fewer voices or models, or raise --max-credits deliberately.')
  process.exit(1)
}
if (!flag('yes')) {
  console.log('Dry run. Add --yes to generate.')
  process.exit(0)
}

const settings = Object.fromEntries(
  [
    ['stability', opt('stability')],
    ['similarity_boost', opt('similarity')],
    ['style', opt('style')],
    ['speed', opt('speed')],
  ]
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => [k, Number(v)]),
)
const out = opt('out', './auditions')
mkdirSync(out, { recursive: true })

for (const c of clips) {
  const name = byId.get(c.voice).name.split(/[\s-]/)[0].toLowerCase()
  const res = await api(`/v1/text-to-speech/${c.voice}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: c.model,
      ...(Object.keys(settings).length ? { voice_settings: settings } : {}),
      ...(opt('seed') ? { seed: Number(opt('seed')) } : {}),
    }),
  })
  if (!res.ok) {
    console.error(`  ${name} on ${c.model}: ${res.status} ${(await res.text()).slice(0, 160)}`)
    continue
  }
  const file = path.join(out, `${name}__${c.model}.mp3`)
  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  console.log(`  wrote ${file}`)
}

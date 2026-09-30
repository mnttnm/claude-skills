# Setting up the recorder in a project

The recorder in `assets/recorder/` drives the real app in Chromium, adds a cursor, captions and
spotlights, cuts between people with jump cuts, narrates with ElevenLabs, and encodes one
1080p 30 fps mp4 plus subtitles. It is a snapshot of a recorder proven on a real project, with the
project-specific parts pulled out into `demo.config.ts` and `storyboard.ts`.

## 1. See what already exists

Look for a `demo-video/` folder (or `demo:video` in `package.json`). If the project has one,
use it and read its README. Do not scaffold a second recorder next to it. If it exists but
predates this snapshot, keep it, and take only what helps (the model-aware `tts.ts`, the
`--trace` flag, `warmUp`) after telling the user.

## 2. Scaffold

```bash
cp -r <skill>/assets/recorder ./demo-video
```

Then, in `package.json`, add `"demo:video": "tsx demo-video/run.ts"`, and add `out/` and `.cache/`
to `demo-video/.gitignore` (recordings and cached audio are large and regenerable). The recorder
needs `@playwright/test`, `tsx` and `dotenv` as dev dependencies. See `package-scripts.txt`.

## 3. Fill in `demo.config.ts`

- `appUrl`, `healthPath`, `startHint`: how to tell the app is up.
- `checks`: other services the story depends on (a mail catcher, an API).
- `warmUp`: sign in and visit every route the story uses (see storyboard-and-timing.md).
- `prepare`: put demo data back to a known state before each take. It deletes things, so make it refuse any database that is not local, and never point it at a shared or production one.
- `cards`: the title and closing cards, as full HTML documents in the client's look.
- `voice`: the audition winner. Leave `modelId` on `eleven_v4` unless the audition says otherwise.

Use demo data only. Never put real client data, personal data or secrets on screen or in the
narration text, because both end up in a video that gets shared and in a request to a third party.

## 4. Environment

| Need | How |
|---|---|
| Node 22 or later | already in most projects |
| ffmpeg | `apt install ffmpeg`. If apt is blocked: `pip install imageio-ffmpeg`, then `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"` and set `FFMPEG_PATH` to that path |
| Chromium | Playwright's, at `/opt/pw-browsers/chromium` when the environment provides it (found automatically), else `pnpm exec playwright install chromium` or set `CHROMIUM_PATH`. In a locked-down cloud sandbox do not download a browser: use the one that is there |
| ElevenLabs key | `ELEVENLABS_API_KEY` in the environment or in `.env.local`. Never print it, log it, commit it or paste it. Report only "set" and its length |
| Local services | whatever the project's runbook says. In a cloud container the Docker daemon may need starting by hand (`dockerd &`), and Docker Hub may answer `429 Too Many Requests`: pull each image on its own with a retry and a pause between tries |

## 5. Check the key before spending anything

```bash
curl -sS -H "xi-api-key: $ELEVENLABS_API_KEY" https://api.elevenlabs.io/v1/user/subscription
```

Report the tier and the characters remaining, never the key. A narration is about one
character per character of script, and a finished video costs about one and a half narrations
once edits and neighbouring beats are counted. If the key is missing or invalid, stop and say so
rather than falling back silently. The draft mode still works without a key.

## 6. Commands

| Command | Use |
|---|---|
| `pnpm demo:video --draft --trace` | silent, captions on, prints when each step was said and done. Costs nothing |
| `pnpm demo:video --draft --upto=<beat>` | record up to one beat while iterating |
| `pnpm demo:video --trace` | the narrated take, with the trace |
| `pnpm demo:video --turbo` | shrink every pause: only tells you whether selectors still work |
| `pnpm demo:video --no-captions` | leave the on-screen captions off |

Environment overrides: `APP_URL`, `FFMPEG_PATH`, `CHROMIUM_PATH`, `ELEVENLABS_VOICE_ID`,
`ELEVENLABS_MODEL`. Note that `APP_URL` in `.env.local` beats `appUrl` in the config.

Output lands in `demo-video/out/`: `<outputName>.mp4`, `.srt`, `.vtt`, `timeline.json`, and a
silent `picture.mp4` (set `outputName` in `demo.config.ts`; it defaults to `demo`). Pass
`--name=<outputName>` to `verify_video.sh` if you change it.

## 7. Delivering

Send the mp4 and the srt to the user directly (in a cloud sandbox the files live in a container
that is discarded, so they are lost otherwise), with `open-questions.md`. Do not commit anything
under `out/` or `.cache/`. Say what was verified by measurement, and say plainly that the voice
was not judged by ear.

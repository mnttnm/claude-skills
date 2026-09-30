---
name: client-demo-video
description: Make a narrated screen-recording demo video of a running web app from a plain description of what to show, for client project updates and stakeholder walkthroughs. Records the real app in a browser, writes a plain, factual presenter script (not marketing copy), narrates it with a natural-sounding ElevenLabs voice, and delivers an mp4, subtitles and a written list of open questions. Use this whenever the user wants a demo video, walkthrough video, feature or progress update video, screen recording with voice-over, "record the new screens", "show the client what we built", or a narrated Loom-style update, even if they never say "skill" or name a tool. Also use it when a demo voice sounds robotic or salesy and needs fixing, or when someone asks how to make ElevenLabs narration sound like a real presenter.
---

# Client demo video

Turn "here is what we want to show" into a finished, narrated demo of the real app, and make
sure the client is told about anything that is unclear or unfinished rather than being sold to.

The audience is a client or stakeholder in a project-update meeting. They want to know what is
built, how it behaves, and what is open. The video should sound like a colleague sharing their
screen, not an advert. Clarity and honesty beat polish.

## The workflow

Work through these in order. Steps 2 and 3 are where most of the value is: a video that shows
the wrong thing, or asserts something unchecked, is worse than no video.

### 1. Take the brief, then look before you ask

Capture, from the user's message: which screens and workflows to show, who the audience is,
target length, and what is deliberately out of scope. Then read the project first (its docs,
its list of supported workflows, its README, its existing `demo-video/` folder if any) and only
ask about what you cannot find out. Asking what the docs already answer wastes the user's time.

### 2. Exercise the app and collect open questions

Before writing a word of narration, walk every workflow you were asked to show in the running
app (start it per the project's runbook), and note anything unclear, inconsistent, disabled,
slow, broken or unstated. Read `references/open-questions.md` and follow it: sort each item into
**blocking** (the answer changes what the video shows or claims: ask now, all together, with the
evidence and your best reading) or **non-blocking** (say plainly in the video that it is open,
and list it in the handoff). Never fill a gap with a plausible guess. Likely is not verified.

If everything is clear, say so, and write "no open questions" in the handoff only because you
checked.

### 3. Storyboard

One chapter per workflow, in the order a user meets them, each a task rather than a menu tour.
Add a short "not built or not decided" chapter when there is something to say. Each step is one
sentence plus the action shown while it is said. Read `references/storyboard-and-timing.md`
for how to fit sentence to action, hide waits in jump cuts, and avoid the timing traps.

### 4. Write the script in a presenter's voice

Read `references/narration-style.md` before writing any line. In short: say what the screen is,
what it does, what to notice, and what is not done; plain facts instead of adjectives; short
sentences with contractions; numbers as words; no acronyms, no symbols, no dashes; open with
scope, not a hook. Then run the checker and fix every error:

```bash
python3 scripts/check_script.py demo-video/storyboard.ts
```

It flags marketing words, hedges that hide an unchecked fact, digits, initialisms, symbols and
long sentences, and (with `--trace`) compares each line with the measured time of its action.
Do this before spending any voice credits.

### 5. Set up the recorder

Use the project's existing recorder if it has one. Otherwise scaffold `assets/recorder/`
into `demo-video/`, fill in `demo.config.ts`, and follow `references/recorder-setup.md`
(environment, ffmpeg and Chromium fallbacks, key hygiene, commands). Check the ElevenLabs key
before spending anything: report only that it is set and its length, plus the plan tier and
remaining characters. Never print, log, commit or paste the key. If it is missing or invalid,
stop and tell the user.

### 6. Choose the voice by ear

The main reason a demo sounds robotic is the model, the settings, the voice and the writing,
in that order of surprise. Read `references/elevenlabs-voice.md`. Default to `eleven_v4`
(the newest and most expressive; it supports the per-character timing the recorder needs).
Claude cannot hear, so do not pick a voice from its description: run `scripts/audition.mjs`
on two or three real lines with two or three candidate voices plus the previous choice as a
control (about 500 credits), send the clips to the user, and ask which sounds most like a
colleague presenting. Confirm the cost first. Record the winner in `demo.config.ts`. Premade
voices are being retired, so for a long-running series prefer a library, designed or cloned voice.

### 7. Record: draft, tune, narrate

1. `--draft --trace`: silent, free. Fix every `spotlight target not found`, every failed step, and every step that starts more than about half a second late or runs more than a second past its sentence. Adjust the sentence to fit the action or the action to fit the sentence.
2. Narrated take, again with `--trace`. Do not run two takes at once, and do not load the machine during one.
3. Reword before narrating, not after: changing a line re-bills its beat and the beats beside it.

### 8. Verify, do not assume

```bash
scripts/verify_video.sh demo-video/out demo-video/out/run.log --name=<outputName>
```

It checks that picture and voice agree in length (within a second), loudness near -16 LUFS with
no clipping, that every subtitle timestamp is valid, and builds contact sheets. Then look at the
frames: each chapter's picture should match what its caption says, and no caption should cover
text on a card or screen. Read the subtitle file: each caption should start when its sentence does.

### 9. Deliver

Send the user the mp4, the srt, and `open-questions.md` (use the file-sending tool, because a
cloud sandbox is discarded). Summarise in a few lines: voice and model used, final length,
characters billed, blocking questions still open, and what you could not verify. Always say that
the voice was not judged by ear if nobody has listened. Do not commit anything under `out/` or
`.cache/`. Open a pull request only if asked.

## Guardrails

- **Facts:** narrate only what you have seen work, or say it is open. No invented limits, numbers or features.
- **Data:** use demo data only. Real client data, personal data and secrets do not go on screen or into narration text, which is sent to a third-party service.
- **Money:** estimate credits before any spend, cap auditions, and prefer the cache. A finished video costs about one and a half narrations once edits are counted.
- **Key:** never expose it, in output, logs, commits or messages.
- **Data resets:** the recorder's `prepare` step deletes demo data. It must refuse any database that is not local.
- **Voice cloning:** only with the person's explicit consent.
- **Honesty about the tool:** you cannot hear the result and cannot judge whether it sounds natural. Say so, and hand the ear test to a person.

## Files

- `references/narration-style.md`: the presenter voice, with before and after examples
- `references/open-questions.md`: finding, sorting, asking and delivering unresolved items
- `references/storyboard-and-timing.md`: fitting sentence to action, jump cuts, timing traps, the take loop
- `references/elevenlabs-voice.md`: models, settings, tags, pronunciation, voices, the audition
- `references/recorder-setup.md`: scaffolding, environment, commands
- `scripts/check_script.py`: lint a script and compare it with measured action times
- `scripts/audition.mjs`: audition voices and models on the same passage
- `scripts/verify_video.sh`: verify a finished video
- `assets/recorder/`: the recorder (stage, overlay, assemble, model-aware tts, runner, config and storyboard templates)

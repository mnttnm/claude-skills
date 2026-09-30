# Making the narration sound like a person

Findings from testing the ElevenLabs API on a Creator-tier account (September 2026) and from its
documentation. Things marked **tested** were run against the live API. Things marked **docs**
come from ElevenLabs documentation and were not run. Nothing here was judged by ear, because
Claude cannot hear. The last section says how to get a person's ear into the loop cheaply.

## Why the first attempt sounded robotic

It used `eleven_multilingual_v2` with stability 0.55 and style 0.12. Those are the safe,
even-tempered settings: little pitch movement, little emphasis, every sentence delivered at the
same energy. That is right for an audiobook chapter and wrong for someone talking in a meeting.
Two levers matter more than any setting: the **model** and the **script**. Robotic delivery is
often robotic writing. Long, balanced, list-like sentences get read like a list. Short sentences
with contractions get read like speech. Fix the words first (narration-style.md), then the voice.

## Models

Checked with `GET /v1/models` and one live request per model.

| Model | Timestamps endpoint | `previous_text` / `next_text` | `<break>` tags | Audio tags | Note |
|---|---|---|---|---|---|
| `eleven_v4` | yes (tested) | yes (tested) | no (docs) | yes (tested) | Newest and the most expressive. Default choice. 10,000 characters per request. |
| `eleven_v3` | yes (tested) | **no**, HTTP 400 (tested) | no (docs) | yes | Expressive but cannot take neighbouring text. 5,000 characters. |
| `eleven_multilingual_v2` | yes (tested) | yes | **yes** (tested) | no | Steady and consistent. Use it when precise pauses matter. |
| `eleven_flash_v2_5`, `eleven_turbo_v2_5` | not tested | not tested | not tested | not tested | Half price, built for live agents, not narration. Skip. |

**Discrepancy worth knowing.** The public models page describes v4 as lacking several features
(no timestamps, no stitching). The live API accepted timestamps, neighbouring text, a seed,
voice settings, text normalization and audio tags on `eleven_v4`. Trust the API, and re-test
after any model change: run `scripts/audition.mjs` or one `with-timestamps` request.

**Why timestamps matter here.** The recorder starts each on-screen action when the narrator
reaches its sentence, using the per-character times from `/with-timestamps`. A model without
that endpoint cannot drive the picture. All three models above pass.

**Cost.** `character_cost_multiplier` is 1.0 for v4, v3 and multilingual v2, and 0.5 for the
Flash and Turbo models. A five minute video is roughly 3,000 characters, so roughly 3,000
credits. Editing one line re-bills that beat and, because neighbouring text is part of the
cache key, the beats on either side. Budget for about one and a half narrations per finished
video, not one.

## Settings

`voice_settings` on the request. Range 0 to 1 except speed (0.7 to 1.2, docs).

- **stability**: lower is more variable and more expressive, higher is more even. On v3 and v4 the API accepted 0.0, 0.5 and 1.0 (tested). ElevenLabs presents these as Creative, Natural and Robust presets in its apps (docs, not confirmed on the API). Start at 0.5. Go lower only if it still sounds flat, and only if it does not start to wander or over-act, which is exactly the risk in a factual update.
- **similarity_boost**: how closely to hold to the sampled voice. 0.75 is fine. Very high values can also reproduce the sample's flaws.
- **style**: exaggeration of the voice's speaking style. 0 on v4. It can push a calm voice into performance, which is the wrong register for a factual update. Raise it a little (0.2 to 0.4) only on v2, and only if it still sounds flat.
- **speed**: 1.0 is the voice's natural pace. 0.95 to 1.05 is the useful range. The storyboard timing is calibrated to whatever speed you record at, so choose it before tuning the video, not after.
- **seed**: the same seed with the same text gives the same take, which makes re-recording repeatable. The models are nondeterministic otherwise (docs).
- **apply_text_normalization**: `on` spells numbers, dates and units out. Not needed if the script already writes numbers as words.

`scripts/audition.mjs` applies one set of settings to every clip, so compare settings by running it twice.

## Writing for v4 (docs)

- Punctuation is direction. A comma is a short pause, a full stop resets, a line break makes space. Write the way you would script a voice-over.
- Pauses: `<break time="0.6s" />` is **not** supported on v3 and v4. Use a full stop, a line break, or an ellipsis. It is supported on multilingual v2, up to three seconds, but many in one request can destabilise it.
- Audio tags in square brackets shape delivery: `[thoughtful]`, `[calm]`, `[sighs]`. Match the tag to the voice, and use very few. In a factual update, one `[thoughtful]` before a stated limitation is about the ceiling. The recorder strips tags from captions.
- Pronunciation on v4: put an IPA transcription between slashes, for example `/ˈkʌmpəni/`, with stress marks for longer words. Results vary by voice, so listen. On v2, use `<phoneme alphabet="cmu-arpabet" ph="...">word</phoneme>`. A pronunciation dictionary (`.pls` or text file, case sensitive, first match wins) fixes a name everywhere at once.
- Capital letters add emphasis in v3 and v4. Do not use them: the checker treats all-caps words as initialisms, and shouting is the wrong register.

## Choosing the voice

1. **Premade voices are being retired.** The docs say the premade voices expire on 31 December 2026. A voice chosen from that list is fine for one video and a poor foundation for a series. For a channel of client updates that should sound the same in a year, use a voice from the voice library, a designed voice, or a clone.
2. **Voice library** (paid plans, over ten thousand shared voices): search by use case and accent, listen, then add to the account. Adding changes the account, so ask the owner first.
3. **Voice Design**: describe the voice in words (age, accent, pace, warmth, 20 to 1,000 characters) plus a preview text. Best on v4 or v3. Good when you want a specific manner, such as "unhurried, plain-spoken, mid-thirties, slight Indian English accent".
4. **Instant voice clone** (under two minutes of clean audio, most plans) or **professional clone** (Creator tier or above, longer audio, verification). The most natural result for "sounds like someone on our team" is a clone of an actual team member. Only do this with that person's explicit consent, and keep the consent on record.

For a meeting-presenter feel, look for descriptors like conversational, relaxed, warm, plain, and
avoid ones like dramatic, energetic, hyped, storyteller, advertisement.

## Audition, by ear, before recording

Claude cannot hear. Choosing a voice from its description is a guess, so let a listener do it,
and do it once, cheaply, on real lines:

```bash
node scripts/audition.mjs --list-voices
node scripts/audition.mjs --text "<two or three real lines from the script, about 200 characters>" \
  --voices ID1,ID2,ID3 --models eleven_v4 --out ./auditions          # dry run: shows the cost
node scripts/audition.mjs ... --yes                                   # spend it
```

Send the clips to the user and ask which sounds most like a colleague presenting. Include the
current or previous choice as a control so the difference is audible. Three voices on one model
is about 500 credits. Record the choice in `demo.config.ts` and do not re-audition per video.

## After recording

The recorder's assembly step applies `loudnorm` at -16 LUFS with a -1.5 dB true-peak limit, so
narration comes out at a consistent level whatever the voice. `scripts/verify_video.sh` measures
the result. Expect about -16.5 LUFS integrated and a sample peak near -1.3 dB.

## What this reference cannot tell you

- Which voice or setting sounds best. Only listening can.
- Whether v4's stability presets map exactly to the app's Creative / Natural / Robust. Re-test if it matters.
- Whether the API behaviours above hold next quarter. Models change; the `/v1/models` listing and one live request are cheap checks.

Sources: ElevenLabs documentation for [best practices](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices), [models](https://elevenlabs.io/docs/overview/models) and [voices](https://elevenlabs.io/docs/overview/capabilities/voices).

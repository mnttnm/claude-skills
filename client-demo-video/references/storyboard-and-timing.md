# Storyboard and timing

How a script becomes a video where the picture keeps up with the voice. These are lessons from
recording a real 4 minute walkthrough. Each one cost a re-record to learn.

## The model

A **beat** is a stretch of narration, generated as one audio clip so the intonation flows across
its sentences. Each **step** in a beat is one sentence plus, optionally, the action to perform
while it is spoken. The recorder requests per-character timing, so it knows the second each
sentence starts and ends, and starts each action just before its sentence.

The consequence: **an action that takes longer than its sentence pushes every later step in the
beat late**, and the voice carries on regardless. Narration is one continuous clip, so pauses
cannot be inserted between sentences. The fit between sentence length and action length is the
whole game.

## Fit each sentence to its action

Speech runs at about 0.07 seconds per character with spaces (measure it: the runner prints
the real figure after narration). So a 100 character sentence lasts about seven seconds.

- Time the action first (record a silent draft with `--trace`), then write or trim the sentence to match, from half a second shorter to a second longer than the action.
- If the action is longer, make the sentence describe it ("He types the email address, then his password, and signs in") rather than padding with filler.
- If the sentence is longer, hold the spotlight, do not add pointless clicks.
- Run `scripts/check_script.py storyboard.ts --trace run.log` to compare every line with its measured action.

## Hide waits inside jump cuts

`stage.cut(fn)` runs `fn` without recording: the picture jumps straight over it and the video
clock stands still. Use it for anything the viewer would watch a spinner through.

- The first navigation of a beat, when no sentence covers it. Otherwise the voice starts over a half-loaded page.
- The wait after clicking a button that hits the server (sign in, join, switch organisation). Show the click, cut the wait.
- Loading a page that streams (a map, a chart) before pointing at it.
- Switching who is signed in. Say who it is with `stage.note(initials, label)` so the cut is not confusing.

Do not cut the thing the sentence is about. The viewer must see the click that causes the change.

## Waits that silently cost seconds

- **`networkidle` on a page with a map, chart or live feed** never goes idle and burns its whole timeout, every time. Cap it at 1.2 to 1.5 seconds on camera, or wait for a specific element instead. Inside a cut it can be as long as you like.
- **Typing into a form before the page has hydrated** is wiped when hydration finishes, so the form submits empty. Let the page settle first (a short wait after load), or retry once.
- **Clicking a sign-out or menu control before its page is ready** does nothing. Retry until the URL changes.
- **Typing speed.** Human speed is about 85 ms a character. That is right for a short field and painful for a long password or a sentence. Pass `{ fast: true }` (about 35 ms) for anything over a dozen characters.
- **Fixed pauses after clicks** default to 450 ms. Lower them (`{ pause: 150 }`) in chains of clicks, raise them where the viewer needs a beat to read.

## Warm the app up

In development, each route compiles the first time anyone opens it, taking several seconds. If
that happens on camera, a click hangs and the voice pulls ahead. Give `demo.config.ts` a
`warmUp` that signs in and visits every route the story uses, off camera, before each take.
Run it before the data reset so anything it touches is put back.

## Spotlights

`stage.spot(locator, label?)` dims the rest of the screen around one element, with a short label.
Use it to answer "where should I look". Hold it for most of the sentence, not for a fixed
number of seconds: write the hold as the sentence length minus a little. If the locator does not
match, the recorder logs `spotlight target not found` and carries on with no spotlight, so
read the log after every take.

## The take loop

1. **Silent draft** (`--draft --trace`): no credits spent. Fix every `spotlight target not found`, every step that failed, and read the trace.
2. **Tune** until the recorder reports no step starting more than 0.6 seconds late and none running more than a second past its sentence. Some small drift is normal. Anything over two seconds is a bug in the storyboard, not noise.
3. **Narrated take.** Each take is real time (a four minute video takes about four minutes plus narration). Do not run two takes at once: they share the demo data and reset it. Avoid heavy work on the same machine during a take (test suites, builds): timing is wall clock.
4. **Verify** with `scripts/verify_video.sh` and look at the contact sheets.

## Cache and cost behaviour

Audio is cached by voice, model, settings, text, and neighbouring text. Re-recording the picture
costs nothing. Editing one sentence re-bills its beat and the beats on either side. Changing the
voice, model, settings or seed re-bills everything, so fix those before tuning wording.
Reword before you narrate, not after: draft with `--draft`, get the script right, then spend.

## Recorder behaviours worth knowing

- Frames are captured as a stream and encoded once, so quality does not depend on browser recording bitrate.
- External assets (web fonts, map tiles) are fetched once and cached, so takes look like the product and do not depend on the network.
- `--upto=<beat>` stops after a beat. Earlier beats still run, because later ones depend on their state.
- `--turbo` shrinks every pause. It only tells you whether each selector still works.

# Open questions: never guess, and say what is unknown

A client update that quietly papers over an unclear behaviour does more damage than one that
says "we have not decided this yet". Clients act on what they hear. If the narration asserts
something nobody has checked, someone will plan around it.

So the skill has one rule: **narrate only what has been seen working, or say plainly that it is
open.** Everything below is how to apply it without stalling the video.

## Where questions come from

1. **The brief.** The user's description of what to demonstrate leaves gaps: which role to
   show it as, which data, what "done" means for a screen, whether an unfinished corner is in scope.
2. **The product, when you exercise it.** Before writing a word of narration, walk each
   workflow in the running app, or read the project's own list of supported workflows and its
   visual checks if it keeps them. Note every place where:
   - the screen does something you cannot explain from the brief;
   - two documents disagree, or the docs and the screen disagree;
   - a control is disabled, missing or labelled "coming soon";
   - an error, empty state or slow step appears that the user has not mentioned;
   - a number, limit or duration appears on screen that the brief does not state (for example
     "access lasts eight hours": is that intended, and is it configurable?).
3. **The script.** The checker flags hedges (should, probably, might). Each one is a question
   wearing a disguise. Turn it into a real question or delete the claim.

## Keep it in proportion

Ask about what the video **shows or claims**, and what a client watching that flow would
reasonably ask next. Do not audit the whole product. A gap in the notes about something the
video never mentions ("does Send also email the customer?" when the video only says Send changes
the status) is a question for the handoff list at most. Do not narrate it, because saying it aloud
plants a doubt about a feature nobody was demonstrating. Speak an open item only when a viewer
would otherwise draw a wrong conclusion from what they see, or when it is a real limitation of
the thing being shown.

## Blocking or not

Sort every question into one of two piles.

- **Blocking:** the answer changes what the video shows or claims. "Is the export supposed to
  include archived reports?" Ask before scripting that beat. Use `AskUserQuestion` for a small
  set of well-formed choices, or a short numbered list in chat for open-ended ones. Do not
  record a beat whose behaviour is unresolved, unless the user says to show it as it is today.
- **Non-blocking:** the video is right either way, but the client should hear that it is open.
  "The retention period for old reports is not decided." Say it plainly in the video (a short
  "not decided yet" beat) and list it in the handoff.

Ask early and together. One message with every blocking question beats five rounds. For each,
give the evidence you saw, your best reading, and the options, so the user can answer in a word.

## Wording a question

Bad: "How should the export work?"
Good: "The export button downloads a spreadsheet with one row per report. It leaves out reports
marked archived, and the screen does not say so. Should the video say that, or should archived
reports be included? (I saw this on the reports screen, top right control.)"

## What to deliver

Always ship `open-questions.md` next to the video, even when it is empty ("None found; every
workflow shown was exercised end to end"). An empty list is a claim, so make it only if true.

```markdown
# Open questions for <project> update, <date>

## Blocking (answer needed before the next take)
1. <question> Evidence: <what was seen and where>. Options: <a> / <b>. Impact: <what changes in the video>.

## Not decided (said plainly in the video at <mm:ss>)
1. <topic>: <one line on what is known and what is not>.

## Not built (shown or mentioned at <mm:ss>)
1. <feature>: <status>.

## Could not verify
1. <thing>: <why>. For example: the narration was checked by measurement and by script, not by ear.
```

If there are open items, end the video with a short spoken beat that says how many there are and
that the written list goes with the video. Up to three items may be read out, one line each.
More than that, give the count and point to the written list: listeners will forget a list of
six, and the written list is the record.

## Do not

- Fill a gap with a plausible guess, even a likely one. Likely is not verified.
- Soften an unresolved issue into marketing ("we're still refining this experience").
- Hide a rough edge by cutting around it. If a step is slow, or fails, or looks unfinished, the
  client will meet it in the real product. Show it or list it.
- Ask questions you could answer by reading the docs or running the app. Look first.

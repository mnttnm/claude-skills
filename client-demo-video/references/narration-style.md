# Narration style: a colleague giving a project update

These videos are for clients and stakeholders who want to know what has been built, how it
behaves, and what is still open. They are not marketing. The right voice is a colleague who
knows the work well, sharing their screen in a meeting: calm, plain, specific, a little
informal, and honest about the parts that are unfinished.

Sales copy fails here for a practical reason, not only a taste one. A client who hears
"powerful" and "seamless" learns nothing about the screen and starts to doubt the rest. A
client who hears "this is the members list, one row per person, with their role" can check it
against what they see, and trusts the video more for it.

## What each screen gets

Say these four things, in this order, and stop:

1. **What it is.** "This is the members page."
2. **What it does.** "It lists everyone in the organisation, with the role each person holds."
3. **What to notice.** The one detail that matters for the workflow. "Invited people are listed at the bottom, marked as not yet joined."
4. **What is not done.** Only if true. "Bulk import is not built yet. That is planned for the next phase."

Skip step 4 when there is nothing to say. Never invent a limitation for balance.

## Voice

- **Plain statements of fact.** Replace every adjective with the fact behind it. "Fast" becomes "the list loads with all seven hundred rows". If there is no fact, cut the sentence.
- **First person plural for the team's work.** "We have added", "we changed", "this is now in place". Use "you" sparingly and never as a promise ("you'll love").
- **Contractions are fine.** "It's", "doesn't", "we haven't". A meeting presenter talks that way, and text without them sounds read out.
- **Short sentences, one idea each.** Eight to twenty words. A listener cannot re-read. If a sentence needs a comma to breathe twice, split it.
- **Light connective words, used once, not everywhere.** "Next," "Now," "So," at the start of a new screen. Do not open every sentence with one.
- **No hook, no drama.** Open with scope: what this update covers, roughly how long it runs, and what it leaves out. Do not open with a scenario, a fear, or a question meant to create tension.
- **No callbacks or running jokes.** They read as a script. One dry aside in a whole video is the ceiling, and none is fine.
- **Name what is on screen the way the screen names it.** If the button says "Open this fleet", say that. Do not paraphrase interface text.
- **Say what you don't know.** "We have not confirmed whether X, so that is one of the questions at the end." Never narrate a guess as behaviour.

## When the request says "exciting", "wow them" or "make it punchy"

Take the wish seriously and keep the register. In a project update, what wins the room is the
product visibly working, not adjectives about it. So put the energy where a colleague would:
in pace (no dead air, actions that land right on the sentence), in choosing the moments that
show the most (the total updating as a row changes, a status flipping, a button that is simply
absent for a viewer), and in a clear, steady delivery. Do not add hype words, exclamation marks
or a dramatic hook. Tell the user in one line that you kept it plain and why (clients trust a
checkable walkthrough more than enthusiasm), and offer to raise the energy of the voice
through the audition, not the script.

## Words and habits to avoid

Marketing words: leverage, seamless, robust, empower, unlock, game-changing, revolutionary,
effortless, powerful, cutting-edge, best-in-class, intuitive, sleek, delightful, streamline,
transform, supercharge. Also: exclamation marks, "imagine if", "as you can see", "now we will",
"let me show you something great".

Hedges that hide an unchecked fact: should, probably, maybe, I think, hopefully, might. If the
behaviour is real and verified, state it. If it is not verified, do not narrate it. Ask the open
question (see open-questions.md) and either wait for the answer or say plainly that it is open.

## Written to be heard

The text goes to a voice model, so anything that reads well but speaks badly is a defect.

- Numbers as words: "seven hundred turbines", not "700".
- No initialisms: "role-based access", not the abbreviation. If the audience says the abbreviation aloud, keep it, and add it to `--allow` in the checker.
- No symbols (&, %, /, @, #), no parentheses, no colons or semicolons, no em-dashes or en-dashes. Use full stops and commas. Hyphens inside a word (sign-up, role-based) are fine.
- Product and people names spelled as they should sound. If one is read wrongly, respell it, or on v4 give it IPA between slashes (see elevenlabs-voice.md), and tell the user which words you changed.
- Audio tags such as `[thoughtful]` are a delivery hint, not words. Use at most one or two in a video, for a real limitation or a caution. They never appear in captions.

Run `scripts/check_script.py` before spending any voice credits. It flags all of the above.

## Before and after

| Sounds like marketing | Sounds like a colleague |
|---|---|
| Effortlessly manage your entire team with our powerful roles system! | The members page lists everyone in the organisation and the role each person has. |
| Get ready to unlock seamless reporting. | This update covers the reports screen and the export. Three workflows, about five minutes. |
| As you can see, it's incredibly intuitive. | Each report has an owner and a status. Filtering by status is the top left control. |
| This should probably work for larger files too. | We have tested it with files up to two hundred rows. We have not tried larger ones yet. That is one of the open questions. |
| Never worry about permissions again! | A viewer can open every report but cannot edit or delete one. The server checks that on every request. |
| And that's the magic of the export. | The export writes one spreadsheet with a row per report. It opens in Excel and in Sheets. |

## Shape of a whole video

1. **Scope** (10 to 20 seconds). What is covered, what is not, how long.
2. **One chapter per workflow**, in the order a user meets them. Each chapter is a task ("Create a report", "Approve a report"), not a menu tour.
3. **Not built or not decided** (optional chapter, 20 to 40 seconds). Stated plainly, with no apology and no spin.
4. **Open questions** (10 to 20 seconds, spoken as "there are three questions we need answered" with the list in the written handoff, not read out one by one).
5. **What happens next.** Who does what by when, if known. If not known, leave it out.

Aim for about one minute per screen and under eight minutes overall. A client update that runs
long gets skimmed, and the open questions at the end are the part that must not be skimmed.

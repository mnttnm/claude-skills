---
name: ui-autoimprove
description: >
  Iteratively improve frontend UI quality through automated grade-fix-verify
  cycles inspired by Karpathy's autoresearch pattern. Grades the interface,
  identifies the weakest area, applies targeted fixes, re-grades with an
  isolated subagent, and keeps or reverts based on score delta. Use when
  user asks to "auto-improve my UI", "run the improvement loop",
  "autoresearch my site", "iteratively improve this interface", "grade and
  fix my UI", "optimize my frontend", or "run ui-autoimprove". NOT for
  one-off CSS tweaks, single-element changes, or non-UI tasks.
---

# UI Auto-Improve

Iteratively grade a frontend interface, identify the weakest area, apply targeted fixes, and keep or revert based on whether the score improved. Each iteration produces a full grade file and changelog entry. Independent changes are batched; dependent changes are isolated.

## Core Loop

```
SETUP → [GRADE → ANALYZE → FIX → RE-GRADE → KEEP/REVERT] × N → WRAP-UP
```

## Workflow

### Phase 0: Setup

#### 0.1 Gather Context

Use AskUserQuestion to collect:

1. **Target scope** — Specific file(s), page(s), component(s), or the whole UI repo
2. **Max iterations** — How many improvement cycles (default: 5)
3. **Focus areas** — Specific categories to target (accessibility, typography, etc.) or "auto" to let the grader decide
4. **Tolerance threshold** — Minimum score drop before reverting (default: 2 points, to handle grading noise)

#### 0.2 Git Safety Net

Check for git repo. If none exists, ask user to confirm, then:

```
git init → .gitignore → initial commit → create branch
```

If git exists, create a working branch: `git checkout -b autoimprove-<target>-<date>`

Commit any uncommitted changes first with user confirmation.

#### 0.3 Start Local Server

Start a local HTTP server to serve the files for screenshot-based grading:

```bash
python3 -m http.server <port> &
```

#### 0.4 Baseline Grade

Dispatch a **grading subagent** (see Grading Protocol below) to run `/interface-grader` on the target. This is the baseline. Record the grade file as `grades/grade-001.md`.

### Phase 1: Improvement Loop

For each iteration (1..N):

#### Step 1: Analyze Previous Grade

Read the most recent grade file. Extract:
- Overall score (the number to beat)
- All FAIL criteria with evidence
- The weakest category or page

#### Step 2: Plan Changes

Identify which failures to target. Apply batching strategy from `references/batching-strategy.md`:
- **Independent fixes** (no interaction) → batch into single iteration
- **Dependent fixes** (CSS + HTML for new component) → keep atomic
- **Previously-reverted areas** → try a different approach or skip

#### Step 3: Checkpoint

```bash
git commit -am "checkpoint: before iteration N"
```

#### Step 4: Apply Fixes

Make targeted edits to the HTML/CSS/JS. Document what was changed and why.

#### Step 5: Re-Grade (Isolated)

Dispatch a **fresh grading subagent** to run `/interface-grader`. The subagent has NO knowledge of what changes were made — it only sees the current file state. This eliminates self-grading bias.

The subagent must:
- Take all required screenshots (desktop 1440px + mobile 375px per page type)
- Run full code pass on ALL criteria (not just the ones expected to change)
- Run visual pass on ALL criteria
- Produce a complete grade file with delta from previous

#### Step 6: Keep or Revert

Compare `new_score` vs `baseline_score`:
- **If `new_score >= baseline_score - tolerance`**: KEEP. Update baseline.
- **If `new_score < baseline_score - tolerance`**: REVERT with `git checkout -- <files>`. Log failure.

#### Step 7: Record

Append entry to `grades/CHANGELOG.md` (see `references/grading-artifacts.md` for format).

#### Step 8: Plateau Detection

If last 2 consecutive iterations showed no score improvement (kept but same score, or both reverted), stop early — the site has plateaued at the current approach.

### Phase 2: Wrap-Up

1. Print the full improvement log showing all iterations
2. Show total improvement: `final_score - original_baseline`
3. Commit final state
4. Create learnings document at `docs/solutions/ui/autoimprove-<target>-learnings.md`
5. Kill the local HTTP server

## Grading Protocol

**Critical: Grading must be isolated from the fixing context.**

Dispatch a subagent for every grade:

```
Agent(
  subagent_type: "general-purpose",
  description: "Grade UI iteration N",
  prompt: "Run /interface-grader on <target>.
    Take screenshots at desktop 1440px and mobile 375px for each page type.
    Grade ALL criteria — do not skip any.
    Write the grade file to grades/grade-<NNN>.md.
    Copy to grades/grade-latest.md.
    If grades/grade-latest.md already exists, include a DELTA section.
    Return the overall score percentage and the weakest category."
)
```

The subagent sees only the current file state. It does not know what changes were made or what the previous score was (it reads grade-latest.md for delta computation, but this is the previous grade, not knowledge of changes).

## Additional Resources

### Reference Files

- **`references/batching-strategy.md`** — When to batch independent changes vs isolate dependent ones. Includes dependency analysis framework.
- **`references/grading-artifacts.md`** — Grade file format, changelog entry format, learnings document template. All artifact specifications.

## Key Principles

1. **The grader is a black box.** Never skip criteria. Never assume a change only affects one area.
2. **Batch by independence, not by count.** Group changes that can't interact. Isolate changes that can.
3. **Every iteration produces artifacts.** A grade file and a changelog entry. No mental re-grading.
4. **Git is the safety net.** Checkpoint before every change. Revert is always one command away.
5. **Tolerance handles noise.** A 1-2 point score fluctuation is grading variance, not regression.

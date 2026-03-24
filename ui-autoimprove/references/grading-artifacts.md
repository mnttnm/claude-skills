# Grading Artifacts

Every iteration of the improvement loop produces two artifacts: a **grade file** and a **changelog entry**. At wrap-up, a **learnings document** is produced.

## Grade File

**Location:** `grades/grade-<NNN>.md` (zero-padded 3 digits)
**Also copy to:** `grades/grade-latest.md` (always the most recent)

### Naming Convention

- `grade-001.md` — Baseline (before any changes)
- `grade-002.md` — After iteration 1
- `grade-003.md` — After iteration 2
- ...
- `grade-latest.md` — Symlink/copy of the most recent

### Format

The grade file is produced by the `/interface-grader` skill. It follows the interface-grader's output format, which includes:

1. **Header** — Pass type, date, graded-by, screenshots, context status
2. **Site Context Card** — Site type, goal, audience, trade-offs
3. **Page Map** — List of page types with goals
4. **Layer 1: Goal Alignment** — 6 criteria, each PASS/FAIL
5. **Layer 2: Site-Wide Craft** — 24 criteria across Typography, Color, Motion, Responsiveness
6. **Layer 2: Per-Page Craft** — 25 criteria per page type across Composition, Copy, Imagery, Motion, Content-Type
7. **Summary** — Overall percentage, weakest/strongest page and category
8. **Delta Section** — Changes from previous grade (if grade-latest.md exists)

### Delta Section Format

```
DELTA FROM grade-<PREV> → grade-<CURRENT>
═══════════════════════════════════════════════════

OVERALL                    XX% → YY%  (+/-ZZ)

LAYER 1                    XX% → YY%  (+/-ZZ)
  FIXED: G.N  [description of what was fixed]
  REGRESSED: G.N  [description of what broke]

SITE-WIDE                  XX% → YY%  (+/-ZZ)
  Category Name            XX% → YY%  (+/-ZZ)
    FIXED: SW-N.N  [description]
    REGRESSED: SW-N.N  [description]

PER-PAGE
  Page Name                XX% → YY%  (+/-ZZ)
    FIXED: PP-N.N  [description]
    REGRESSED: PP-N.N  [description]

FIXES:       N
REGRESSIONS: N
OVERRIDES:   N
NET:         +/-N
```

## Changelog

**Location:** `grades/CHANGELOG.md`

A single running log for the entire improvement session.

### Header

```markdown
# UI Auto-Improve — Changelog

**Target:** `<file or scope>`
**Metric:** Interface Grader (combined code + visual)
**Date:** YYYY-MM-DD
**Branch:** `<branch-name>`
```

### Entry Format (one per iteration)

```markdown
---

## Iteration N (grade-<NNN>)
**Score: XX% (NN/MM) — +/-ZZ from previous**
**Commit:** `<short-sha>`
**Decision:** KEPT / REVERTED

**Target:** [category or criteria being addressed]
**Rationale:** [why these changes were batched together or kept separate]

**Changes:**
- [specific change 1] → fixes [criterion]
- [specific change 2] → fixes [criterion]

**Criteria Flipped (N):**
| Criterion | Before | After | Category |
|---|---|---|---|
| SW-N.N | FAIL | PASS | [category] |

**Category Impact:**
- [Category]: XX% → YY% (+ZZ)

**Regressions Detected (if any):**
| Criterion | Before | After | Category |
|---|---|---|---|
| SW-N.N | PASS | FAIL | [category] |
```

### Summary Entry (at end)

```markdown
---

## Summary

| Iteration | Score | Delta | Criteria Fixed | Regressions | Batching |
|---|---|---|---|---|---|
| Baseline | XX% | — | — | — | — |
| 1 | XX% | +N | N | 0 | [note] |
| ... | ... | ... | ... | ... | ... |
| **Total** | **+N** | | **N** | **N** | |

**Optimal batching (retrospective):**
[analysis of which iterations could have been combined]

**Remaining failures (N):**
- [criterion]: [issue]
```

## Learnings Document

**Location:** `docs/solutions/ui/autoimprove-<target>-learnings.md`

Produced at wrap-up. Documents patterns for future runs.

### Template

```markdown
# UI Auto-Improve — Learnings

## Summary

Applied autoresearch pattern to `<target>`. N iterations, M kept, K reverted.
Score improved from **XX% → YY%** (+ZZ points).

## The Loop

| Iteration | Target | Change | Delta | Decision |
|---|---|---|---|---|
| 1 | ... | ... | +N% | KEPT/REVERTED |

## What Worked

1. [pattern that reliably improved scores]
2. [type of fix with highest ROI]

## What Didn't Work

1. [changes that were reverted and why]
2. [approaches that didn't move the score]

## Batching Analysis

[which iterations were properly batched, which should have been combined]

## Adapting Autoresearch for This Project

[any project-specific observations about how the pattern worked]

## What's Left

| Criterion | Issue | Difficulty |
|---|---|---|
| ... | ... | Easy/Medium/Hard |

## Keywords

[searchable tags for future reference]
```

## Screenshot Naming Convention

Screenshots taken during grading follow this pattern:

```
grades/
├── baseline-desktop-<page>.png
├── baseline-mobile-<page>.png
├── iterationN-desktop-<page>.png
├── iterationN-mobile-<page>.png
```

All screenshots referenced in grade files must exist as actual files.

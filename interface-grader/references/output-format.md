# Output Format

## Score Card

```text
INTERFACE GRADE — [Site Name]
Pass: [CODE PASS | VISUAL PASS]
Date: [YYYY-MM-DD]
Graded by: [SELF-GRADED | CROSS-GRADED]
Screenshots: [list | NO VISUAL TOOLS | N/A — code pass]
Context: [CONFIRMED | UNCONFIRMED]

SITE CONTEXT CARD
═══════════════════════════════════════════════════
Site:                [name]
Type:                [type]
Primary goal:        [goal]
Value delivery:      [how]
Audience:            [who]
First-visit promise: [what]
Intentional trade-offs:
  - [trade-off + reason]
Confirmed:           [YES/NO]
═══════════════════════════════════════════════════

PAGE MAP
═══════════════════════════════════════════════════
#  Page Type          URL Example              Page Goal
1  [name]             [url]                    [goal]
═══════════════════════════════════════════════════

LAYER 1: GOAL ALIGNMENT               [passed]/[active]   [pct]%
  [✓|✗] G.1  [criterion]
  ...

═══════════════════════════════════════════════════

LAYER 2: CRAFT QUALITY — SITE-WIDE

TYPOGRAPHY SYSTEM                      [passed]/[active]   [pct]%
  [✓|✗] SW-1.1  [criterion]                                [C|V|C+V]
  ...

COLOR & SURFACE SYSTEM                 [passed]/[active]   [pct]%
  ...

MOTION & INTERACTION SYSTEM            [passed]/[active]   [pct]%
  ...

RESPONSIVENESS & ACCESS                [passed]/[active]   [pct]%
  ...

SITE-WIDE SUBTOTAL                     [passed]/[active]   [pct]%

═══════════════════════════════════════════════════

LAYER 2: CRAFT QUALITY — PER-PAGE

PAGE: [Page Type 1] ([url])
  COMPOSITION                          [passed]/[active]   [pct]%
    [✓|✗|✓*|⊘] PP-1.1  [criterion]                        [C|V|C+V]
    ✓* PP-1.5  [criterion]
               INTENTIONAL EXCEPTION: [Layer 1 justification]
    ...
  COPY                                 [passed]/[active]   [pct]%
    ...
  IMAGERY                              [passed]/[active]   [pct]% (or EXEMPT)
    ...
  MOTION                               [passed]/[active]   [pct]%
    ...
  CONTENT-TYPE                         [passed]/[active]   [pct]% (or N/A)
    ...
  PAGE SUBTOTAL                        [passed]/[active]   [pct]%

PAGE: [Page Type 2] ([url])
  ...

═══════════════════════════════════════════════════

SUMMARY
═══════════════════════════════════════════════════
LAYER 1 (Goal Alignment):             [pct]%
LAYER 2 SITE-WIDE (Craft):            [pct]%
LAYER 2 PER-PAGE (Craft):
  [Page Type 1]:                       [pct]%
  [Page Type 2]:                       [pct]%
OVERALL:                               [weighted avg]%

INTENTIONAL EXCEPTIONS:  [count]
DEFERRED:                [count] (visual pass pending)
WEAKEST PAGE:            [name] ([pct]%)
STRONGEST PAGE:          [name] ([pct]%)
WEAKEST CATEGORY:        [name] ([pct]%)
STRONGEST CATEGORY:      [name] ([pct]%)
═══════════════════════════════════════════════════
```

## Notation

| Symbol | Meaning |
|--------|---------|
| ✓ | PASS |
| ✗ | FAIL (must include → evidence line) |
| ✓* | PASS via intentional exception (must cite Layer 1) |
| ⊘ | DEFERRED — V-only criterion, awaiting visual pass |

## Code Pass Scoring

- `C` criteria: Grade normally
- `C+V` criteria: Preliminary verdict (mark `*` if low confidence)
- `V` criteria: Mark ⊘ DEFERRED — exclude from totals
- Denominator = C + C+V only

## Visual Pass Scoring

- `V` criteria: Grade from screenshots (now in totals)
- `C+V` criteria: Confirm or override. Note: `[VISUAL OVERRIDE: was X, now Y, reason]`
- `C` criteria: Carry forward unchanged
- Denominator = all active criteria

## Delta Report (Iteration >= 2)

Read `grades/grade-latest.md` for previous scores, then append:

```text
DELTA FROM ITERATION #[N-1] → #[N]
═══════════════════════════════════════════════════

OVERALL                    [old]% → [new]%  ([+/-]diff)

LAYER 1                    [old]% → [new]%  ([+/-]diff)  [▲|▼|─]

SITE-WIDE                  [old]% → [new]%  ([+/-]diff)  [▲|▼|─]
  [Category]               [old]% → [new]%  ([+/-]diff)  [▲|▼|─]
    FIXED: [criterion #] [what changed]
    REGRESSED: [criterion #] [what changed]

PER-PAGE
  [Page Type]              [old]% → [new]%  ([+/-]diff)  [▲|▼|─]
    FIXED: [criterion #] [what changed]
    REGRESSED: [criterion #] [what changed]
    EXCEPTION ADDED: [criterion #] [Layer 1 justification]
    EXCEPTION REMOVED: [criterion #] [why no longer justified]
    VISUAL OVERRIDE: [criterion #] [code said X, visual says Y]

FIXES:       [count]
REGRESSIONS: [count]
OVERRIDES:   [count]
EXCEPTIONS:  [count] added, [count] removed
NET:         [+/-][net]
```

## File Output

After grading, write two files:

1. `grades/grade-[NNN].md` — full score card + delta, NNN incrementing from 001
2. `grades/grade-latest.md` — exact copy, overwriting previous

Create `grades/` directory if it does not exist.

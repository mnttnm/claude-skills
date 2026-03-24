---
name: interface-grader
description: >
  Grade any frontend interface (website, app, prototype) with a two-layer scoring system.
  Layer 1 establishes the site's goal and context. Layer 2 grades craft quality through
  that lens, with site-wide and per-page criteria. Uses binary pass/fail with evidence,
  two-pass verification (code then visual), and iteration-over-iteration delta reports.
  This skill should be used when the user asks to "grade this interface", "score this
  design", "evaluate this UI", "rate this website", "audit this page", "review design
  quality", "run a design grade", or wants quantitative feedback on interface quality
  across iterations. Also triggers on "grade my site", "how does my UI score",
  "design scorecard", or "run the rubric".
---

# Interface Grader

Grade any frontend interface with a two-layer system: goal alignment first, then craft quality through that lens. Binary pass/fail per criterion, with evidence required for every failure.

## Workflow

```
1. LAYER 1: Establish Context
   ├── Read the site (content, meta, about page, IA)
   ├── Form assumptions about goal, audience, trade-offs
   ├── Confirm with user via AskUserQuestion
   ├── Build Page Map (unique page types + goals)
   └── Grade 6 goal-alignment criteria

2. LAYER 2: Grade Craft (Code Pass)
   ├── Site-wide: typography, color, motion, responsiveness
   ├── Per-page: composition, copy, imagery, motion, content-type
   ├── Mark V-only criteria as ⊘ DEFERRED
   └── Produce score card

3. LAYER 2: Grade Craft (Visual Pass — after code fixes)
   ├── Screenshots: desktop 1440px + mobile 375px per page type
   ├── Grade V criteria, confirm/override C+V verdicts
   └── Produce final score card + delta

4. OUTPUT → grades/grade-NNN.md + grades/grade-latest.md
```

## Layer 1: Goal Alignment

Before grading craft, establish what the site is trying to do.

### Site Context Card

Read the site and form assumptions from: site copy, meta/OG tags, about page, information architecture, similar site patterns, visual tone. Then confirm with user via AskUserQuestion.

```
Site:                [name]
Type:                [Marketing | App | Personal | Hybrid]
Primary goal:        [one sentence]
Value delivery:      [how visitor gets value]
Audience:            [who visits, what they expect]
First-visit promise: [clear in 5 seconds]
Intentional trade-offs:
  - [rule broken on purpose + reason]
```

If user unavailable, mark `[UNCONFIRMED CONTEXT]`.

### Page Map

Identify unique page types. Two blog posts = one type. Blog index vs single post = two types.

```
#  Page Type    URL Example    Page Goal
1  [name]       [url]          [one sentence]
```

### Goal Criteria (6)

| # | Criterion |
|---|-----------|
| G.1 | Visitor understands purpose within 5 seconds |
| G.2 | Primary action obvious on every page type |
| G.3 | Information hierarchy serves primary goal |
| G.4 | Navigation consistent across all pages |
| G.5 | Each page type has distinct, non-overlapping purpose |
| G.6 | Site delivers on its first-visit promise |

## Layer 2: Craft Quality

### Verification Tags

`C` = code only. `V` = visual only (⊘ DEFERRED in code pass). `C+V` = code preliminary, visual confirms or overrides.

### Intentional Exceptions

When Layer 2 conflicts with confirmed Layer 1 goals, mark `✓*` with justification. Example: content-first blog → brand loudness becomes `✓*` because content should dominate. Unjustified exceptions remain FAIL.

### Criteria Reference

Complete criteria tables with verification methods:

- **Site-wide criteria** (24): See [`references/site-wide-criteria.md`](references/site-wide-criteria.md)
  - Typography System (6), Color & Surface (7), Motion & Interaction (5), Responsiveness (6)
- **Per-page criteria** (25): See [`references/per-page-criteria.md`](references/per-page-criteria.md)
  - Composition (7), Copy (6), Imagery (5), Motion (2), Content-Type Specific (5)
- **Output format**: See [`references/output-format.md`](references/output-format.md)
  - Score card template, delta report template, file output specs

## Scoring Rules

1. Binary PASS/FAIL — no partial credit
2. Every FAIL requires one-line evidence
3. Intentional exceptions (✓*) = PASS with Layer 1 citation
4. Self-grades tagged `[SELF-GRADED]`
5. Delta computed from `grades/grade-latest.md`
6. Visual overrides noted: `[VISUAL OVERRIDE: was X, now Y]`

## Edge Cases

- **Text-first sites**: Exclude imagery category per-page. State reason.
- **Data-intensive dashboards**: Compact type expected. Cards OK for data units. Chart colors exempt from single-accent rule. Use PP-5.1/5.2/5.4.
- **Creative/experimental**: Capture intent in context card. Grade execution of vision, not compliance.
- **Loading/scroll-triggered heroes**: Grade final revealed state, not loading.
- **SPAs**: Each distinct view/route = page type.
- **Progressive disclosure**: Each substantial step = a view.

## Screenshots

Use available tools: Playwright MCP (`browser_take_screenshot`), Claude in Chrome, CLI (`npx playwright screenshot`), or ask user. Minimum: desktop 1440px + mobile 375px viewport + full-page per page type.

If no tools available, note `[NO VISUAL TOOLS]` and defer V criteria.

## Parallelization

Dispatch parallel subagents per page type for per-page grading. Each receives the Site Context Card and its page's goal. Grade site-wide criteria in main context.

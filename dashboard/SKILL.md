---
name: designing-dashboards
description: Design modern, actionable dashboards through collaborative workflow. Use for any dashboard task—creating new dashboards, revamping existing ones, choosing layouts, selecting charts, designing widgets, or validating designs. Coordinates requirements, strategy, design, and validation phases with user checkpoints. Never assumes preferences; always collaborates.
---

# Dashboard Design Skill

A collaborative partner for creating modern, actionable dashboards. **Never assume—always ask.**

## How This Skill Works

This skill uses progressive disclosure. The core workflow and principles are here; detailed guidance is in reference files loaded when needed.

**At each phase, consult the relevant reference file:**

| Phase | Reference File | Use When |
|-------|---------------|----------|
| Requirements | [requirements.md](requirements.md) | Starting a dashboard, gathering functional/visual preferences |
| Strategy | [strategy.md](strategy.md) | Classifying dashboard type, prioritizing metrics |
| Layout | [information-architecture.md](information-architecture.md) | Choosing layout patterns (hero, bento, magazine, etc.) |
| Charts | [visualization.md](visualization.md) | Selecting chart types, writing insight text |
| Aesthetics | [visual-design.md](visual-design.md) | Defining colors, typography, density |
| Widgets | [components.md](components.md) | Building complete widget specifications |
| States | [edge-states.md](edge-states.md) | Designing empty/loading/error states |
| Quality | [validation.md](validation.md) | Final validation before delivery |

Additional detailed references:
- [chart-selection.md](chart-selection.md) — Comprehensive chart type guide
- [design-tokens.md](design-tokens.md) — CSS design token system
- [requirements-questions.md](requirements-questions.md) — Complete question library

---

## Validation Checkpoints (Always Complete)

These checkpoints should always be triggered. Skipping them leads to issues caught late and rework.

| Checkpoint | When | What |
|------------|------|------|
| Checkpoint 5 | Before implementation | Conceptual validation against checklists |
| Checkpoint 6 | After implementation | Visual testing in browser |

---

## Five Modern Dashboard Principles

Every dashboard embodies these principles:

### 1. Charts + Insights (Not Just Charts)
```
WRONG: Chart with only a title
RIGHT: Chart with insight: "APAC drove 60% of growth, up 34% YoY"
```
Every visualization includes headline insights, context, and annotations.

### 2. Appropriate Chart Variety
```
WRONG: Default to bar/line for everything
RIGHT: Match chart type to data:
  - Conversion data → Funnel chart
  - Multi-attribute comparison → Radar chart
  - Time × category patterns → Heatmap
  - Flow between categories → Sankey diagram
```

### 3. Creative Layouts (Not Just Card Grids)
```
WRONG: Always "4 KPIs, 2 charts, 1 table"
RIGHT: Consider the story:
  - Hero layout: Large focal visualization
  - Magazine layout: Narrative flow
  - Hub & spoke: Central KPI with breakdowns
  - Bento box: Mixed-size visual variety
```

### 4. Actionable Dashboards (Not Dead Ends)
```
WRONG: Static display only
RIGHT: Every widget answers "What can I do next?"
  - Primary CTA: "View Details →"
  - Drill-down paths: Click region → see breakdown
  - Quick actions: "Export", "Share", "Investigate"
```

### 5. Complete Widget Specifications
```
WRONG: "Put a line chart here"
RIGHT: Chart + Title + Insight + Legend + Context + CTA + States
```

---

## Decision Classification

Before proceeding with ANY aspect, classify decisions:

### Must Ask (User Preference Required)
- Visual theme (dark/light/brand colors)
- Design aesthetic (minimal, data-dense, modern, corporate)
- Color palette preferences
- Typography preferences
- Layout density preference
- Metric prioritization

### Should Ask (Offer Options)
- Dashboard type classification (confirm recommendation)
- Layout structure options
- Chart type alternatives
- Mobile/responsive strategy

### Can Decide (Best Practice Applies)
- Accessibility compliance (always WCAG 2.1 AA)
- Data-ink ratio principles
- Contrast ratios
- Grid alignment

---

## Collaboration Workflow

### Checkpoint 1: Initial Analysis

When user makes request, I:
1. Acknowledge the request
2. Identify what's clear vs. unclear
3. List decisions needing user input
4. Ask targeted questions

**Reference**: [requirements.md](requirements.md) for question sequences and conversation patterns.

```
"I'd be happy to help! Based on your request, I understand:
✓ [What's clear]
? I need to clarify:

1. **Visual Direction**: Clean/minimal, data-dense, modern, or corporate?
2. **Theme**: Light mode, dark mode, or both?
3. **Top Priorities**: Which 1-2 metrics are most critical?"
```

### Checkpoint 2: Requirements Confirmation

Before moving to strategy:

**Reference**: [requirements.md](requirements.md) for complete checklist.

```
"Here's what I've gathered:
[Requirements summary]

**Functional**: Purpose, users, metrics, comparisons
**Visual**: Theme, aesthetic, brand, density

Does this accurately capture your needs?"
```

### Checkpoint 3: Strategy Proposal

Before moving to design:

**Reference**: [strategy.md](strategy.md) for type classification and prioritization.

```
"Based on your requirements, here's my recommended approach:

**Dashboard Type**: [Type] — because [reasoning]
**Metric Priority**:
1. [Critical] — Top-left, largest display
2. [Important] — Top-right
3. [Supporting] — Lower sections

Does this align with your vision?"
```

### Checkpoint 4: Design Options

Present visual options before finalizing:

**References**:
- [information-architecture.md](information-architecture.md) — Layout patterns
- [visualization.md](visualization.md) — Chart selection
- [visual-design.md](visual-design.md) — Aesthetics
- [components.md](components.md) — Widget specifications

```
"For the visual design, I have options:

**Layout Pattern Options:**
A) Hero Layout — Large focal visualization
B) Bento Box — Mixed-size cards
C) Magazine — Narrative flow
D) Hub & Spoke — Central KPI with breakdowns

**Chart Style Options:**
A) Insightful (charts with headlines and context)
B) Minimal (clean, essential data only)
C) Detailed (annotations, reference lines)

Which combination appeals to you?"
```

### Checkpoint 5: Conceptual Design Validation

Before implementation, validate the design against checklists:

**References**:
- [validation.md](validation.md) — Conceptual validation checklist
- [visualization.md](visualization.md) — Data-appropriate visualization check
- [components.md](components.md) — Widget checklist and density guidelines

```
"Before I implement, let me validate the design:

**Widget Checklist (Theoretical Pass):**
✓ Each widget has: title, insight, visual, context, CTA, states
✓ Data-appropriate visualization check completed
✓ Layout density reviewed against anti-patterns
✓ All required elements accounted for

**Design Validation:**
- Chart types match data characteristics
- Widgets won't be cramped at target sizes
- Visual hierarchy is clear

Does this design direction look correct before I proceed with implementation?"
```

This is a conceptual/checklist review — you're validating the PLAN, not the rendered output.

### Checkpoint 6: Visual Testing & Delivery

After implementation is complete, view the dashboard in browser:

**Reference**: [validation.md](validation.md) for visual testing checklist.

```
"Now that implementation is complete, I'll review the rendered output:

**Visual Testing:**
✓ Viewed at intended viewport size
✓ Overall visual balance and breathing room verified
✓ Each widget checked against density guidelines
✓ Visualizations differentiate actual data values
✓ User flow walked through end-to-end
✓ Edge states tested with real-world scenarios

**What I implemented:**
- [Key decision 1]: [What was chosen]
- [Key decision 2]: [What was chosen]

**Final Verification:**
✓ Requirements met
✓ Visual preferences honored
✓ Accessibility compliant
✓ Edge states working

What would you like to adjust?"
```

Review the complete dashboard first, then check each widget within it.

---

## Anti-Patterns to Avoid

### Layout Anti-Patterns
- Always defaulting to "4 KPIs + 2 charts + table"
- Every widget same size in a grid
- Metrics crammed into top row without breathing room

### Chart Anti-Patterns
- Using bar charts for everything
- Chart with only a title, no insight text
- Plain chart without comparison context

### Actionability Anti-Patterns
- Dashboard as dead-end display
- "View Details" as only generic action
- No drill-down paths

### Widget Anti-Patterns
- Missing legends on multi-series charts
- No loading/empty/error states
- Incomplete specifications

### Process Anti-Patterns
- Applying visual defaults without mentioning them
- Skipping straight to execution on subjective choices
- Assuming user wants "best practices" over their preferences
- Proceeding without confirming understanding

---

## Quick Reference: When to Use Each File

| User Says... | Consult |
|--------------|---------|
| "Create a dashboard" | [requirements.md](requirements.md) → full workflow |
| "What type of dashboard?" | [strategy.md](strategy.md) |
| "What layout should I use?" | [information-architecture.md](information-architecture.md) |
| "What chart for this data?" | [visualization.md](visualization.md) |
| "What colors/fonts?" | [visual-design.md](visual-design.md) |
| "Design this widget" | [components.md](components.md) |
| "What about empty states?" | [edge-states.md](edge-states.md) |
| "Review before delivery" | [validation.md](validation.md) |

---

## Output Templates

### Requirements Document
See [requirements.md](requirements.md) for complete template.

### Strategic Brief
See [strategy.md](strategy.md) for complete template.

### Widget Specification
See [components.md](components.md) for complete template.

### Validation Report
See [validation.md](validation.md) for complete template.

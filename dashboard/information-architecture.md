# Information Architecture Reference

> **When to use this file**: At Checkpoint 4 when planning dashboard layout structure, choosing between layout patterns (hero, magazine, bento, hub & spoke, etc.), establishing visual hierarchy, or breaking away from the default "4 KPIs + 2 charts + table" layout.

---

## Philosophy: Layouts That Engage

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ DEFAULT THINKING:                                       │
│     "4 KPIs on top, 2 charts below, table at bottom"       │
│                                                             │
│  ✓  MODERN THINKING:                                        │
│     "What's the story? What's the focal point?             │
│      How does the eye travel through the data?"            │
└─────────────────────────────────────────────────────────────┘
```

## Layout Pattern Library

### 1. Hero Focal Layout
**Use for**: Dashboards with one dominant metric or visualization

A large central visual commands attention, with supporting metrics arranged around it.

```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ KPI 1   │  │ KPI 2   │  │ KPI 3   │  │ KPI 4   │        │
│  │ $1.2M   │  │ 4.8%    │  │ 2,847   │  │ 94%     │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │                                                     │   │
│  │              HERO VISUALIZATION                     │   │
│  │           (Large, commanding attention)             │   │
│  │                                                     │   │
│  │                                                     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  💡 Key insight text spanning full width                   │
│                                      [Explore Details →]   │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Executive dashboards, single-focus monitoring, storytelling

### 2. Magazine / Editorial Layout
**Use for**: Data stories with narrative flow

Asymmetric layout that guides the eye through a sequence.

```
┌─────────────────────────────────────────────────────────────┐
│  THE STORY                                                  │
│  ═══════════════════════════════════════════════════════    │
│                                                             │
│  ┌───────────────────────────────┐  ┌───────────────────┐  │
│  │                               │  │ Q4 Performance    │  │
│  │   LARGE FEATURE CHART         │  │                   │  │
│  │                               │  │ Revenue  $4.2M    │  │
│  │   Revenue trend with          │  │          ↑ 23%    │  │
│  │   annotated story points      │  │                   │  │
│  │                               │  │ Users    1.2M     │  │
│  │                               │  │          ↑ 15%    │  │
│  └───────────────────────────────┘  │                   │  │
│                                     │ Margin   34%      │  │
│  💡 "Revenue surged after the      │          ↑ 2pp    │  │
│     October product launch..."      └───────────────────┘  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐  │
│  │  By Region      │  │  By Product     │  │  Outlook   │  │
│  │  [breakdown]    │  │  [breakdown]    │  │  [forecast]│  │
│  └─────────────────┘  └─────────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Weekly reports, board presentations, investor updates

### 3. Hub and Spoke Layout
**Use for**: Central metric with related dimensions

One central element with radiating related information.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│             ┌─────────────────┐                             │
│             │   By Channel    │                             │
│             │   [breakdown]   │                             │
│             └────────┬────────┘                             │
│                      │                                      │
│  ┌──────────┐   ┌────┴────┐   ┌──────────┐                 │
│  │By Region │───│  CORE   │───│By Product│                 │
│  │[breakdown│   │  KPI    │   │[breakdown│                 │
│  └──────────┘   │ $4.2M   │   └──────────┘                 │
│                 │ Revenue │                                 │
│                 └────┬────┘                                 │
│                      │                                      │
│             ┌────────┴────────┐                             │
│             │   By Segment    │                             │
│             │   [breakdown]   │                             │
│             └─────────────────┘                             │
│                                                             │
│  Click any dimension to drill down                          │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Exploratory dashboards, dimensional analysis, interactive reporting

### 4. Bento Box Layout
**Use for**: Dense information with visual variety

Mixed-size containers creating visual interest while maximizing information.

```
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────┐  ┌─────────┐  ┌─────────┐       │
│  │                       │  │         │  │  KPI 3  │       │
│  │   LARGE CHART         │  │  KPI 1  │  │  2,847  │       │
│  │   (2x2 cells)         │  │  $1.2M  │  └─────────┘       │
│  │                       │  │         │  ┌─────────┐       │
│  │                       │  └─────────┘  │  KPI 4  │       │
│  │                       │  ┌─────────┐  │  94%    │       │
│  └───────────────────────┘  │  KPI 2  │  └─────────┘       │
│  ┌───────────┐  ┌───────────┤  4.8%   │  ┌─────────────┐   │
│  │  MINI     │  │  MINI     │         │  │             │   │
│  │  CHART 1  │  │  CHART 2  └─────────┘  │  MEDIUM     │   │
│  │           │  │           │            │  CHART      │   │
│  └───────────┘  └───────────┘            │             │   │
│                                          └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Operations dashboards, monitoring, data-rich displays

### 5. Comparison / Split Layout
**Use for**: Before/after, this vs that, A/B analysis

Side-by-side structure for direct comparison.

```
┌─────────────────────────────────────────────────────────────┐
│            THIS PERIOD          │       LAST PERIOD         │
│  ════════════════════════════   │  ════════════════════════ │
│                                 │                           │
│  ┌─────────────────────────┐   │   ┌─────────────────────┐ │
│  │  Revenue: $4.2M         │   │   │  Revenue: $3.4M     │ │
│  │  ████████████████       │   │   │  █████████████      │ │
│  │  ↑ 23.5%                │   │   │                     │ │
│  └─────────────────────────┘   │   └─────────────────────┘ │
│                                 │                           │
│  ┌─────────────────────────┐   │   ┌─────────────────────┐ │
│  │  [Trend Chart]          │   │   │  [Trend Chart]      │ │
│  │                         │   │   │                     │ │
│  └─────────────────────────┘   │   └─────────────────────┘ │
│                                 │                           │
│  💡 Key driver: APAC growth    │   Reference period        │
│                                 │                           │
│           [View Full Comparison Analysis →]                 │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Period comparisons, A/B test results, competitive analysis

### 6. Funnel / Flow Layout
**Use for**: Process visualization, conversion tracking

Vertical or horizontal flow showing stages.

```
┌─────────────────────────────────────────────────────────────┐
│  Customer Journey                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AWARENESS                              │   │
│  │  Visitors: 100,000        Ad Spend: $50K            │   │
│  └─────────────────────────────────────────────────────┘   │
│                        │ 52% convert                        │
│                        ▼                                    │
│       ┌────────────────────────────────────────┐           │
│       │           CONSIDERATION                │           │
│       │  Signups: 52,000     Cost/Signup: $0.96│           │
│       └────────────────────────────────────────┘           │
│                        │ 35% convert                        │
│                        ▼                                    │
│            ┌───────────────────────────┐                   │
│            │       PURCHASE            │                   │
│            │  Orders: 18,200  AOV: $85 │                   │
│            └───────────────────────────┘                   │
│                        │ 42% return                         │
│                        ▼                                    │
│                 ┌────────────────┐                         │
│                 │   LOYALTY      │                         │
│                 │  Repeat: 7,644 │                         │
│                 └────────────────┘                         │
│                                                             │
│  💡 Biggest opportunity: Consideration → Purchase (35%)    │
│                                  [Optimize Funnel →]       │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Sales funnels, user journeys, process efficiency

### 7. Timeline / Narrative Layout
**Use for**: Chronological data stories

Horizontal timeline with events and metrics.

```
┌─────────────────────────────────────────────────────────────┐
│  2024 Performance Story                                     │
│                                                             │
│  ══════════════════════════════════════════════════════════ │
│     Q1          Q2          Q3          Q4                  │
│      │           │           │           │                  │
│      │           │           │           │                  │
│  ────●───────────●───────────●───────────●────────────────  │
│      │           │           │           │                  │
│   Product    New Market   Redesign    Record               │
│   Launch     Entry        Launch      Quarter              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │                REVENUE TREND                        │   │
│  │           (with event annotations)                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [← Q3 Details]                         [Q4 Details →]     │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Annual reviews, project timelines, historical analysis

### 8. Contextual Sidebar Layout
**Use for**: Main content with persistent context

Primary area with supporting information always visible.

```
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────┬────────────────┐ │
│  │                                       │  CONTEXT       │ │
│  │                                       │                │ │
│  │                                       │  Period: Q4    │ │
│  │                                       │  Region: All   │ │
│  │        MAIN CONTENT AREA              │  Segment: B2B  │ │
│  │                                       │                │ │
│  │        (Charts, tables, etc.)         │  ──────────    │ │
│  │                                       │                │ │
│  │                                       │  Key Metrics:  │ │
│  │                                       │  • Rev: $4.2M  │ │
│  │                                       │  • Users: 1.2M │ │
│  │                                       │  • NPS: 72     │ │
│  │                                       │                │ │
│  │                                       │  ──────────    │ │
│  │                                       │                │ │
│  │                                       │  Quick Actions │ │
│  │                                       │  [Export]      │ │
│  │                                       │  [Share]       │ │
│  │                                       │  [Schedule]    │ │
│  └───────────────────────────────────────┴────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Analysis tools, exploration interfaces, filtered views

### 9. Quadrant Layout
**Use for**: Balanced four-perspective view

Four equal sections for comprehensive coverage.

```
┌─────────────────────────────────────────────────────────────┐
│  Business Overview                                          │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │                          │                          │   │
│  │    📈 REVENUE            │    👥 CUSTOMERS          │   │
│  │                          │                          │   │
│  │    $4.2M  ↑ 23%          │    12,450  ↑ 15%         │   │
│  │    [trend chart]         │    [trend chart]         │   │
│  │                          │                          │   │
│  │    [Revenue Details →]   │    [Customer Details →]  │   │
│  ├──────────────────────────┼──────────────────────────┤   │
│  │                          │                          │   │
│  │    📦 OPERATIONS         │    💰 PROFITABILITY      │   │
│  │                          │                          │   │
│  │    2,847 orders  ↑ 8%    │    34% margin  ↑ 2pp     │   │
│  │    [trend chart]         │    [trend chart]         │   │
│  │                          │                          │   │
│  │    [Operations →]        │    [Financials →]        │   │
│  └──────────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Best for**: Balanced scorecards, multi-department views, startup metrics

## Layout Selection Guide

| Dashboard Purpose | Recommended Layouts |
|-------------------|---------------------|
| Executive summary | Hero Focal, Magazine |
| Operations monitoring | Bento Box, Quadrant |
| Sales/conversion | Funnel Flow, Comparison |
| Exploration/analysis | Hub & Spoke, Contextual Sidebar |
| Reporting/presentation | Magazine, Timeline |
| Single-focus monitoring | Hero Focal |
| Multi-dimensional | Hub & Spoke, Quadrant |

## Visual Hierarchy Principles

### The Gutenberg Principle (Still Applies)
```
┌─────────────────────────────────────┐
│  1. PRIMARY          2. STRONG      │  ← Eyes start here
│     (Critical KPI)      (Important) │
│                                     │
├─────────────────────────────────────┤
│  3. WEAK             4. TERMINAL    │  ← Eyes end here
│     (Supporting)        (Actions)   │
└─────────────────────────────────────┘
```

But modern layouts can guide the eye with:
- **Size contrast** — Larger elements attract first
- **Color accent** — Pop of color draws attention
- **Isolation** — Whitespace around important elements
- **Visual flow** — Lines, arrows, connected elements

### Cognitive Load Management

**The 7±2 Rule**: Maximum information chunks visible at once.

**Chunking strategies**:
```
✓ Group related KPIs into one "Financial Health" section
✓ Collapse detail into expandable sections
✓ Use progressive disclosure (summary → detail on click)
✓ Visual containers create natural groups
```

## Grid System Flexibility

### Standard 12-Column (For Card Layouts)
```
│ 1│ 2│ 3│ 4│ 5│ 6│ 7│ 8│ 9│10│11│12│
├──┴──┴──┼──┴──┴──┼──┴──┴──┼──┴──┴──┤
│  3 col │  3 col │  3 col │  3 col │  ← 4 equal columns
├────────┴────────┼────────┴────────┤
│     6 col       │     6 col       │  ← 2 halves
├─────────────────┴─────────────────┤
│           12 col (full)           │  ← Full width
```

### Breaking the Grid (For Creative Layouts)
```
Hero Layout:
│ 2│ 2│ 2│ 2│ 2│ 2│     ← 6 mini KPIs
├──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┤
│            12 col HERO            │     ← Full-width focal
└───────────────────────────────────┘

Magazine Layout:
├────────────────┬─────────┤
│    8 col       │  4 col  │     ← Asymmetric split
│   Feature      │  Stats  │
├────────────────┴─────────┤
│          12 col          │
└──────────────────────────┘
```

## Layout Specification Template

```markdown
## Layout: [Name]

### Pattern
- Type: [Hero / Magazine / Bento / etc.]
- Rationale: [Why this pattern fits the use case]

### Visual Hierarchy
1. Primary focus: [What draws attention first]
2. Secondary elements: [What comes next]
3. Supporting content: [Background information]
4. Actions: [Where CTAs live]

### Grid Structure
- Columns: [12-column breakdown]
- Breakpoints: [Desktop / Tablet / Mobile adaptations]

### Section Breakdown
| Section | Content | Span | Purpose |
|---------|---------|------|---------|
| [Name] | [What's in it] | [Cols] | [Why] |

### Navigation & Flow
- Eye flow: [Describe how eye travels]
- Drill-down paths: [Where can users go deeper]
- Exit points: [CTAs and their destinations]
```

## Architecture Checklist

### Layout Choice
- [ ] Selected layout pattern matches dashboard purpose
- [ ] Considered creative options (not default card grid)
- [ ] Focal point identified if applicable
- [ ] Visual flow guides the narrative

### Information Priority
- [ ] Most critical info in highest-attention position
- [ ] Related items visually grouped
- [ ] Clear visual hierarchy (size, color, position)
- [ ] Cognitive load managed (7±2 chunks)

### Actionability
- [ ] Every section has a drill-down path
- [ ] CTAs positioned at natural decision points
- [ ] Progressive disclosure for detail

### Responsiveness
- [ ] Desktop layout defined
- [ ] Tablet adaptation planned
- [ ] Mobile prioritization decided

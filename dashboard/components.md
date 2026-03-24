# Components Reference

> **When to use this file**: At Checkpoint 4 when building individual dashboard widgets. Ensures each widget includes all required elements: insight text, legend, context, CTA, tooltips, and states. Prevents dead-end displays.

---

## Core Philosophy: Complete Widgets

Every widget is more than a chart. It's a complete unit of information and action.

```
┌─────────────────────────────────────────────────────────────┐
│  COMPLETE WIDGET =                                          │
│                                                             │
│    Chart/Visual                                             │
│  + Insight Text (what does this mean?)                      │
│  + Legend (how to read it)                                  │
│  + Context (vs. target, vs. last period)                    │
│  + CTA (what can I do next?)                                │
│  + Interactivity (hover, click, filter)                     │
│  + States (loading, empty, error)                           │
└─────────────────────────────────────────────────────────────┘
```

## Widget Anatomy Template

Every widget should be specified using this structure:

```
┌─────────────────────────────────────────────────────────────┐
│ [Icon] Title                              [Filter▼] [⋮] [⤢] │ ← HEADER
├─────────────────────────────────────────────────────────────┤
│ 💡 Insight: "APAC drove 60% of growth, up 34% YoY"         │ ← INSIGHT
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                    VISUALIZATION                            │ ← VISUAL
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ● Series A  ● Series B  ● Series C    vs. Last Quarter     │ ← LEGEND/CONTEXT
├─────────────────────────────────────────────────────────────┤
│                                    [View Full Analysis →]   │ ← CTA
└─────────────────────────────────────────────────────────────┘
```

## Complete Widget Specification

### Required Elements Checklist

| Element | Purpose | Required? |
|---------|---------|-----------|
| Title | What is this showing | ✓ Always |
| Insight text | What does it mean | ✓ When insight exists |
| Visualization | The data display | ✓ Always |
| Legend | How to read it | ✓ When multiple series |
| Context line | Comparison info | ✓ When comparison exists |
| Primary CTA | Next action | ✓ Always (drill-down) |
| Secondary actions | Export, expand, etc. | When applicable |
| Tooltip | Hover details | ✓ Always |
| Loading state | While fetching | ✓ Always |
| Empty state | No data | ✓ Always |
| Error state | Failed to load | ✓ Always |

## KPI Cards: Complete Specification

### Full KPI Card Anatomy
```
┌─────────────────────────────────────────┐
│ ◉ Monthly Revenue                    ⋮  │ ← Icon + Label + Actions menu
├─────────────────────────────────────────┤
│                                         │
│           $1.24M                        │ ← Primary Value (32-40px bold)
│                                         │
│     ↑ 15.3% vs last month               │ ← Trend (semantic color + context)
│                                         │
│ ▁▂▃▄▅▆▇█▇▆  Last 12 weeks               │ ← Sparkline + timeframe
│                                         │
│ Target: $1.5M                           │ ← Goal context
│ ████████████████░░░░  82.7%             │ ← Progress bar
│                                         │
├─────────────────────────────────────────┤
│ 💡 On track to exceed Q4 target         │ ← Insight line
├─────────────────────────────────────────┤
│                      [View Details →]   │ ← CTA
└─────────────────────────────────────────┘
```

### KPI Card Variants

**Minimal KPI** (for dense displays):
```
┌────────────────────────┐
│ Revenue      $1.24M    │
│              ↑ 15.3%   │
└────────────────────────┘
```

**KPI with Comparison**:
```
┌────────────────────────────────────────┐
│ Conversion Rate                        │
│                                        │
│   This Month        Last Month         │
│     4.8%              4.2%             │
│   ████████          ███████            │
│                                        │
│ 💡 +0.6pp improvement from checkout    │
│    redesign                            │
│                        [Analyze →]     │
└────────────────────────────────────────┘
```

**KPI with Breakdown**:
```
┌────────────────────────────────────────┐
│ Total Users                    1.2M    │
│                                        │
│   Desktop    720K  ████████████  60%   │
│   Mobile     420K  ███████       35%   │
│   Tablet      60K  █              5%   │
│                                        │
│ 💡 Mobile growing fastest (+23% MoM)   │
│                    [View by Device →]  │
└────────────────────────────────────────┘
```

**KPI with Alert State**:
```
┌────────────────────────────────────────┐
│ ⚠️ Error Rate                 ALERT    │  ← Alert badge
├────────────────────────────────────────┤
│                                        │
│           2.4%                         │  ← Value in error color
│     ↑ 0.8% in last hour                │
│                                        │
│ Threshold: 1.5%  █████████████████░░   │
│                                        │
│ 💡 Spike correlates with deploy at     │
│    14:32 UTC                           │
│                                        │
│ [View Logs →]  [Acknowledge]           │  ← Action CTAs
└────────────────────────────────────────┘
```

## Chart Widgets: Complete Specification

### Line/Area Chart Widget
```
┌─────────────────────────────────────────────────────────────┐
│ Revenue Trend                                    [⤢] [⋮]   │
│ [Daily ▼] [Last 30 Days ▼]                                  │ ← Filters
├─────────────────────────────────────────────────────────────┤
│ 💡 Revenue peaked on Black Friday ($2.4M), 3x normal       │ ← Insight
├─────────────────────────────────────────────────────────────┤
│     $2.5M ┤                         ╱╲                      │
│           │                        ╱  ╲                     │
│     $2.0M ┤                       ╱    ╲                    │
│           │              ╱╲      ╱      ╲     Annotation:   │
│     $1.5M ┤    ╱╲       ╱  ╲    ╱        ╲   "Black Friday" │
│           │   ╱  ╲     ╱    ╲  ╱          ╲                 │
│     $1.0M ┤  ╱    ╲   ╱      ╲╱            ╲────            │
│           │ ╱      ╲ ╱                                      │
│     $0.5M ┤╱        ╲                                       │
│           └──────────────────────────────────────────────   │
│            Nov 1    Nov 8    Nov 15   Nov 22   Nov 29       │
├─────────────────────────────────────────────────────────────┤
│ ● Revenue ── Avg ($1.2M)  vs Last Year (gray)               │ ← Legend
├─────────────────────────────────────────────────────────────┤
│ Total: $38.4M  |  Avg: $1.28M  |  Peak: $2.4M               │ ← Summary stats
│                                    [View Daily Breakdown →] │ ← CTA
└─────────────────────────────────────────────────────────────┘
```

### Funnel Chart Widget
```
┌─────────────────────────────────────────────────────────────┐
│ Signup Funnel                             [This Week ▼] [⋮] │
├─────────────────────────────────────────────────────────────┤
│ 💡 Biggest drop-off at Email Verification (42% abandon)    │
│    Consider: reduce friction, add skip option               │ ← Actionable insight
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Visited       ████████████████████████████  10,000  100%   │
│                           │                                 │
│                          52%                    ← Drop-off  │
│                           ▼                       labels    │
│  Signed Up     ██████████████████             5,200   52%   │
│                           │                                 │
│                          42%                                │
│                           ▼                                 │
│  Verified      ██████████████                 3,016   30%   │
│                           │                                 │
│                          28%                                │
│                           ▼                                 │
│  Activated     ██████████                     2,171   22%   │
│                           │                                 │
│                          35%                                │
│                           ▼                                 │
│  Purchased     ███████                        1,411   14%   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Industry avg: 12%  │  Last month: 11%  │  Target: 18%       │ ← Context
│                                                             │
│ [View by Source →]  [View by Cohort →]  [Export →]          │ ← Multiple CTAs
└─────────────────────────────────────────────────────────────┘
```

### Heatmap Widget
```
┌─────────────────────────────────────────────────────────────┐
│ User Activity by Day & Hour                          [⤢]   │
├─────────────────────────────────────────────────────────────┤
│ 💡 Peak activity: Tue-Thu 10am-12pm (3x average)           │
│    Dead zone: Weekends before 10am                          │
├─────────────────────────────────────────────────────────────┤
│         Mon   Tue   Wed   Thu   Fri   Sat   Sun             │
│   6am   ░░    ░░    ░░    ░░    ░░    ░░    ░░              │
│   8am   ▒▒    ▓▓    ▓▓    ▓▓    ▒▒    ░░    ░░              │
│  10am   ▓▓    ██    ██    ██    ▓▓    ▒▒    ░░              │
│  12pm   ▓▓    ██    ██    ██    ▓▓    ▒▒    ▒▒              │
│   2pm   ▒▒    ▓▓    ▓▓    ▓▓    ▒▒    ▒▒    ▒▒              │
│   4pm   ▒▒    ▒▒    ▒▒    ▒▒    ░░    ▓▓    ▓▓              │
│   6pm   ░░    ░░    ░░    ░░    ░░    ██    ██              │
│   8pm   ░░    ░░    ░░    ░░    ░░    ▓▓    ▓▓              │
│                                                             │
│    ░ Low (<100)  ▒ Medium (100-500)  ▓ High (500-1K)  █ Peak│ ← Legend
├─────────────────────────────────────────────────────────────┤
│ Click any cell to see detailed activity log                 │
│                                   [Optimize Schedule →]     │ ← Action CTA
└─────────────────────────────────────────────────────────────┘
```

## Data Tables: Complete Specification

### Interactive Data Table
```
┌─────────────────────────────────────────────────────────────────────┐
│ Customer Orders                                              [⤢]   │
│ 🔍 Search...   [Status ▼] [Date Range ▼] [+ Filter]   [Export ↓]   │
├─────────────────────────────────────────────────────────────────────┤
│ 💡 23 orders pending review (oldest: 3 days) — action needed       │
├───────────────┬──────────┬───────────┬────────────┬────────────────┤
│ Customer ▲    │ Status   │ Amount    │ Date       │ Actions        │
├───────────────┼──────────┼───────────┼────────────┼────────────────┤
│ Acme Corp     │ ● Paid   │   $12,450 │ 2 hrs ago  │ [View] [⋮]     │
│ TechStart Inc │ ◐ Pending│    $8,200 │ 1 day ago  │ [Review] [⋮]   │ ← Contextual CTA
│ GlobalCo      │ ● Paid   │   $24,100 │ 2 days ago │ [View] [⋮]     │
│ StartupXYZ    │ ○ Draft  │    $3,400 │ 3 days ago │ [Edit] [⋮]     │ ← Different CTA by state
├───────────────┴──────────┴───────────┴────────────┴────────────────┤
│ Showing 1-10 of 156  │  Total Value: $1.24M                        │
│                                            ◀ 1 2 3 ... 16 ▶        │
├─────────────────────────────────────────────────────────────────────┤
│ [+ New Order]                              [View All Orders →]      │ ← CTAs
└─────────────────────────────────────────────────────────────────────┘
```

## Insight Text Patterns

### Headline Insights (What's the story?)
```
"Revenue up 23% — strongest quarter since Q2 2022"
"Conversion dropped 15% after checkout redesign"
"APAC now largest region, overtaking Americas for first time"
"3 of 5 targets exceeded this month"
```

### Callout Insights (What's notable?)
```
"⚠️ Unusual spike on March 15 — requires investigation"
"📈 Tuesday is consistently highest-performing day"
"🎯 On track to exceed annual target by 12%"
"⏰ Response time improved 40% after optimization"
```

### Actionable Insights (What should I do?)
```
"💡 Consider: Schedule campaigns for Tue-Thu peak hours"
"💡 Action needed: 23 orders pending review"
"💡 Opportunity: APAC showing 3x growth — increase investment?"
"💡 Risk: Churn rate trending up — review retention offers"
```

### Comparative Insights (How does it compare?)
```
"23% above industry average (18%)"
"Outperforming target by $200K (113% achievement)"
"Down 5% vs. same period last year"
"Rank improved from #4 to #2 among competitors"
```

## CTA Patterns

### Every Widget Needs a Path Forward

| Widget Type | Primary CTA | Secondary CTAs |
|-------------|-------------|----------------|
| KPI Card | View Details → | Compare, History |
| Line Chart | View Full Analysis → | Export, Expand |
| Funnel | View by Segment → | Export, Optimize |
| Table | View All → | Export, Add New |
| Heatmap | Drill into Cell | Export, Schedule |
| Radar | Full Comparison → | Export |

### CTA Placement
```
Standard: Bottom-right of widget
Contextual: Inline with relevant data (e.g., "Review" button on pending row)
Urgent: Top of widget with alert styling
```

### CTA Wording
```
❌ "Click here"
❌ "More"
✓  "View Full Analysis →"
✓  "See 23 Pending Orders →"
✓  "Investigate Anomaly →"
✓  "Export to Excel"
```

## Colors: Semantic System

### Standard Semantic Colors
```css
/* Status Colors */
--color-success: #10B981;     /* Green - positive, complete, on-track */
--color-warning: #F59E0B;     /* Amber - attention, pending, caution */
--color-error: #EF4444;       /* Red - negative, failed, critical */
--color-info: #3B82F6;        /* Blue - informational, neutral action */

/* Trend Colors */
--color-trend-up: #10B981;    /* Green - improvement */
--color-trend-down: #EF4444;  /* Red - decline */
--color-trend-flat: #6B7280;  /* Gray - stable */

/* Data Colors (for series) */
--color-data-1: #3B82F6;      /* Primary series */
--color-data-2: #8B5CF6;      /* Secondary series */
--color-data-3: #EC4899;      /* Tertiary series */
--color-data-4: #F59E0B;      /* Quaternary series */
--color-data-5: #10B981;      /* Quinary series */
```

### Color Usage Rules
- **Never use color alone** — always pair with icons, patterns, or text
- **Limit palette** — max 5-6 data colors
- **Semantic consistency** — green always means good, red always means attention
- **Sufficient contrast** — 4.5:1 for text, 3:1 for graphics

## Widget Specification Template

Use this template when designing any widget:

```markdown
## Widget: [Name]

### Purpose
- Question it answers: [e.g., "How is revenue trending?"]
- Key decision it supports: [e.g., "Forecast adjustments"]

### Header
- Title: [Widget title]
- Icon: [Optional icon]
- Filters: [Inline filter options]
- Actions menu: [Export, Expand, etc.]

### Insight Section
- Headline insight: [Dynamic text, e.g., "Revenue peaked Friday..."]
- Insight type: [Story / Callout / Actionable / Comparative]
- When to show: [Always / When anomaly / When threshold crossed]

### Visualization
- Chart type: [Line, Funnel, Heatmap, etc.]
- Data fields: [What data powers it]
- Axes: [X and Y axis definitions]
- Annotations: [Key events to mark]

### Legend & Context
- Legend items: [Series definitions]
- Comparison context: [vs. target, vs. last period]
- Summary stats: [Total, Avg, Peak, etc.]

### Interactivity
- Hover tooltip: [What shows on hover]
- Click action: [Drill-down destination]
- Filter behavior: [How filters affect this widget]

### CTA Section
- Primary CTA: [Text and destination]
- Secondary CTAs: [Additional actions]

### States
- Loading: [Skeleton/spinner description]
- Empty: [Message and suggested action]
- Error: [Message and recovery action]

### Colors
- Primary color: [Hex]
- Series colors: [Hex array]
- Semantic colors: [Success/Warning/Error usage]
```

## Complete Widget Checklist

Before considering any widget done:

### Content
- [ ] Title clearly describes the data
- [ ] Insight text explains the meaning
- [ ] Legend present for multi-series data
- [ ] Context line shows comparison (vs. target/period)
- [ ] Summary stats provided where useful

### Actions
- [ ] Primary CTA defined (drill-down path)
- [ ] Secondary actions available (export, expand)
- [ ] Contextual actions for data rows (view, edit, etc.)
- [ ] Tooltips provide additional detail on hover

### Visual
- [ ] Colors follow semantic system
- [ ] Sufficient contrast for accessibility
- [ ] Consistent with other widgets in dashboard
- [ ] Annotations highlight key points

### States
- [ ] Loading skeleton defined
- [ ] Empty state with helpful message
- [ ] Error state with recovery option

## Widget Density Anti-Patterns

### Cramping Indicators

Avoid these density problems:

| Anti-Pattern | Example | Fix |
|-------------|---------|-----|
| Multi-element cramping | Insight + funnel + CTA in KPI-sized card | Expand card or split elements |
| Information overload | >4 distinct pieces of info in one KPI card | Prioritize; move details to drill-down |
| Missing whitespace | Widget sections touching without padding | Add consistent internal spacing |
| Competing for attention | Multiple bold/large elements in same widget | Single focal point per widget |

### Widget Complexity Limits

Each widget should have clear limits:

| Widget Size | Max Elements | Recommended |
|-------------|--------------|-------------|
| Small KPI card | 3 elements (value, label, trend) | 2-3 |
| Standard card | 5 elements (title, insight, visual, context, CTA) | 4-5 |
| Large card | 7 elements (add legend, filters) | 5-6 |
| Full-width panel | 10 elements | 7-8 |

### Breathing Room Checklist

- [ ] Each section of the widget has visible separation
- [ ] Text is not touching chart edges
- [ ] CTA has clear tap/click target with surrounding space
- [ ] Insight text has room to breathe (not crammed under title)
- [ ] Legend items are spaced for readability

### Density Self-Check

Before finalizing any widget, ask:
> "If I squint at this widget, can I identify 3 or fewer focal points?"

If no → the widget is too dense. Either:
1. Remove lower-priority elements
2. Increase card size
3. Move details to hover/drill-down

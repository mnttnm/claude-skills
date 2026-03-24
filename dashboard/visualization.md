# Visualization Reference

> **When to use this file**: At Checkpoint 4 when selecting chart types, creating insight text, or going beyond basic bar/line charts. This file covers advanced chart selection (funnel, radar, heatmap, sankey, waterfall) and data storytelling through textual insights.

---

## Philosophy: Charts + Insights

Every visualization should tell a story. Don't just show data—**explain it**.

```
┌─────────────────────────────────────────────────────────────┐
│  VISUALIZATION = CHART + INSIGHT TEXT + CONTEXT            │
│                                                             │
│  ❌ Chart alone: "Here's the data"                         │
│  ✓  Chart + insight: "Revenue up 23%, driven by APAC"      │
└─────────────────────────────────────────────────────────────┘
```

## Chart Selection: Extended Library

### Quick Reference by Data Question

| Question | Best Charts | When to Upgrade |
|----------|-------------|-----------------|
| How much? | KPI Card, Big Number | Add bullet chart for target context |
| How has it changed? | Line, Area | Slope chart for before/after |
| How do these compare? | Bar, Column | Radar for multi-attribute comparison |
| What's the composition? | Stacked Bar, Treemap | Sunburst for hierarchies |
| What's the flow? | **Funnel**, **Sankey** | Always for conversion/flow data |
| What's the pattern? | **Heatmap** | Time × category patterns |
| What's the relationship? | Scatter | Bubble for 3rd dimension |
| How is it distributed? | Histogram, Box Plot | Violin for shape comparison |
| Where is it? | Choropleth, Point Map | Cartogram for emphasis |
| What's the rank change? | **Bump Chart** | Rankings over time |
| What drives the total? | **Waterfall** | Component breakdown |

### Advanced Chart Types (Don't Avoid These)

#### Radar/Spider Chart
**Use for**: Multi-dimensional comparison across 5-8 attributes
```
Perfect for:
- Product comparison across features
- Employee performance across skills
- Competitor analysis across factors
- Health metrics across categories

        Speed
          ▲
         ╱│╲
   Cost ╱ │ ╲ Quality
       ╱  │  ╲
      ╱   │   ╲
     ◀────┼────▶
    Support  Features

"Product A excels in Quality and Features
but lags in Cost efficiency"
```

#### Heatmap
**Use for**: Patterns across two categorical dimensions
```
Perfect for:
- Activity by day × hour
- Performance by region × product
- Correlation matrices
- Cohort analysis

         Mon Tue Wed Thu Fri Sat Sun
  6am    ░░  ░░  ░░  ░░  ░░  ██  ██
  9am    ██  ██  ██  ██  ██  ░░  ░░
  12pm   ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓
  3pm    ██  ██  ██  ██  ░░  ░░  ░░
  6pm    ░░  ▓▓  ░░  ▓▓  ██  ██  ██

"Peak engagement: Weekday mornings, Weekend evenings"
```

#### Funnel Chart
**Use for**: Conversion flows, sequential drop-off
```
Perfect for:
- Sales pipeline stages
- User onboarding flow
- Checkout process
- Recruitment pipeline

  Visitors      ████████████████████  10,000
  Sign-ups      ██████████████        5,200 (52%)
  Activated     ████████              2,800 (28%)
  Purchased     █████                 1,400 (14%)
  Retained      ███                     700 (7%)

"Biggest drop-off: Activation stage (46% loss)
→ Investigate onboarding friction"
```

#### Sankey Diagram
**Use for**: Flow between categories, budget allocation
```
Perfect for:
- Traffic source → conversion paths
- Budget allocation flows
- Energy/resource flows
- User journey mapping

  [Organic]──────┐
                 ├──▶[Product Page]──┬──▶[Purchase]
  [Paid Ads]─────┤                   │
                 │                   └──▶[Abandon]
  [Social]───────┘

"Organic traffic converts 3x better than Paid"
```

#### Waterfall Chart
**Use for**: How components sum to a total
```
Perfect for:
- Revenue bridge (last quarter → this quarter)
- Profit breakdown (revenue - costs)
- Population change (births, deaths, migration)
- Budget variance analysis

  Start   +Sales  -Returns  +New    -Churn   End
   100      +40     -10      +25     -15     140
    █       ██      ▼        ██       ▼       █
    █       ██      █        ██       █       █
    █       ██      █        ██       █       █
   ═══     ═══     ═══      ═══     ═══     ═══

"Net growth of 40: Sales (+40) offset by Churn (-15)"
```

#### Bump Chart
**Use for**: Ranking changes over time
```
Perfect for:
- Market share rankings over time
- Leaderboard changes
- Feature adoption rankings
- Regional performance shifts

        Q1    Q2    Q3    Q4
   1    ●─────●─────●─────●  Product A
   2    ○─────○───┐       ●  Product B
   3    ◊─────◊───┼─○─────○  Product C
   4    □───┐     └─◊─────◊  Product D
   5       └□─────────□───□  Product E

"Product B rose from #4 to #2 after Q2 launch"
```

#### Bullet Chart
**Use for**: KPI with target and performance ranges
```
Perfect for:
- Sales vs. quota
- Performance vs. benchmark
- Progress toward goal with context

  Revenue  ████████████████░░░░│████  $1.2M
           Poor  |  OK  | Good |Target

"Revenue at $1.2M (80% of $1.5M target)
Performance: Good range"
```

#### Slope Chart
**Use for**: Before/after comparison
```
Perfect for:
- Year-over-year change
- Pre/post intervention
- Two-point comparisons

     2023    2024
      ●────────●  Product A: +15%
      ○────────○  Product B: +8%
      ◊────────◊  Product C: -3%

"All products grew except Product C"
```

## Textual Insights: Data Storytelling

### Every Chart Needs Context

**Components of a complete visualization:**
```
┌─────────────────────────────────────────────────────────────┐
│ Revenue by Region                              [⤢] [⋮]      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💡 APAC drove 60% of growth this quarter, up 34% YoY   │ │ ← INSIGHT
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│     APAC  ████████████████████████  $4.2M (+34%)           │
│     EMEA  ████████████████          $2.8M (+12%)           │ ← CHART
│     AMER  ██████████████            $2.4M (+8%)            │
│     LATAM ████████                  $1.4M (+22%)           │
│                                                             │
│ vs. Last Quarter │ Target: $12M (90% achieved)              │ ← CONTEXT
│ [View Details →]                                            │ ← CTA
└─────────────────────────────────────────────────────────────┘
```

### Insight Text Patterns

**Headline insight** (what's the story?):
```
"Revenue up 23% — strongest quarter since Q2 2022"
"Conversion dropped 15% after checkout redesign"
"APAC now largest region, overtaking Americas"
```

**Callout insight** (what's notable?):
```
"⚠️ Unusual spike on March 15 — investigate"
"📈 Best performing day: Tuesday"
"🎯 3 of 5 targets exceeded"
```

**Trend insight** (what direction?):
```
"Trending up for 5 consecutive weeks"
"Declining since product change in Sept"
"Stabilized after volatile Q1"
```

**Comparison insight** (how does it compare?):
```
"23% above industry average"
"Outperforming target by $200K"
"Down 5% vs. same period last year"
```

### Annotation Patterns

Add annotations directly on charts:
```
         Revenue Over Time
    │                    ┌──────────────┐
    │                    │ Product      │
    │               ╱╲   │ Launch       │
    │              ╱  ╲  └──────┬───────┘
    │             ╱    ╲        │
    │       ╱╲   ╱      ╲      ▼
    │      ╱  ╲ ╱        ╲────────────
    │     ╱    ╱
    └─────────────────────────────────
         J  F  M  A  M  J  J  A  S

     Key events annotated directly on chart
```

## Chart Selection by Data Characteristics

### Time-Based Data
| Characteristic | Best Chart |
|----------------|------------|
| Single metric over time | Line |
| Multiple metrics, compare trends | Multi-line or Small multiples |
| Part-to-whole over time | Stacked area |
| Discrete periods | Column |
| Before/after only | Slope chart |
| Ranking changes | Bump chart |
| Cyclical patterns (day/week) | Heatmap |

### Categorical Comparisons
| Characteristic | Best Chart |
|----------------|------------|
| Few categories (<7) | Bar/Column |
| Many categories (7+) | Horizontal bar, sorted |
| Multi-attribute comparison | Radar |
| Hierarchical categories | Treemap, Sunburst |
| Two categorical dimensions | Heatmap |

### Flow & Process Data
| Characteristic | Best Chart |
|----------------|------------|
| Sequential stages, drop-off | Funnel |
| Multiple paths/flows | Sankey |
| Component breakdown | Waterfall |
| Process steps | Timeline/Gantt |

### Distribution & Relationship
| Characteristic | Best Chart |
|----------------|------------|
| Two variables | Scatter |
| Three variables | Bubble |
| Distribution shape | Histogram, Violin |
| Compare distributions | Box plot |
| Correlation matrix | Heatmap |

## Perceptual Accuracy (When It Matters)

Cleveland-McGill hierarchy still applies for **precision tasks**:
1. Position on common scale (most accurate)
2. Length
3. Angle/Slope
4. Area
5. Color saturation (least accurate)

**But**: Sometimes engagement > precision. A radar chart comparing products is more memorable than a grouped bar chart, even if slightly less precise.

**Rule**: Use high-accuracy encodings for critical comparisons. Use engaging encodings for storytelling and patterns.

## Complete Visualization Specification

Every visualization needs these defined:

```markdown
## Visualization Spec: [Name]

### Chart Type & Purpose
- Type: [e.g., Funnel Chart]
- Question it answers: [e.g., "Where do users drop off?"]
- Data: [Fields and aggregations]

### Insight Text
- Headline: [Dynamic insight, e.g., "Biggest drop: Stage 2 (42% loss)"]
- Comparison: [Context, e.g., "vs. 35% industry average"]

### Visual Configuration
- Colors: [Palette with meaning]
- Axis: [Labels, format, range]
- Legend: [Position, format] or [Direct labels]
- Annotations: [Key callouts]

### Interactivity
- Hover: [Tooltip content]
- Click: [Drill-down destination]
- Filter: [What can be filtered]

### CTA/Actions
- Primary: [e.g., "View Full Funnel Analysis →"]
- Secondary: [e.g., "Export Data"]
```

## Anti-Patterns to Avoid

### Don't Default to Bar/Line for Everything
```
❌ "It's a comparison, so bar chart"
✓  "It's a multi-attribute comparison across 6 factors, so radar chart"

❌ "It's conversion data, so bar chart of each stage"
✓  "It's conversion data, so funnel chart showing the flow"

❌ "It's flow data, so stacked bar"
✓  "It's flow data showing paths, so Sankey diagram"
```

### Don't Omit Insights
```
❌ Chart with just title "Revenue by Region"
✓  Chart with insight "APAC drove 60% of growth, up 34% YoY"
```

### Don't Forget Actionability
```
❌ Chart as dead-end
✓  Chart with "View Details →" or drill-down path
```

## Data-Appropriate Visualization Check

Before committing to a visualization type, validate with actual data:

### The Core Question
> "Will users see meaningful visual differences with this data?"

A visualization adds value only when visual differences are perceptible. If your data values are too similar, the visualization may make everything look the same — defeating its purpose.

### Thinking Through Data Fit

| Visualization | Works Well When | Consider Alternatives When |
|--------------|-----------------|---------------------------|
| Progress bars | Values span a meaningful range | Values cluster together, bars look nearly identical |
| Bar charts | Differences are visible at the chosen scale | Small differences get lost visually |
| Pie charts | Segments are distinct and countable | Many small slices or one dominant slice |
| Line charts | Trends are visible and meaningful | Line is essentially flat |
| Heatmaps | Color gradations are distinguishable | Values compress to similar colors |

### Questions to Guide Your Choice
- [ ] Do the actual data values create perceptible visual differences?
- [ ] If using bars/progress, will users see meaningful distinctions?
- [ ] If values are similar, would numbers + deltas communicate more clearly?
- [ ] Does this visualization tell a story the numbers alone don't?

### Anti-Pattern: Conceptual vs. Data-Driven Choice
**Conceptual thinking:** "We're showing value vs target → progress bar makes sense"
**Data-driven thinking:** "Our values are 91/120, 91/120, 95/120 — these will all render as nearly identical bars. Numbers with delta chips will communicate the differences better."

### When to Pivot Away from a Visualization
If actual data makes a visualization ineffective, consider:
1. **Numbers + context** — Raw values with comparison text
2. **Delta indicators** — "+2.3%" badges for small differences
3. **Gap framing** — Show distance from target instead of absolute progress
4. **Rankings** — "#1, #2, #3" may tell a clearer story than proportional visuals

## Visualization Checklist

### Chart Selection
- [ ] Used MOST appropriate chart type (not just safest)
- [ ] Considered advanced options (radar, funnel, sankey, heatmap)
- [ ] Chart type matches data characteristics
- [ ] Encoding accuracy appropriate for the task

### Insight & Story
- [ ] Headline insight text included
- [ ] Key takeaway is immediately clear
- [ ] Annotations highlight important points
- [ ] Comparison context provided

### Complete Specification
- [ ] Legend present and properly positioned
- [ ] Axis labels clear and formatted
- [ ] Colors meaningful (not decorative)
- [ ] Tooltips defined
- [ ] Drill-down/CTA specified
- [ ] Empty state defined

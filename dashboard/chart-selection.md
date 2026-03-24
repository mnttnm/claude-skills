# Chart Selection Quick Reference

## By Data Question

### "How much is there?"
→ **KPI Card / Big Number** — Single headline metric with trend
→ **Bullet Chart** — When you need to show vs. target in one view

### "How has this changed over time?"
→ **Line Chart** — Continuous trends, multiple series
→ **Area Chart** — Volume emphasis, part-to-whole over time
→ **Column Chart** — Discrete periods (weekly, monthly)
→ **Slope Chart** — Before/after two-point comparison
→ **Bump Chart** — Ranking changes over time

### "How do these compare?"
→ **Bar Chart** — Few categories, horizontal for many/long labels
→ **Column Chart** — Few categories, vertical
→ **Radar/Spider** — Multi-attribute comparison (5-8 dimensions)
→ **Bullet Chart** — Compare to target with performance ranges

### "What's the composition?"
→ **Stacked Bar** — Composition across categories
→ **Treemap** — Hierarchical part-to-whole
→ **Sunburst** — Multi-level hierarchical composition
→ **Waterfall** — How components sum to total

### "What's the flow or conversion?"
→ **Funnel Chart** — Sequential stages with drop-off
→ **Sankey Diagram** — Flow between categories, multiple paths

### "What's the pattern?"
→ **Heatmap** — Two categorical dimensions (time × category)
→ **Calendar Heatmap** — Daily patterns over months
→ **Matrix Chart** — Correlation patterns

### "Is there a relationship?"
→ **Scatter Plot** — Two-variable correlation
→ **Bubble Chart** — Three variables (x, y, size)
→ **Connected Scatter** — Relationship over time

### "How is this distributed?"
→ **Histogram** — Single variable distribution
→ **Box Plot** — Compare distributions
→ **Violin Plot** — Distribution shape comparison
→ **Density Plot** — Smooth distribution curve

### "Where is this?"
→ **Choropleth Map** — Regional comparisons
→ **Point Map** — Location-specific data
→ **Cartogram** — Emphasize by value, not geography

## Advanced Chart Quick Reference

| Chart Type | Best For | Avoid When |
|------------|----------|------------|
| **Funnel** | Conversion flows, sequential drop-off | Non-sequential data |
| **Sankey** | Multiple flow paths, budget allocation | Simple A→B flows |
| **Heatmap** | Time × category, correlations | Precise values needed |
| **Radar** | Multi-dimensional comparison | More than 8 attributes |
| **Waterfall** | Component breakdown, bridges | Non-additive data |
| **Bump** | Ranking changes over time | Absolute values matter |
| **Bullet** | KPI vs. target with context | No target exists |
| **Treemap** | Hierarchical part-to-whole | Deep hierarchies (>3 levels) |
| **Slope** | Before/after comparison | More than 2 time points |

## Chart Type Upgrade Guide

| Instead of... | Consider... | When... |
|---------------|-------------|---------|
| Bar chart | Radar chart | Comparing across 5-8 attributes |
| Stacked bar | Funnel | Showing conversion/drop-off |
| Multiple bars | Waterfall | Showing component contributions |
| Line chart | Bump chart | Rankings matter, not values |
| Grouped bars | Slope chart | Only comparing 2 points |
| Table | Heatmap | Pattern recognition is key |
| Flow diagram | Sankey | Multiple paths to show |
| Gauge | Bullet chart | Target comparison needed |

## Complete Widget Specification

Every chart needs more than the visual:

```
Widget Spec:
├── Title: Clear, specific
├── Insight Text: "APAC drove 60% of growth"
├── Visualization: The chart itself
├── Legend: For multi-series data
├── Context Line: "vs. Target: $1.5M"
├── Annotations: Key events marked
├── Tooltip: Hover details
├── CTA: "View Full Analysis →"
└── States: Loading, Empty, Error
```

## Quick Decision Matrix

| Data Characteristics | Chart Type |
|---------------------|------------|
| Single value + trend | KPI Card with sparkline |
| Single value + target | Bullet Chart |
| Trend over time | Line Chart |
| Before/after only | Slope Chart |
| Category comparison | Bar/Column |
| Multi-attribute comparison | Radar |
| Part-to-whole | Treemap or Stacked Bar |
| Conversion stages | Funnel |
| Flow paths | Sankey |
| 2D patterns | Heatmap |
| Ranking over time | Bump Chart |
| Component breakdown | Waterfall |

## When NOT to Use

### Pie Charts
- More than 5 slices
- Similar-sized slices  
- Need precise comparison
- Multiple pies to compare
✓ Only when one slice is dramatically >50%

### 3D Charts
- Never. They distort perception.

### Dual Axis
- Avoid if possible. Creates false correlations.
- If required, clearly label and differentiate.

### Gauges/Dials
- Usually worse than bullet chart
- Only when mimicking real-world gauge

## Color Encoding

| Data Type | Palette Type |
|-----------|--------------|
| Categories | Categorical (distinct colors) |
| Sequential values | Sequential (light → dark) |
| +/- from center | Divergent (color-neutral-color) |
| Status | Semantic (green/amber/red) |

Maximum 5-6 categorical colors for clear distinction.

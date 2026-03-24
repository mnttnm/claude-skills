# Batching Strategy

## Why Batch?

In Karpathy's autoresearch, each experiment requires 5 minutes of GPU time, so parallelism is impossible. In UI grading, the evaluation function (interface-grader) runs in seconds. Independent changes can be batched into a single iteration without losing the ability to attribute improvements.

## Independence Test

Two changes are **independent** if:
1. They modify different CSS properties or HTML elements
2. Neither change's effect depends on the other's presence
3. If one is reverted, the other still makes sense

Two changes are **dependent** if:
1. One adds CSS that styles HTML added by the other
2. They modify the same element or overlapping selectors
3. They interact visually (e.g., both affect the same layout region)

## Decision Framework

```
For each set of FAIL criteria from the grader:

1. Group failures by root cause:
   - Same CSS property? → Dependent
   - Same HTML element? → Dependent
   - Same visual region? → Likely dependent
   - Different categories entirely? → Likely independent

2. For each group, check interaction:
   - "If I fix A but not B, does A's fix still work?" → Independent
   - "Does fixing A change how B looks or behaves?" → Dependent

3. Batch all independent groups into one iteration.
   Keep dependent groups as separate iterations.
```

## Common Batching Patterns

### Safe to Batch (Independent)

| Change A | Change B | Why Independent |
|---|---|---|
| Fix contrast ratio | Add viewport-fit=cover | Different CSS properties, different elements |
| Add :focus-visible | Add prefers-reduced-motion | Different media/pseudo selectors |
| Bump font-size on .desc | Constrain max-width on .subpage | Different elements, different properties |
| Add tabular-nums to prices | Fix touch target padding on nav | Different elements, different visual regions |

### Must Isolate (Dependent)

| Change A | Change B | Why Dependent |
|---|---|---|
| Add footer HTML to subpages | Add footer CSS styles | CSS styles HTML that A creates |
| Change grid layout | Adjust card widths | Cards live inside the grid |
| Add new section | Style the new section | Styling depends on HTML structure |
| Change color variable | Adjust contrast of elements using that variable | Second depends on first's value |

### Edge Cases

- **Font-size + line-length**: Usually independent (different properties), but if increasing font size causes lines to exceed the max-width, they interact. Check visually.
- **Multiple accessibility fixes**: Usually independent (focus-visible, reduced-motion, viewport-fit all operate on different mechanisms). Safe to batch.
- **Color palette changes**: Changing one color variable is independent of changing another, UNLESS both are used in the same element (e.g., text color + background color need to maintain contrast ratio together).

## Batch Size Limits

Even when changes are independent, avoid batching more than ~5 changes per iteration:
- Makes the changelog harder to read
- If the score drops, more changes need investigating
- Diminishing returns on iteration speed

## Retrospective Batching Analysis

After the loop completes, review the changelog and note:
- Which iterations could have been batched together
- Which batches should have been split

Document this in the learnings file for future runs.

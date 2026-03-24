# Per-Page Criteria (25 criteria)

Graded for each unique page type in the Page Map. Skip criteria that don't match the page's purpose.

## Composition (7)

| # | Criterion | Applies When | Verify | How to Verify |
|---|-----------|-------------|--------|---------------|
| PP-1.1 | First viewport has one dominant visual idea | All pages | `C+V` | **Code**: Check layout. **Visual**: One focal point dominates. |
| PP-1.2 | Each section has exactly one job | All pages | `C+V` | **Code**: Read section markup. **Visual**: Sections feel distinct. |
| PP-1.3 | No cards unless the card IS the interaction | All pages | `C` | Find card containers. If removing border/shadow loses no meaning, FAIL. |
| PP-1.4 | Hero runs full-bleed, no page gutters | Pages with heroes | `C+V` | **Code**: Check width constraints. **Visual**: Edge-to-edge. |
| PP-1.5 | Brand or product name is the loudest text | Brand-led pages | `V` | Compare rendered visual weight. Skip on content-led pages — mark as intentional exception with Layer 1 justification. |
| PP-1.6 | Content follows clear sequence (hero → support → detail → CTA) | Marketing/conversion | `C` | Map sections to roles. |
| PP-1.7 | Primary workspace >60% of viewport | App/dashboard | `V` | Estimate area ratio from screenshot. |

## Copy (6)

| # | Criterion | Applies When | Verify | How to Verify |
|---|-----------|-------------|--------|---------------|
| PP-2.1 | Headlines scannable — page understood from headings alone | All pages | `C+V` | **Code**: Extract headings. **Visual**: Headlines prominent enough to scan. |
| PP-2.2 | No section repeats mood or message | All pages | `C` | Compare section summaries. No duplicated purpose. |
| PP-2.3 | Supporting copy <=2 sentences per section | Marketing, personal | `C` | Count sentences per support block. |
| PP-2.4 | No design commentary or prompt language in UI | All pages | `C` | Search for "beautifully crafted", "seamlessly", etc. |
| PP-2.5 | CTAs use specific verb + object | Conversion pages | `C` | Check buttons/links for verb + object. |
| PP-2.6 | No filler copy — deleting 30% would not improve | All pages | `C+V` | **Code**: Read for redundancy. **Visual**: Density feels right in layout. |

## Imagery & Visual Anchor (5)

**Text-first exemption**: If page has no images by design intent, exclude this category for that page. State reason. If images absent due to oversight, FAIL.

**Edge cases**:
- Loading/scroll-triggered heroes: Grade final revealed state
- Interactive/generative visuals (Canvas, WebGL): Count as visual anchors

| # | Criterion | Applies When | Verify | How to Verify |
|---|-----------|-------------|--------|---------------|
| PP-3.1 | First viewport has a real visual anchor | Pages with design-intent imagery | `V` | Must be content-bearing, not pattern/gradient. |
| PP-3.2 | Removing the main image weakens the viewport | Pages with hero imagery | `V` | Mentally remove. If page still works, FAIL. |
| PP-3.3 | No images with embedded text clutter fighting UI text | All pages with images | `V` | Check for competing text in images. |
| PP-3.4 | Text over imagery maintains readable contrast | Text-on-image pages | `V` | Check legibility of all text-on-image pairs. |
| PP-3.5 | Multiple visual moments use multiple images, not collages | All pages with images | `C+V` | Each story gets its own image element. |

## Page-Specific Motion (2)

| # | Criterion | Applies When | Verify | How to Verify |
|---|-----------|-------------|--------|---------------|
| PP-4.1 | At least 2 intentional motions (entrance, scroll, hover/reveal) | Marketing, personal | `C+V` | **Code**: Count animations. **Visual**: Confirm noticeable. |
| PP-4.2 | Loading/empty states exist for dynamic content | App, data-driven | `C+V` | **Code**: Check for skeleton/loading. **Visual**: Trigger loading state. |

## Content-Type Specific (5)

Grade only criteria matching the page's content type.

| # | Criterion | Applies When | Verify | How to Verify |
|---|-----------|-------------|--------|---------------|
| PP-5.1 | Tabular numbers for aligned columns | Dashboards, tables, pricing | `C+V` | **Code**: font-variant-numeric: tabular-nums. **Visual**: Numbers align. |
| PP-5.2 | Data-dense pages maintain readability despite compact layout | Dashboards, admin, data tables | `V` | Operator can scan headings, labels, numbers and understand. |
| PP-5.3 | Article pages have comfortable reading experience | Blog posts, docs, long-form | `C+V` | **Code**: Text width, line-height. **Visual**: Reading feels effortless. |
| PP-5.4 | No more than one accent color for actions/state | App, dashboard | `C+V` | **Code**: Count accent families. **Visual**: No competing action colors. |
| PP-5.5 | Form-heavy pages have clear input hierarchy and error states | Settings, checkout, forms | `C+V` | **Code**: Label/input association, error states. **Visual**: Clear path. |

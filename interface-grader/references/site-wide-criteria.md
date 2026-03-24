# Site-Wide Criteria (24 criteria)

Graded once. Apply across all page types.

## Typography System (6)

| # | Criterion | Verify | How to Verify |
|---|-----------|--------|---------------|
| SW-1.1 | No more than two typeface families loaded (monospace for code exempt) | `C` | Count distinct font-family declarations. |
| SW-1.2 | Body text uses rem or em units, not fixed px | `C` | Check body text font-size declaration. |
| SW-1.3 | Body text is >=16px equivalent at default browser settings | `C` | Compute resolved body size. |
| SW-1.4 | Line length constrained to <=75ch for body text | `C` | Check max-width or container width. |
| SW-1.5 | Font choice is distinctive — not Inter, Roboto, Arial, Open Sans as primary face | `C` | Check primary font-family against banned list. Banned fonts OK for secondary UI text. |
| SW-1.6 | Type hierarchy clear across all page types — headings, body, metadata visually distinct | `C+V` | **Code**: Check size, weight, color differences. **Visual**: Hierarchy reads clearly on every page. |

## Color & Surface System (7)

| # | Criterion | Verify | How to Verify |
|---|-----------|--------|---------------|
| SW-2.1 | No pure black (#000) or pure white (#fff) on large surfaces | `C` | Search for #000/#fff in background/text. |
| SW-2.2 | Text-to-background contrast meets WCAG AA (4.5:1 body, 3:1 large) | `C+V` | **Code**: Compute ratios. **Visual**: Verify readability with overlays/blending. |
| SW-2.3 | Accent color <=10% of visible surface | `V` | Estimate accent surface area from screenshots. |
| SW-2.4 | Neutrals tinted toward brand hue, not pure gray | `C+V` | **Code**: Check neutral chroma >0. **Visual**: Confirm warmth/coolness. |
| SW-2.5 | Color consistent across all page types | `V` | Compare screenshots. Same palette? Same accent usage? |
| SW-2.6 | Dark mode (if present) uses lighter surfaces for elevation, not shadows | `C+V` | **Code**: Check surface values at elevations. If no dark mode, PASS. |
| SW-2.7 | No gradient text on headings or metrics | `C` | Search for background-clip: text or -webkit-text-fill-color. |

## Motion & Interaction System (5)

| # | Criterion | Verify | How to Verify |
|---|-----------|--------|---------------|
| SW-3.1 | No bounce or elastic easing | `C` | Search for spring/bounce/elastic in animations. |
| SW-3.2 | Exit animations faster than entrance | `C` | Compare durations. Exit <=75% of entrance. If no exits, PASS. |
| SW-3.3 | No animation on layout properties (width, height, padding, margin) | `C` | Check transition/animation declarations for layout properties. |
| SW-3.4 | Reduced motion respected (prefers-reduced-motion query present) | `C` | Search for @media (prefers-reduced-motion). |
| SW-3.5 | All interactive elements have hover AND focus-visible states | `C+V` | **Code**: Check :hover + :focus-visible. **Visual**: Tab through, hover over elements. |

## Responsiveness & Access (6)

| # | Criterion | Verify | How to Verify |
|---|-----------|--------|---------------|
| SW-4.1 | Touch targets >=44px on coarse pointer devices | `C+V` | **Code**: Check sizing/padding. **Visual**: Confirm tappability on mobile. |
| SW-4.2 | Layout adapts at <=3 content-driven breakpoints | `C+V` | **Code**: Count breakpoints. **Visual**: Natural transitions when resizing. |
| SW-4.3 | No critical functionality hidden on mobile — adapted, not removed | `V` | Compare desktop vs mobile screenshots. Nothing essential missing. |
| SW-4.4 | Font sizes use fluid scaling (clamp or vw+rem) for display text | `C` | Check headline/display for clamp() or calc(). |
| SW-4.5 | Focus ring visible on keyboard navigation | `C+V` | **Code**: Check outline:none has :focus-visible replacement. **Visual**: Tab through. |
| SW-4.6 | Viewport meta tag with viewport-fit=cover | `C` | Check meta viewport tag. |

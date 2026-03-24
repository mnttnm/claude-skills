# Visual Design Reference

> **When to use this file**: At Checkpoint 4 when establishing visual direction, defining color palettes, choosing typography, and setting aesthetic options. Use when translating user visual preferences into design tokens.

---

## Philosophy

```
DON'T: "I'll use a blue color palette with Inter font."
DO:    "For the color palette, here are three directions that work well.
        Which resonates with your vision?"
```

## Decision Framework

### Must Present Options For
- Color palette direction
- Light vs. dark theme
- Typography style
- Aesthetic density
- Card/component styling
- Animation level

### Apply Best Practices For (Don't Ask)
- Contrast ratios (WCAG compliance)
- Spacing consistency (8px grid)
- Semantic color meanings
- Accessibility requirements

## Color Palette Options

### Present Theme Options First
```
"For the overall theme:

**Option A: Light Theme**
- White/light gray backgrounds
- Dark text
- Best for: Extended reading, well-lit environments, most users
- Feel: Clean, professional, familiar

**Option B: Dark Theme**
- Dark gray backgrounds (#1E1E1E, not pure black)
- Light text
- Best for: Monitoring displays, low-light, reducing eye strain
- Feel: Modern, immersive, technical

**Option C: Auto/Both**
- Supports user system preference
- More development effort but flexible
- Best for: Public-facing, diverse user environments

Which fits your users' typical environment?"
```

### Present Palette Directions
```
"For the color direction, here are approaches that work:

**Option A: Brand-Forward**
Your primary brand color as the accent
Neutrals (grays) for everything else
Best if: Brand recognition matters, consistency with other tools

**Option B: Semantic-Focused**
Minimal accent color
Green/yellow/red for status (success/warning/error)
Best if: Data interpretation is primary, status at a glance

**Option C: Vibrant & Modern**
Bold, saturated accent colors
Multiple complementary colors for categories
Best if: Engagement matters, younger audience, creative context

**Option D: Muted & Professional**
Desaturated, subtle palette
Conservative use of color
Best if: Corporate environment, financial data, conservative audience

Do any of these match what you're envisioning? Or describe your preference."
```

### Specific Palette Examples
When user chooses a direction, offer specifics:

```
"Based on your preference for [direction], here are specific palettes:

**Palette A: Ocean Blue**
Primary: #3B82F6 (bright blue)
Works well for: Trust, technology, professional
[Show color swatches]

**Palette B: Emerald Green**
Primary: #10B981 (green)
Works well for: Growth, health, sustainability
[Show color swatches]

**Palette C: Slate Neutral**
Primary: #64748B (cool gray)
Works well for: Minimal, letting data speak, sophistication
[Show color swatches]

Which appeals to you? Or provide your brand hex codes."
```

## Typography Options

### Present Font Direction
```
"For typography:

**Option A: Clean & Technical**
Font: Inter or SF Pro
Feel: Precise, modern, highly readable
Best for: Data-heavy dashboards, technical audiences

**Option B: Friendly & Approachable**
Font: Open Sans or Nunito
Feel: Warm, accessible, welcoming
Best for: Consumer-facing, non-technical users

**Option C: Premium & Refined**
Font: Plus Jakarta Sans or DM Sans
Feel: Sophisticated, contemporary, elevated
Best for: Executive dashboards, premium products

**Option D: Your Brand Font**
Use your existing brand typography
Feel: Consistent with your other materials
Best for: Brand cohesion

Do you have a brand font, or which direction feels right?"
```

## Aesthetic Density Options

### Present Density Choices
```
"For visual density:

**Option A: Spacious & Minimal**
- Generous whitespace
- Fewer elements per screen
- Large touch targets
- Feel: Calm, focused, breathing room
- Tradeoff: Less information at once

**Option B: Balanced**
- Moderate spacing
- Good information density
- Standard component sizes
- Feel: Professional, efficient, familiar
- Tradeoff: None significant

**Option C: Dense & Detailed**
- Compact spacing
- Maximum information
- Smaller text sizes
- Feel: Power-user, comprehensive, data-rich
- Tradeoff: Can feel overwhelming

Which matches how your users prefer to work?"
```

## Component Styling Options

### Card Style Options
```
"For cards and containers:

**Option A: Elevated (Shadows)**
Subtle shadows lift cards from background
Modern, clean, depth perception
CSS: box-shadow: 0 1px 3px rgba(0,0,0,0.1)

**Option B: Bordered**
Subtle borders define containers
Traditional, clear boundaries, works on any background
CSS: border: 1px solid var(--border-color)

**Option C: Flat**
No shadows or borders, just background color difference
Ultra-minimal, content-focused, contemporary
CSS: background difference only

**Option D: Glassmorphism**
Semi-transparent with blur effect
Trendy, layered, modern
CSS: backdrop-filter: blur(8px)

Which style appeals to you?"
```

### Corner Radius Options
```
"For corners:

**Rounded (8-12px)**: Friendly, modern, approachable
**Slightly Rounded (4px)**: Professional, subtle softness
**Sharp (0px)**: Technical, precise, traditional

Quick preference?"
```

## Animation Level Options

```
"For motion and animation:

**Option A: Subtle**
- Hover state changes only
- No loading animations
- Feel: Calm, professional, focused
- Best for: Data-intensive, frequent use

**Option B: Standard**
- Hover states + transitions
- Loading spinners
- Chart drawing animations
- Feel: Polished, responsive, modern

**Option C: Expressive**
- All standard + micro-interactions
- Number count-up animations
- Staggered loading
- Feel: Delightful, premium, engaging
- Tradeoff: More development, can distract

What level of motion feels appropriate?"
```

## Presenting Complete Direction

After gathering preferences, summarize:

```
"Based on your preferences, here's the visual direction:

**Theme**: Light mode
**Palette**: Brand-forward with your blue (#3B82F6)
**Typography**: Inter (clean & technical)
**Density**: Balanced
**Cards**: Elevated with subtle shadows
**Corners**: Rounded (8px)
**Animation**: Standard

**Design Tokens I'll Use:**
--color-primary: #3B82F6
--color-success: #10B981
--color-warning: #F59E0B
--color-error: #EF4444
--font-family: 'Inter', sans-serif
--radius: 8px
--shadow-card: 0 1px 3px rgba(0,0,0,0.1)

Does this capture what you're looking for? Any adjustments?"
```

## When User Has No Preference

```
"No problem! Here's a solid starting point that works for most
dashboards:

- Light theme (universally readable)
- Blue accent (#3B82F6, conveys trust)
- Inter font (designed for screens)
- Balanced density
- Subtle shadows on cards
- Rounded corners (8px)
- Standard animations

I'll show you the result and you can tell me what to adjust.
Often it's easier to react to something concrete than to imagine it!"
```

## Accessibility Non-Negotiables

These are NOT options—always apply:

| Requirement | Standard | Always Applied |
|-------------|----------|----------------|
| Text contrast | ≥4.5:1 | Yes |
| Large text contrast | ≥3:1 | Yes |
| Graphics contrast | ≥3:1 | Yes |
| Color independence | Never color-only | Yes |
| Focus indicators | Visible | Yes |
| Touch targets | ≥44x44px | Yes |

```
"Note: Regardless of visual choices, I'll ensure:
- All text meets WCAG 2.1 AA contrast requirements
- Colors are never the only way to convey meaning
- The dashboard works for users with color blindness

These aren't optional—they're built into every design."
```

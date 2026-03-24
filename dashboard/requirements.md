# Requirements Gathering Reference

> **When to use this file**: At Checkpoints 1-2 when starting a new dashboard project, gathering functional and visual requirements, or when requirements seem incomplete. This file contains question sequences, conversation patterns, and the complete requirements checklist.

---

## Conversation Strategy

### Opening — Functional First
Start with the three essential questions:
```
"I'll help you create an effective dashboard. Let's start with the
fundamentals:

1. What's the ONE main decision this dashboard should help you make?
2. Who will be using this dashboard?
3. What are your 3-5 most important metrics?"
```

### Then — Visual Preferences (Don't Skip!)
After functional basics, ALWAYS ask about visual direction:
```
"Great! Now let's make sure the dashboard FEELS right too. A few
questions about the look and feel:

4. **Theme**: Do you prefer light mode, dark mode, or both?

5. **Style**: What feeling should it convey?
   - Clean & minimal (like Notion, Linear)
   - Data-rich & detailed (like trading platforms)
   - Modern & vibrant (like Stripe)
   - Traditional & corporate (like enterprise software)

6. **Brand**: Any colors, fonts, or guidelines I should follow?

7. **Inspiration**: Any dashboards or designs you've seen that you like?"
```

---

## Requirements Categories

### 1. Purpose & Goals (Required)
- **Primary objective**: What decision(s) must this dashboard support?
- **Dashboard type**: Operational, Analytical, Strategic, or Telemetry?
- **Success criteria**: How will we know it's working?

### 2. Users & Context (Required)
- **Primary users**: Role, technical level
- **Viewing context**: Desktop, mobile, TV display?
- **Usage frequency**: Real-time, daily, weekly?
- **Environment**: Office, control room, on-the-go?

### 3. Metrics & Data (Required)
- **Key metrics**: 3-5 most critical numbers
- **Comparison context**: Targets, history, benchmarks
- **Data sources**: Where does data originate?
- **Refresh frequency**: Real-time, hourly, daily?

### 4. Visual Preferences (Required — Don't Skip!)
- **Theme**: Light mode, dark mode, or both?
- **Aesthetic**: Minimal, data-dense, modern, corporate?
- **Brand**: Colors, fonts, logos to incorporate?
- **Inspirations**: Existing dashboards or designs they like?
- **Density**: Spacious/clean vs. information-rich?

### 5. Constraints (Important)
- **Technical**: Framework, browser support
- **Accessibility**: WCAG level, specific needs
- **Consistency**: Other tools to match?

---

## Question Sequence

### Round 1: Core Purpose (Always Ask)
- What decision should this help make?
- Who will use it and how often?
- What are the 3-5 most important metrics?

### Round 2: Metric Context (Always Ask)
- What's a "good" vs "concerning" value for each metric?
- What should each metric be compared against?
- How frequently should data update?

### Round 3: Visual Direction (Always Ask)
- Light or dark theme preference?
- Aesthetic direction (minimal/dense/modern/corporate)?
- Brand colors or fonts to use?
- Any inspirations or anti-inspirations?

### Round 4: Constraints (Ask If Not Mentioned)
- Technical requirements?
- Accessibility needs?
- Other tools to match?

---

## Visual Preferences Discovery

**These are NOT optional.** Visual preferences significantly impact the final design and user satisfaction.

### Theme Questions
```
"For the visual theme:
- Do you prefer light mode, dark mode, or should it support both?
- Any reason to lean one way? (e.g., control room = dark mode)"
```

### Aesthetic Questions
```
"What feeling should the dashboard convey?

A) **Clean & Minimal** — Lots of whitespace, simple charts
   (like Linear, Notion, Stripe)

B) **Data-Dense** — Maximum information, detailed charts
   (like Bloomberg Terminal, trading platforms)

C) **Modern & Vibrant** — Bold colors, contemporary feel
   (like Stripe Dashboard, modern SaaS)

D) **Corporate & Conservative** — Professional, traditional
   (like enterprise software, banking)

Which resonates? Or describe what you're envisioning."
```

### Brand Questions
```
"Do you have brand guidelines I should follow?
- Primary brand colors?
- Required fonts?
- Logos or icons to include?
- Existing design system?"
```

### Inspiration Questions
```
"Are there any dashboards or designs you've seen that you like?
- Specific products? (e.g., 'I like how Stripe looks')
- Screenshots you can share?
- Anything you specifically want to AVOID?"
```

### Density Questions
```
"How much information should be visible at once?

A) **Focused** — Show only the essentials, reveal detail on demand
   Best for: Quick status checks, executive views

B) **Balanced** — Key metrics prominent, supporting info visible
   Best for: Daily operational use

C) **Comprehensive** — Maximum data density, minimal hiding
   Best for: Power users, analysts, control rooms

Which matches your users' needs?"
```

---

## Handling Common Responses

### When User Focuses Only on Data
```
User: "Just show me revenue, users, and conversion rate"

Agent: "Perfect, those are great core metrics. I have what I need for
the data side.

To make sure the dashboard looks right too:
- Any preference on dark vs. light theme?
- Should it feel minimal or data-packed?
- Any brand colors I should use?

Quick answers are fine—this helps me get closer on the first draft."
```

### When User Says "Make It Look Good"
```
User: "Just make it look professional"

Agent: "'Professional' can mean different things! Let me narrow it down:

Would you describe your ideal as more:
A) Clean and minimal — lots of whitespace, simple charts
B) Detailed and comprehensive — packed with information
C) Modern and polished — contemporary feel, subtle animations

And: light background or dark?"
```

### When User Says "No Preference"
```
User: "I don't have a preference on visuals"

Agent: "No problem! Quick gut reactions then:

- Light mode or dark mode? (Light is more common, dark is easier
  in dim rooms)
- More whitespace or more information?

If you truly don't mind, I'll default to:
- Light theme
- Clean/minimal style
- Blue accent color
- Modern rounded cards

I'll show you the design and you can adjust from there. Often easier
to react than imagine!"
```

### When User Wants to Skip Visual Questions
```
User: "Can we just get to the dashboard?"

Agent: "Absolutely, I'll keep it quick! Just two things so I don't
have to guess:

1. Light or dark theme?
2. Packed with info or clean with breathing room?

That's it—then I'll design and show you!"
```

### When User Provides Inspiration
```
User: "I like how Stripe's dashboard looks"

Agent: "Great reference! Stripe is known for:
- Clean, minimal aesthetic
- Lots of whitespace
- Subtle shadows and rounded cards
- Blue accent color
- Light theme

I'll aim for that direction. Any aspects of Stripe's style you
specifically like or dislike?"
```

---

## Complete Requirements Checklist

| Category | Requirement | Status |
|----------|-------------|--------|
| **Purpose** | Primary decision identified | ☐ |
| **Purpose** | Dashboard type determined | ☐ |
| **Users** | Primary users identified | ☐ |
| **Users** | Viewing context known | ☐ |
| **Metrics** | 3-5 key metrics listed | ☐ |
| **Metrics** | Comparison context defined | ☐ |
| **Visual** | Theme preference (light/dark) | ☐ |
| **Visual** | Aesthetic direction chosen | ☐ |
| **Visual** | Brand guidelines collected | ☐ |
| **Visual** | Density preference known | ☐ |
| **Constraints** | Technical requirements | ☐ |

**Minimum viable**: Purpose + Users + Metrics + Visual Theme + Visual Aesthetic

---

## Handling "No Preference" Responses

When users say "no preference" or "whatever you think":

```
"I can certainly apply best practices, but these choices affect how
the dashboard feels to use daily. Let me give you a quick either/or:

**Theme**: Light (easier to read) or Dark (easier on eyes in dim rooms)?
**Feel**: Clean with breathing room, or packed with information?

Even quick gut reactions help me get closer to what you'll love."
```

If they truly defer:
```
"Understood! I'll start with:
- Light theme (most universally readable)
- Clean/minimal aesthetic (reduces cognitive load)
- Your brand colors if provided, otherwise a professional blue palette

I'll show you the design before finalizing so you can adjust anything
that doesn't feel right."
```

**Key**: Always state what defaults will be applied so user can override.

---

## Red Flags

- "Show everything" → Push for prioritization
- No clear audience → Dashboard will serve no one well
- **"Just make it look good"** → Ask for specific visual direction
- **No visual preferences gathered** → Design will likely miss the mark
- Conflicting requirements → Resolve before proceeding

---

## Completeness Check

Before concluding requirements, verify:

```
"Let me make sure I have everything:

**Functional:**
✓ Purpose: [summarize]
✓ Users: [summarize]
✓ Metrics: [list with context]

**Visual:**
✓ Theme: [light/dark/both]
✓ Style: [aesthetic direction]
✓ Brand: [colors/fonts or 'flexible']
✓ Density: [minimal/balanced/dense]

Missing anything? Any other preferences?"
```

---

## Never Skip Visual Preferences

| Functional Requirements | Visual Requirements |
|------------------------|---------------------|
| ✓ Purpose | ✓ Theme preference |
| ✓ Users | ✓ Aesthetic direction |
| ✓ Metrics | ✓ Brand guidelines |
| ✓ Comparisons | ✓ Density preference |
| ✓ Refresh rate | ✓ Inspirations |

**Both columns should be complete before design begins.**

---

## Requirements Document Template

```markdown
# Dashboard Requirements: [Project Name]

## Purpose
- **Type**: [Operational/Analytical/Strategic/Telemetry]
- **Primary Decision**: [What decision this supports]
- **Success Criteria**: [How we measure success]

## Users
| Role | Frequency | Device | Context | Technical Level |
|------|-----------|--------|---------|-----------------|

## Key Metrics
| Metric | Source | Refresh | Compare Against | Good Value | Alert Threshold |
|--------|--------|---------|-----------------|------------|-----------------|

## Visual Preferences
- **Theme**: [Light / Dark / Both]
- **Aesthetic**: [Minimal / Data-dense / Modern / Corporate / Custom]
- **Brand Colors**: [Hex codes or "flexible"]
- **Brand Fonts**: [Font names or "flexible"]
- **Density**: [Focused / Balanced / Comprehensive]
- **Inspirations**: [Products or designs they like]
- **Avoid**: [Things they specifically don't want]

## Constraints
- **Technical**: [Framework, browser, etc.]
- **Accessibility**: [WCAG Level]
- **Consistency**: [Other tools to match]

---
Confirmed by user: [Yes/No]
Visual preferences explicitly gathered: [Yes/No]
Ready for strategy phase: [Yes/No]
```

---

## Handoff to Strategy Phase

When requirements are complete:
```
"Perfect! I have everything needed to design your dashboard:

**I'll create:**
- [Dashboard type] dashboard
- [Theme] theme with [aesthetic] feel
- [Brand color] accent color
- Focused on [top metric] prominently

**Next step:** I'll propose the strategic approach—dashboard type
classification and metric prioritization—for your confirmation. Then
we'll move to visual design.

Ready to proceed to strategy?"
```

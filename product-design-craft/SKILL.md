---
name: product-design-craft
description: Create production-grade UI with the craft level of Linear, Stripe, Superhuman, Figma, Notion, and Slack. Use when building interfaces that need to feel professional, polished, and intentionally designed—not like generic templates or AI-generated defaults. Applies to dashboards, SaaS products, tools, and any interface where perceived quality matters. Covers design systems, component customization (including shadcn theming), interaction design, micro-animations, and edge case handling.
---

# Product Design Craft

Transform interfaces from "works correctly" to "feels like a funded startup built this." This skill encodes the design DNA of elite products: Linear, Stripe, Superhuman, Figma, Notion, and Slack.

## Design DNA: What Elite Products Share

### Linear: Surgical Precision
- **Density without clutter**: Information-rich screens that remain scannable
- **Keyboard-first**: Command palette (⌘K), shortcuts visible on hover
- **Monochromatic confidence**: Limited palette, relies on spacing and typography hierarchy
- **Speed as feature**: Optimistic updates, instant feedback, no loading spinners for fast operations

### Stripe: Trust Through Clarity
- **Progressive disclosure**: Complexity revealed gradually, not dumped
- **Gradient mastery**: Subtle, purposeful gradients that add depth without distraction
- **Documentation-grade copywriting**: Every label teaches, every error helps
- **Generous whitespace**: Breathing room signals confidence

### Superhuman: Feels Instant
- **Split-pane mental model**: Consistent spatial relationships
- **Aggressive prefetching**: UI ready before user commits to action
- **Keyboard velocity**: Every action has a shortcut, shortcuts are discoverable
- **Reduced motion that still communicates**: Transitions under 150ms

### Figma: Multiplayer Awareness
- **Presence indicators**: Always know who's where
- **Contextual tooling**: Right tools appear at right moment
- **Canvas confidence**: Infinite space, zoom as navigation
- **Collaborative cursors**: Others' actions visible in real-time

### Notion: Calm Flexibility
- **Block-based composition**: Everything is moveable, nestable
- **Slash commands**: Power hidden behind simple gesture
- **Typographic hierarchy**: Headers, toggles, callouts—structure through type
- **Empty states that invite**: Never feel lost, always know next action

### Slack: Conversational Flow
- **Threading without confusion**: Clear parent-child relationships
- **Presence as interface**: Online status, typing indicators
- **Emoji as UI**: Reactions reduce noise, add signal
- **Channel patterns**: Consistent navigation, predictable information architecture

## Foundation Systems

### Typography Scale

Never use default type scales. Create intentional hierarchy:

```css
/* Recommended scale: 1.2 ratio (minor third) */
--text-xs: 0.694rem;    /* 11px - metadata, timestamps */
--text-sm: 0.833rem;    /* 13px - secondary content */
--text-base: 1rem;      /* 16px - body text */
--text-lg: 1.2rem;      /* 19px - subheadings */
--text-xl: 1.44rem;     /* 23px - section headers */
--text-2xl: 1.728rem;   /* 28px - page titles */
--text-3xl: 2.074rem;   /* 33px - hero text */

/* Line heights tighten as size increases */
--leading-tight: 1.25;   /* headings */
--leading-snug: 1.375;   /* subheadings */
--leading-normal: 1.5;   /* body */
--leading-relaxed: 1.625; /* small text */
```

**Font pairing strategy**:
- Display/headings: One distinctive font (Söhne, Untitled Sans, GT America, Satoshi, General Sans, Cabinet Grotesk)
- Body/UI: One highly legible font (often the same family's regular weight, or a complementary geometric sans)
- Mono: For code, data, timestamps (JetBrains Mono, Berkeley Mono, Fira Code, IBM Plex Mono)

### Color System Architecture

Build semantic, not static palettes:

```css
/* Foundation: Neutral scale (10 steps minimum) */
--gray-50 through --gray-950

/* Semantic tokens - the actual interface */
--color-bg-primary: var(--gray-50);
--color-bg-secondary: var(--gray-100);
--color-bg-tertiary: var(--gray-200);
--color-bg-inverse: var(--gray-900);

--color-text-primary: var(--gray-900);
--color-text-secondary: var(--gray-600);
--color-text-tertiary: var(--gray-500);
--color-text-inverse: var(--gray-50);

--color-border-default: var(--gray-200);
--color-border-strong: var(--gray-300);
--color-border-focus: var(--brand-500);

/* Brand: Primary action color */
--brand-50 through --brand-950

/* Status colors: Each needs full scale for backgrounds, text, borders */
--success-*, --warning-*, --error-*, --info-*
```

**Dark mode strategy**: Don't just invert. Dark backgrounds should be warm grays (not pure black), text should be slightly off-white (not #fff), and colors need different saturation levels.

### Spacing Rhythm

Use a base-4 or base-8 system consistently:

```css
/* Base-4 system */
--space-1: 0.25rem;  /* 4px - tight internal */
--space-2: 0.5rem;   /* 8px - default internal */
--space-3: 0.75rem;  /* 12px - comfortable internal */
--space-4: 1rem;     /* 16px - component padding */
--space-6: 1.5rem;   /* 24px - section spacing */
--space-8: 2rem;     /* 32px - group separation */
--space-12: 3rem;    /* 48px - major sections */
--space-16: 4rem;    /* 64px - page-level breaks */
```

## Component Craftsmanship

### Every Component Needs These States

1. **Default**: Base appearance
2. **Hover**: Subtle feedback (opacity, background shift, border change)
3. **Focus**: Visible ring (accessibility requirement), distinct from hover
4. **Active/Pressed**: Slight scale down or color shift
5. **Disabled**: Reduced opacity + cursor change + no pointer events
6. **Loading**: Spinner or skeleton, never blank

### Interaction State Principles

```css
/* Hover: Subtle, immediate */
.button:hover {
  background: var(--color-bg-hover);
  transition: background 100ms ease-out;
}

/* Focus: Visible, accessible */
.button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Active: Tactile feedback */
.button:active {
  transform: scale(0.98);
  transition: transform 50ms ease-out;
}

/* Disabled: Clearly non-interactive */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### shadcn/ui Customization Guide

shadcn provides excellent foundations. The craft is in customization:

**1. Override the default theme in globals.css:**

```css
@layer base {
  :root {
    /* Replace default slate with your gray scale */
    --background: 0 0% 98%;        /* Warm off-white, not pure white */
    --foreground: 240 10% 10%;     /* Slightly warm black */

    /* Custom radius - smaller feels more refined */
    --radius: 0.375rem;            /* 6px instead of default 8px */

    /* Custom primary that's not blue */
    --primary: 262 83% 58%;        /* Purple example */
    --primary-foreground: 0 0% 100%;
  }

  .dark {
    --background: 240 10% 8%;      /* Warm dark, not pure black */
    --foreground: 0 0% 95%;        /* Off-white, not pure white */
  }
}
```

**2. Extend component variants in your component files:**

```tsx
// Add custom variants beyond default/destructive/outline
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "...",
        // Add: subtle variant for secondary actions
        subtle: "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80",
        // Add: ghost with colored hover
        "ghost-primary": "hover:bg-primary/10 hover:text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        // Add: compact for dense UIs
        compact: "h-7 px-2 text-xs",
      }
    }
  }
)
```

**3. Add motion to shadcn components:**

```tsx
// Wrap Dialog content with motion
<Dialog>
  <DialogContent asChild>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* content */}
    </motion.div>
  </DialogContent>
</Dialog>
```

**4. Custom focus rings (replace default):**

```css
@layer base {
  /* Remove default focus, add custom */
  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-radius: calc(var(--radius) + 2px);
  }
}
```

## Motion Principles

### Timing Guidelines

| Action | Duration | Easing |
|--------|----------|--------|
| Micro-feedback (hover, press) | 50-100ms | ease-out |
| Small transitions (tooltips, dropdowns) | 100-150ms | ease-out |
| Medium transitions (modals, panels) | 150-250ms | ease-out or spring |
| Large transitions (page, view change) | 250-400ms | ease-in-out |
| Stagger delay between items | 30-50ms | - |

### CSS Motion Defaults

```css
/* Utility classes for common transitions */
.transition-fast { transition: all 100ms ease-out; }
.transition-base { transition: all 150ms ease-out; }
.transition-slow { transition: all 250ms ease-out; }

/* Entrance animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Apply with stagger */
.stagger-item {
  animation: slideUp 200ms ease-out backwards;
}
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 30ms; }
.stagger-item:nth-child(3) { animation-delay: 60ms; }
/* ... */
```

### Reduced Motion Support

Always provide reduced motion alternatives:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Edge Cases: First-Class Citizens

### Empty States

Never show blank space. Every empty state needs:
1. **Visual**: Illustration or icon (not generic)
2. **Headline**: What this area is for
3. **Description**: Why it's empty or what to do
4. **CTA**: Clear next action

```
┌─────────────────────────────────────┐
│                                     │
│           [Illustration]            │
│                                     │
│         No projects yet             │
│                                     │
│   Projects help you organize work   │
│   into focused collections.         │
│                                     │
│        [+ Create project]           │
│                                     │
└─────────────────────────────────────┘
```

### Loading States

Match the content shape (skeleton screens):

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 0%,
    var(--gray-100) 50%,
    var(--gray-200) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius);
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Error States

Errors should help, not blame:
- **Inline validation**: Show errors adjacent to the field, not in alerts
- **Specific messages**: "Email must include @" not "Invalid input"
- **Recovery path**: Tell users exactly how to fix it
- **Persistent until fixed**: Don't auto-dismiss error states

### Optimistic Updates

For fast-feeling UIs:
1. Update UI immediately on user action
2. Send request to server in background
3. If fails, revert UI and show non-blocking error
4. If succeeds, optionally confirm (subtle toast or no feedback needed)

## Keyboard & Accessibility

### Focus Management

- Tab order must be logical (DOM order matters)
- Focus trap in modals (can't tab out until closed)
- Return focus to trigger element when modal closes
- Skip links for main content

### Keyboard Shortcuts

For power user tools:
- Show shortcuts in tooltips: "Copy (⌘C)"
- Implement command palette (⌘K pattern)
- Support vim-style navigation where appropriate (j/k for lists)
- Escape always closes/cancels

### Screen Reader Considerations

- Announce dynamic content changes with aria-live
- Label all interactive elements
- Use semantic HTML (button, not div with onClick)
- Hide decorative elements from assistive tech

## Anti-Patterns to Avoid

### Visual
- ❌ Pure white (#fff) or pure black (#000) backgrounds
- ❌ Default system fonts (Arial, Times New Roman)
- ❌ Overly saturated colors
- ❌ Drop shadows that look like Figma defaults
- ❌ Border radius inconsistency (mixing 4px, 8px, 12px randomly)
- ❌ Text directly on images without overlay

### Interaction
- ❌ Hover effects that feel disconnected from click effects
- ❌ Animations longer than 300ms for small elements
- ❌ Loading spinners for operations under 300ms
- ❌ Focus outlines that are removed entirely
- ❌ Click targets smaller than 44px on touch devices

### Content
- ❌ "No data" as an empty state
- ❌ Technical error messages ("Error 500")
- ❌ Lorem ipsum in production
- ❌ Generic placeholder images

## Polish Checklist

Before considering a component/page complete:

- [ ] All interactive elements have hover, focus, active states
- [ ] Tab navigation works logically
- [ ] Empty state is designed and implemented
- [ ] Loading state shows content shape (skeleton)
- [ ] Error states provide helpful recovery guidance
- [ ] Dark mode works and isn't just inverted
- [ ] Animations respect prefers-reduced-motion
- [ ] Touch targets are minimum 44px
- [ ] Colors meet WCAG AA contrast ratios
- [ ] Typography hierarchy is clear without color
- [ ] Component works at 200% browser zoom

## Reference

For detailed micro-interaction patterns, animation recipes, and delight techniques, see `references/delight-catalog.md`.

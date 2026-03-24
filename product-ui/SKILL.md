---
name: product-ui
description: Build production-grade product interfaces with the invisible craft that makes professional software feel polished, responsive, and premium. Use this skill when building web applications, dashboards, SaaS interfaces, or any product UI that should feel like Linear, Stripe, Superhuman, Figma, Notion, or Slack. Focuses on interaction design, physics-based animation, state handling, and systematic design tokens — the quality users feel but can't pinpoint.
---

# Product UI Craft

This skill guides creation of production-grade product interfaces that feel polished, responsive, and premium. The goal: interfaces that look like they came from an expert product designer, not AI-generated templates.

**Inspiration:** Linear, Stripe, Superhuman, Figma, Notion, Slack

## Core Philosophy

Production quality comes from invisible craft — details users feel but can't pinpoint:
- **Keyboard-first** — Power users never touch the mouse
- **Instant feedback** — Optimistic updates, zero perceived latency
- **Graceful states** — Loading, empty, and error states that build trust
- **Systematic consistency** — Design tokens, not hardcoded values
- **Purposeful motion** — Physics-based animation that feels natural

If users notice the interface, something is wrong. Great product UI disappears.

## Decision Framework

### When Starting a New Interface

1. **Define the interaction model first**
   - What are the primary keyboard shortcuts?
   - How does selection work?
   - What's the command palette scope?

2. **Establish the token system**
   - Set up semantic colors, spacing scale, and typography
   - Never hardcode values — always use tokens
   - See [tokens.md](references/tokens.md)

3. **Map all states**
   - Loading: skeleton or spinner?
   - Empty: what action do we guide toward?
   - Error: how do we help recovery?
   - See [states.md](references/states.md)

4. **Plan motion intentionally**
   - What transitions maintain spatial continuity?
   - Where does micro-interaction add delight?
   - What should be instant?
   - See [animation.md](references/animation.md)

### Choosing Animation Approach

| Scenario | Approach | Timing |
|----------|----------|--------|
| Button hover/active | CSS transition | 100-150ms |
| Dropdown open | CSS or spring | 150-200ms |
| Modal/dialog | Spring animation | 200-300ms |
| List reorder | Layout animation | spring |
| State indicator | CSS transition | instant-150ms |
| Loading spinner | Linear rotation | continuous |

**Rule:** If you're debating whether to animate something, make it instant. Animation should be obvious wins.

### Loading State Selection

| Duration | Pattern |
|----------|---------|
| <200ms | No indicator (feels instant) |
| 200ms-2s | Spinner in context |
| >2s | Skeleton screen |
| Unknown/long | Progress bar + message |

### Empty State Design

Ask: "What should the user do next?"
- **First-time user** → Guide to primary action
- **Filtered to zero** → Offer to clear filters
- **Completed state** → Celebrate (inbox zero)
- **Search no results** → Suggest alternatives

## Implementation Checklist

### Keyboard & Focus
- [ ] Command palette (⌘K) implemented
- [ ] Primary actions have shortcuts
- [ ] Tab order is logical
- [ ] Focus trapping in modals
- [ ] Focus visible styles (not default)
- [ ] Roving tabindex for lists

### States
- [ ] Skeleton screens match content structure
- [ ] Empty states guide action
- [ ] Errors are specific and recoverable
- [ ] 0, 1, many cases handled
- [ ] Text overflow handled (truncation + tooltip)
- [ ] Optimistic updates where appropriate

### Motion
- [ ] Spring animations for entrances
- [ ] Reduced motion respected
- [ ] No layout-triggering animations
- [ ] Transitions under 300ms
- [ ] Staggered animations for lists

### Visual Polish
- [ ] Semantic color tokens used
- [ ] Consistent spacing rhythm
- [ ] Text selection styled
- [ ] Custom scrollbar (if needed)
- [ ] Focus rings match brand
- [ ] Shadows create hierarchy

## Reference Files

Detailed implementation patterns organized by domain:

- **[interactions.md](references/interactions.md)** — Command palette, keyboard shortcuts, focus management, selection patterns, drag interactions, cursor states
- **[animation.md](references/animation.md)** — Easing functions, spring physics, micro-interactions, page transitions, loading animations
- **[states.md](references/states.md)** — Loading states, empty states, error handling, edge cases, optimistic updates
- **[tokens.md](references/tokens.md)** — Color tokens, typography scale, spacing system, shadows, theming
- **[patterns.md](references/patterns.md)** — Concrete code recipes: navigation, lists, forms, toasts, modals, menus, scroll behavior

## Quick Patterns

### Command Palette Trigger
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(prev => !prev);
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);
```

### Spring Animation Config
```tsx
// Framer Motion presets
const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  smooth: { type: 'spring', stiffness: 300, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 15 },
};
```

### Semantic Color Token Structure
```css
:root {
  /* Surfaces */
  --surface-primary: #ffffff;
  --surface-secondary: #f9fafb;
  --surface-hover: rgba(0, 0, 0, 0.04);
  
  /* Text */
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  
  /* Accent */
  --accent: #3b82f6;
  --accent-subtle: rgba(59, 130, 246, 0.1);
}
```

### Skeleton Shimmer
```css
.skeleton {
  background: linear-gradient(90deg,
    var(--surface-secondary) 0%,
    var(--surface-tertiary) 50%,
    var(--surface-secondary) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Toast Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>
```

## Anti-Patterns to Avoid

**Don't:**
- Use `ease` or `linear` for UI transitions (use ease-out or springs)
- Animate width/height/top/left (use transform)
- Show spinners for fast operations (<200ms)
- Use `alert()` or browser-native dialogs
- Hardcode colors, spacing, or font sizes
- Forget keyboard navigation
- Skip empty/error states
- Over-animate (if in doubt, make it instant)

**Do:**
- Prefer CSS transitions for simple state changes
- Use springs for entrances and complex motion
- Show skeletons that match content structure
- Make all destructive actions reversible (undo)
- Test with keyboard-only navigation
- Handle all edge cases (0, 1, many, overflow)
- Respect `prefers-reduced-motion`

# Animation & Motion

Production-grade interfaces use motion to communicate state, guide attention, and create perceived responsiveness. The goal is motion that feels natural and purposeful, never decorative.

## Table of Contents
- [Physics Principles](#physics-principles)
- [Easing Functions](#easing-functions)
- [CSS Transitions](#css-transitions)
- [Spring Animations](#spring-animations)
- [Micro-Interactions](#micro-interactions)
- [Page Transitions](#page-transitions)
- [Loading Animations](#loading-animations)
- [When Not to Animate](#when-not-to-animate)

---

## Physics Principles

### Natural Motion Feels Right
Real objects don't move linearly. They accelerate, decelerate, and sometimes overshoot. Physics-based animations create interfaces that feel tangible.

**Key principles:**
1. **Mass** — Heavier elements move slower, lighter elements snap
2. **Friction** — Determines how quickly motion settles
3. **Tension** — Spring tightness affects speed and bounce
4. **Spatial awareness** — Elements move in relation to each other

### Duration Guidelines

| Element | Duration | Reasoning |
|---------|----------|-----------|
| Micro-interactions | 100-150ms | Immediate feedback |
| Tooltips, dropdowns | 150-200ms | Quick but visible |
| Modals, panels | 200-300ms | Noticeable entrance |
| Page transitions | 300-400ms | Smooth navigation |
| Complex orchestration | 400-600ms | Staggered sequences |

**Rule:** If users notice the animation, it's probably too slow. Motion should feel instant while providing visual continuity.

---

## Easing Functions

### CSS Easing (Use for Simple Transitions)

```css
:root {
  /* Standard easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Quick start, smooth finish */
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);      /* Slow start, quick finish */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* Smooth both ends */
  
  /* Expressive easings */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);    /* Snappy exits */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Smooth deceleration */
  
  /* Spring-like CSS approximations */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### When to Use Each

| Easing | Use Case |
|--------|----------|
| `ease-out` | Elements entering (modals, dropdowns) |
| `ease-in` | Elements exiting (closing, dismissing) |
| `ease-out-back` | Playful entrances (toasts, badges) |
| `linear` | Only for continuous animations (spinners, progress) |

**Never use `ease` (the default)** — it's generic and lacks character.

---

## CSS Transitions

### Base Transition Classes

```css
/* Apply transitions to interactive elements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
  transition-timing-function: var(--ease-out);
}

.transition-transform {
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}

.transition-opacity {
  transition-property: opacity;
  transition-duration: 150ms;
  transition-timing-function: var(--ease-out);
}

.transition-all {
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
```

### Performant Animations

Only animate these properties for 60fps:
- `transform` (translate, scale, rotate)
- `opacity`

Avoid animating:
- `width`, `height` (triggers layout)
- `top`, `left` (triggers layout)
- `box-shadow` (triggers paint — fake with pseudo-elements)

```css
/* Bad: animates box-shadow directly */
.card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* Good: animates pseudo-element opacity */
.card {
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.2s var(--ease-out);
  pointer-events: none;
}

.card:hover::after {
  opacity: 1;
}
```

---

## Spring Animations

Springs feel more natural than easing curves because they simulate physics. Use Framer Motion (React) or Motion One (vanilla) for spring animations.

### Framer Motion Patterns

```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Spring config presets
const springs = {
  // Snappy, minimal overshoot - buttons, small elements
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  
  // Smooth, no overshoot - modals, panels
  smooth: { type: 'spring', stiffness: 300, damping: 30 },
  
  // Bouncy, playful - toasts, badges, success states
  bouncy: { type: 'spring', stiffness: 400, damping: 15 },
  
  // Gentle, slow settle - page transitions
  gentle: { type: 'spring', stiffness: 200, damping: 20 },
};

// Modal with spring animation
const Modal = ({ open, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={springs.smooth}
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// List with staggered children
const List = ({ items }) => (
  <motion.ul
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.05,
        },
      },
    }}
  >
    {items.map(item => (
      <motion.li
        key={item.id}
        variants={{
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={springs.snappy}
      >
        {item.name}
      </motion.li>
    ))}
  </motion.ul>
);
```

### Layout Animations

```tsx
// Smooth layout transitions when items reorder
<motion.div layout transition={springs.snappy}>
  {items.map(item => (
    <motion.div 
      key={item.id} 
      layout 
      layoutId={item.id}
      transition={springs.snappy}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Shared element transitions
<motion.div layoutId="hero-image">
  <img src={thumbnail} />
</motion.div>

// In detail view:
<motion.div layoutId="hero-image">
  <img src={fullImage} />
</motion.div>
```

---

## Micro-Interactions

### Button States

```css
.button {
  transition: 
    transform 0.1s var(--ease-out),
    background-color 0.15s var(--ease-out),
    box-shadow 0.15s var(--ease-out);
}

.button:hover {
  background-color: var(--button-hover);
}

.button:active {
  transform: scale(0.98);
}

/* Primary button with glow on hover */
.button-primary:hover {
  box-shadow: 
    0 0 0 1px var(--accent),
    0 4px 12px var(--accent-glow);
}
```

### Toggle/Switch

```tsx
const Toggle = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="toggle"
  >
    <motion.div
      className="toggle-thumb"
      animate={{ x: checked ? 20 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
);
```

```css
.toggle {
  width: 44px;
  height: 24px;
  background: var(--surface-tertiary);
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  transition: background 0.2s;
}

.toggle[aria-checked="true"] {
  background: var(--accent);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
```

### Checkbox with Check Animation

```tsx
const Checkbox = ({ checked, onChange }) => (
  <button
    role="checkbox"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="checkbox"
  >
    <svg viewBox="0 0 16 16" className="checkbox-icon">
      <motion.path
        d="M3.5 8L6.5 11L12.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          pathLength: checked ? 1 : 0,
          opacity: checked ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </svg>
  </button>
);
```

### Hover Card Lift

```css
.card {
  transition: transform 0.2s var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
}

/* Subtle shadow increase with pseudo-element for performance */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  opacity: 0;
  transition: opacity 0.2s var(--ease-out);
  pointer-events: none;
}

.card:hover::after {
  opacity: 1;
}
```

### Icon Button Feedback

```css
.icon-button {
  position: relative;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.1s;
}

.icon-button:hover {
  background: var(--surface-hover);
}

.icon-button:active {
  background: var(--surface-active);
}

/* Ripple effect on click */
.icon-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent);
  opacity: 0;
  transform: scale(0);
  transition: transform 0.3s, opacity 0.3s;
}

.icon-button:active::after {
  transform: scale(1);
  opacity: 0.1;
  transition: transform 0s, opacity 0s;
}
```

---

## Page Transitions

### View Transitions API (Modern Browsers)

```css
/* Enable view transitions */
@view-transition {
  navigation: auto;
}

/* Customize transition animations */
::view-transition-old(root) {
  animation: fade-out 0.15s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.15s ease-out 0.1s both;
}

/* Named transitions for specific elements */
.hero-image {
  view-transition-name: hero;
}

::view-transition-group(hero) {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Route Transitions with Framer Motion

```tsx
// Wrap routes with AnimatePresence
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
  </Routes>
</AnimatePresence>

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);
```

---

## Loading Animations

### Skeleton Shimmer

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-secondary) 0%,
    var(--surface-tertiary) 50%,
    var(--surface-secondary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Spinner

```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-subtle);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Progress Indicator

```tsx
const ProgressBar = ({ progress }) => (
  <div className="progress-track">
    <motion.div
      className="progress-fill"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  </div>
);
```

---

## When Not to Animate

### Instant Interactions
Some interactions should be instant:
- Text input feedback
- Hover color changes on buttons (keep brief: 100-150ms max)
- Selection state changes
- Focus ring appearance
- Scrolling (never add artificial scroll smoothing)

### Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Signs of Over-Animation
- Users waiting for animations to complete
- Multiple animations competing for attention
- Animation duration longer than 300ms for common actions
- Motion that doesn't convey information

**The best motion goes unnoticed.** It makes interfaces feel responsive and alive without drawing attention to itself.

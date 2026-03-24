# Delight Catalog

Specific techniques that make interfaces feel crafted. Load this reference when polishing components or adding finishing touches.

## Micro-Interactions by Component

### Buttons

**Magnetic hover** (Linear-style):
```css
.button {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**Ripple effect** (Material-inspired but subtle):
```css
.button {
  position: relative;
  overflow: hidden;
}
.button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x) var(--y),
    rgba(255,255,255,0.3) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 200ms;
}
.button:active::after {
  opacity: 1;
}
```

**Loading state transition**:
```tsx
// Smooth width transition when text changes to spinner
<button className="min-w-[100px] transition-all duration-200">
  {isLoading ? <Spinner className="w-4 h-4" /> : "Save"}
</button>
```

### Form Inputs

**Focus animation** (border grows from center):
```css
.input-wrapper {
  position: relative;
}
.input-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all 200ms ease-out;
}
.input:focus + .input-wrapper::after,
.input-wrapper:focus-within::after {
  left: 0;
  width: 100%;
}
```

**Floating label**:
```css
.field {
  position: relative;
}
.label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 150ms ease-out;
  pointer-events: none;
  color: var(--color-text-tertiary);
}
.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  background: var(--color-bg-primary);
  padding: 0 4px;
  color: var(--color-primary);
}
```

**Validation feedback** (shake on error):
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.input-error {
  animation: shake 200ms ease-out;
  border-color: var(--color-error);
}
```

### Cards & Containers

**Hover lift** (subtle depth):
```css
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
```

**Border glow on focus** (Notion-style):
```css
.card:focus-within {
  box-shadow:
    0 0 0 1px var(--color-primary),
    0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
}
```

**Expand on select** (selection feels weighty):
```css
.card[data-selected="true"] {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1;
}
```

### Tooltips & Popovers

**Entrance animation**:
```css
.tooltip {
  animation: tooltipIn 150ms ease-out;
}
@keyframes tooltipIn {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

**Delayed show** (prevents flicker on mouse pass-through):
```css
.tooltip-trigger:hover .tooltip {
  animation: tooltipIn 150ms ease-out 200ms backwards;
}
```

### Dropdown Menus

**Staggered item reveal**:
```css
.dropdown-item {
  opacity: 0;
  transform: translateX(-8px);
  animation: slideIn 150ms ease-out forwards;
}
.dropdown-item:nth-child(1) { animation-delay: 0ms; }
.dropdown-item:nth-child(2) { animation-delay: 25ms; }
.dropdown-item:nth-child(3) { animation-delay: 50ms; }
/* ... continue pattern */

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Keyboard navigation highlight**:
```css
.dropdown-item[data-highlighted] {
  background: var(--color-bg-tertiary);
  /* Optional: subtle slide */
  transform: translateX(2px);
  transition: all 100ms ease-out;
}
```

### Modals & Dialogs

**Backdrop blur + fade**:
```css
.backdrop {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  animation: fadeIn 200ms ease-out;
}
```

**Content spring entrance** (Framer Motion):
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 25
  }}
>
```

**Exit animation** (don't just disappear):
```css
.modal-exit {
  animation: modalOut 150ms ease-in forwards;
}
@keyframes modalOut {
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}
```

### Toggle Switches

**Thumb with spring**:
```css
.toggle-thumb {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toggle[data-state="checked"] .toggle-thumb {
  transform: translateX(20px);
}
```

**Background color morph**:
```css
.toggle {
  background: var(--color-bg-tertiary);
  transition: background 200ms ease-out;
}
.toggle[data-state="checked"] {
  background: var(--color-primary);
}
```

### Checkboxes

**Check mark draw-in**:
```css
.checkbox-indicator svg path {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset 200ms ease-out;
}
.checkbox[data-state="checked"] .checkbox-indicator svg path {
  stroke-dashoffset: 0;
}
```

**Scale pop on check**:
```css
.checkbox[data-state="checked"] {
  animation: checkPop 200ms ease-out;
}
@keyframes checkPop {
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

## Page-Level Patterns

### List Stagger Load

```css
.list-item {
  opacity: 0;
  transform: translateY(10px);
  animation: listItemIn 300ms ease-out forwards;
}
/* Generate delays dynamically or use nth-child */
.list-item:nth-child(n) {
  animation-delay: calc(n * 40ms);
}
```

### Scroll-Triggered Reveals

```tsx
// Using Intersection Observer
const [isVisible, setIsVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

return (
  <div
    ref={ref}
    className={cn(
      "transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}
  >
```

### Skeleton to Content

```css
.skeleton-to-content {
  animation: skeletonFadeOut 300ms ease-out forwards;
}
@keyframes skeletonFadeOut {
  0% {
    opacity: 1;
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
```

### View Transitions (between pages/tabs)

```css
/* Tab content crossfade */
.tab-content-enter {
  animation: fadeSlideIn 200ms ease-out;
}
.tab-content-exit {
  animation: fadeSlideOut 150ms ease-in;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-10px); }
}
```

## Feedback Patterns

### Toast Notifications

**Slide in from edge + progress bar**:
```css
.toast {
  animation: toastIn 300ms ease-out;
}
@keyframes toastIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Auto-dismiss progress */
.toast-progress {
  height: 3px;
  background: var(--color-primary);
  animation: toastProgress 5s linear forwards;
}
@keyframes toastProgress {
  from { width: 100%; }
  to { width: 0%; }
}
```

### Success Confirmations

**Checkmark draw + scale**:
```css
.success-check {
  animation: successPop 400ms ease-out;
}
.success-check path {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheck 300ms ease-out 100ms forwards;
}
@keyframes successPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}
```

### Inline Save Status

**Subtle status indicator**:
```tsx
// Shows: "Saving..." → "Saved" → fades out
<span className={cn(
  "text-xs text-muted-foreground transition-opacity duration-300",
  status === 'idle' && "opacity-0",
  status === 'saving' && "opacity-100",
  status === 'saved' && "opacity-100"
)}>
  {status === 'saving' && "Saving..."}
  {status === 'saved' && "✓ Saved"}
</span>
```

## Delight Extras

### Cursor Customization

```css
/* Custom cursor for interactive elements */
.interactive {
  cursor: url('data:image/svg+xml,...'), pointer;
}

/* Grab cursor for draggable */
.draggable { cursor: grab; }
.draggable:active { cursor: grabbing; }
```

### Selection Styling

```css
::selection {
  background: var(--color-primary);
  color: white;
}
```

### Scroll Shadows (content overflow indicator)

```css
.scroll-container {
  background:
    linear-gradient(white 30%, transparent),
    linear-gradient(transparent, white 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0,0.1), transparent),
    radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,0.1), transparent) 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;
}
```

### Number Transitions

```tsx
// Animated number change
<motion.span
  key={value}
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 20, opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  {value}
</motion.span>
```

### Typing Indicator

```css
.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--color-text-tertiary);
  border-radius: 50%;
  animation: typingBounce 1s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}
```

### Confetti Burst (for celebrations)

Use a library like `canvas-confetti` or `react-confetti` for:
- Task completion
- Achievement unlocked
- Milestone reached

Trigger sparingly—once per session maximum for the same event type.

## Performance Notes

- Prefer `transform` and `opacity` for animations (GPU accelerated)
- Use `will-change` sparingly and remove after animation completes
- Batch DOM reads and writes to prevent layout thrashing
- Test animations at 6x slowdown in DevTools
- Consider `content-visibility: auto` for off-screen content

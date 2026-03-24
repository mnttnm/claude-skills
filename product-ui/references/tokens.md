# Design Tokens & Systematic Design

Design tokens create consistency and enable theming. They're the bridge between design decisions and code. This guide covers semantic naming, spacing systems, and theming architecture.

## Table of Contents
- [Token Architecture](#token-architecture)
- [Color Tokens](#color-tokens)
- [Typography](#typography)
- [Spacing & Sizing](#spacing--sizing)
- [Shadows & Elevation](#shadows--elevation)
- [Border & Radius](#border--radius)
- [Theming System](#theming-system)

---

## Token Architecture

### Three Levels of Tokens

```
Primitive → Semantic → Component
```

1. **Primitive tokens** — Raw values (colors, sizes)
2. **Semantic tokens** — Purpose-driven names (surface, text, border)
3. **Component tokens** — Component-specific overrides (button-bg)

```css
:root {
  /* Primitive: Raw values */
  --gray-50: #fafafa;
  --gray-100: #f4f4f5;
  --gray-900: #18181b;
  --blue-500: #3b82f6;

  /* Semantic: Purpose-driven */
  --surface-primary: var(--gray-50);
  --surface-secondary: var(--gray-100);
  --text-primary: var(--gray-900);
  --accent: var(--blue-500);

  /* Component: Specific overrides (optional) */
  --button-bg: var(--accent);
  --button-text: white;
}
```

### Naming Convention

```
--{category}-{property}-{variant}-{state}

Examples:
--color-text-primary
--color-surface-hover
--spacing-md
--radius-lg
--shadow-elevated
```

---

## Color Tokens

### Semantic Color System

```css
:root {
  /* Surfaces (backgrounds) */
  --surface-primary: #ffffff;      /* Main background */
  --surface-secondary: #f9fafb;    /* Subtle sections */
  --surface-tertiary: #f3f4f6;     /* Deeper nesting */
  --surface-elevated: #ffffff;     /* Modals, popovers */
  --surface-overlay: rgba(0, 0, 0, 0.5); /* Backdrop */

  /* Interactive surfaces */
  --surface-hover: rgba(0, 0, 0, 0.04);
  --surface-active: rgba(0, 0, 0, 0.08);
  --surface-selected: rgba(59, 130, 246, 0.08);

  /* Text */
  --text-primary: #111827;         /* Main content */
  --text-secondary: #6b7280;       /* Supporting text */
  --text-tertiary: #9ca3af;        /* Placeholders, hints */
  --text-disabled: #d1d5db;        /* Disabled state */
  --text-inverse: #ffffff;         /* On dark backgrounds */
  --text-link: #2563eb;            /* Links */

  /* Borders */
  --border-default: #e5e7eb;       /* Standard borders */
  --border-subtle: #f3f4f6;        /* Subtle dividers */
  --border-strong: #d1d5db;        /* Emphasized borders */
  --border-focus: #3b82f6;         /* Focus rings */

  /* Accent (primary brand color) */
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --accent-active: #1d4ed8;
  --accent-subtle: rgba(59, 130, 246, 0.1);
  --accent-glow: rgba(59, 130, 246, 0.25);

  /* Semantic states */
  --success: #10b981;
  --success-subtle: rgba(16, 185, 129, 0.1);
  --success-surface: #ecfdf5;
  --success-border: #a7f3d0;

  --warning: #f59e0b;
  --warning-subtle: rgba(245, 158, 11, 0.1);
  --warning-surface: #fffbeb;
  --warning-border: #fde68a;

  --error: #ef4444;
  --error-subtle: rgba(239, 68, 68, 0.1);
  --error-surface: #fef2f2;
  --error-border: #fecaca;

  --info: #3b82f6;
  --info-subtle: rgba(59, 130, 246, 0.1);
  --info-surface: #eff6ff;
  --info-border: #bfdbfe;

  /* Focus */
  --focus-ring: #3b82f6;
  --focus-ring-subtle: rgba(59, 130, 246, 0.2);

  /* Selection */
  --selection-bg: rgba(59, 130, 246, 0.15);
  --selection-text: inherit;
}

/* Text selection styling */
::selection {
  background: var(--selection-bg);
  color: var(--selection-text);
}
```

### Color Usage Guidelines

| Token | Use For |
|-------|---------|
| `surface-primary` | Main app background |
| `surface-secondary` | Cards, sidebars, sections |
| `surface-tertiary` | Nested containers, code blocks |
| `surface-elevated` | Modals, dropdowns, tooltips |
| `surface-hover` | Interactive element hover |
| `text-primary` | Headings, body text |
| `text-secondary` | Descriptions, labels |
| `text-tertiary` | Placeholders, timestamps |
| `border-default` | Input borders, dividers |
| `border-subtle` | Light separators |

---

## Typography

### Type Scale

```css
:root {
  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

  /* Font sizes (use rem for accessibility) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.8125rem;  /* 13px */
  --text-base: 0.875rem; /* 14px - default body */
  --text-md: 1rem;       /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */

  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

### Typography Presets

```css
/* Headings */
.heading-1 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

.heading-2 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.heading-3 {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* Body */
.body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

.body-sm {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* Labels */
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  color: var(--text-primary);
}

.label-sm {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
}

/* Code */
.code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--surface-tertiary);
  padding: 0.125em 0.375em;
  border-radius: 4px;
}
```

---

## Spacing & Sizing

### Spacing Scale (4px base)

```css
:root {
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0.5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;     /* 4px */
  --spacing-1.5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;      /* 8px */
  --spacing-2.5: 0.625rem;  /* 10px */
  --spacing-3: 0.75rem;     /* 12px */
  --spacing-4: 1rem;        /* 16px */
  --spacing-5: 1.25rem;     /* 20px */
  --spacing-6: 1.5rem;      /* 24px */
  --spacing-8: 2rem;        /* 32px */
  --spacing-10: 2.5rem;     /* 40px */
  --spacing-12: 3rem;       /* 48px */
  --spacing-16: 4rem;       /* 64px */
  --spacing-20: 5rem;       /* 80px */
  --spacing-24: 6rem;       /* 96px */
}
```

### Semantic Spacing

```css
:root {
  /* Component internal spacing */
  --space-inset-xs: var(--spacing-1);    /* Tight padding */
  --space-inset-sm: var(--spacing-2);    /* Compact padding */
  --space-inset-md: var(--spacing-3);    /* Standard padding */
  --space-inset-lg: var(--spacing-4);    /* Generous padding */

  /* Between elements */
  --space-stack-xs: var(--spacing-1);    /* Tight vertical */
  --space-stack-sm: var(--spacing-2);    /* Compact vertical */
  --space-stack-md: var(--spacing-4);    /* Standard vertical */
  --space-stack-lg: var(--spacing-6);    /* Generous vertical */

  /* Inline spacing */
  --space-inline-xs: var(--spacing-1);
  --space-inline-sm: var(--spacing-2);
  --space-inline-md: var(--spacing-3);
  --space-inline-lg: var(--spacing-4);

  /* Section spacing */
  --space-section-sm: var(--spacing-8);
  --space-section-md: var(--spacing-12);
  --space-section-lg: var(--spacing-16);
}
```

### Common Sizing

```css
:root {
  /* Icons */
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;

  /* Avatars */
  --avatar-xs: 20px;
  --avatar-sm: 24px;
  --avatar-md: 32px;
  --avatar-lg: 40px;
  --avatar-xl: 64px;

  /* Touch targets */
  --touch-target-min: 44px;

  /* Content widths */
  --content-sm: 640px;
  --content-md: 768px;
  --content-lg: 1024px;
  --content-xl: 1280px;
}
```

---

## Shadows & Elevation

### Shadow Scale

```css
:root {
  /* Subtle shadows (use for cards, containers) */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Elevated (modals, popovers) */
  --shadow-elevated: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.12);

  /* Focus/glow effects */
  --shadow-focus: 0 0 0 3px var(--focus-ring-subtle);
  --shadow-accent-glow: 0 0 20px var(--accent-glow);

  /* Inner shadows (inset elements) */
  --shadow-inner: inset 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-inner-lg: inset 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

### Elevation Levels

| Level | Token | Use Case |
|-------|-------|----------|
| 0 | none | Flat surfaces |
| 1 | `shadow-xs` | Subtle separation |
| 2 | `shadow-sm` | Cards, panels |
| 3 | `shadow-md` | Dropdowns |
| 4 | `shadow-lg` | Popovers, tooltips |
| 5 | `shadow-elevated` | Modals, command palette |

---

## Border & Radius

### Border Radius Scale

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
}
```

### Radius Usage

| Element | Radius |
|---------|--------|
| Buttons | `radius-md` |
| Inputs | `radius-md` |
| Cards | `radius-lg` |
| Modals | `radius-xl` |
| Avatars | `radius-full` |
| Badges | `radius-full` |
| Tooltips | `radius-md` |

### Border Widths

```css
:root {
  --border-width-default: 1px;
  --border-width-thick: 2px;
}
```

---

## Theming System

### Dark Mode with CSS Variables

```css
/* Light theme (default) */
:root {
  --surface-primary: #ffffff;
  --surface-secondary: #f9fafb;
  --surface-tertiary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-default: #e5e7eb;
  /* ... */
}

/* Dark theme */
[data-theme="dark"] {
  --surface-primary: #0f0f0f;
  --surface-secondary: #171717;
  --surface-tertiary: #262626;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --border-default: #27272a;
  
  /* Adjusted shadows for dark mode */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-elevated: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 16px 32px rgba(0, 0, 0, 0.4);
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Dark theme variables */
  }
}
```

### Theme Toggle Implementation

```tsx
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as any) || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      root.removeAttribute('data-theme');
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }

    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme toggle button
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const options = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          onClick={() => setTheme(value)}
          className="theme-toggle-option"
        >
          <Icon />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
};
```

### Accent Color Customization

```css
:root {
  /* Default accent (blue) */
  --accent-h: 217;
  --accent-s: 91%;
  --accent-l: 60%;
}

[data-accent="purple"] {
  --accent-h: 262;
  --accent-s: 83%;
  --accent-l: 58%;
}

[data-accent="green"] {
  --accent-h: 142;
  --accent-s: 71%;
  --accent-l: 45%;
}

/* Derive all accent variants from HSL */
:root {
  --accent: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  --accent-hover: hsl(var(--accent-h), var(--accent-s), calc(var(--accent-l) - 8%));
  --accent-active: hsl(var(--accent-h), var(--accent-s), calc(var(--accent-l) - 15%));
  --accent-subtle: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.1);
  --accent-glow: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.25);
}
```

### Applying Tokens Consistently

```tsx
// Token utility (use with Tailwind or custom solution)
const tokens = {
  colors: {
    'surface-primary': 'var(--surface-primary)',
    'text-primary': 'var(--text-primary)',
    // ... map all tokens
  },
  spacing: {
    '1': 'var(--spacing-1)',
    '2': 'var(--spacing-2)',
    // ...
  },
};

// Or CSS-in-JS
const Button = styled.button`
  background: var(--accent);
  color: var(--text-inverse);
  padding: var(--space-inset-sm) var(--space-inset-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  
  &:hover {
    background: var(--accent-hover);
  }
`;
```

# Dashboard Design Tokens Reference

## Color Tokens

### Light Mode
```css
:root {
  /* Surfaces */
  --surface-primary: #FFFFFF;
  --surface-secondary: #F9FAFB;
  --surface-tertiary: #F3F4F6;
  --surface-hover: rgba(0, 0, 0, 0.04);
  
  /* Text */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;
  --text-disabled: #D1D5DB;
  
  /* Borders */
  --border-default: #E5E7EB;
  --border-subtle: #F3F4F6;
  
  /* Semantic - Status */
  --color-success: #10B981;
  --color-success-bg: #ECFDF5;
  --color-warning: #F59E0B;
  --color-warning-bg: #FFFBEB;
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-info: #3B82F6;
  --color-info-bg: #EFF6FF;
  
  /* Brand */
  --brand-primary: #3B82F6;
  --brand-primary-hover: #2563EB;
  --brand-primary-subtle: rgba(59, 130, 246, 0.1);
}
```

### Dark Mode
```css
[data-theme="dark"] {
  /* Surfaces */
  --surface-primary: #1F2937;
  --surface-secondary: #111827;
  --surface-tertiary: #374151;
  --surface-hover: rgba(255, 255, 255, 0.05);
  
  /* Text */
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-tertiary: #9CA3AF;
  --text-disabled: #6B7280;
  
  /* Borders */
  --border-default: #374151;
  --border-subtle: #1F2937;
  
  /* Semantic - Desaturated for dark mode */
  --color-success: #34D399;
  --color-success-bg: rgba(52, 211, 153, 0.1);
  --color-warning: #FBBF24;
  --color-warning-bg: rgba(251, 191, 36, 0.1);
  --color-error: #F87171;
  --color-error-bg: rgba(248, 113, 113, 0.1);
  --color-info: #60A5FA;
  --color-info-bg: rgba(96, 165, 250, 0.1);
}
```

## Typography Tokens

```css
:root {
  /* Font Family */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

## Spacing Tokens

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

## Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Card shadow */
  --shadow-card: 
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  
  /* Elevated hover */
  --shadow-hover: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
}
```

## Border Radius Tokens

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

## Animation Tokens

```css
:root {
  /* Durations */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* Easings */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Spring (for JS) */
  --spring-snappy: { stiffness: 400, damping: 30 };
  --spring-smooth: { stiffness: 300, damping: 30 };
}
```

## Data Visualization Palette

```css
:root {
  /* Categorical (max 6 for distinction) */
  --chart-1: #3B82F6;  /* Blue */
  --chart-2: #10B981;  /* Green */
  --chart-3: #F59E0B;  /* Amber */
  --chart-4: #EF4444;  /* Red */
  --chart-5: #8B5CF6;  /* Purple */
  --chart-6: #EC4899;  /* Pink */
  
  /* Sequential (single hue) */
  --seq-1: #DBEAFE;
  --seq-2: #93C5FD;
  --seq-3: #60A5FA;
  --seq-4: #3B82F6;
  --seq-5: #2563EB;
  --seq-6: #1D4ED8;
  
  /* Divergent (red-gray-green) */
  --div-neg-3: #DC2626;
  --div-neg-2: #F87171;
  --div-neg-1: #FCA5A5;
  --div-neutral: #D1D5DB;
  --div-pos-1: #86EFAC;
  --div-pos-2: #34D399;
  --div-pos-3: #059669;
}
```

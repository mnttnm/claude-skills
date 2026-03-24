# Page Structure & Information Hierarchy

Every pixel should earn its place. Structure content so users find what they need without searching.

## Table of Contents
- [Visual Hierarchy Principles](#visual-hierarchy-principles)
- [Page Anatomy](#page-anatomy)
- [Content Zones](#content-zones)
- [Layout Patterns](#layout-patterns)
- [Responsive Strategies](#responsive-strategies)
- [Density & Breathing Room](#density--breathing-room)

---

## Visual Hierarchy Principles

### The Squint Test
Blur your vision (or blur the screen). Can you still identify:
1. What this page is about?
2. The primary action?
3. The main content areas?

If not, hierarchy needs work.

### Hierarchy Tools (in order of impact)

| Tool | Impact | Use For |
|------|--------|---------|
| Size | Highest | Page title, primary headings |
| Position | High | Key actions (top, center), secondary (bottom, sides) |
| Color/Contrast | High | Actions, status, emphasis |
| Weight | Medium | Headings, labels, important text |
| Whitespace | Medium | Grouping, separation, focus |
| Typography | Lower | Hierarchy within text content |

### The F-Pattern
Users scan in an F-shape: top → left column → scanning right occasionally.

```
████████████████████████
████████████████
████████████████████
████████████
████████
```

**Implications:**
- Critical info goes top-left
- Left column for navigation/key items
- Don't bury important content bottom-right
- First words of each line matter most

### The Z-Pattern
For less text-heavy pages (landing pages, dashboards):

```
1 ─────────────────→ 2
         ↘
            ↘
               ↘
3 ─────────────────→ 4
```

**Use for:** Marketing pages, simple forms, dashboards with cards.

---

## Page Anatomy

### Standard Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Logo] [Navigation]                    [Search] [User]      │
├─────────────────────────────────────────────────────────────┤
│ PAGE HEADER                                                 │
│ Breadcrumb > Path > Here                                    │
│ Page Title                              [Primary Action]    │
│ Description or context                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ MAIN CONTENT                                                │
│                                                             │
│ Primary content goes here. This is where users              │
│ accomplish their main task.                                 │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER (if needed)                                          │
│ Secondary links, legal, status                              │
└─────────────────────────────────────────────────────────────┘
```

### Page Header Essentials

Every page header needs:
1. **Title** — What is this page? (H1)
2. **Context** — How did I get here? (breadcrumb or back link)
3. **Primary action** — What can I do? (top-right button)

Optional:
- Description/subtitle
- Tabs for sub-views
- Filters or search (if primary interaction)
- Meta info (last updated, status)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Projects                                          │
│                                                             │
│ Acme Website Redesign                    [Edit] [Share]     │
│ Marketing • Created Mar 15 • 12 tasks                       │
│                                                             │
│ [Overview]  [Tasks]  [Files]  [Activity]                    │
└─────────────────────────────────────────────────────────────┘
```

### Content Area Patterns

**Single column** — Reading, forms, focused tasks
```
┌─────────────────────────────────────────┐
│        Content (max-width: 680px)       │
└─────────────────────────────────────────┘
```

**Two column** — Content + sidebar (metadata, related)
```
┌───────────────────────────────┬─────────┐
│         Main Content          │ Sidebar │
│         (flexible)            │ (fixed) │
└───────────────────────────────┴─────────┘
```

**Three column** — Nav + content + detail
```
┌─────────┬───────────────────┬───────────┐
│   Nav   │    Main Content   │  Detail   │
│ (fixed) │    (flexible)     │  (fixed)  │
└─────────┴───────────────────┴───────────┘
```

---

## Content Zones

### Above the Fold
What users see without scrolling. Must include:
- Page identity (title, context)
- Primary action or entry point
- Enough content to understand the page

**Don't** cram everything here. Give users reason to scroll.

### Primary Content Zone
Where users accomplish their main task.

**Rules:**
- Largest portion of screen real estate
- Minimal distractions
- Clear boundaries from secondary content
- Consistent location across pages

### Secondary Content Zone
Supporting information that aids the primary task.

**Examples:**
- Metadata sidebar (status, dates, assignees)
- Related items
- Help/documentation links
- Quick actions

**Rules:**
- Visually subordinate (smaller, lighter, aside)
- Don't compete with primary content
- Can be collapsed or hidden

### Action Zones

**Page-level actions:** Top-right of page header
```
[Page Title]                    [Secondary] [Primary]
```

**Section actions:** Top-right of section
```
┌─────────────────────────────────────────┐
│ Section Title              [Add] [More] │
├─────────────────────────────────────────┤
```

**Inline actions:** On hover or as part of content
```
┌─────────────────────────────────────────┐
│ Item name                [Edit] [Delete]│
└─────────────────────────────────────────┘
```

**Bulk actions:** Appear when items selected
```
┌─────────────────────────────────────────┐
│ 3 selected    [Archive] [Delete] [More] │
└─────────────────────────────────────────┘
```

---

## Layout Patterns

### List-Detail (Master-Detail)
For browsing and viewing items. Linear uses this extensively.

```
┌─────────────────┬───────────────────────────────┐
│ List            │ Selected Item Detail          │
│                 │                               │
│ > Item 1        │ Title                         │
│   Item 2        │ Full content and actions      │
│   Item 3        │                               │
│   Item 4        │                               │
└─────────────────┴───────────────────────────────┘
```

**When to use:**
- Email, messages, issues, documents
- Items benefit from preview without navigation
- Frequent switching between items

**Best practices:**
- List should be scannable (key info visible)
- Detail panel can be resized
- Mobile: stack vertically, drill-down navigation

### Card Grid
For browsing visual or equal-weight items.

```
┌─────────┐ ┌─────────┐ ┌─────────┐
│  Card   │ │  Card   │ │  Card   │
│         │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│  Card   │ │  Card   │ │  Card   │
└─────────┘ └─────────┘ └─────────┘
```

**When to use:**
- Projects, files, products
- Visual differentiation matters
- No clear hierarchy between items

**Best practices:**
- Consistent card sizes
- Key info visible without hover
- Clear click/tap targets

### Dashboard Layout
For overview and monitoring.

```
┌─────────────────────────────────────────────────┐
│ [Metric]    [Metric]    [Metric]    [Metric]    │  Stats row
├─────────────────────────────┬───────────────────┤
│                             │                   │
│     Main Chart/Table        │    Side Panel     │
│                             │    (Activity,     │
│                             │     Tasks)        │
├─────────────────────────────┴───────────────────┤
│ [Widget]           [Widget]           [Widget]  │  Secondary
└─────────────────────────────────────────────────┘
```

**Best practices:**
- Most important metrics at top
- Scannable without deep reading
- Clear visual hierarchy
- Clickable to drill down

### Form Layout
For data entry and settings.

```
┌─────────────────────────────────────────────────┐
│ Form Title                                      │
│ Brief description of what this form does        │
├─────────────────────────────────────────────────┤
│                                                 │
│ Section 1                                       │
│ ┌─────────────────────────────────────────────┐ │
│ │ Label                                       │ │
│ │ [Input field                              ] │ │
│ │ Help text if needed                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Section 2                                       │
│ ┌─────────────────────────────────────────────┐ │
│ │ ...                                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
├─────────────────────────────────────────────────┤
│                           [Cancel] [Save]       │
└─────────────────────────────────────────────────┘
```

**Best practices:**
- Single column for most forms (easier scanning)
- Group related fields
- Labels above inputs (not beside)
- Primary action on right, secondary on left
- Sticky footer for long forms

---

## Responsive Strategies

### Content Priority Stacking
On mobile, stack by importance:

```
Desktop:                    Mobile:
┌──────────┬──────────┐     ┌──────────┐
│  Main    │ Sidebar  │     │  Main    │
│          │          │  →  │          │
└──────────┴──────────┘     ├──────────┤
                            │ Sidebar  │
                            └──────────┘
```

### Progressive Disclosure
Show less on small screens, reveal on demand:

```
Desktop: All filters visible
Mobile:  [Filters ▼] → opens filter panel
```

### Breakpoint Behavior

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Navigation | Full sidebar | Collapsible | Bottom bar or hamburger |
| Tables | Full columns | Scroll horizontal | Cards or priority columns |
| Forms | Side-by-side groups | Single column | Single column |
| Actions | Visible inline | Overflow menu | Bottom sheet |

### Touch Targets
Minimum 44×44px for touch. Increase spacing between interactive elements.

```css
/* Mobile touch targets */
@media (max-width: 768px) {
  .button, .link, .interactive {
    min-height: 44px;
    padding: 12px 16px;
  }
  
  .list-item {
    padding: 16px;  /* More tap room */
  }
}
```

---

## Density & Breathing Room

### Information Density Spectrum

```
Sparse ←────────────────────────────→ Dense

Landing pages          Apps         Data tables
Marketing              Tools        Spreadsheets
Onboarding             Dashboards   Trading platforms
```

**Match density to:**
- User expertise (experts handle density)
- Task frequency (frequent = can be denser)
- Content type (data vs. prose)

### Whitespace Functions

**1. Grouping** — Related items close, unrelated far
```
┌─────────────────────────────────────┐
│ Group A                             │
│ item    item    item                │
│                                     │  ← Space separates groups
│ Group B                             │
│ item    item                        │
└─────────────────────────────────────┘
```

**2. Emphasis** — Isolation draws attention
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           Important Thing           │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**3. Rest** — Visual breathing room
Dense content needs margins. Let eyes rest.

### Spacing System

Use consistent spacing scale (e.g., 4px base):

| Token | Value | Use For |
|-------|-------|---------|
| xs | 4px | Tight inline elements |
| sm | 8px | Related items, icon gaps |
| md | 16px | Standard padding, between fields |
| lg | 24px | Section padding |
| xl | 32px | Between sections |
| 2xl | 48px | Major page sections |

**Rules:**
- Increase spacing as hierarchy increases
- Consistent spacing within same level
- More space around important elements

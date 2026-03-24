# Navigation & Wayfinding

Users should always know where they are, where they can go, and how to get back. Navigation is about confidence, not just links.

## Table of Contents
- [The Three Questions](#the-three-questions)
- [Navigation Hierarchy](#navigation-hierarchy)
- [Wayfinding Patterns](#wayfinding-patterns)
- [Information Scent](#information-scent)
- [Navigation Anti-Patterns](#navigation-anti-patterns)
- [Modern Navigation Patterns](#modern-navigation-patterns)

---

## The Three Questions

Every screen must answer these instantly:

### 1. Where am I?
- Page title visible and prominent
- Breadcrumb trail for nested content
- Active state in navigation
- URL reflects location

### 2. Where can I go?
- Clear primary actions
- Visible navigation options
- Related content/actions nearby
- Search always accessible

### 3. How do I get back?
- Consistent back/close behavior
- Breadcrumbs for deep navigation
- Browser back button works
- Escape key closes overlays

**Test:** Show any screen to a new user for 3 seconds. Can they answer all three questions?

---

## Navigation Hierarchy

### Primary Navigation (Always Visible)
Top-level sections that define the product's structure.

```
┌─────────────────────────────────────────────────┐
│ Logo    [Inbox] [Projects] [Settings]    Avatar │  ← Primary nav
├─────────────────────────────────────────────────┤
│ Content                                         │
└─────────────────────────────────────────────────┘
```

**Rules:**
- Maximum 5-7 items (cognitive limit)
- Icons + labels for clarity (icons alone are ambiguous)
- Active state clearly distinguished
- Order by frequency of use, not alphabetically

### Secondary Navigation (Contextual)
Options within a section, changes based on context.

```
┌─────────────────────────────────────────────────┐
│ Projects                                        │
├──────────┬──────────────────────────────────────┤
│ All      │                                      │
│ Active   │  Content                             │  ← Secondary nav
│ Archived │                                      │
│ ──────── │                                      │
│ + New    │                                      │
└──────────┴──────────────────────────────────────┘
```

**Rules:**
- Clearly subordinate to primary nav
- Can be collapsed/hidden on mobile
- "Create new" action at the end, not beginning
- Group related items with dividers

### Tertiary Navigation (In-Page)
Tabs, filters, or views within content.

```
┌─────────────────────────────────────────────────┐
│ Project: Acme                                   │
│ [Overview] [Tasks] [Files] [Settings]           │  ← Tertiary nav
├─────────────────────────────────────────────────┤
│ Content                                         │
└─────────────────────────────────────────────────┘
```

**Rules:**
- Horizontal tabs for 2-5 options
- Dropdown/menu for more options
- Don't mix with secondary nav (confusing hierarchy)

---

## Wayfinding Patterns

### Breadcrumbs

**When to use:**
- Deep hierarchies (3+ levels)
- User might land via search/link
- Need to navigate "sideways" to sibling content

**Structure:**
```
Home > Projects > Acme Corp > Settings
 ↑        ↑          ↑          ↑
Root   Section    Parent     Current
(link)  (link)    (link)    (no link)
```

**Best practices:**
- Current page is text, not link
- Each item is clickable except current
- Use ">" or "/" as separators (not "→")
- Truncate middle items if too long: `Home > ... > Parent > Current`
- Don't use for flat structures (unnecessary)

### Location Indicators

**Page titles:**
- Every page needs a clear H1
- Title matches navigation label
- Include parent context if ambiguous: "Settings — Acme Project"

**Active states:**
- Background highlight (not just color change)
- Left border accent for sidebar items
- Underline for horizontal tabs
- Never rely on color alone (accessibility)

```css
/* Good: Multiple visual indicators */
.nav-item.active {
  background: var(--surface-selected);
  color: var(--text-primary);
  font-weight: 500;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
}
```

### Progressive Disclosure in Navigation

Show navigation complexity gradually:

```
Level 1: Main sections visible
         ↓ Click "Projects"
Level 2: Project list appears
         ↓ Click "Acme"
Level 3: Project sub-navigation appears
```

**Don't** show all levels at once — overwhelming and cluttered.

---

## Information Scent

Information scent = cues that help users predict what they'll find.

### Strong Scent (Good)
- "Account Settings" → Clearly about account configuration
- "3 unread messages" → I know exactly what I'll find
- "Export as PDF" → Predictable outcome

### Weak Scent (Bad)
- "Preferences" → Could be anything
- "More" → What more?
- "Manage" → Manage what?

### Strengthening Scent

**Add context:**
- Bad: "Settings"
- Good: "Notification Settings"

**Add counts/status:**
- Bad: "Messages"
- Good: "Messages (3 new)"

**Add descriptions:**
```
┌─────────────────────────────────────┐
│ 🔒 Security                         │
│    Passwords, 2FA, sessions         │  ← Description adds scent
└─────────────────────────────────────┘
```

**Use specific verbs:**
- Bad: "Documents"
- Good: "Upload Documents" or "View Documents"

### Icons as Scent

Icons reinforce meaning but don't replace labels:

| Icon Only | With Label | Clarity |
|-----------|------------|---------|
| 🏠 | 🏠 Home | ✅ Universal |
| ⚙️ | ⚙️ Settings | ✅ Universal |
| 📊 | 📊 Analytics | ⚠️ Could be reports, stats |
| 🔔 | 🔔 Notifications | ✅ Clear |
| 📋 | 📋 ??? | ❌ Clipboard? List? Tasks? |

**Rule:** If you need a tooltip to explain an icon, add a label instead.

---

## Navigation Anti-Patterns

### ❌ Mystery Meat Navigation
Icons without labels, requiring hover to understand.

**Fix:** Add labels. Always. Icons are shortcuts, not replacements.

### ❌ Deep Nesting
More than 3-4 levels of navigation hierarchy.

**Fix:** Flatten structure. Use search. Create shortcuts.

### ❌ Hidden Navigation
Navigation that requires clicking to reveal (hamburger on desktop).

**Fix:** Show navigation by default on larger screens.

### ❌ Inconsistent Placement
Navigation moves between pages or appears in different locations.

**Fix:** Navigation should be rock-solid consistent. Same place, same order.

### ❌ Too Many Options
Menus with 15+ items.

**Fix:** Group, prioritize, or move to secondary navigation/settings.

### ❌ Mixed Mental Models
Combining different navigation paradigms confusingly.

```
Bad: 
├── Tabs for section
│   └── Sidebar for sub-section  
│       └── More tabs for views
│           └── Dropdown for filters
```

**Fix:** Stick to one pattern per level. Be predictable.

### ❌ Breaking the Back Button
Single-page apps that don't update URL or break browser history.

**Fix:** Every significant state change should update the URL.

---

## Modern Navigation Patterns

### Command Palette (⌘K)
Keyboard-first navigation for power users.

**When to use:**
- Apps with many features/pages
- Power users who know what they want
- Complement to (not replacement for) visual nav

**Best practices:**
- Fuzzy search across all actions
- Show keyboard shortcuts inline
- Recent/frequent items at top
- Group by category

### Contextual Actions
Actions that appear where you need them, not in menus.

```
Old way: Right-click → Context menu → Find action

New way: Hover → Inline actions appear
         Or: Select → Action bar appears
```

### Search as Navigation
For content-heavy apps, search becomes primary navigation.

**Best practices:**
- Search is always visible/accessible
- Search across all content types
- Show results as you type
- Support filters within search

### Faceted Navigation
For exploring large datasets or catalogs.

```
┌─────────────┬──────────────────────────────────┐
│ Filters     │ Results                          │
│             │                                  │
│ Status      │ Showing 47 of 234 items          │
│ ☑ Active    │                                  │
│ ☐ Archived  │ [Item 1]                         │
│             │ [Item 2]                         │
│ Type        │ [Item 3]                         │
│ ☑ Bug       │                                  │
│ ☐ Feature   │                                  │
└─────────────┴──────────────────────────────────┘
```

**Best practices:**
- Show result count as filters change
- Allow multiple selections
- Show active filters clearly
- Easy to clear all/individual filters

### Hub and Spoke
Central hub page that leads to focused task pages.

```
       ┌─────────┐
       │   Hub   │  (Dashboard, Home)
       └────┬────┘
    ┌───────┼───────┐
    ↓       ↓       ↓
┌───────┐ ┌───────┐ ┌───────┐
│ Task  │ │ Task  │ │ Task  │  (Focused pages)
└───────┘ └───────┘ └───────┘
```

**When to use:**
- Distinct task flows
- Users complete one thing then return
- Mobile-first design

### Wizard / Stepped Navigation
For complex multi-step processes.

```
┌─────────────────────────────────────────────────┐
│ Step 1        Step 2        Step 3       Step 4 │
│ ●━━━━━━━━━━━━━○━━━━━━━━━━━━━○━━━━━━━━━━━━○      │
│ Details       Preferences   Review       Done   │
├─────────────────────────────────────────────────┤
│                                                 │
│ Current step content                            │
│                                                 │
├─────────────────────────────────────────────────┤
│                        [Back]  [Continue]       │
└─────────────────────────────────────────────────┘
```

**Best practices:**
- Show progress (which step, how many total)
- Allow going back (don't trap users)
- Save progress (don't lose work)
- Show what's coming next
- Final step: review before confirm

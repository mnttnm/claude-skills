---
name: ux-patterns
description: Design intuitive, frictionless user experiences that keep users in control and informed. Use this skill when making UX decisions about page structure, information architecture, navigation patterns, content hierarchy, user flows, or when simplifying complex interactions. Focuses on making users feel at home, reducing cognitive load, and crafting interfaces where users just do their work without thinking about the interface.
---

# UX Patterns & Architecture

This skill guides UX decisions that make interfaces feel intuitive and frictionless. The goal: users complete their tasks without noticing the interface.

**Mantra:** Don't make users think. Let them work.

## Core UX Principles

### 1. Show What's Needed, Hide What's Not
Every element competes for attention. Earn every pixel.
- Primary actions visible, secondary tucked away
- Context determines what's shown
- Progressive disclosure over information overload

### 2. Keep Users Oriented
Users should always know: Where am I? Where can I go? How do I get back?
- Clear navigation hierarchy
- Visible breadcrumbs for deep content
- Consistent location indicators

### 3. Make Actions Reversible
Confident users move fast. Let them undo mistakes.
- Undo over confirmation dialogs
- Soft delete with recovery
- Auto-save with version history

### 4. Reduce Decisions
Every choice is cognitive load. Make smart defaults.
- Sensible defaults based on context
- Remember user preferences
- Offer presets over many options

### 5. Keep Users Informed
Never leave users wondering what's happening.
- Loading states with progress
- Clear success/error feedback
- Visible system status

## Decision Framework

### When Designing a Page

Ask in order:

1. **What's the one job of this page?**
   - If it has multiple jobs, it might need to be multiple pages
   - Every element should support that job

2. **What must users see immediately?**
   - Page title and context
   - Primary action
   - Enough content to understand the page

3. **What can be revealed later?**
   - Secondary actions → overflow menu
   - Advanced options → "Show more" or section
   - Rare features → settings or help

4. **What are all the states?**
   - Empty: What should user do?
   - Loading: What are we waiting for?
   - Error: How do they recover?
   - Success: What's next?

### When Choosing a Pattern

| User Need | Pattern |
|-----------|---------|
| Navigate structure | Sidebar navigation |
| Find specific item | Search + filters |
| Browse options | Cards or list |
| Complete a task | Form or wizard |
| See overview | Dashboard |
| Focus on one thing | Full-page view |
| Quick reference | Slide-over panel |
| Immediate action | Inline editing |

### When Showing Information

| Amount | Pattern |
|--------|---------|
| 2-5 options | Segmented control, radio cards |
| 5-15 options | Dropdown, list |
| 15+ options | Search + filter |
| Hierarchical | Tree, nested lists |
| Comparative | Table, cards side-by-side |
| Temporal | Timeline, activity feed |

### When Asking for Confirmation

| Risk Level | Pattern |
|------------|---------|
| Low (reversible) | No confirmation, offer undo |
| Medium (recoverable) | Toast with undo |
| High (hard to reverse) | Confirmation dialog |
| Critical (irreversible) | Explicit acknowledgment (type to confirm) |

## Page Anatomy Checklist

Every page needs:

- [ ] **Clear title** — What is this page?
- [ ] **Context** — How did I get here? (breadcrumb or back)
- [ ] **Primary action** — What can I do? (top-right)
- [ ] **Main content** — Why I'm here
- [ ] **Clear states** — Loading, empty, error handled

### Header Pattern
```
← Back to [Parent]                              [Secondary] [Primary]
Page Title
Optional description or metadata
[Tab 1] [Tab 2] [Tab 3]
─────────────────────────────────────────────────────────────────────
```

## Quick Heuristics

### The 3-Second Test
Show any screen for 3 seconds. User should know:
- What page is this?
- What's the main action?
- How do I get back?

### The Squint Test
Blur the screen. Can you still see:
- Primary vs secondary content?
- Where to click/tap?
- Visual grouping?

### The "What If" Test
- What if there's 0 items? (empty state)
- What if there's 1 item? (singular language)
- What if there's 1000 items? (pagination/virtualization)
- What if text is very long? (truncation)
- What if user is offline? (graceful degradation)
- What if action fails? (error recovery)

## Reference Files

Detailed patterns organized by domain:

- **[navigation.md](references/navigation.md)** — Wayfinding, navigation hierarchy, information scent, breadcrumbs, modern nav patterns
- **[layouts.md](references/layouts.md)** — Page structure, visual hierarchy, content zones, responsive strategies, density
- **[simplification.md](references/simplification.md)** — Modern alternatives to old patterns, progressive disclosure, smart defaults, reducing complexity
- **[copy.md](references/copy.md)** — UX writing, labels, error messages, empty states, onboarding copy
- **[control.md](references/control.md)** — User agency, undo patterns, keeping users informed, preventing mistakes, building trust

## Anti-Patterns to Avoid

**Navigation:**
- Hidden navigation on desktop (hamburger menus)
- Icons without labels
- More than 3-4 levels deep
- Breaking the back button

**Information:**
- Showing everything at once
- Important info below the fold with no indication
- Inconsistent terminology
- Technical jargon in user-facing copy

**Actions:**
- "Are you sure?" for everything
- No undo for destructive actions
- "Submit" instead of specific action
- Actions that don't match their labels

**Feedback:**
- Silent failures
- Generic error messages ("Error")
- No loading indicators
- Auto-dismissing important messages

## Quick Reference

### Modern Pattern Replacements

| Old | New |
|-----|-----|
| Dropdown (few options) | Segmented control |
| Dropdown (many options) | Combobox with search |
| Modal for editing | Slide-over panel or inline edit |
| "Are you sure?" dialogs | Undo after action |
| Pagination | Infinite scroll or load more |
| Multi-page wizard | Single page with sections |
| Tooltip-only help | Inline help text |
| Accordion FAQ | Expanded sections + search |

### Empty State Formula

```
Title:       What this area is for
Description: Why empty + what to do  
Action:      [Primary CTA]
```

### Error Message Formula

```
What happened + Why (if helpful) + How to fix
```

### Button Label Rules

- Use specific verbs: "Save changes" not "Submit"
- Match the trigger: Link says "Edit" → button says "Save"
- Destructive: Repeat the action verb in confirmation

## UX Checklist

Before shipping any interface:

**Structure:**
- [ ] Single clear purpose per page
- [ ] Visual hierarchy guides the eye
- [ ] Primary action obvious
- [ ] Consistent layout with rest of product

**Navigation:**
- [ ] User knows where they are
- [ ] Clear way to get back
- [ ] No dead ends

**States:**
- [ ] Empty state with guidance
- [ ] Loading state with feedback
- [ ] Error state with recovery path
- [ ] Edge cases handled (0, 1, many, overflow)

**Control:**
- [ ] Destructive actions reversible
- [ ] System status visible
- [ ] User preferences remembered
- [ ] Clear exit from any flow

**Copy:**
- [ ] Labels are clear and specific
- [ ] Errors explain how to fix
- [ ] No jargon or ambiguity

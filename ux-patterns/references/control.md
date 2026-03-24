# User Control & Trust

Users should always feel in control. They need to know what's happening, be able to undo mistakes, and trust that the system works for them.

## Table of Contents
- [Principles of Control](#principles-of-control)
- [Keeping Users Informed](#keeping-users-informed)
- [Undo & Recovery](#undo--recovery)
- [Preventing Mistakes](#preventing-mistakes)
- [User Agency](#user-agency)
- [Building Trust](#building-trust)

---

## Principles of Control

### Users Should Always Be Able To:

1. **Understand** what's happening (visibility)
2. **Predict** what will happen (consistency)
3. **Recover** from mistakes (forgiveness)
4. **Exit** at any time (freedom)
5. **Choose** their own path (flexibility)

### The Control Spectrum

```
Less Control ←─────────────────────────→ More Control

Automate         Guide          Assist         Manual
everything       users          when asked     control

Magic (risky)    Recommended    Tools          Full access
```

**Best practice:** Default to guided, allow manual override.

---

## Keeping Users Informed

### System Status Visibility

Users should never wonder "what's happening?"

**Loading states:**
```
┌─────────────────────────────────────┐
│ ⟳ Loading projects...               │  ← Tell them what's loading
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⟳ Uploading document (45%)...       │  ← Show progress when known
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⟳ Processing video...               │
│   This may take a few minutes       │  ← Set expectations for long tasks
└─────────────────────────────────────┘
```

**Background processes:**
```
┌─────────────────────────────────────┐
│ Syncing... ⟳                        │  ← Indicator for background sync
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ All changes saved ✓                 │  ← Confirmation when done
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⚠ Changes not saved — offline       │  ← Problems need attention
└─────────────────────────────────────┘
```

### Status Indicators

**Connection status:**
```
● Online          → Green dot, no label needed
◐ Syncing         → Animated indicator
○ Offline         → Gray + "Working offline"
● Error           → Red + specific message
```

**Save status:**
```
"Saved" → Brief flash, then disappear
"Saving..." → While in progress
"Unable to save" → Persistent until resolved
```

**Operation status:**
```
Queued    → "2 items waiting..."
Active    → "Processing item 1 of 3..."
Complete  → "✓ Complete" (brief)
Failed    → "✗ Failed — [Retry]"
```

### When to Inform

| Event | Visibility | Example |
|-------|------------|---------|
| Quick save (<1s) | Subtle indicator | "Saved ✓" |
| Medium operation (1-5s) | Inline spinner | "Sending..." |
| Long operation (>5s) | Progress + message | "Uploading (45%)..." |
| Background process | Status bar indicator | Sync icon |
| Success | Brief toast | "Email sent" |
| Failure | Persistent alert | "Couldn't send — [Retry]" |
| Requires attention | Badge/highlight | (3) on icon |

### Timestamps & Recency

**Relative when recent:**
```
Just now
2 minutes ago
1 hour ago
Yesterday at 3:30 PM
March 15, 2024
```

**Absolute when precision matters:**
```
Scheduled for Mar 15, 2024 at 9:00 AM PST
```

**Show both on hover when helpful:**
```
Updated 2 hours ago
        ↓ (hover)
Updated Mar 15, 2024 at 1:30 PM
```

---

## Undo & Recovery

### Undo Over Confirmation

**Old pattern:** "Are you sure?" → User clicks → Done
**Better pattern:** Action happens → "Undo" available → Window to recover

```
Before (confirmation):
┌─────────────────────────────────────┐
│ Delete this message?                │
│                                     │
│        [Cancel] [Delete]            │
└─────────────────────────────────────┘

After (undo):
Message deleted.  [Undo]
                  └─ Available for ~5 seconds
```

**Why undo is better:**
- Faster for confident users
- Same safety net for mistakes
- Doesn't interrupt flow
- Reduces decision fatigue

### Undo Patterns

**Toast with undo:**
```
┌──────────────────────────────────────┐
│ ✓ Task archived                [Undo]│
└──────────────────────────────────────┘
(Auto-dismiss after 5-8 seconds)
```

**Inline undo:**
```
[Archive] → [Task archived. Undo?] → [Archive]
            (reverts after 5 seconds)
```

**Persistent undo (for bigger actions):**
```
┌─────────────────────────────────────┐
│ Project archived.                    │
│ You can restore it from the Archive. │
│ [View Archive]                       │
└─────────────────────────────────────┘
```

### What Should Be Undoable

| Action | Undo Type | Duration |
|--------|-----------|----------|
| Delete item | Soft delete + undo | 5-10 seconds |
| Archive | Restore from archive | Permanent |
| Send message | Recall window | 5-30 seconds |
| Move item | Undo or move back | 5-10 seconds |
| Bulk actions | Undo all | 10 seconds |
| Settings change | Previous value accessible | Session |
| Account deletion | Grace period | 30 days |

### Recovery Patterns

**Trash/Archive:**
```
┌─────────────────────────────────────┐
│ Trash (23 items)                    │
│ Items permanently deleted after 30d  │
├─────────────────────────────────────┤
│ ☐ Project A          [Restore]      │
│ ☐ Document B         [Restore]      │
│                                     │
│ [Empty Trash]        [Restore All]  │
└─────────────────────────────────────┘
```

**Version history:**
```
Version History for "Q3 Report"

● Current version
│ 2 hours ago by you
├── Mar 15, 3:00 PM by Sarah
├── Mar 15, 1:30 PM by you
├── Mar 14, 9:00 AM by you
│
└── [Restore this version] [View changes]
```

**Drafts/Auto-save:**
```
┌─────────────────────────────────────┐
│ ⚠ Unsaved draft found               │
│                                     │
│ From: 2 hours ago                   │
│                                     │
│ [Discard draft] [Restore draft]     │
└─────────────────────────────────────┘
```

---

## Preventing Mistakes

### Input Constraints

**Prevent invalid input:**
```
Phone: [+1 (555) 123-4567]  ← Auto-format as they type
Date:  [03/15/2024]        ← Date picker prevents invalid dates
Amount: [$1,234.56]        ← Only allow valid currency format
```

**Suggest corrections:**
```
Email: [john@gmial.com]
       Did you mean john@gmail.com? [Yes] [No, keep as is]
```

### Confirmation for Destructive Actions

When undo isn't possible, confirm thoughtfully:

```
Delete "Acme Project"?

This will permanently delete:
• 47 tasks
• 12 files  
• All comments and history

This action cannot be undone.

[Cancel] [Delete project]
         └─ Repeat the action name
```

**Require explicit acknowledgment for severe actions:**
```
Delete your account?

All your data will be permanently deleted.
This cannot be undone.

Type "DELETE" to confirm:
[           ]

[Cancel] [Delete my account]
         └─ Disabled until they type DELETE
```

### Guardrails

**Soft limits (warnings):**
```
You're about to send to 500 recipients.
This is more than your usual campaigns.
[Cancel] [Send anyway]
```

**Hard limits (prevention):**
```
Maximum 100 items per import.
Please split your file and try again.
```

**Smart defaults that prevent issues:**
```
☑ Save backup before importing (recommended)
☐ Overwrite existing entries
```

---

## User Agency

### Let Users Choose Their Path

**Don't force linear flows:**
```
❌ Must complete Step 1 before Step 2

✅ Recommended order, but can skip:
   Step 1: Set up profile [Skip for now]
   Step 2: Invite team [Do later]
```

**Provide escape hatches:**
```
Every modal: Close button + click outside + Escape key
Every wizard: [Skip] option, [Do this later]
Every screen: Clear way back/out
```

### Respect User Preferences

**Remember choices:**
```
Last used export format: PDF
Last selected team: Engineering
Preferred view: List (not grid)
```

**Don't force re-decisions:**
```
❌ "Choose format" every single export
✅ "Export as PDF" (remembers) + [Change format]
```

**Let users customize:**
```
Notification preferences
View preferences  
Keyboard shortcuts
Theme/appearance
```

### Don't Override User Intent

```
❌ Auto-correcting user input without notice
✅ Suggest correction, let user accept/reject

❌ Automatically dismissing important messages
✅ Require acknowledgment for critical info

❌ Pre-selecting upsells or marketing opt-ins
✅ Let users opt in explicitly
```

### Exit Freedom

Users should always be able to:

**Exit flows:**
```
Wizard: [Cancel] available on every step
Modal: Close button, click outside, Escape
Form: Navigate away (with unsaved warning if needed)
```

**Leave the product:**
```
Export data: Always available
Delete account: Clear process (even if delayed)
Cancel subscription: Self-service, not hidden
```

---

## Building Trust

### Transparency

**Show what you're doing with their data:**
```
We use your email to:
• Send you notifications you've opted into
• Important account security alerts
• We never share your email with third parties
[Manage email preferences]
```

**Explain automated decisions:**
```
Why am I seeing this?
• Recommended because you viewed similar items
• Based on your team's recent activity
[Not interested] [Show less like this]
```

### Predictability

**Consistent behavior:**
- Same action = same result
- Same place = same function
- Same words = same meaning

**No surprises:**
```
❌ Button does something unexpected
❌ Navigation goes somewhere different
❌ Settings that affect other areas without notice
```

### Honesty About Limitations

```
✅ "Sending may take up to 5 minutes during peak hours"
✅ "Search covers the last 90 days"
✅ "This feature is in beta — expect some rough edges"

❌ Hiding that something is limited
❌ Pretending everything always works perfectly
```

### Graceful Degradation

**When things break, handle it well:**
```
Feature unavailable:
┌─────────────────────────────────────┐
│ Real-time collaboration is          │
│ temporarily unavailable.            │
│                                     │
│ Your work is still being saved.     │
│ We're working on fixing this.       │
│                                     │
│ [Learn more] [Check status]         │
└─────────────────────────────────────┘
```

**Offline capability:**
```
┌─────────────────────────────────────┐
│ ⚠ You're offline                    │
│                                     │
│ You can still:                      │
│ • View cached content               │
│ • Edit documents (will sync later)  │
│ • Work on drafts                    │
│                                     │
│ Can't do while offline:             │
│ • Send messages                     │
│ • Sync with team                    │
└─────────────────────────────────────┘
```

---

## Control Checklist

Before shipping, verify:

- [ ] Loading states show what's happening
- [ ] Users can undo destructive actions
- [ ] Confirmation only for irreversible actions
- [ ] Clear way to exit any flow
- [ ] User preferences are remembered
- [ ] No forced paths or dead ends
- [ ] Errors explain what to do next
- [ ] Status is visible (saving, syncing, etc.)
- [ ] Limitations are communicated honestly

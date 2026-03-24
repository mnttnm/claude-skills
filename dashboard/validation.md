# Validation Reference

> **When to use this file**: This file supports two validation phases:
> - **Checkpoint 5 (Pre-Implementation)**: Conceptual validation against checklists before writing code
> - **Checkpoint 6 (Post-Implementation)**: Visual testing in browser after implementation is complete

---

## Two-Phase Validation

Dashboard validation happens at two distinct points:

### Conceptual Design Validation (Pre-Implementation)

Before writing code, validate the design conceptually against checklists:

- [ ] Each widget passes the components.md checklist (theoretically)
- [ ] Data-appropriate visualization check completed (see visualization.md)
- [ ] Layout density reviewed against anti-patterns
- [ ] Widget complexity within recommended limits
- [ ] Clear visual hierarchy in wireframe/mockup
- [ ] All required elements accounted for (CTAs, insights, states)

This is a theoretical/checklist review — you're validating the PLAN, not the rendered output.

### Visual Testing (Post-Implementation)

After the dashboard is fully implemented, view it in the browser:

- [ ] Open at intended viewport size (desktop, tablet, mobile as applicable)
- [ ] Check overall visual balance and breathing room
- [ ] Verify each widget against density guidelines
- [ ] Confirm visualizations differentiate the actual data values
- [ ] Walk through the user flow end-to-end
- [ ] Test edge states with real-world scenarios

This is when you actually SEE the rendered output. Review the complete dashboard first, then check each widget within it.

---

## Validation Framework

### Four Validation Phases
1. **Requirements Validation** - Does it meet stated needs?
2. **Preference Validation** - Were user choices honored?
3. **Design Validation** - Does it follow best practices?
4. **Production Validation** - Is it ready for real use?

## Phase 1: Requirements Validation

### Core Requirements Check
| Requirement | Validation Question | Status |
|-------------|---------------------|--------|
| Purpose | Does dashboard support the stated decision? | ☐ |
| Users | Does design match user expertise level? | ☐ |
| Metrics | Are all required metrics present? | ☐ |
| Context | Does each metric have comparison point? | ☐ |
| Data freshness | Does refresh rate match needs? | ☐ |
| Constraints | Are all technical constraints met? | ☐ |

## Phase 2: Preference Validation (Critical!)

### Visual Preferences Check
| Preference | What User Requested | What Was Implemented | Match? |
|------------|---------------------|----------------------|--------|
| Theme | [Light/Dark/Both] | [Implemented] | ☐ |
| Aesthetic | [Minimal/Dense/etc.] | [Implemented] | ☐ |
| Brand colors | [Colors requested] | [Colors used] | ☐ |
| Brand fonts | [Fonts requested] | [Fonts used] | ☐ |
| Density | [Spacious/Balanced/Dense] | [Implemented] | ☐ |
| Inspirations | [Products mentioned] | [How addressed] | ☐ |

### Preference Gap Protocol
If any preference wasn't gathered:
```
⚠️ MISSING: User was not asked about [theme/aesthetic/brand/etc.]

ACTION REQUIRED: Before delivery, ask:
"I realized I didn't confirm your preference on [X].
Would you prefer [Option A] or [Option B]?"
```

### Assumption Transparency
If defaults were used, document them:
```
DEFAULTS APPLIED (user said "no preference"):
- Theme: Light (default for readability)
- Aesthetic: Balanced (moderate information density)
- Colors: Blue accent (#3B82F6, professional/trustworthy)

USER SHOULD BE INFORMED: "I used these defaults since you didn't
have a strong preference. Let me know if you'd like adjustments."
```

## Phase 3: Design Validation

### Stephen Few's 13 Mistakes Check
| Mistake | Check | Status |
|---------|-------|--------|
| 1. Exceeds single screen | Primary view scrolls? | ☐ |
| 2. Inadequate context | Numbers without comparison? | ☐ |
| 3. Excessive detail | Unnecessary precision? | ☐ |
| 4. Indirect measures | Mental math required? | ☐ |
| 5. Wrong chart type | Chart matches data purpose? | ☐ |
| 6. Meaningless variety | Different charts for similar data? | ☐ |
| 7. Poor chart design | Cluttered legends, unclear labels? | ☐ |
| 8. Inaccurate encoding | Truncated axes, distortions? | ☐ |
| 9. Poor data arrangement | Illogical ordering? | ☐ |
| 10. Ineffective highlighting | No emphasis or over-emphasis? | ☐ |
| 11. Useless decoration | Chartjunk present? | ☐ |
| 12. Color misuse | Color without meaning? | ☐ |
| 13. Unattractive design | Poor aesthetics? | ☐ |

### Information Architecture Check
- [ ] Critical KPIs in top-left quadrant
- [ ] Related items visually grouped
- [ ] Clear visual hierarchy
- [ ] Consistent spacing (8px grid)
- [ ] Progressive disclosure for detail

### Visualization Check
- [ ] Chart types match data purpose
- [ ] High-accuracy encodings used
- [ ] Data-ink ratio maximized
- [ ] No 3D effects or chartjunk
- [ ] Axes start appropriately

## Phase 4: Production Validation

### Accessibility Audit (WCAG 2.1 AA)
| Criterion | Requirement | Status |
|-----------|-------------|--------|
| Color contrast | 4.5:1 text, 3:1 graphics | ☐ |
| Color independence | Shape/text redundancy | ☐ |
| Keyboard navigation | All interactive elements | ☐ |
| Focus indicators | Visible focus states | ☐ |
| Text scaling | Works at 200% zoom | ☐ |

### Edge States Audit
| State | Designed | Tested |
|-------|----------|--------|
| Empty - First use | ☐ | ☐ |
| Empty - No results | ☐ | ☐ |
| Loading states | ☐ | ☐ |
| Error states | ☐ | ☐ |

## Collaboration Checkpoint Validation

### Were Checkpoints Completed?
| Checkpoint | Completed | User Confirmed |
|------------|-----------|----------------|
| Initial analysis shared | ☐ | ☐ |
| Requirements confirmed | ☐ | ☐ |
| Strategy proposed & confirmed | ☐ | ☐ |
| Design options presented | ☐ | ☐ |
| Visual preferences gathered | ☐ | ☐ |
| Draft shown before finalizing | ☐ | ☐ |

### Checkpoint Gap Protocol
If checkpoints were skipped:
```
⚠️ CHECKPOINT SKIPPED: [Which checkpoint]

RISK: User may not agree with decisions made.

REMEDIATION: Before delivery, present:
"Here's what I decided for [aspect]. Does this match what you
had in mind, or would you like me to adjust?"
```

## Pre-Delivery Checklist

### Must Verify Before Sharing
- [ ] All requested metrics present
- [ ] Visual preferences honored (or defaults explained)
- [ ] User confirmed strategy approach
- [ ] Design options were presented
- [ ] Accessibility requirements met
- [ ] Edge states designed

### Must Communicate to User
- [ ] What was implemented and why
- [ ] Any defaults that were applied
- [ ] What can be easily adjusted
- [ ] Invitation for feedback

## Validation Report Template

```markdown
# Dashboard Validation Report

## Summary
- **Dashboard**: [Name]
- **Date**: [Date]
- **Overall Status**: [Pass/Needs Review/Fail]

## Requirements Status
| Requirement | Status | Notes |
|-------------|--------|-------|
| [Req] | ✓/✗/⚠ | [Notes] |

## Preference Status
| Preference | Requested | Implemented | Match |
|------------|-----------|-------------|-------|
| Theme | [X] | [Y] | ✓/✗ |
| Aesthetic | [X] | [Y] | ✓/✗ |
| Colors | [X] | [Y] | ✓/✗ |

## Defaults Applied
| Aspect | Default Used | Reason |
|--------|--------------|--------|
| [Aspect] | [Default] | User had no preference |

## Collaboration Status
| Checkpoint | Completed |
|------------|-----------|
| [Checkpoint] | ✓/✗ |

## Issues Found
| Issue | Severity | Resolution |
|-------|----------|------------|
| [Issue] | High/Med/Low | [Fix] |

## Recommendations
1. [Recommendation]

## User Communication
"Here's your dashboard. I implemented:
- [Key decision 1]
- [Key decision 2]

I used these defaults: [list any]

What would you like to adjust?"
```

## Quick Validation Checklist

For rapid assessment:
- [ ] All requested metrics present
- [ ] Theme matches preference (or default explained)
- [ ] Aesthetic matches preference (or default explained)
- [ ] Brand colors used if provided
- [ ] User confirmed strategy
- [ ] Design options were shown
- [ ] Single screen primary view
- [ ] Accessible colors
- [ ] Edge states designed

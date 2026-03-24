# Edge States Reference

> **When to use this file**: When handling empty, loading, error, and real-time update states. This file covers first-time experience, no-data scenarios, loading indicators, and error recovery. Critical for production-ready dashboards.

---

## Empty States

### Types of Empty States
| Type | Context | Goal |
|------|---------|------|
| First-time use | New account, no data yet | Guide to first action |
| User-cleared | Inbox zero, tasks complete | Celebrate achievement |
| No results | Search/filter returns nothing | Help refine or clear |
| Error-caused | Data failed to load | Explain and recover |

### Empty State Anatomy
```
┌─────────────────────────────────────────┐
│                                         │
│            [Illustration]               │ ← Optional, adds personality
│                                         │
│         No data to display yet          │ ← Clear explanation
│                                         │
│    Start by adding your first item      │ ← What to do next
│                                         │
│         [ Add First Item ]              │ ← Primary CTA
│                                         │
└─────────────────────────────────────────┘
```

### Empty State Best Practices
1. **Explain what belongs here** - Help users visualize the populated state
2. **Provide clear next action** - Prominent CTA to create/add
3. **Add personality appropriately** - Illustrations reduce anxiety
4. **Pre-populate when possible** - Demo data, templates, samples
5. **Celebrate completions** - "All caught up!" for cleared states

### Examples by Context
```
First-time dashboard:
"Your dashboard is ready for data!
Connect your first data source to see insights here.
[Connect Data Source]"

Search no results:
"No matches found for 'xyz'
Try different keywords or [Clear Filters]"

Completion state:
"All tasks complete!
Nothing to review right now. Great work!"
```

## Loading States

### Loading Duration Guidelines
| Duration | Pattern |
|----------|---------|
| <200ms | No indicator (feels instant) |
| 200ms-2s | Spinner in context |
| >2s | Skeleton screen |
| Unknown/long | Progress bar + message |

### Skeleton Screens
Match layout structure of actual content:
```
Loading:                    Loaded:
┌─────────────────────┐    ┌─────────────────────┐
│ ████████████        │    │ Monthly Revenue     │
│                     │    │                     │
│ ████████████████    │    │      $1.2M          │
│                     │    │                     │
│ ████  ████████████  │    │ ↑ 15% vs last month │
└─────────────────────┘    └─────────────────────┘
```

### Skeleton CSS Pattern
```css
.skeleton {
  background: linear-gradient(90deg,
    var(--surface-secondary) 0%,
    var(--surface-tertiary) 50%,
    var(--surface-secondary) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Progressive Loading
Load critical data first:
```
1. Show skeleton
2. Load KPI values (most important)
3. Load charts
4. Load tables/detail data
```

## Error States

### Error State Principles
1. **Never leave users stranded**
2. **Explain what went wrong** (in human terms)
3. **Provide resolution path**
4. **Offer retry or alternative**
5. **Degrade gracefully** (show cached data if possible)

### Error State Anatomy
```
┌─────────────────────────────────────────┐
│                                         │
│            ⚠️ Error Icon                │
│                                         │
│    Unable to load revenue data          │ ← What failed
│                                         │
│    We're having trouble connecting      │ ← Why (simplified)
│    to the data source.                  │
│                                         │
│    [ Try Again ]  [ View Cached ]       │ ← Resolution options
│                                         │
│    Last updated: 2 hours ago            │ ← Context
└─────────────────────────────────────────┘
```

### Error Types & Responses
| Error Type | Message Approach | Actions |
|------------|------------------|---------|
| Network | "Connection issue" | Retry, offline mode |
| Auth | "Session expired" | Re-login link |
| Not found | "Data not available" | Go back, search |
| Server | "Something went wrong" | Retry, contact support |
| Permission | "Access denied" | Request access |

### Graceful Degradation
```
Preferred:  Live data
Fallback 1: Cached data with "Last updated: X" warning
Fallback 2: Partial data (show what we have)
Fallback 3: Error state with recovery options
```

## Real-Time Update States

### Timestamp Visibility
Always show data freshness:
```
┌─────────────────────────────────────────┐
│ Live Dashboard              ● Live      │
│                     Updated: Just now   │
└─────────────────────────────────────────┘
```

### Update Indicators
| State | Indicator |
|-------|-----------|
| Live/connected | ● Green dot + "Live" |
| Updating | Subtle pulse animation |
| Stale (>expected) | ⚠️ Yellow + timestamp |
| Disconnected | Red dot + "Reconnecting..." |

### Value Change Animation
```css
/* Highlight changed values briefly */
.value-updated {
  animation: highlight 1.5s ease-out;
}

@keyframes highlight {
  0% { background-color: rgba(59, 130, 246, 0.3); }
  100% { background-color: transparent; }
}
```

### Mini-History for Context
Allow users to see recent changes:
```
Current: 156 users
         ↑ +3 in last 5 min

[View Last Hour ▼]
```

## Edge Case Handling

### Data Edge Cases
| Case | How to Handle |
|------|---------------|
| Zero values | Show "0" not empty |
| Negative numbers | Clear minus sign, red color |
| Very large numbers | Abbreviate (1.2M, 45K) |
| Very small numbers | Appropriate precision |
| Missing data points | Gap in chart + explanation |
| Single data point | Show value, note "trend unavailable" |

### Display Edge Cases
| Case | How to Handle |
|------|---------------|
| Long text | Truncate + tooltip |
| Many items | Pagination or "Show all" |
| No comparison period | Note "No prior period" |
| Future dates | "Projected" label |
| Partial data | "Partial" badge |

## State Machine Pattern

Map all possible states:
```
            ┌──────────┐
            │  Empty   │
            └────┬─────┘
                 │ Data arrives
                 ▼
            ┌──────────┐
     ┌──────│ Loading  │──────┐
     │      └──────────┘      │
   Error                    Success
     │                        │
     ▼                        ▼
┌──────────┐            ┌──────────┐
│  Error   │◄───────────│  Loaded  │
└──────────┘   Refresh  └──────────┘
     │         fails          │
     └────────────────────────┘
           Retry succeeds
```

## Edge States Checklist

### Empty States
- [ ] First-time user experience designed
- [ ] Search/filter no results handled
- [ ] Completion state (inbox zero) designed
- [ ] Each empty state has clear CTA

### Loading States
- [ ] Appropriate indicator for each duration
- [ ] Skeleton screens match content layout
- [ ] Progressive loading implemented
- [ ] No flash of loading for fast responses

### Error States
- [ ] All error types have messaging
- [ ] Recovery path clear
- [ ] Graceful degradation where possible
- [ ] Errors logged for debugging

### Real-Time
- [ ] Timestamp/freshness visible
- [ ] Connection status indicated
- [ ] Stale data warning
- [ ] Update animations subtle

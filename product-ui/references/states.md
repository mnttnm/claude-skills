# State Craftsmanship

Every interface state is an opportunity to build trust. Production-grade applications handle all states gracefully — loading, empty, error, and edge cases.

## Table of Contents
- [Loading States](#loading-states)
- [Empty States](#empty-states)
- [Error States](#error-states)
- [Edge Cases](#edge-cases)
- [Optimistic Updates](#optimistic-updates)

---

## Loading States

### Philosophy
Loading should feel fast even when it isn't. Skeleton screens, progressive disclosure, and strategic placeholders maintain engagement.

### Skeleton Screens

```tsx
// Skeleton component with shimmer
const Skeleton = ({ 
  width = '100%', 
  height = '1em', 
  rounded = 'md' 
}: {
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}) => (
  <div
    className={`skeleton skeleton-${rounded}`}
    style={{ width, height }}
    aria-hidden="true"
  />
);

// Usage: Mirror the structure of real content
const IssueCardSkeleton = () => (
  <div className="issue-card">
    <div className="issue-header">
      <Skeleton width={120} height={14} />
      <Skeleton width={80} height={14} />
    </div>
    <Skeleton width="100%" height={20} />
    <Skeleton width="70%" height={16} />
    <div className="issue-footer">
      <Skeleton width={24} height={24} rounded="full" />
      <Skeleton width={100} height={14} />
    </div>
  </div>
);

// List of skeletons
const IssueListSkeleton = ({ count = 5 }) => (
  <div className="issue-list" aria-busy="true" aria-label="Loading issues">
    {Array.from({ length: count }).map((_, i) => (
      <IssueCardSkeleton key={i} />
    ))}
  </div>
);
```

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
}

.skeleton-sm { border-radius: 2px; }
.skeleton-md { border-radius: 4px; }
.skeleton-lg { border-radius: 8px; }
.skeleton-full { border-radius: 9999px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: var(--surface-secondary);
  }
}
```

### Progressive Loading

Show content as it becomes available instead of waiting for everything:

```tsx
const Dashboard = () => {
  const { user, isLoading: userLoading } = useUser();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { activity, isLoading: activityLoading } = useActivity();

  return (
    <div className="dashboard">
      {/* Header loads instantly with user data */}
      <header>
        {userLoading ? (
          <Skeleton width={150} height={24} />
        ) : (
          <h1>Welcome, {user.name}</h1>
        )}
      </header>

      {/* Projects section with skeleton fallback */}
      <section>
        <h2>Projects</h2>
        {projectsLoading ? (
          <ProjectGridSkeleton />
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </section>

      {/* Activity is less critical, can load last */}
      <aside>
        <h2>Activity</h2>
        {activityLoading ? (
          <ActivitySkeleton />
        ) : (
          <ActivityFeed activity={activity} />
        )}
      </aside>
    </div>
  );
};
```

### Loading Indicators by Context

| Context | Pattern | Duration |
|---------|---------|----------|
| Page load | Skeleton screen | >200ms |
| Data refresh | Subtle spinner in header | Any |
| Button action | Button shows spinner | Any |
| Background save | Indicator in status bar | Brief |
| Long operation | Progress bar + message | >2s |

### Async Button Pattern

```tsx
const AsyncButton = ({ 
  onClick, 
  children,
  loadingText = 'Loading...',
  ...props 
}) => {
  const [pending, setPending] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    setPending(true);
    try {
      await onClick(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending}
      {...props}
    >
      {pending ? (
        <>
          <Spinner className="button-spinner" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
```

```css
.button-spinner {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

button[aria-busy="true"] {
  pointer-events: none;
  opacity: 0.8;
}
```

---

## Empty States

### Philosophy
Empty states are onboarding moments. They should guide users toward action, not just state the obvious.

### Anatomy of a Good Empty State

1. **Illustration** (optional) — Visual interest, matches brand
2. **Title** — Clear, concise statement
3. **Description** — Why it's empty, what to do
4. **Action** — Primary CTA to resolve the empty state
5. **Secondary action** (optional) — Alternative path

```tsx
const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) => (
  <div className="empty-state">
    {Icon && (
      <div className="empty-state-icon">
        <Icon className="w-12 h-12" />
      </div>
    )}
    <h3 className="empty-state-title">{title}</h3>
    <p className="empty-state-description">{description}</p>
    {action && (
      <div className="empty-state-actions">
        <button className="button-primary" onClick={action.onClick}>
          {action.label}
        </button>
        {secondaryAction && (
          <button className="button-secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </button>
        )}
      </div>
    )}
  </div>
);
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  min-height: 300px;
}

.empty-state-icon {
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 360px;
  margin-bottom: 24px;
}

.empty-state-actions {
  display: flex;
  gap: 12px;
}
```

### Context-Specific Empty States

```tsx
// Search with no results
<EmptyState
  icon={SearchIcon}
  title="No results found"
  description={`No issues match "${query}". Try adjusting your search terms or filters.`}
  action={{ label: 'Clear search', onClick: clearSearch }}
/>

// First-time user (zero state)
<EmptyState
  icon={InboxIcon}
  title="No projects yet"
  description="Projects help you organize your work. Create your first project to get started."
  action={{ label: 'Create project', onClick: openCreateModal }}
  secondaryAction={{ label: 'Import from GitHub', onClick: openImportModal }}
/>

// Filtered to nothing
<EmptyState
  icon={FilterIcon}
  title="No issues match these filters"
  description="Try removing some filters to see more results."
  action={{ label: 'Clear filters', onClick: clearFilters }}
/>

// Inbox zero (positive empty state)
<EmptyState
  icon={CheckCircleIcon}
  title="You're all caught up!"
  description="No pending notifications. Enjoy your focused time."
/>
```

### Empty State Illustrations

Keep illustrations:
- Simple and lightweight (SVG or CSS)
- On-brand but not distracting
- Accessible (decorative, with aria-hidden)

```tsx
// Simple CSS illustration
const NoDataIllustration = () => (
  <div className="illustration" aria-hidden="true">
    <div className="illustration-bar" style={{ width: '60%' }} />
    <div className="illustration-bar" style={{ width: '80%' }} />
    <div className="illustration-bar" style={{ width: '40%' }} />
  </div>
);
```

---

## Error States

### Philosophy
Errors should be specific, recoverable, and never blame the user. Every error is a chance to build trust through transparency.

### Error Message Anatomy

1. **What happened** — Clear, jargon-free explanation
2. **Why** (if helpful) — Technical context without blame
3. **What to do** — Specific recovery action

### Inline Field Errors

```tsx
const TextField = ({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        className={cn('field-input', error && 'field-input-error')}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="field-error" role="alert">
          <AlertCircle className="field-error-icon" />
          {error}
        </p>
      )}
    </div>
  );
};
```

```css
.field-input {
  border: 1px solid var(--border-default);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-input:focus {
  border-color: var(--focus-ring);
  box-shadow: 0 0 0 3px var(--focus-ring-subtle);
}

.field-input-error {
  border-color: var(--error);
}

.field-input-error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px var(--error-subtle);
}

.field-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 13px;
  color: var(--error);
}

.field-error-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
```

### Form-Level Errors

```tsx
const FormError = ({ error }: { error: string }) => (
  <div className="form-error" role="alert">
    <AlertTriangle className="form-error-icon" />
    <div className="form-error-content">
      <p className="form-error-title">Unable to save changes</p>
      <p className="form-error-description">{error}</p>
    </div>
    <button className="form-error-dismiss" aria-label="Dismiss">
      <X />
    </button>
  </div>
);
```

```css
.form-error {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--error-surface);
  border: 1px solid var(--error-border);
  border-radius: 8px;
  margin-bottom: 16px;
}

.form-error-icon {
  color: var(--error);
  flex-shrink: 0;
}

.form-error-title {
  font-weight: 600;
  color: var(--text-primary);
}

.form-error-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 2px;
}
```

### Network/API Errors

```tsx
const NetworkError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="network-error">
    <WifiOff className="network-error-icon" />
    <h3>Connection problem</h3>
    <p>Unable to reach the server. Check your internet connection and try again.</p>
    <button onClick={onRetry} className="button-primary">
      Try again
    </button>
  </div>
);

// Usage with error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error boundary caught:', error, info);
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### Error Toast for Non-Critical Failures

```tsx
const showError = (message: string, options?: { action?: () => void }) => {
  toast({
    variant: 'error',
    title: message,
    action: options?.action && (
      <button onClick={options.action}>Retry</button>
    ),
  });
};

// Usage
try {
  await saveDocument();
} catch (e) {
  showError('Failed to save. Your changes are preserved locally.', {
    action: () => saveDocument(),
  });
}
```

---

## Edge Cases

### The 0, 1, Many Pattern

Test every list/collection with:
- **0 items** — Empty state
- **1 item** — Singular language, proper layout
- **Many items** — Pagination, performance, overflow

```tsx
const ItemCount = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <span className="item-count">
      {count} {count === 1 ? 'item' : 'items'}
    </span>
  );
};
```

### Text Overflow

```css
/* Single line truncation */
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Multi-line truncation */
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Show full text on hover (optional) */
.text-truncate[title]:hover {
  /* Consider tooltip instead */
}
```

### Long Names/Titles

```tsx
// Truncate with tooltip for full value
const TruncatedText = ({ 
  text, 
  maxLength = 30 
}: { 
  text: string; 
  maxLength?: number;
}) => {
  const needsTruncation = text.length > maxLength;
  const displayText = needsTruncation 
    ? `${text.slice(0, maxLength)}...` 
    : text;

  if (needsTruncation) {
    return (
      <Tooltip content={text}>
        <span className="truncated-text">{displayText}</span>
      </Tooltip>
    );
  }

  return <span>{text}</span>;
};
```

### Slow Network States

```tsx
// Show stale data with refresh indicator
const useDataWithStaleIndicator = <T,>(
  fetcher: () => Promise<T>,
  initialData?: T
) => {
  const [data, setData] = useState(initialData);
  const [isStale, setIsStale] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      const newData = await fetcher();
      setData(newData);
      setIsStale(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mark as stale after timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsStale(true), 60000);
    return () => clearTimeout(timer);
  }, [data]);

  return { data, isStale, isRefreshing, refresh };
};

// UI
{isStale && (
  <button onClick={refresh} className="refresh-indicator">
    {isRefreshing ? <Spinner /> : <RefreshCw />}
    Data may be outdated
  </button>
)}
```

### Offline Mode

```tsx
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Offline banner
const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="offline-banner" role="alert">
      <WifiOff />
      <span>You're offline. Changes will sync when you reconnect.</span>
    </div>
  );
};
```

---

## Optimistic Updates

### Philosophy
Show the expected result immediately, then reconcile with server response. Makes interfaces feel instant.

### Pattern with Rollback

```tsx
const useOptimisticMutation = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options: {
    onMutate: (variables: V) => T; // Return optimistic data
    onError?: (error: Error, variables: V, rollback: T) => void;
    onSuccess?: (data: T, variables: V) => void;
  }
) => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (variables: V) => {
    setIsPending(true);
    const previousData = options.onMutate(variables);

    try {
      const result = await mutationFn(variables);
      options.onSuccess?.(result, variables);
      return result;
    } catch (error) {
      // Rollback to previous state
      options.onError?.(error as Error, variables, previousData);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};

// Usage: Toggle favorite
const { mutate: toggleFavorite } = useOptimisticMutation(
  (issueId: string) => api.toggleFavorite(issueId),
  {
    onMutate: (issueId) => {
      // Optimistically update UI
      const previous = getIssue(issueId);
      updateIssue(issueId, { isFavorite: !previous.isFavorite });
      return previous;
    },
    onError: (error, issueId, previous) => {
      // Rollback on failure
      updateIssue(issueId, previous);
      showError('Failed to update favorite');
    },
  }
);
```

### When to Use Optimistic Updates

| Action | Optimistic? | Reason |
|--------|-------------|--------|
| Toggle favorite | ✅ Yes | Low risk, instant feedback |
| Mark as read | ✅ Yes | Low risk, instant feedback |
| Delete item | ⚠️ Careful | High risk, consider undo instead |
| Create item | ⚠️ Careful | May need server-generated ID |
| Payment | ❌ No | Must confirm success |
| Send message | ✅ Yes | Show pending state with indicator |

### Pending State Indicator

```tsx
const MessageItem = ({ message }: { message: Message }) => (
  <div className={cn('message', message.pending && 'message-pending')}>
    <p>{message.content}</p>
    {message.pending && (
      <span className="message-status">
        <Clock className="w-3 h-3" />
        Sending...
      </span>
    )}
    {message.failed && (
      <button className="message-retry" onClick={() => retry(message.id)}>
        <AlertCircle className="w-3 h-3" />
        Failed. Tap to retry.
      </button>
    )}
  </div>
);
```

```css
.message-pending {
  opacity: 0.7;
}

.message-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.message-retry {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--error);
  cursor: pointer;
}
```

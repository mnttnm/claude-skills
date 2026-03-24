# Product Interface Patterns

Concrete patterns extracted from studying Linear, Stripe, Superhuman, Figma, Notion, and Slack. These are the specific implementations that make these products feel premium.

## Table of Contents
- [Navigation Patterns](#navigation-patterns)
- [List & Table Patterns](#list--table-patterns)
- [Form Patterns](#form-patterns)
- [Notification Patterns](#notification-patterns)
- [Modal & Dialog Patterns](#modal--dialog-patterns)
- [Contextual Menu Patterns](#contextual-menu-patterns)
- [Scroll Patterns](#scroll-patterns)
- [Input Enhancement Patterns](#input-enhancement-patterns)

---

## Navigation Patterns

### Collapsible Sidebar (Linear-style)

```tsx
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn('sidebar', collapsed && 'sidebar-collapsed')}
      data-collapsed={collapsed}
    >
      <div className="sidebar-header">
        <Logo collapsed={collapsed} />
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronsLeft className={cn(collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={collapsed}
            shortcut={item.shortcut}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <UserMenu collapsed={collapsed} />
      </div>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, href, collapsed, shortcut }) => (
  <Tooltip content={collapsed ? label : undefined} side="right">
    <Link href={href} className="nav-item">
      <Icon className="nav-item-icon" />
      {!collapsed && (
        <>
          <span className="nav-item-label">{label}</span>
          {shortcut && <kbd className="nav-item-shortcut">{shortcut}</kbd>}
        </>
      )}
    </Link>
  </Tooltip>
);
```

```css
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--surface-secondary);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  transition: width 0.2s var(--ease-out);
}

.sidebar-collapsed {
  width: 56px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: background 0.1s, color 0.1s;
}

.nav-item:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
}

.nav-item[aria-current="page"] {
  background: var(--surface-selected);
  color: var(--text-primary);
}

.nav-item-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.nav-item-shortcut {
  margin-left: auto;
  font-size: 11px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

/* Collapsed state shows icon only */
.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 10px;
}
```

### Breadcrumb with Overflow (Notion-style)

```tsx
const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Show first, last, and dropdown for middle items if > 3
  const shouldTruncate = items.length > 3;
  const visibleItems = shouldTruncate 
    ? [items[0], ...items.slice(-2)]
    : items;
  const hiddenItems = shouldTruncate 
    ? items.slice(1, -2)
    : [];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb-list">
        {visibleItems.map((item, i) => (
          <li key={item.id} className="breadcrumb-item">
            {i === 1 && shouldTruncate && (
              <>
                <Dropdown
                  trigger={
                    <button className="breadcrumb-overflow">
                      <MoreHorizontal />
                    </button>
                  }
                >
                  {hiddenItems.map(hidden => (
                    <DropdownItem key={hidden.id} href={hidden.href}>
                      {hidden.icon && <hidden.icon />}
                      {hidden.label}
                    </DropdownItem>
                  ))}
                </Dropdown>
                <ChevronRight className="breadcrumb-separator" />
              </>
            )}
            
            {i === visibleItems.length - 1 ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.icon && <item.icon className="breadcrumb-icon" />}
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.href} className="breadcrumb-link">
                  {item.icon && <item.icon className="breadcrumb-icon" />}
                  {item.label}
                </Link>
                <ChevronRight className="breadcrumb-separator" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

---

## List & Table Patterns

### Virtualized List (Linear/Superhuman-style)

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedList = <T extends { id: string }>({
  items,
  renderItem,
  estimateSize = 48,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimateSize?: number;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="virtual-list-container">
      <div
        className="virtual-list"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={items[virtualRow.index].id}
            className="virtual-list-item"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderItem(items[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Inline Editable Cell (Notion-style)

```tsx
const EditableCell = ({
  value,
  onSave,
  placeholder = 'Empty',
}: {
  value: string;
  onSave: (value: string) => Promise<void>;
  placeholder?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (draft === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(draft);
      setIsEditing(false);
    } catch {
      setDraft(value); // Rollback
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        className="editable-cell-input"
      />
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className={cn('editable-cell', !value && 'editable-cell-empty')}
    >
      {value || placeholder}
    </button>
  );
};
```

```css
.editable-cell {
  display: block;
  width: 100%;
  padding: 4px 8px;
  text-align: left;
  border-radius: var(--radius-sm);
  transition: background 0.1s;
  cursor: text;
}

.editable-cell:hover {
  background: var(--surface-hover);
}

.editable-cell-empty {
  color: var(--text-tertiary);
}

.editable-cell-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  background: var(--surface-primary);
  box-shadow: var(--shadow-focus);
}
```

### Row Actions on Hover (Linear-style)

```tsx
const TableRow = ({ item, actions }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr
      className="table-row"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <td className="table-cell">{item.title}</td>
      <td className="table-cell">{item.status}</td>
      <td className="table-cell table-cell-actions">
        <div className={cn('row-actions', showActions && 'visible')}>
          {actions.map(action => (
            <Tooltip key={action.id} content={action.label}>
              <button
                onClick={() => action.onClick(item)}
                className="row-action-button"
              >
                <action.icon />
              </button>
            </Tooltip>
          ))}
        </div>
      </td>
    </tr>
  );
};
```

```css
.row-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.row-actions.visible,
.table-row:focus-within .row-actions {
  opacity: 1;
}

.row-action-button {
  padding: 6px;
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
  transition: background 0.1s, color 0.1s;
}

.row-action-button:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
}
```

---

## Form Patterns

### Smart Validation Timing

```tsx
const useSmartValidation = (
  value: string,
  validate: (value: string) => string | undefined
) => {
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Validate on blur (first interaction)
  const handleBlur = () => {
    setTouched(true);
    if (dirty) {
      setError(validate(value));
    }
  };

  // Validate on change (after first error shown)
  useEffect(() => {
    if (touched && dirty) {
      // Debounce validation during typing
      const timer = setTimeout(() => {
        setError(validate(value));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, touched, dirty, validate]);

  const handleChange = (newValue: string) => {
    setDirty(true);
    // Clear error immediately when user starts fixing
    if (error && !validate(newValue)) {
      setError(undefined);
    }
    return newValue;
  };

  return {
    error,
    handleBlur,
    handleChange,
    isValid: touched && dirty && !error,
  };
};
```

### Auto-Expanding Textarea (Slack-style)

```tsx
const AutoExpandTextarea = ({
  value,
  onChange,
  minRows = 1,
  maxRows = 10,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
  maxRows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get correct scrollHeight
    textarea.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [value, minRows, maxRows]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={minRows}
      className="auto-expand-textarea"
      {...props}
    />
  );
};
```

```css
.auto-expand-textarea {
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
  transition: height 0.1s ease-out;
}
```

### Combobox with Create (Linear-style)

```tsx
const CreatableCombobox = ({
  options,
  value,
  onChange,
  onCreate,
  placeholder = 'Select or create...',
}: {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  onCreate: (label: string) => Promise<Option>;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const showCreate = query && !filtered.some(
    opt => opt.label.toLowerCase() === query.toLowerCase()
  );

  const handleCreate = async () => {
    setCreating(true);
    try {
      const newOption = await onCreate(query);
      onChange(newOption.value);
      setOpen(false);
      setQuery('');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="combobox-trigger">
          {value ? options.find(o => o.value === value)?.label : placeholder}
          <ChevronDown className="combobox-chevron" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="combobox-content">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="combobox-search"
          autoFocus
        />
        <div className="combobox-options">
          {filtered.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'combobox-option',
                option.value === value && 'selected'
              )}
            >
              {option.label}
              {option.value === value && <Check className="w-4 h-4" />}
            </button>
          ))}
          {showCreate && (
            <button
              onClick={handleCreate}
              disabled={creating}
              className="combobox-create"
            >
              <Plus className="w-4 h-4" />
              Create "{query}"
              {creating && <Spinner className="w-4 h-4" />}
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
```

---

## Notification Patterns

### Toast System (Stripe-style)

```tsx
type Toast = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
};

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
} | null>(null);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { ...toast, id }]);

    // Auto-dismiss
    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration ?? 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => (
  <div className="toast-container" aria-live="polite">
    <AnimatePresence>
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={cn('toast', `toast-${toast.type}`)}
        >
          <ToastIcon type={toast.type} />
          <div className="toast-content">
            <p className="toast-title">{toast.title}</p>
            {toast.description && (
              <p className="toast-description">{toast.description}</p>
            )}
          </div>
          {toast.action && (
            <button onClick={toast.action.onClick} className="toast-action">
              {toast.action.label}
            </button>
          )}
          <button
            onClick={() => onRemove(toast.id)}
            className="toast-dismiss"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
```

```css
.toast-container {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
  max-width: 400px;
  pointer-events: auto;
}

.toast-success { border-left: 3px solid var(--success); }
.toast-error { border-left: 3px solid var(--error); }
.toast-warning { border-left: 3px solid var(--warning); }
.toast-info { border-left: 3px solid var(--info); }

.toast-title {
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.toast-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: 2px;
}

.toast-action {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--accent);
  white-space: nowrap;
}

.toast-dismiss {
  padding: 4px;
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  transition: background 0.1s;
}

.toast-dismiss:hover {
  background: var(--surface-hover);
}
```

---

## Modal & Dialog Patterns

### Confirmation Dialog with Destructive Action

```tsx
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => Promise<void> | void;
}) => {
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="confirm-dialog">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="button-secondary"
            disabled={pending}
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              'button',
              variant === 'destructive' ? 'button-destructive' : 'button-primary'
            )}
            disabled={pending}
          >
            {pending ? <Spinner className="w-4 h-4" /> : confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

### Command + K Modal Positioning

```css
/* Position at top third for quick scanning */
.command-modal-backdrop {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
}

.command-modal {
  width: 100%;
  max-width: 640px;
  max-height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

---

## Contextual Menu Patterns

### Right-Click Context Menu

```tsx
const ContextMenu = ({
  children,
  items,
}: {
  children: React.ReactNode;
  items: MenuItem[];
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Position menu within viewport
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 300);
    
    setPosition({ x, y });
  };

  // Close on click outside or escape
  useEffect(() => {
    if (!position) return;

    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setPosition(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPosition(null);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [position]);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {position && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item, i) =>
            item.type === 'separator' ? (
              <div key={i} className="context-menu-separator" />
            ) : (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setPosition(null);
                }}
                className={cn(
                  'context-menu-item',
                  item.variant === 'destructive' && 'context-menu-item-destructive'
                )}
                disabled={item.disabled}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {item.shortcut && <kbd>{item.shortcut}</kbd>}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};
```

---

## Scroll Patterns

### Smooth Scroll with Snap Points

```css
.scroll-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

### Scroll Shadow Indicators

```tsx
const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const updateShadows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowTopShadow(el.scrollTop > 0);
    setShowBottomShadow(
      el.scrollTop < el.scrollHeight - el.clientHeight - 1
    );
  };

  useEffect(() => {
    updateShadows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateShadows);
    return () => el?.removeEventListener('scroll', updateShadows);
  }, []);

  return (
    <div className="scroll-area-wrapper">
      <div
        className={cn('scroll-shadow-top', showTopShadow && 'visible')}
      />
      <div ref={scrollRef} className="scroll-area">
        {children}
      </div>
      <div
        className={cn('scroll-shadow-bottom', showBottomShadow && 'visible')}
      />
    </div>
  );
};
```

```css
.scroll-area-wrapper {
  position: relative;
  overflow: hidden;
}

.scroll-area {
  overflow-y: auto;
  max-height: 100%;
}

.scroll-shadow-top,
.scroll-shadow-bottom {
  position: absolute;
  left: 0;
  right: 0;
  height: 24px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.scroll-shadow-top {
  top: 0;
  background: linear-gradient(
    to bottom,
    var(--surface-primary),
    transparent
  );
}

.scroll-shadow-bottom {
  bottom: 0;
  background: linear-gradient(
    to top,
    var(--surface-primary),
    transparent
  );
}

.scroll-shadow-top.visible,
.scroll-shadow-bottom.visible {
  opacity: 1;
}
```

---

## Input Enhancement Patterns

### Inline Editing with Visual Feedback

```tsx
const InlineEdit = ({
  value,
  onSave,
  renderDisplay,
  renderInput,
}: {
  value: string;
  onSave: (value: string) => Promise<void>;
  renderDisplay: (value: string, onEdit: () => void) => React.ReactNode;
  renderInput: (props: {
    value: string;
    onChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    ref: React.RefObject<HTMLInputElement>;
  }) => React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (draft === value || !draft.trim()) {
      setIsEditing(false);
      setDraft(value);
      return;
    }

    setSaving(true);
    try {
      await onSave(draft);
      setIsEditing(false);
    } catch {
      // Keep editing on error
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return renderInput({
      value: draft,
      onChange: setDraft,
      onSave: handleSave,
      onCancel: handleCancel,
      ref: inputRef,
    });
  }

  return renderDisplay(value, () => setIsEditing(true));
};
```

### Search with Recent & Suggestions

```tsx
const SearchWithHistory = ({
  onSearch,
  recentSearches,
  suggestions,
}: {
  onSearch: (query: string) => void;
  recentSearches: string[];
  suggestions: string[];
}) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const showRecent = !query && recentSearches.length > 0;
  const filtered = query
    ? suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && query) {
              onSearch(query);
              setOpen(false);
            }
          }}
          placeholder="Search..."
          className="search-input"
        />
        {query && (
          <button onClick={() => setQuery('')} className="search-clear">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && (showRecent || filtered.length > 0) && (
        <div className="search-dropdown">
          {showRecent && (
            <div className="search-section">
              <div className="search-section-title">Recent</div>
              {recentSearches.map(recent => (
                <button
                  key={recent}
                  onClick={() => {
                    onSearch(recent);
                    setOpen(false);
                  }}
                  className="search-suggestion"
                >
                  <Clock className="w-4 h-4" />
                  {recent}
                </button>
              ))}
            </div>
          )}
          {filtered.length > 0 && (
            <div className="search-section">
              <div className="search-section-title">Suggestions</div>
              {filtered.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onSearch(suggestion);
                    setOpen(false);
                  }}
                  className="search-suggestion"
                >
                  <Search className="w-4 h-4" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

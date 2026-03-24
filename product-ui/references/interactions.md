# Interaction Patterns

Production-grade interfaces prioritize keyboard-first design, precise focus management, and responsive feedback loops.

## Table of Contents
- [Command Palette](#command-palette)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Focus Management](#focus-management)
- [Selection & Multi-Select](#selection--multi-select)
- [Drag Interactions](#drag-interactions)
- [Cursor States](#cursor-states)

---

## Command Palette

The command palette (⌘K) is the signature interaction of modern product interfaces. It provides instant access to all actions without navigation.

### Core Implementation

```tsx
// Command palette with fuzzy search, sections, and keyboard navigation
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const filteredItems = useMemo(() => 
    fuzzySearch(commands, query), [query]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        filteredItems[selectedIndex]?.action();
        setOpen(false);
        break;
    }
  };

  if (!open) return null;

  return (
    <div className="command-backdrop" onClick={() => setOpen(false)}>
      <div 
        className="command-palette"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          className="command-input"
          aria-autocomplete="list"
          aria-controls="command-list"
        />
        <div id="command-list" role="listbox" className="command-list">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              role="option"
              aria-selected={i === selectedIndex}
              className={cn('command-item', i === selectedIndex && 'selected')}
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={() => {
                item.action();
                setOpen(false);
              }}
            >
              <span className="command-icon">{item.icon}</span>
              <span className="command-label">{item.label}</span>
              {item.shortcut && (
                <kbd className="command-shortcut">{item.shortcut}</kbd>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

```css
.command-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20vh;
  z-index: 50;
  animation: fadeIn 0.15s ease-out;
}

.command-palette {
  width: 100%;
  max-width: 560px;
  background: var(--surface-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: 
    0 16px 70px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  overflow: hidden;
  animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.command-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 15px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  outline: none;
}

.command-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.1s;
}

.command-item.selected {
  background: var(--surface-hover);
}

.command-shortcut {
  margin-left: auto;
  font-size: 12px;
  font-family: var(--font-mono);
  padding: 2px 6px;
  background: var(--surface-secondary);
  border-radius: 4px;
  color: var(--text-tertiary);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}
```

### Fuzzy Search Implementation

```ts
// Simple but effective fuzzy search
function fuzzySearch<T extends { label: string }>(items: T[], query: string): T[] {
  if (!query) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items
    .map(item => {
      const label = item.label.toLowerCase();
      let score = 0;
      let lastIndex = -1;
      
      for (const char of lowerQuery) {
        const index = label.indexOf(char, lastIndex + 1);
        if (index === -1) return { item, score: -1 };
        
        // Bonus for consecutive matches
        if (index === lastIndex + 1) score += 2;
        // Bonus for start of word
        if (index === 0 || label[index - 1] === ' ') score += 3;
        
        score += 1;
        lastIndex = index;
      }
      
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
```

---

## Keyboard Shortcuts

### Shortcut Registry Pattern

```tsx
type Shortcut = {
  key: string;
  modifiers?: ('meta' | 'ctrl' | 'alt' | 'shift')[];
  action: () => void;
  when?: () => boolean; // Conditional activation
};

const useShortcuts = (shortcuts: Shortcut[]) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const modifiersMatch = 
          (!shortcut.modifiers?.includes('meta') || e.metaKey) &&
          (!shortcut.modifiers?.includes('ctrl') || e.ctrlKey) &&
          (!shortcut.modifiers?.includes('alt') || e.altKey) &&
          (!shortcut.modifiers?.includes('shift') || e.shiftKey);

        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          modifiersMatch &&
          (shortcut.when?.() ?? true)
        ) {
          e.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts]);
};

// Usage
useShortcuts([
  { key: 'n', action: createNewItem },
  { key: 'Backspace', action: deleteSelected, when: () => hasSelection },
  { key: '/', action: focusSearch },
  { key: 'Escape', action: clearSelection },
  { key: 'a', modifiers: ['meta'], action: selectAll },
]);
```

### Common Shortcuts by Context

| Context | Shortcut | Action |
|---------|----------|--------|
| Global | `⌘K` | Command palette |
| Global | `⌘/` | Keyboard shortcuts help |
| Global | `/` | Focus search |
| List | `↑↓` | Navigate items |
| List | `⌘↑↓` | Move item up/down |
| List | `Space` | Toggle selection |
| List | `Enter` | Open item |
| List | `⌘A` | Select all |
| List | `Escape` | Clear selection |
| Editor | `⌘S` | Save |
| Editor | `⌘Z` | Undo |
| Editor | `⌘⇧Z` | Redo |

---

## Focus Management

### Focus Trap for Modals

```tsx
const useFocusTrap = (containerRef: RefObject<HTMLElement>, active: boolean) => {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = 
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const getFocusable = () => 
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
        .filter(el => !el.hasAttribute('disabled'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;
    
    // Focus first focusable element
    getFocusable()[0]?.focus();

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus(); // Restore focus on close
    };
  }, [active, containerRef]);
};
```

### Focus Ring Styling

```css
/* Remove default, add custom */
*:focus {
  outline: none;
}

/* Keyboard focus only (not mouse clicks) */
*:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Custom focus styles per element */
.button:focus-visible {
  box-shadow: 
    0 0 0 2px var(--surface-primary),
    0 0 0 4px var(--focus-ring);
}

.input:focus-visible {
  border-color: var(--focus-ring);
  box-shadow: 0 0 0 3px var(--focus-ring-subtle);
}
```

### Roving Tabindex for Lists

```tsx
// Single tab stop for the list, arrow keys to navigate
const useRovingTabindex = (items: string[], onSelect: (id: string) => void) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<Map<number, HTMLElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => (i + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => (i - 1 + items.length) % items.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(items[focusedIndex]);
        break;
    }
  };

  useEffect(() => {
    itemRefs.current.get(focusedIndex)?.focus();
  }, [focusedIndex]);

  return {
    getContainerProps: () => ({
      role: 'listbox',
      onKeyDown: handleKeyDown,
    }),
    getItemProps: (index: number) => ({
      role: 'option',
      tabIndex: index === focusedIndex ? 0 : -1,
      ref: (el: HTMLElement) => el && itemRefs.current.set(index, el),
      'aria-selected': index === focusedIndex,
    }),
  };
};
```

---

## Selection & Multi-Select

### List Selection with Shift/Cmd

```tsx
const useListSelection = <T extends { id: string }>(items: T[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string, e: React.MouseEvent) => {
    setSelectedIds(prev => {
      const next = new Set(prev);

      if (e.metaKey || e.ctrlKey) {
        // Toggle individual item
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      } else if (e.shiftKey && lastSelectedId) {
        // Range selection
        const startIndex = items.findIndex(i => i.id === lastSelectedId);
        const endIndex = items.findIndex(i => i.id === id);
        const [from, to] = [startIndex, endIndex].sort((a, b) => a - b);
        
        items.slice(from, to + 1).forEach(item => next.add(item.id));
      } else {
        // Single selection
        next.clear();
        next.add(id);
      }

      return next;
    });

    setLastSelectedId(id);
  };

  const selectAll = () => {
    setSelectedIds(new Set(items.map(i => i.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    setLastSelectedId(null);
  };

  return {
    selectedIds,
    handleSelect,
    selectAll,
    clearSelection,
    isSelected: (id: string) => selectedIds.has(id),
    selectedCount: selectedIds.size,
  };
};
```

### Selection UI Feedback

```css
.list-item {
  position: relative;
  transition: background 0.1s;
}

.list-item[aria-selected="true"] {
  background: var(--selection-bg);
}

/* Selection indicator */
.list-item[aria-selected="true"]::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
}

/* Checkbox appears on hover or selection */
.list-item .checkbox {
  opacity: 0;
  transition: opacity 0.1s;
}

.list-item:hover .checkbox,
.list-item[aria-selected="true"] .checkbox {
  opacity: 1;
}
```

---

## Drag Interactions

### Drag-to-Reorder with Visual Feedback

```tsx
const useDragReorder = <T extends { id: string }>(
  items: T[],
  onReorder: (items: T[]) => void
) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Ghost image
    const ghost = e.currentTarget.cloneNode(true) as HTMLElement;
    ghost.style.opacity = '0.5';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => ghost.remove(), 0);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== draggedId) {
      setDragOverId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const newItems = [...items];
    const draggedIndex = newItems.findIndex(i => i.id === draggedId);
    const targetIndex = newItems.findIndex(i => i.id === targetId);
    
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    onReorder(newItems);
    setDraggedId(null);
    setDragOverId(null);
  };

  return {
    draggedId,
    dragOverId,
    getItemProps: (id: string) => ({
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleDragStart(e, id),
      onDragOver: (e: React.DragEvent) => handleDragOver(e, id),
      onDragEnd: () => {
        setDraggedId(null);
        setDragOverId(null);
      },
      onDrop: (e: React.DragEvent) => handleDrop(e, id),
      'data-dragging': id === draggedId,
      'data-drag-over': id === dragOverId,
    }),
  };
};
```

```css
[data-dragging="true"] {
  opacity: 0.3;
}

[data-drag-over="true"] {
  position: relative;
}

[data-drag-over="true"]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  height: 2px;
  background: var(--accent);
}
```

---

## Cursor States

### Context-Aware Cursors

```css
/* Interactive elements */
.button, .link, [role="button"] {
  cursor: pointer;
}

/* Draggable */
.drag-handle {
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

/* Resize handles */
.resize-handle-ew { cursor: ew-resize; }
.resize-handle-ns { cursor: ns-resize; }
.resize-handle-nwse { cursor: nwse-resize; }

/* Text */
.selectable-text {
  cursor: text;
}

/* Disabled */
.disabled, [disabled], [aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Loading/processing */
.loading {
  cursor: wait;
}

/* Move */
.movable {
  cursor: move;
}
```

### Custom Cursor for Brand Moments

```css
/* Custom cursor for special interactions */
.canvas-tool-pencil {
  cursor: url('/cursors/pencil.svg') 2 22, crosshair;
}

.canvas-tool-eraser {
  cursor: url('/cursors/eraser.svg') 8 8, crosshair;
}
```

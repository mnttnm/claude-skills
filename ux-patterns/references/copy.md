# UX Writing & Microcopy

Words are interface. Every label, message, and instruction shapes how users understand and use the product.

## Table of Contents
- [Writing Principles](#writing-principles)
- [Labels & Actions](#labels--actions)
- [Empty States](#empty-states)
- [Error Messages](#error-messages)
- [Success & Confirmation](#success--confirmation)
- [Onboarding Copy](#onboarding-copy)
- [Help & Documentation](#help--documentation)

---

## Writing Principles

### Be Clear, Not Clever
```
❌ "Oops! Looks like something went sideways!"
✅ "Unable to save. Check your connection and try again."

❌ "You're all caught up! 🎉"
✅ "No new notifications"
```

### Be Concise
```
❌ "Click here in order to submit your form and complete the signup process"
✅ "Submit"

❌ "Are you sure you want to delete this item? This action cannot be undone."
✅ "Delete this item? This can't be undone."
```

### Be Helpful
```
❌ "Invalid input"
✅ "Email must include @ symbol"

❌ "Error 500"
✅ "Something went wrong. We've been notified and are looking into it."
```

### Use Active Voice
```
❌ "Your password has been changed"
✅ "Password changed"

❌ "The file was uploaded successfully"
✅ "File uploaded"
```

### Address the User Directly
```
❌ "Users can create new projects from the dashboard"
✅ "Create new projects from your dashboard"
```

---

## Labels & Actions

### Button Labels

**Use verbs that describe the action:**
```
❌ "OK" / "Yes" / "Submit"
✅ "Save changes" / "Delete project" / "Send invite"
```

**Be specific to context:**
```
❌ Generic: [Submit]
✅ Specific: [Create account] / [Send message] / [Save draft]
```

**Match the trigger:**
```
Link says: "Edit profile"
Button should say: [Save profile] not [Submit] or [Done]
```

### Button Label Patterns

| Action | Label Pattern | Example |
|--------|---------------|---------|
| Create | "Create [thing]" | Create project |
| Save | "Save [thing]" or just "Save" | Save changes |
| Delete | "Delete [thing]" | Delete comment |
| Send | "Send [thing]" | Send invite |
| Cancel | "Cancel" (never "No") | Cancel |
| Confirm | Repeat action verb | "Delete" not "Confirm" |

### Destructive Actions
Be explicit about consequences:
```
Button: [Delete project]
Confirmation: "Delete 'Acme Website'? 
              This will remove all 47 tasks and files. 
              This can't be undone."
Actions: [Cancel] [Delete project]
               ↑ Repeat exact action
```

### Navigation Labels

**Describe the destination:**
```
❌ "Click here"
✅ "View documentation"

❌ "More"
✅ "More options" or "All settings"
```

**Use nouns for pages, verbs for actions:**
```
Navigation (nouns): Dashboard, Projects, Settings
Actions (verbs): Create project, Export data, Invite team
```

### Form Labels

**Above input, not beside:**
```
✅ Email
   [                    ]

❌ Email: [              ]
```

**Be specific:**
```
❌ Name
✅ Full name (as shown on ID)

❌ Phone
✅ Mobile phone (for verification)
```

**Indicate optional, not required:**
```
✅ Company name (optional)
   [                    ]

❌ Company name *
   [                    ]
```

### Placeholder Text

**Show format, not label:**
```
✅ Email
   [name@example.com    ]

❌ Email
   [Enter your email    ]  ← Redundant
```

**Use realistic examples:**
```
✅ Search
   [Search by name, email, or ID...]

❌ Search  
   [Type here to search ]  ← Obvious
```

---

## Empty States

Empty states are opportunities to guide users. Never just say "Nothing here."

### Structure
```
┌─────────────────────────────────────┐
│         [Illustration]              │
│                                     │
│      What this area is for          │  ← Title
│                                     │
│    Why it's empty + what to do      │  ← Description
│                                     │
│         [Primary Action]            │  ← CTA
│                                     │
└─────────────────────────────────────┘
```

### By Context

**First-time (zero state):**
```
Title: No projects yet
Description: Projects help you organize work and collaborate with your team.
Action: [Create your first project]
```

**Search with no results:**
```
Title: No results for "quarterly report"
Description: Try different keywords or check your spelling.
Action: [Clear search] or try: "Q3 report", "quarterly summary"
```

**Filtered to nothing:**
```
Title: No tasks match these filters
Description: Try removing some filters to see more results.
Action: [Clear filters]
```

**Completed state (positive empty):**
```
Title: You're all caught up
Description: No pending tasks. Time for a coffee break?
Action: (none or [View completed])
```

**Error state:**
```
Title: Couldn't load messages
Description: Check your connection and try again.
Action: [Retry]
```

### Empty State Copy Patterns

| Situation | Tone | Example |
|-----------|------|---------|
| First use | Encouraging, educational | "Get started by creating your first..." |
| No results | Helpful, suggestive | "Try different keywords or..." |
| Completed | Positive, brief | "All done!" or "No pending items" |
| Error | Honest, actionable | "Something went wrong. [Retry]" |

---

## Error Messages

### Error Message Structure

```
What happened + Why (if helpful) + How to fix it
```

**Examples:**
```
❌ "Error"
❌ "Invalid"
❌ "Something went wrong"

✅ "Email already registered. Sign in instead?"
✅ "Password must be at least 8 characters"
✅ "Couldn't connect. Check your internet and try again."
```

### Error Copy by Type

**Validation errors (user input):**
```
Be specific about what's wrong and how to fix it.

❌ "Invalid email"
✅ "Enter a valid email (example: name@company.com)"

❌ "Password too weak"
✅ "Add at least one number or symbol"
```

**System errors (our fault):**
```
Be honest, apologize briefly, offer next step.

❌ "Error 500"
✅ "Something went wrong on our end. We're looking into it. Try again in a few minutes."
```

**Permission errors:**
```
Explain why and what they can do.

❌ "Access denied"
✅ "You don't have access to this project. Ask the project owner to invite you."
```

**Not found errors:**
```
Help them get back on track.

❌ "404 Not Found"
✅ "This page doesn't exist. It may have been moved or deleted. [Go to dashboard]"
```

### Error Tone

**Don't blame the user:**
```
❌ "You entered an invalid date"
✅ "Enter a date in MM/DD/YYYY format"

❌ "You don't have permission"
✅ "This action requires admin access"
```

**Don't be overly casual:**
```
❌ "Oopsie! Something broke 😅"
✅ "Something went wrong. Please try again."
```

**Don't be robotic:**
```
❌ "ERROR: INVALID_CREDENTIALS_EXCEPTION"
✅ "Incorrect email or password"
```

---

## Success & Confirmation

### Confirmation Messages

Keep them brief. Users want to move on.

```
❌ "Congratulations! Your profile has been successfully updated. 
    Your changes have been saved to our servers."

✅ "Profile updated"
```

### Success Feedback Patterns

**Inline (stays in place):**
```
[Save] → [Saved ✓] → [Save]
         (after 2 seconds)
```

**Toast (temporary):**
```
┌─────────────────────────────┐
│ ✓ Changes saved             │
└─────────────────────────────┘
(Auto-dismiss after 3-5 seconds)
```

**With next step:**
```
✓ Project created
  [Open project] [Create another]
```

### When Confirmation is Needed

| Action | Confirmation Type |
|--------|-------------------|
| Save | Subtle (inline or toast) |
| Send | Toast with "Undo" |
| Delete | Pre-confirmation dialog |
| Destructive | Explicit dialog with consequences |
| Background | Status indicator |

### Confirmation Dialog Copy

```
Title: [Verb] [specific thing]?
Body: Consequence + what happens next
Actions: [Cancel] [Verb]

Example:
Title: Delete "Q3 Report"?
Body: This will permanently delete the report and all 12 comments. 
      This action can't be undone.
Actions: [Cancel] [Delete report]
```

---

## Onboarding Copy

### Welcome Messages

**Focus on benefit, not product:**
```
❌ "Welcome to Acme App!"
✅ "Let's get your team organized"

❌ "Thanks for signing up for Acme!"
✅ "Your workspace is ready"
```

### Setup Steps

**Clear, numbered steps:**
```
Step 1 of 3: Set up your profile
Add a photo and name so your team knows it's you.

[Upload photo]
Full name: [                ]

[Skip for now] [Continue]
```

### Tooltip/Callout Copy

**Brief and actionable:**
```
❌ "This is the search function. You can use it to search 
    for items in your workspace using keywords."

✅ "Search everything
    Find projects, tasks, and people"
```

### Empty State Onboarding

First-time users need guidance:

```
[First project view - empty]

Title: This is where your work happens
Description: Tasks you create will appear here. 
             Start by adding your first task.

[+ Add your first task]

💡 Tip: Press 'N' to quickly create tasks from anywhere.
```

---

## Help & Documentation

### Inline Help

**Placement:** Below input, near relevant element
**Tone:** Instructional, brief

```
Password
[                    ]
At least 8 characters with a number or symbol
```

### Contextual Help

**Show when relevant:**
```
Setting: Auto-archive completed tasks
         [Toggle: ON]
         
         ⓘ Tasks move to Archive 7 days after completion.
           You can restore them anytime from Archive.
```

### Progressive Help

**Level 1: Hint text**
```
[Search by name, email, or keyword...]
```

**Level 2: Tooltip on ?**
```
Advanced search [?] → "Use quotes for exact match, - to exclude"
```

**Level 3: Link to docs**
```
[Learn more about advanced search →]
```

### Help Link Copy

```
❌ "Click here for help"
❌ "Documentation"

✅ "Learn more about [specific topic]"
✅ "How to [specific task]"
✅ "[Topic] guide"
```

---

## Copy Checklist

Before shipping, verify:

- [ ] Button labels are specific verbs
- [ ] Error messages explain how to fix
- [ ] Empty states have clear next actions
- [ ] No jargon or technical terms
- [ ] Confirmation messages are brief
- [ ] Help text appears where needed
- [ ] Tone is consistent throughout
- [ ] Labels match across related screens
- [ ] Nothing says "Click here" or "Submit"

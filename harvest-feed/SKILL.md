---
name: harvest-feed
description: "Mine the current conversation for publishable feed entries for the digital garden site. Use when the user says 'harvest', 'harvest feed', 'mine this session', 'extract posts', 'what can I publish from this session', or at the end of a work session to turn learnings into content. Analyzes chat history to find non-obvious tricks, useful discoveries, tooling insights, and project progress — then proposes 4-5 feed entries ready to publish."
---

# Harvest Feed

Scan the current conversation history and generate 4-5 feed entry suggestions for the digital garden at `~/work/projects/digital-garden/`.

## What Makes a Good Entry

Prioritize these (highest to lowest):
1. **Novel techniques** — something done in a non-obvious way that others would find useful
2. **Tooling discoveries** — how Claude Code, MCP servers, CLI tools, or AI workflows were used effectively
3. **Gotchas and fixes** — problems hit and how they were solved, especially if the solution wasn't obvious
4. **Project progress** — meaningful milestones, shipped features, or architectural decisions (changelog-style)
5. **Workflow insights** — patterns for working with AI that improved speed or quality

Skip anything generic that a reader could easily find in official docs.

## Procedure

### 1. Scan and Extract

Review the full conversation. For each candidate, note:
- What happened (the concrete thing)
- Why it's interesting (the non-obvious part)
- Who benefits from knowing this (the audience signal)
- What visual artefact could make this entry more engaging (see step 2b)

### 2a. Classify Each Entry

Read [references/content-formats.md](references/content-formats.md) for exact schemas.

Pick the best type for each:

| Signal | Type |
|--------|------|
| Quick observation, one insight, 2-5 sentences | **Discovery (learning)** |
| A useful link/resource worth sharing | **Discovery (resource)** |
| Progress on an active project | **Project activity entry** |

For project activity entries, check which project file to append to:
```bash
ls ~/work/projects/digital-garden/src/content/projects/
```

### 2b. Suggest Visual Artefacts

For each entry, suggest one or more artefacts that would make the post more engaging. Think about what the reader would want to *see* alongside the text.

**Types of artefacts to suggest:**

| Artefact | When to suggest | Example |
|----------|----------------|---------|
| **Screenshot** | UI changes, tool output, terminal results, before/after comparisons | "Screenshot of the Shopify admin after product import" |
| **Code snippet** | A specific command, config block, or script that made things work | Use the `code` + `codeLanguage` fields |
| **Before/after pair** | Migrations, redesigns, refactors | "Screenshot of WooCommerce vs Shopify product page" |
| **Terminal output** | CLI tool results, build logs, error messages that tell the story | Screenshot or code block of the relevant output |
| **Diagram or flow** | Architecture decisions, data pipelines, workflow explanations | "Simple flow: WooCommerce export → script → Shopify CSV → upload" |
| **Short screen recording** | Multi-step workflows, interactive features | "Record the /harvest-feed flow from invocation to file creation" |

**Rules:**
- Every entry should have at least one artefact suggestion, even if it's just "Screenshot of [specific thing]"
- Be specific about *what* to capture — "Screenshot of the terminal" is too vague, "Screenshot of the Shopify CLI theme dev output showing hot reload" is good
- If the artefact already exists in the conversation (e.g. user shared a screenshot earlier), reference it
- Suggest where to save images: `public/captures/` (or `public/images/projects/[project-slug]/` for project activity)

### 3. Present Suggestions

Present all 4-5 suggestions in a numbered list. For each show:

```
## [N]. [Title]
**Type**: Discovery (learning) / Discovery (resource) / Project update → [project-slug]
**Why it's worth sharing**: One sentence on the novelty or usefulness.
**Suggested artefact**: What to capture and where to save it.

[Draft content — full markdown ready to paste into a file]
```

### 4. Ask for Selection

After presenting all suggestions, ask:
> Which of these should I create? (e.g. "1, 3, 5" or "all" or "skip 2")
> For entries with suggested screenshots — do you want to capture those now, or add them later?

### 5. Write Files

For approved entries, create the actual files:
- **Discovery**: `src/content/discoveries/YYYY-MM-DD-slug.md`
- **Project activity**: Append to the `activity:` array in the existing project file

Use today's date. Set `draft: true` so nothing publishes until the user explicitly flips it.

If artefacts are code snippets, include them directly using `code` and `codeLanguage` fields.

For image artefacts, add to the `images` array with the expected path. Leave a TODO note if the screenshot still needs to be captured.

## Writing Style

**REQUIRED:** Read [references/writing-style.md](references/writing-style.md) before drafting any content. It defines voice, titles, punctuation rules, structure, and what to avoid.

**Critical rules (always apply, even without loading the guide):**
- Always wrap frontmatter `title` values in double quotes
- Limit em dashes to 1-2 per post. Vary with periods, commas, parentheses
- Lead with what it is, not why you're writing about it
- No lecture tone, no takeaway wrap-ups, no salesy framing

## Reference Examples

Before writing, review these examples to match the tone and structure of existing posts:

| Example | Type | What it demonstrates |
|---------|------|---------------------|
| [examples/learning-with-images.md](references/examples/learning-with-images.md) | Learning | Multi-tool comparison, inline images, personal take as blockquote |
| [examples/resource-concise.md](references/examples/resource-concise.md) | Resource | Audience-targeted intro, concise, no claims |
| [examples/learning-long-form.md](references/examples/learning-long-form.md) | Learning | Technical depth, sections, prompt inclusion |
| [examples/resource-minimal.md](references/examples/resource-minimal.md) | Resource | One-liner commentary, minimal |
| [examples/resource-premise-driven.md](references/examples/resource-premise-driven.md) | Resource | Premise-first framing, context before link |

Match the closest example to each entry you draft.

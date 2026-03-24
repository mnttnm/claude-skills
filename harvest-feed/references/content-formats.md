# Digital Garden Content Formats

Site root: `~/work/projects/digital-garden/`

## Entry Types and When to Use Each

### Discovery — learning (`src/content/discoveries/`)
A quick observation, trick, or insight. Short and conversational — like a dev journal entry.
- Filename: `YYYY-MM-DD-slug.md`
- Shows as "LEARNING" in feed

```yaml
---
title: "Short descriptive title"
date: YYYY-MM-DD
kind: learning
tags: ["tag1", "tag2"]
draft: false
images: []
videos: []
code: ""
codeLanguage: ""
prompts: []
---

Brief content. What happened, what you noticed. 2-4 sentences is often enough.
```

### Discovery — resource (`src/content/discoveries/`)
A useful link worth sharing with brief commentary.
- Filename: `YYYY-MM-DD-slug.md`
- Shows as "RESOURCE" in feed

```yaml
---
title: "Title describing the resource"
date: YYYY-MM-DD
kind: resource
tags: ["tag1"]
draft: false
url: "https://example.com/resource"
linkTitle: "Actual page title"  # extracted from the link
images: []
videos: []
prompts: []
---

One or two sentences on why it's worth checking out.
```

### Project Activity Entry (appended to existing project file)
Progress update on an active project. Changelog-style.
- Added to `activity:` array in existing project `.md` file
- Shows as "PROJECT UPDATE" in feed

```yaml
  - date: YYYY-MM-DD
    title: "What changed or was discovered"
    summary: "2-3 sentence summary, conversational tone"
    tags: ["relevant", "tags"]
    activityType: "update"  # update | milestone | fix | learning | discovery | experiment
    highlights:
      - "Concrete thing 1"
      - "Concrete thing 2"
    images:
      - src: "/images/projects/[slug]/filename.png"
        alt: "Description"
        caption: "Optional caption"
    videos: []
    code: ""
    codeLanguage: ""
    prompts: []
```

`activityType` guide:
- `update` — general progress, something shipped or changed
- `learning` — realized something useful while working
- `discovery` — found a tool, technique, or approach worth sharing
- `milestone` — significant checkpoint reached
- `experiment` — tried something to see what happens
- `fix` — resolved a bug or issue

## Existing Projects (grep for current slugs)

Find project files: `src/content/projects/*.md`

Each project has a `title:` in frontmatter and an `activity:` array to append to.

## Image/Video Schema

Images and videos are arrays of objects:

```yaml
images:
  - src: "/captures/2026-03-06-filename.png"
    alt: "Description"
    caption: "Optional caption"

videos:
  - src: "/videos/demo.mp4"
    poster: "/videos/demo-poster.png"
    caption: "Optional caption"
```

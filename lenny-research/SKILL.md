---
name: lenny-research
description: >
  Research Lenny Rachitsky's archive of 349 newsletter posts and 289 podcast
  interviews for comprehensive, well-cited answers. Auto-trigger when the user
  asks practical questions about startups, product management, growth, B2B SaaS,
  pricing, leadership, career development, hiring, workplace soft skills, AI
  product work, go-to-market, analytics, org design, or user research. Handles
  topic deep-dives, guest-specific queries, actionable advice requests, career
  transition questions, cross-topic comparisons, and multi-faceted questions
  spanning several domains. Use the lennys-data MCP tools for search and retrieval.
---

# Lenny's Archive Research

Research Lenny's archive using multi-probe retrieval for comprehensive, well-cited answers.

## Workflow

### 1. Decompose the Query

Identify query type and search dimensions:

- **Topic deep-dive**: "What has Lenny covered about pricing?" → single topic, broad search
- **Guest-specific**: "What did Shreyas Doshi say about PM craft?" → guest + topic
- **Actionable advice**: "How should I run my first 1:1?" → practical frameworks
- **Comparison**: "Compare advice on PMF from different guests" → multiple perspectives
- **Multi-faceted**: "Moving from engineering to product in the AI era" → 2-3 topic dimensions

Read [references/topic-map.md](references/topic-map.md) to expand query terms into pipe-delimited search probes. Most real questions span 2-3 topic clusters — create a separate search probe for each dimension.

### 2. Parallel Multi-Probe Search

Fire 2-3 `search_content` calls **in parallel** with different term expansions. Use `content_type` filter only when query clearly targets one type.

Example for "Moving from engineering to product in the AI era":
```
Probe 1: search_content("career|transition|role|engineering to product|switch", limit=15)
Probe 2: search_content("AI|LLM|product manager|new world|changing", limit=10)
```

If Probe 1 returns <3 results, skip further probes — topic is sparse, note this in response.

### 3. Merge, Rank, Extract

Deduplicate by filename. Rank: multi-probe overlap > title match > tag relevance > recency.

For top 5-10 results, extract in parallel:
- **Newsletters** (typically <5K words): `read_content` for full text
- **Podcasts** (typically >10K words): `read_excerpt` with `radius=800`, iterate `match_index` 0-2

See [references/retrieval-guide.md](references/retrieval-guide.md) for detailed extraction strategy per query type.

### 4. Synthesize

**Adaptive depth** based on query type:

| Query type | Sources | Style |
|------------|---------|-------|
| Topic deep-dive | 5-10 | Group by sub-theme, multiple perspectives |
| Guest-specific | 3-5 episodes | Organize by topics discussed |
| Actionable advice | 3-5 | Lead with clearest framework, then alternatives |
| Comparison | 3-5 per side | Table or side-by-side format |
| Quick factual | 1-3 | Direct answer with citation |

## Citation Rules

- Cite every claim: `[Post Title](filename)` — include guest name for podcasts
- Include 2-3 direct quotes per response when pithy/memorable quotes exist
- Group findings by sub-theme, not by source file
- Flag sparse coverage: "I found limited coverage of this in Lenny's archive"
- Note: the archive excludes the last 3 months of newsletter posts

## Speed Rules

- All search probes execute in parallel (single tool call batch)
- All excerpt/content reads execute in parallel
- Never full-read a podcast transcript unless specifically needed
- Skip secondary probes when primary search returns <3 results

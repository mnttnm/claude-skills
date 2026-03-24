# Retrieval Strategy Guide

## MCP Tools Available

All tools are prefixed with `mcp__claude_ai_lennys-data__`:

| Tool | Purpose | When to use |
|------|---------|-------------|
| `search_content(query, content_type, limit)` | Text search across titles, summaries, tags, content | Primary discovery — always start here |
| `list_content(content_type, limit, offset)` | Browse/paginate the archive | Browse by type when search terms are too vague |
| `read_content(filename)` | Full file read | Newsletters (short) or when full context needed |
| `read_excerpt(filename, query, match_index, radius)` | Focused excerpt around match | Podcasts (long) or when targeting specific passages |

## Retrieval Workflow

### Step 1: Decompose the Query

Read [topic-map.md](topic-map.md) for expansion terms.

1. Identify 1-3 topic clusters that match the query
2. For multi-faceted queries, create separate probes for each dimension
3. For guest-specific queries, create one probe with guest name + topic, one with just the topic

### Step 2: Parallel Search (fire all at once)

Run 2-3 `search_content` calls in parallel:

```
Probe 1: Primary topic terms (limit=15)
Probe 2: Secondary/synonym terms (limit=10)
Probe 3: (if guest-specific) Guest name + topic (limit=10)
```

Use `content_type` filter when the query clearly targets one type:
- "What did [guest] say about..." → `content_type: "podcast"`
- "Lenny's newsletter about..." → `content_type: "newsletter"`
- Otherwise: leave empty to search both

**Early exit**: If Probe 1 returns fewer than 3 results, the topic is sparse — skip Probe 2 and note this in the response.

### Step 3: Merge and Rank

Deduplicate by filename. Rank candidates:

1. **Multi-probe overlap** (appeared in 2+ searches) — strongest signal
2. **Title/description match** — the piece is specifically about this topic
3. **Tag relevance** — tagged with the queried topic
4. **Recency** — prefer newer content when quality is equal

Select top 5-10 candidates for extraction.

### Step 4: Smart Extraction

Choose strategy based on file characteristics:

| File type | Word count | Strategy |
|-----------|-----------|----------|
| Newsletter | Any (typically <5000) | `read_content` — full read, fits easily |
| Podcast | >5000 | `read_excerpt` with `radius=800`, multiple `match_index` values |

**For podcasts, extract multiple passages:**
- Topic deep-dive: `match_index` 0, 1, 2 (3 excerpts)
- Guest-specific: `match_index` 0, 1, 2, 3, 4 (5 excerpts for broader coverage)
- Actionable advice: `match_index` 0, 1 with `radius=1000` (fuller context around frameworks)

**Fire all reads in parallel** — don't wait for one before starting the next.

**Important**: Use the original user query terms (not just expansion terms) as the `query` parameter in `read_excerpt` to get the most relevant passages.

### Step 5: Depth Calibration

Adapt response depth to query type:

| Query type | Target sources | Response style |
|------------|---------------|----------------|
| Topic deep-dive | 5-10 | Comprehensive. Group by sub-theme. Multiple perspectives. |
| Guest-specific | 3-5 episodes | Organize by topics discussed. Rich quotes. |
| Actionable advice | 3-5 | Lead with clearest framework/steps. Supplement with alternatives. |
| Comparison | 3-5 per side | Table or side-by-side format. Highlight differences. |
| Quick factual | 1-3 | Direct answer with source citation. |

## Edge Cases

**Very broad queries** ("What has Lenny covered about product management?"):
- Use `list_content` with the matching tag to show scope
- Pick 5-7 most representative/recent pieces to summarize
- Note the breadth: "Lenny has covered this extensively across X posts..."

**No results found**:
- Try broader search terms
- Check if the topic uses different vocabulary in the archive
- Be transparent: "I didn't find direct coverage of this topic in Lenny's archive"

**Guest name variations**:
- Search with both full name and last name
- Some guests appear in multiple episodes — surface all of them

## Archive Limitations

- The archive excludes the most recent 3 months of newsletter posts
- Podcast transcripts may have minor transcription artifacts
- Some older posts may have different formatting conventions

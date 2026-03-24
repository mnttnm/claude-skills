# Strategy Reference

> **When to use this file**: At Checkpoint 3 when classifying dashboard type (operational/analytical/strategic), prioritizing metrics, and determining comparison approaches. Use after requirements are gathered.

---

## Strategy Process

```
1. Analyze requirements
2. PROPOSE dashboard type (with reasoning)
3. CONFIRM with user before proceeding
4. PROPOSE metric prioritization
5. CONFIRM with user before proceeding
6. Document agreed strategy
```

## Dashboard Type Proposal

### Present Options, Don't Just Decide
```
"Based on your requirements, I'm recommending an **Analytical Dashboard**.

Here's my reasoning:
- Your users review data daily (not real-time emergency response)
- You need drill-down for investigation
- Comparisons and trends are key

**Alternative considerations:**
- If you need real-time alerts when metrics cross thresholds → Operational
- If this is primarily for executive/board review → Strategic

Does Analytical fit, or does one of the alternatives sound more accurate?"
```

### Type Characteristics to Present

**Operational** — Present when:
- User mentioned "real-time," "alerts," "immediate action"
- Monitoring use case evident
```
"An Operational dashboard would give you:
- Real-time or near-real-time updates
- Clear alert states when things need attention
- Simple, glanceable design for quick status checks
- Focus on exceptions rather than exploration

Is that the behavior you need?"
```

**Analytical** — Present when:
- User mentioned "trends," "compare," "investigate," "drill down"
- Daily/weekly review cadence
```
"An Analytical dashboard would give you:
- Interactive filtering and exploration
- Drill-down paths to investigate issues
- Comparative views (this period vs. that period)
- Daily or weekly data refresh

Does that match how you'll use it?"
```

**Strategic** — Present when:
- Executive audience mentioned
- KPIs, OKRs, board reporting
```
"A Strategic dashboard would give you:
- High-level KPIs aligned with business goals
- Trend focus rather than granular detail
- Clean, presentation-ready design
- Monthly/quarterly time horizons

Is this primarily for executive review?"
```

## Metric Prioritization Proposal

### Present Proposed Priority
```
"Here's how I'd recommend prioritizing your metrics:

**CRITICAL (Top-left, most prominent):**
1. Revenue — Your stated primary decision driver

**IMPORTANT (Top-right, clearly visible):**
2. Pipeline Value — Leading indicator for revenue
3. Win Rate — Health of sales process

**SUPPORTING (Lower sections, available but not dominant):**
4. Average Deal Size — Context metric
5. Sales Cycle Length — Diagnostic metric

**My reasoning:**
- Revenue directly answers your primary question
- Pipeline and Win Rate are leading indicators
- The others provide context for investigation

Does this priority order match your intuition? Any metrics that
should be more or less prominent?"
```

### The "So What?" Validation
For each metric, confirm its importance:
```
"For [Metric], help me understand the action:
- If this number is bad, what would you do?
- If this number is good, what does it mean?

This helps me ensure it deserves dashboard real estate."
```

## Context Confirmation

### Confirm Comparison Choices
```
"For each metric, here's the comparison I'm planning:

| Metric | Compare Against | Why |
|--------|-----------------|-----|
| Revenue | vs. Target + vs. Last Month | Shows goal progress and trend |
| Pipeline | vs. Target | Goal-focused |
| Win Rate | vs. Last Month | Trend-focused |

Does this comparison approach work, or would different comparisons
be more useful?"
```

### Confirm Refresh Rate
```
"Based on your use case, I'm assuming:
- Data refresh: Daily
- Dashboard updates: Automatic on load

Is that right, or do you need more frequent updates?"
```

## Strategy Confirmation Checkpoint

Before proceeding to design, present complete strategy:
```
"Here's the strategic approach I'm proposing:

**Dashboard Type**: Analytical
- Daily use for investigation and monitoring
- Interactive with drill-down capability

**Metric Priority**:
1. Revenue (CRITICAL) — vs. target and last month
2. Pipeline (IMPORTANT) — vs. target
3. Win Rate (IMPORTANT) — vs. last month
4. Deal Size (SUPPORTING) — vs. last quarter
5. Cycle Length (SUPPORTING) — vs. average

**Data Approach**:
- Daily refresh
- Historical data for trend analysis

**Does this strategy align with your needs?**

Specifically:
- Is the priority order right?
- Are the comparisons useful?
- Anything I should adjust before designing?"
```

## Handling Disagreement

### When User Disagrees with Type
```
User: "I think it should be operational, not analytical"

Agent: "Got it! Let me understand better:
- Do you need real-time data (updates every few seconds/minutes)?
- Should there be alert states that flag when things need immediate action?
- Is the primary use 'monitoring' vs. 'investigating'?

If yes to these, Operational is right and I'll adjust accordingly."
```

### When User Disagrees with Priority
```
User: "Win Rate should be the top metric, not Revenue"

Agent: "Absolutely, let me reorder:

**CRITICAL**: Win Rate
**IMPORTANT**: Revenue, Pipeline
**SUPPORTING**: Deal Size, Cycle Length

Win Rate will be the dominant visual element. Does this
feel right?"
```

## Output: Confirmed Strategic Brief

```markdown
## Dashboard Strategic Brief

**Type**: [Type] — CONFIRMED by user
**Primary Decision**: [Decision this supports]
**Refresh Cadence**: [Rate] — CONFIRMED by user

### Metric Priority (Confirmed)
| Priority | Metric | Comparison | Position |
|----------|--------|------------|----------|
| Critical | [Metric] | [vs. what] | Top-left |
| Important | [Metric] | [vs. what] | Top-right |
| Supporting | [Metric] | [vs. what] | Lower |

### Key Decisions Made
- Dashboard type: [Type] because [reasoning]
- Top metric: [Metric] because [user reasoning]
- Comparison approach: [Approach] because [reasoning]

### User Confirmations
- [ ] Type confirmed
- [ ] Priority confirmed
- [ ] Comparisons confirmed
- [ ] Ready for architecture phase
```

## Anti-Patterns

### Don't
- Classify dashboard type without explaining reasoning
- Set metric priority without asking
- Choose comparisons without confirming
- Move to design without strategy confirmation

### Do
- Propose with reasoning
- Present alternatives
- Confirm before proceeding
- Document what was agreed

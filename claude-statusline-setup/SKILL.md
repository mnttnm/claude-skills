---
name: claude-statusline-setup
description: Installs a customized Claude Code statusline at ~/.claude/statusline-command.sh and wires it up via ~/.claude/settings.json. Asks the user which components to include (git, model, context bar, 5h/weekly rate-limit %, RTK token savings, Shopify, vim) and emits a tailored bash script. Use when the user says "set up my statusline", "install a statusline", "configure status bar in Claude Code", "build a Claude Code status line", or shares a screenshot/description of a statusline like this and asks to replicate it. Also triggers on "add rtk savings to my statusline" or similar customization requests.
---

# claude-statusline-setup

Installs a tailored statusline script at `~/.claude/statusline-command.sh` and registers it in `~/.claude/settings.json`. The working-directory segment is always included; everything else is opt-in.

## Step 1 — Ask which components to include

Call `AskUserQuestion` with one batched call covering the optional components. Use multiSelect where the tool supports it. The component set:

- `git` — branch + dirty file count
- `model` — model display name
- `context` — context window usage bar
- `five_hour` — 5-hour rate limit %
- `weekly` — 7-day rate limit %
- `rtk` — RTK token savings (only valid if user uses the rtk CLI)
- `shopify` — Shopify theme dev server URL (niche)
- `vim` — vim mode indicator (niche)

Do NOT ask about working directory — it is always included.

If the user says "just give me the standard one" / "default" / similar, skip the question and use: `git`, `model`, `context`, `five_hour`, `weekly`. Add `rtk` only if the user has mentioned rtk or token savings.

Store the chosen set as `SELECTED` for the rest of the workflow.

## Step 2 — RTK preflight (only if `rtk` ∈ SELECTED)

Run `command -v rtk` via Bash. If found, continue.

If NOT found, tell the user RTK isn't installed, point them to the rtk repo (search "Rust Token Killer rtk install"), and call `AskUserQuestion` with two options:

- "Skip RTK, continue setup" → remove `rtk` from SELECTED, proceed
- "Pause — I'll install rtk and re-run" → stop the skill cleanly

Do NOT attempt to install rtk; we don't own its distribution.

## Step 3 — Generate the statusline script

Locate the template. For personal install: `$HOME/.claude/skills/claude-statusline-setup/assets/statusline-template.sh`. For plugin install: `${CLAUDE_PLUGIN_ROOT}/assets/statusline-template.sh`.

The template contains every component delimited by paired markers:

```
# >>>SECTION:<name>>>>
... component code ...
# <<<SECTION:<name><<<
```

And in the assembly area:

```
# >>>ASSEMBLY:<name>>>>
[ -n "$..." ] && output+="..."
# <<<ASSEMBLY:<name><<<
```

Component → marker name is 1:1. Helpers also use markers:
- `helper_bar` — strip if `context` ∉ SELECTED
- `helper_pct` — strip if `five_hour` ∉ SELECTED AND `weekly` ∉ SELECTED

**Build process:**

1. If `~/.claude/statusline-command.sh` already exists, show its first ~10 lines to the user, then ask via `AskUserQuestion` whether to back it up and overwrite. On confirm, copy to `~/.claude/statusline-command.sh.backup-$(date +%s)`.

2. Copy template to `~/.claude/statusline-command.sh`.

3. For each marker name to strip (every component NOT in SELECTED, plus helpers per the rule above), run sed against the destination. macOS uses `sed -i.bak`; Linux uses `sed -i`. Detect via `uname`.

   Use a bash array (NOT a space-separated string in a variable) — zsh does not word-split unquoted variable expansions, so the loop will silently no-op under zsh if you use `$VAR`-style.

   ```bash
   OUT="$HOME/.claude/statusline-command.sh"
   TO_STRIP=(rtk shopify vim)   # populate with components NOT in SELECTED, plus helper_bar/helper_pct per rules above

   if [ "$(uname)" = "Darwin" ]; then
     for NAME in "${TO_STRIP[@]}"; do
       sed -i.bak "/# >>>SECTION:${NAME}>>>/,/# <<<SECTION:${NAME}<<</d" "$OUT"
       sed -i.bak "/# >>>ASSEMBLY:${NAME}>>>/,/# <<<ASSEMBLY:${NAME}<<</d" "$OUT"
     done
   else
     for NAME in "${TO_STRIP[@]}"; do
       sed -i "/# >>>SECTION:${NAME}>>>/,/# <<<SECTION:${NAME}<<</d" "$OUT"
       sed -i "/# >>>ASSEMBLY:${NAME}>>>/,/# <<<ASSEMBLY:${NAME}<<</d" "$OUT"
     done
   fi

   rm -f "$OUT.bak"
   ```

   Verify by running `bash -n "$OUT"` — must report no errors before continuing.

4. Leftover markers for KEPT components are fine — they're inert comments.

## Step 4 — Wire up settings.json

Use `jq` so existing keys are preserved. Always back up first.

```bash
SETTINGS="$HOME/.claude/settings.json"
SCRIPT="$HOME/.claude/statusline-command.sh"

[ -f "$SETTINGS" ] || echo '{}' > "$SETTINGS"
cp "$SETTINGS" "$SETTINGS.backup-$(date +%s)"

jq --arg cmd "bash $SCRIPT" \
   '.statusLine = {"type": "command", "command": $cmd}' \
   "$SETTINGS" > "$SETTINGS.tmp" && mv "$SETTINGS.tmp" "$SETTINGS"
```

If the user already had a `.statusLine` pointing somewhere else, show them the existing value via `jq '.statusLine' "$SETTINGS"` and confirm via `AskUserQuestion` before overwriting.

## Step 5 — Verify

Pipe a synthetic JSON payload through the new script:

```bash
echo '{
  "workspace": { "current_dir": "'"$HOME"'/example" },
  "model": { "display_name": "Sonnet 4.6" },
  "context_window": { "used_percentage": 35 },
  "rate_limits": {
    "five_hour": { "used_percentage": 42 },
    "seven_day": { "used_percentage": 78 }
  }
}' | bash "$HOME/.claude/statusline-command.sh"
```

Show the output. When piped to a non-terminal, raw ANSI escape codes appear as `\033[...m` literals — note this and reassure the user the colors will render correctly inside Claude Code.

Tell the user to submit any new prompt to see the live statusline.

## Component reference

JSON paths read from stdin (Claude Code provides this on every update):

| Component  | JSON path                                  |
|------------|--------------------------------------------|
| cwd        | `.workspace.current_dir` or `.cwd`         |
| git        | (shells out to `git` in cwd)               |
| model      | `.model.display_name`                      |
| context    | `.context_window.used_percentage`          |
| five_hour  | `.rate_limits.five_hour.used_percentage`   |
| weekly     | `.rate_limits.seven_day.used_percentage`   |
| rtk        | (shells out to `rtk gain --format json`)   |
| shopify    | (shells out to `pgrep` for theme dev)      |
| vim        | `.vim.mode`                                |

Color thresholds (both helpers): green ≤50%, yellow ≤70%, red >70%.

Truncation: Claude Code crops from the right. The template orders segments so the most useful info (cwd → git → model → context) survives narrow terminals.

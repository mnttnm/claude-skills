#!/bin/bash
# Claude Code Status Line
# Reads JSON from stdin provided by Claude Code on each update.

input=$(cat)

# ── ANSI Colors ──────────────────────────────────────────────
R="\033[0m"
B="\033[1m"
D="\033[2m"

B_BLUE="\033[1;34m"
B_MAG="\033[1;35m"
B_RED="\033[1;31m"
B_GRN="\033[1;32m"
B_YEL="\033[1;33m"
CYAN="\033[36m"
WHITE="\033[37m"
B_CYAN="\033[1;36m"

BLK_GRN="\033[32m"
BLK_YEL="\033[33m"
BLK_RED="\033[31m"
BLK_DIM="\033[90m"

# >>>SECTION:helper_bar>>>
# Bar helper — only included when context bar is selected.
build_bar() {
  local pct=$1 label=$2 width=${3:-10}
  local filled=$(( (pct * width + 99) / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  [ "$filled" -lt 0 ] && filled=0
  local empty=$((width - filled))
  local bar=""
  for ((i = 0; i < filled; i++)); do
    local block_pct=$(( (i + 1) * 100 / width ))
    if [ "$block_pct" -le 50 ]; then
      bar+="${BLK_GRN}▮${R}"
    elif [ "$block_pct" -le 70 ]; then
      bar+="${BLK_YEL}▮${R}"
    else
      bar+="${BLK_RED}▮${R}"
    fi
  done
  for ((i = 0; i < empty; i++)); do bar+="${BLK_DIM}▯${R}"; done
  __bar="${B}${label}${R} ${bar} ${B}${pct}%${R}"
}
# <<<SECTION:helper_bar<<<

# >>>SECTION:helper_pct>>>
# Percentage helper — only included when 5h or weekly is selected.
build_pct() {
  local pct=$1 label=$2
  local color="$BLK_GRN"
  if [ "$pct" -gt 70 ]; then
    color="$BLK_RED"
  elif [ "$pct" -gt 50 ]; then
    color="$BLK_YEL"
  fi
  __pct="${B}${label}${R} ${color}${pct}%${R}"
}
# <<<SECTION:helper_pct<<<

# ── Working directory (always on) ────────────────────────────
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // ""')
cwd_short=$(echo "$cwd" | sed "s|^$HOME|~|")

# >>>SECTION:git>>>
git_info=""
if [ -n "$cwd" ] && [ -d "$cwd" ]; then
  git_branch=$(git -C "$cwd" --no-optional-locks rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [ -n "$git_branch" ]; then
    changed=$(git -C "$cwd" --no-optional-locks status --porcelain 2>/dev/null | wc -l | tr -d ' ')
    if [ "$changed" -gt 0 ]; then
      git_info="${B_MAG}${git_branch}${R}${B_RED}(+${changed})${R}"
    else
      git_info="${B_MAG}${git_branch}${R}"
    fi
  fi
fi
# <<<SECTION:git<<<

# >>>SECTION:model>>>
model=$(echo "$input" | jq -r '.model.display_name // ""')
model=$(echo "$model" | sed 's/ *(.*//')
model_display=""
if [ -n "$model" ]; then
  model_display="${B_CYAN}${model}${R}"
fi
# <<<SECTION:model<<<

# >>>SECTION:context>>>
ctx_display=""
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
if [ -n "$used_pct" ]; then
  used_int=$(printf "%.0f" "$used_pct")
  build_bar "$used_int" "Context:" 16
  ctx_display="$__bar"
fi
# <<<SECTION:context<<<

# >>>SECTION:five_hour>>>
five_display=""
five_pct=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
if [ -n "$five_pct" ]; then
  five_int=$(printf "%.0f" "$five_pct")
  build_pct "$five_int" "5h:"
  five_display="$__pct"
fi
# <<<SECTION:five_hour<<<

# >>>SECTION:weekly>>>
week_display=""
week_pct=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')
if [ -n "$week_pct" ]; then
  week_int=$(printf "%.0f" "$week_pct")
  build_pct "$week_int" "7d:"
  week_display="$__pct"
fi
# <<<SECTION:weekly<<<

# >>>SECTION:rtk>>>
rtk_display=""
if command -v rtk >/dev/null 2>&1; then
  rtk_json=$(rtk gain --format json 2>/dev/null)
  if [ -n "$rtk_json" ]; then
    saved=$(echo "$rtk_json" | jq -r '.summary.total_saved // 0')
    saved_pct=$(echo "$rtk_json" | jq -r '.summary.avg_savings_pct // 0')
    if [ "$saved" -gt 0 ] 2>/dev/null; then
      if [ "$saved" -ge 1000000 ]; then
        saved_fmt=$(awk -v n="$saved" 'BEGIN{printf "%.1fM", n/1000000}')
      elif [ "$saved" -ge 1000 ]; then
        saved_fmt=$(awk -v n="$saved" 'BEGIN{printf "%.1fK", n/1000}')
      else
        saved_fmt="$saved"
      fi
      saved_pct_int=$(printf "%.0f" "$saved_pct")
      rtk_display="${B}RTK:${R} ${B_GRN}${saved_fmt}${R} ${D}(${saved_pct_int}%)${R}"
    fi
  fi
fi
# <<<SECTION:rtk<<<

# >>>SECTION:shopify>>>
shopify_display=""
shopify_pid=$(pgrep -f "shopify theme dev" 2>/dev/null | head -1)
if [ -n "$shopify_pid" ] && kill -0 "$shopify_pid" 2>/dev/null; then
  shopify_port=$(lsof -iTCP -sTCP:LISTEN -P -n -a -p "$shopify_pid" 2>/dev/null | awk 'NR>1 {split($9,a,":"); print a[2]; exit}')
  if [ -n "$shopify_port" ]; then
    shopify_display="${B_GRN}http://127.0.0.1:${shopify_port}${R}"
  else
    shopify_display="${B_YEL}starting...${R}"
  fi
fi
# <<<SECTION:shopify<<<

# >>>SECTION:vim>>>
vim_display=""
vim_mode=$(echo "$input" | jq -r '.vim.mode // empty')
if [ -n "$vim_mode" ]; then
  vim_display="${B_CYAN}${vim_mode}${R}"
fi
# <<<SECTION:vim<<<

# ── Assemble ─────────────────────────────────────────────────
# Claude Code truncates from the right — most important first.
s="  ${D}|${R}  "

output="${B_BLUE}📂 ${cwd_short}${R}"
# >>>ASSEMBLY:git>>>
[ -n "$git_info" ]        && output+="${s}🌿 ${git_info}"
# <<<ASSEMBLY:git<<<
# >>>ASSEMBLY:model>>>
[ -n "$model_display" ]   && output+="${s}⚡ ${model_display}"
# <<<ASSEMBLY:model<<<
# >>>ASSEMBLY:context>>>
[ -n "$ctx_display" ]     && output+="${s}${ctx_display}"
# <<<ASSEMBLY:context<<<
# >>>ASSEMBLY:five_hour>>>
[ -n "$five_display" ]    && output+="${s}⏱ ${five_display}"
# <<<ASSEMBLY:five_hour<<<
# >>>ASSEMBLY:weekly>>>
[ -n "$week_display" ]    && output+="${s}📊 ${week_display}"
# <<<ASSEMBLY:weekly<<<
# >>>ASSEMBLY:rtk>>>
[ -n "$rtk_display" ]     && output+="${s}💰 ${rtk_display}"
# <<<ASSEMBLY:rtk<<<
# >>>ASSEMBLY:shopify>>>
[ -n "$shopify_display" ] && output+="${s}🛍 ${shopify_display}"
# <<<ASSEMBLY:shopify<<<
# >>>ASSEMBLY:vim>>>
[ -n "$vim_display" ]     && output+="${s}⌨ ${vim_display}"
# <<<ASSEMBLY:vim<<<

echo -e "$output"

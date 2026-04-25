# Claude Skills

A collection of custom [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for designers and developers — covering UI/UX craft, productivity workflows, and editor tooling.

## Available Skills

### Design & UI

| Skill | Description |
|-------|-------------|
| [interface-grader](interface-grader/) | Grade any frontend interface with a two-layer scoring system. Layer 1 establishes the site's goal and context. Layer 2 grades craft quality through that lens, with site-wide and per-page criteria using binary pass/fail with evidence. |
| [ui-autoimprove](ui-autoimprove/) | Iteratively improve frontend UI quality through automated grade-fix-verify cycles inspired by Karpathy's autoresearch pattern. Grades the interface, identifies the weakest area, applies targeted fixes, and re-grades. |
| [dashboard](dashboard/) | Design modern, actionable dashboards through collaborative workflow. Covers requirements, strategy, visual design, and validation phases with user checkpoints. |
| [product-design-craft](product-design-craft/) | Create production-grade UI with the craft level of Linear, Stripe, Superhuman, Figma, Notion, and Slack. Covers design systems, component customization, interaction design, and micro-animations. |
| [product-ui](product-ui/) | Build production-grade product interfaces with physics-based animation, state handling, and systematic design tokens. The invisible craft that makes professional software feel polished. |
| [ux-patterns](ux-patterns/) | Design intuitive, frictionless user experiences. Covers page structure, information architecture, navigation patterns, content hierarchy, and user flows. |
| [interaction-design](interaction-design/) | Design and implement microinteractions, motion design, transitions, and user feedback patterns for polished UI experiences. |

### Productivity & Content

| Skill | Description |
|-------|-------------|
| [video-decompose](video-decompose/) | Convert screen recordings (Loom, mp4) into structured keyframes + aligned transcript for LLM consumption. SSIM-based frame deduplication with JSON output for agent integration. |
| [harvest-feed](harvest-feed/) | Mine conversations for publishable feed entries for a digital garden. Extracts non-obvious tricks, useful discoveries, tooling insights, and project progress into content-ready posts. |
| [lenny-research](lenny-research/) | Research Lenny Rachitsky's archive of 349 newsletter posts and 289 podcast interviews for practical advice on startups, product management, growth, and leadership. |

### Claude Code Tooling

| Skill | Description |
|-------|-------------|
| [claude-statusline-setup](claude-statusline-setup/) | Install a customized Claude Code statusline. Interactively asks which components to include (working directory, git branch, model, context bar, 5h/weekly rate-limit %, RTK token savings, Shopify dev server, vim mode) and emits a tailored `~/.claude/statusline-command.sh` plus the `settings.json` wiring. |

## Installation

### Quick Install (Recommended)

1. Clone this repo:

   ```bash
   git clone https://github.com/mnttnm/claude-skills.git
   ```

2. Copy the skill(s) you want into your Claude skills directory:

   ```bash
   cp -r claude-skills/<skill-name> ~/.claude/skills/<skill-name>
   ```

3. Restart Claude Code. The skill will be detected automatically.

### Install from `.skill` Package

Each skill has a pre-packaged `.skill` file in the [`dist/`](dist/) folder:

```bash
# Download and install a single skill
curl -LO https://raw.githubusercontent.com/mnttnm/claude-skills/main/dist/<skill-name>.skill
claude install-skill <skill-name>.skill
```

### Install All Skills

```bash
git clone https://github.com/mnttnm/claude-skills.git
for skill in claude-skills/*/; do
  [ -f "$skill/SKILL.md" ] && cp -r "$skill" ~/.claude/skills/
done
```

### Verify Installation

After installing, the skill should appear in Claude Code's skill list. You can also invoke any skill directly with `/<skill-name>`.

### Skill Dependencies

Most skills are self-contained (no external dependencies). Exceptions:

| Skill | Dependencies |
|-------|-------------|
| video-decompose | Python 3.10+, `opencv-python`, `scikit-image`, `numpy`. Optional: `yt-dlp` for URL downloads. |
| lenny-research | Lenny's Data MCP server for content access. |

```bash
# video-decompose dependencies
pip install opencv-python scikit-image numpy
brew install yt-dlp  # optional
```

### Uninstall

```bash
rm -rf ~/.claude/skills/<skill-name>
```

## Skill Structure

Each skill follows this structure:

```
skill-name/
├── SKILL.md              # Instructions for Claude (when/how to use)
├── scripts/              # Executable code (Python, Bash, etc.)
├── references/           # Documentation loaded into context as needed
└── assets/               # Templates, images, or files used in output
```

- **SKILL.md** is the only required file. It contains YAML frontmatter (`name` + `description`) that tells Claude when to activate the skill, and markdown body with instructions.
- Skills activate automatically based on conversation context, or can be invoked explicitly with `/<skill-name>`.

## Contributing

To add a new skill:

1. Create a directory at the repo root with `SKILL.md` and optional `scripts/`, `references/`, `assets/`
2. Package it using the skill-creator's `package_skill.py` into `dist/`
3. Add both the source directory and `.skill` package to the repo
4. Update the skills table in this README

## Author

[Mohit Tater](https://mohit.stream) · [GitHub](https://github.com/mnttnm)

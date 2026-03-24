# Claude Skills

A collection of custom [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for extending Claude's capabilities with specialized workflows.

## Available Skills

| Skill | Description |
|-------|-------------|
| [video-decompose](video-decompose/) | Convert screen recordings (Loom, mp4) into structured keyframes + aligned transcript. Extracts unique frames via SSIM-based deduplication, supports URL download via yt-dlp, and outputs markdown + images ready to feed into Claude conversations. |

## Installation

### Quick Install (Recommended)

1. Clone this repo:
   ```bash
   git clone https://github.com/mnttnm/claude-skills.git
   ```

2. Copy the skill you want into your Claude skills directory:
   ```bash
   cp -r claude-skills/video-decompose ~/.claude/skills/video-decompose
   ```

3. Restart Claude Code. The skill will be detected automatically.

### Install from `.skill` Package

Each skill also has a pre-packaged `.skill` file in the [`dist/`](dist/) folder:

```bash
# Download and install
curl -LO https://raw.githubusercontent.com/mnttnm/claude-skills/main/dist/video-decompose.skill
claude install-skill video-decompose.skill
```

### Install All Skills

```bash
git clone https://github.com/mnttnm/claude-skills.git
for skill in claude-skills/*/; do
  [ -f "$skill/SKILL.md" ] && cp -r "$skill" ~/.claude/skills/
done
```

### Verify Installation

After installing, verify the skill appears in Claude Code:

```bash
# Start a Claude Code session and check the skill list
# The skill should appear in the available skills
# You can also invoke it directly:
# /video-decompose
```

### Skill Dependencies

Some skills require external tools. Check each skill's SKILL.md for prerequisites:

| Skill | Dependencies |
|-------|-------------|
| video-decompose | Python 3.10+, `opencv-python`, `scikit-image`, `numpy` (required), `yt-dlp` (optional, for URL downloads) |

Install video-decompose dependencies:
```bash
pip install opencv-python scikit-image numpy
brew install yt-dlp  # optional, for downloading from Loom/YouTube URLs
```

### Uninstall

Remove the skill folder from your Claude skills directory:
```bash
rm -rf ~/.claude/skills/video-decompose
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

- **SKILL.md** is the only required file. It contains YAML frontmatter (`name` + `description`) that tells Claude when to activate the skill, and markdown instructions for how to use it.
- Skills activate automatically based on conversation context, or can be invoked explicitly with `/<skill-name>`.

## Contributing

To add a new skill:

1. Create a directory at the repo root with `SKILL.md` and optional `scripts/`, `references/`, `assets/`
2. Package it: `python3 scripts/package_skill.py <skill-dir> dist/`
3. Add both the source directory and `.skill` package to the repo
4. Update the skills table in this README
5. Document any dependencies in the dependencies table

## Author

[Mohit Tater](https://mohit.stream) · [GitHub](https://github.com/mnttnm)

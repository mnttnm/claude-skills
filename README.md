# Claude Skills

A collection of custom [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for extending Claude's capabilities with specialized workflows.

## Skills

| Skill | Description | Install |
|-------|-------------|---------|
| [video-decompose](video-decompose/) | Convert screen recordings (Loom, mp4) into structured keyframes + transcript for LLM consumption. Extracts unique frames using SSIM-based deduplication, aligns transcript segments, and outputs markdown + images ready to feed into Claude conversations. | [video-decompose.skill](video-decompose.skill) |

## Installation

### From `.skill` file

Download the `.skill` file and install via Claude Code:

```bash
claude install-skill video-decompose.skill
```

### Manual

Copy the skill directory into your Claude skills folder:

```bash
cp -r video-decompose ~/.claude/skills/video-decompose
```

## What are Claude Skills?

Skills are modular packages that extend Claude Code with specialized knowledge, workflows, and tools. Each skill contains:

- **SKILL.md** — Instructions that tell Claude when and how to use the skill
- **scripts/** — Executable code for deterministic operations
- **references/** — Documentation loaded into context as needed

Skills activate automatically based on conversation context or can be invoked explicitly with `/<skill-name>`.

## Contributing

Each skill lives in its own directory with a corresponding `.skill` package file. To add a new skill:

1. Create a directory with `SKILL.md`, and optional `scripts/`, `references/`, `assets/` folders
2. Package it using the skill-creator's `package_skill.py`
3. Add both the directory and `.skill` file to the repo
4. Update the skills table in this README

## Author

[Mohit Tater](https://mohit.stream) · [GitHub](https://github.com/mnttnm)

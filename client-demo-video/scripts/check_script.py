#!/usr/bin/env python3
"""Check a demo narration script before any voice credits are spent.

Usage:
  check_script.py storyboard.ts [--trace run.log] [--rate 0.072] [--allow OK,PDF] [--model v2]

Reads every `say:` string (or, for a .txt/.md file, every non-empty line) and reports:

  ERRORS   things that make text-to-speech read badly or that break the house style
           (dashes, digits, initialisms, symbols, exclamation marks, marketing words)
  WARNINGS hedged claims (the script may be asserting something nobody verified),
           long sentences, parentheses, colons
  TIMING   characters and estimated speaking seconds per line, and, with --trace, how
           each line compares with the time its on-screen action actually took

Exit status is 1 when there is at least one error, so it can gate a recording.
"""
import argparse
import re
import sys

MARKETING = [
    "leverage", "seamless", "seamlessly", "robust", "empower", "empowers", "unlock", "unlocks",
    "game-changing", "game changing", "revolutionary", "effortless", "effortlessly", "powerful",
    "best-in-class", "cutting-edge", "cutting edge", "amazing", "incredible", "exciting", "excited",
    "supercharge", "streamline", "streamlined", "transform", "transforms", "next-level", "next level",
    "world-class", "state-of-the-art", "blazing", "delight", "delightful", "intuitive", "sleek",
    "you'll love", "you will love", "take it to the next level", "in just one click", "at your fingertips",
]
HEDGES = [
    "should", "probably", "maybe", "i think", "i believe", "i guess", "hopefully", "tbd", "not sure",
    "might", "presumably", "supposed to", "i assume", "we assume",
]
ALLOWED_ACRONYMS_DEFAULT = {"I", "A", "OK"}

SAY = re.compile(r"""say:\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`[^`]*`)""")


def extract(path):
    text = open(path, encoding="utf-8").read()
    if path.endswith((".ts", ".tsx", ".js", ".mjs")):
        lines = []
        for match in SAY.finditer(text):
            raw = match.group(1)[1:-1]
            lines.append(raw.replace("\\'", "'").replace('\\"', '"').replace("\\n", " "))
        return lines
    return [line.strip() for line in text.splitlines() if line.strip() and not line.startswith("#")]


def strip_tags(line):
    return re.sub(r"\s{2,}", " ", re.sub(r"\[[^\]]+\]\s*", "", line)).strip()


def sentences(line):
    return [s for s in re.split(r"(?<=[.?!])\s+", strip_tags(line)) if s]


def check(line, allowed, model):
    errors, warnings = [], []
    spoken = strip_tags(line)
    if re.search(r"[—–]", spoken):
        errors.append("contains an em-dash or en-dash: use a full stop or a comma")
    if re.search(r"\d", spoken):
        errors.append("contains a digit: write numbers as words so they are read the way you would say them")
    for token in re.findall(r"\b[A-Z]{2,}[A-Za-z]*s?\b", spoken):
        if token not in allowed and token.rstrip("s") not in allowed:
            errors.append(f"initialism or all-caps word '{token}': say the full words, or add it to --allow if it is a spoken name")
    if re.search(r"[&%/@#+=<>*_~^|\\{}]", spoken):
        errors.append("contains a symbol that will be read aloud or skipped")
    if "!" in spoken:
        errors.append("exclamation mark: a meeting presenter does not shout")
    lowered = spoken.lower()
    for word in MARKETING:
        if re.search(r"\b" + re.escape(word) + r"\b", lowered):
            errors.append(f"marketing word '{word}': describe what the screen does instead of praising it")
    for word in HEDGES:
        if re.search(r"\b" + re.escape(word) + r"\b", lowered):
            warnings.append(f"hedge '{word}': if this is a fact nobody has checked, ask the open question instead of narrating a guess; if it is a real limitation, say it plainly")
    if re.search(r"[()]", spoken):
        warnings.append("parentheses are read as an odd aside: restructure the sentence")
    if re.search(r"[:;]", spoken):
        warnings.append("colon or semicolon makes an uneven pause: use two sentences")
    if "..." in spoken or "…" in spoken:
        warnings.append("ellipsis: fine as a deliberate pause on v3 or v4, awkward on v2 (use a break tag there)")
    for sentence in sentences(line):
        words = len(sentence.split())
        if words > 25:
            warnings.append(f"a sentence has {words} words: split it, listeners cannot re-read ('{sentence[:40]}...')")
    if not re.search(r"[.?]$", spoken):
        warnings.append("does not end with a full stop or question mark: the voice may trail off")
    return errors, warnings


def parse_trace(path):
    rows = []
    pattern = re.compile(r"(\S+)#(\d+)\s+said\s+(silent|[\d.]+-[\d.]+)\s+did\s+([\d.]+)-([\d.]+)")
    for line in open(path, encoding="utf-8", errors="ignore"):
        m = pattern.search(line)
        if m and m.group(3) != "silent":
            rows.append((m.group(1), int(m.group(2)), float(m.group(5)) - float(m.group(4))))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--trace")
    ap.add_argument("--rate", type=float, default=0.072, help="seconds per character; run.ts prints the measured value")
    ap.add_argument("--allow", default="", help="comma separated all-caps words that are fine to keep")
    ap.add_argument("--model", default="v4", help="v4, v3 or v2: changes what counts as a warning")
    a = ap.parse_args()

    allowed = ALLOWED_ACRONYMS_DEFAULT | {x.strip() for x in a.allow.split(",") if x.strip()}
    lines = extract(a.file)
    if not lines:
        print("No narration found. Expected `say:` strings in a .ts file, or one line per sentence in a .txt/.md file.")
        return 1
    trace = parse_trace(a.trace) if a.trace else []
    total_chars, error_count, warning_count = 0, 0, 0

    for i, line in enumerate(lines):
        errors, warnings = check(line, allowed, a.model)
        chars = len(line)
        total_chars += chars
        seconds = len(strip_tags(line)) * a.rate
        note = ""
        if i < len(trace):
            beat, step, action = trace[i]
            if action >= 0.05:  # a step with no action has nothing to compare
                over = action - seconds
                if over > 1.0:
                    warnings.append(f"the action ({beat}#{step}) takes {action:.1f}s but the line lasts about {seconds:.1f}s: the voice finishes {over:.1f}s before the picture, and the next step starts late. Lengthen the line to describe the action, or shorten the action")
                elif over < -2.0:
                    warnings.append(f"the line lasts about {seconds:.1f}s but the action ({beat}#{step}) is done after {action:.1f}s: the picture sits idle for {-over:.1f}s. Hold the spotlight longer, or tighten the line")
                note = f"  action {action:.1f}s"
        print(f"{i + 1:2d}. {chars:3d} chars  ~{seconds:4.1f}s{note}  {strip_tags(line)[:80]}")
        for e in errors:
            print(f"      ERROR    {e}")
        for w in warnings:
            print(f"      warning  {w}")
        error_count += len(errors)
        warning_count += len(warnings)

    print()
    print(f"{len(lines)} lines, {total_chars} characters, about {total_chars * a.rate / 60:.1f} minutes of speech at {a.rate} s per character")
    print(f"{error_count} errors, {warning_count} warnings")
    return 1 if error_count else 0


if __name__ == "__main__":
    sys.exit(main())

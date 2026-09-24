#!/usr/bin/env bash
# Install the NERVE Claude Code target into ~/.claude.
# FLOW: back up existing files -> render CLAUDE.md -> link CS skills -> merge NERVE keys into settings.json.
# Idempotent: re-running replaces only NERVE-owned content and keeps other settings.
set -euo pipefail

NERVE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CLAUDE_DIR="${CLAUDE_DIR:-$HOME/.claude}"
TARGET="$NERVE/targets/claude-code"
STAMP="$(date +%Y%m%d-%H%M%S)"

# Optional machine-local overrides (gitignored); read for context only.
# The rendered root is always this repository, so a stale local/env.sh cannot
# mis-render; a disagreement is reported instead.
if [ -f "$NERVE/local/env.sh" ]; then . "$NERVE/local/env.sh"; fi
ROOT="$NERVE"
if [ -n "${NERVE_ROOT:-}" ] && [ "$NERVE_ROOT" != "$NERVE" ]; then
  echo "warning: local/env.sh NERVE_ROOT ($NERVE_ROOT) differs from this repository ($NERVE)" >&2
fi

[ -f "$TARGET/CLAUDE.md" ] || { echo "NERVE target not found at $TARGET" >&2; exit 1; }
mkdir -p "$CLAUDE_DIR/skills"

# SAFETY: keep one timestamped copy of each pre-NERVE file; later runs only refresh NERVE content.
# Comparison uses the rendered form so idempotent re-runs do not create backups.
# settings.json is a merge, not a copy: it is backed up once on the first run
# that finds a settings file without a pre-nerve backup, even if NERVE keys
# were already merged by an earlier installer.
RENDERED="$(mktemp)"
trap 'rm -f "$RENDERED"' EXIT
python3 - "$ROOT" "$TARGET/CLAUDE.md" "$RENDERED" <<'PY'
import sys
root, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(src).read().replace("__NERVE_ROOT__", root)
open(dst, "w").write(text)
PY

for f in CLAUDE.md settings.json; do
  if [ -f "$CLAUDE_DIR/$f" ] && ! cmp -s "$CLAUDE_DIR/$f" "$RENDERED" \
     && ! compgen -G "$CLAUDE_DIR/$f.pre-nerve-*" >/dev/null; then
    cp -p "$CLAUDE_DIR/$f" "$CLAUDE_DIR/$f.pre-nerve-$STAMP"
    echo "backed up $CLAUDE_DIR/$f -> $f.pre-nerve-$STAMP"
  fi
done

# MECHANISM: __NERVE_ROOT__ is the only machine path in the tracked source;
# rendered live copies carry the expanded value.
cp "$RENDERED" "$CLAUDE_DIR/CLAUDE.md"

for skill in "$NERVE"/skills/cs-*; do
  name="$(basename "$skill")"
  link="$CLAUDE_DIR/skills/$name"
  if [ -e "$link" ] && [ ! -L "$link" ]; then
    echo "skipped $link: a real directory exists there; move it aside and re-run" >&2
    continue
  fi
  ln -sfn "$skill" "$link"
done

# MECHANISM: deep-merge NERVE keys; NERVE values win for the keys it owns, list rules are unioned.
# The __NERVE_ROOT__ placeholder is expanded with the root sans leading slash,
# because Claude Code permission rules prefix absolute paths with `//`.
python3 - "$CLAUDE_DIR/settings.json" "$TARGET/settings.json" "$ROOT" <<'PY'
import json, os, sys
live_path, nerve_path, root = sys.argv[1], sys.argv[2], sys.argv[3]
live = json.load(open(live_path)) if os.path.exists(live_path) and os.path.getsize(live_path) else {}
nerve = json.loads(open(nerve_path).read().replace("__NERVE_ROOT__", root.lstrip("/")))
def merge(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            merge(a[k], v)
        elif isinstance(v, list) and isinstance(a.get(k), list):
            a[k] = a[k] + [x for x in v if x not in a[k]]
        else:
            a[k] = v
    return a
merged = merge(live, nerve)
tmp = live_path + ".tmp"
with open(tmp, "w") as fh:
    json.dump(merged, fh, indent=2); fh.write("\n")
os.replace(tmp, live_path)
PY

echo "installed: $CLAUDE_DIR/CLAUDE.md, skills: $(ls "$CLAUDE_DIR/skills" | grep -c '^cs-'), settings merged"
echo "Start a new Claude Code session (or reload the VS Code window) to load the changes."

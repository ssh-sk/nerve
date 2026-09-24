#!/usr/bin/env bash
# Install the NERVE Kilo target into the global Kilo config directory.
# FLOW: back up existing NERVE-owned files -> render kilo.jsonc and AGENTS.md -> link mode agents.
# Idempotent: re-running refreshes only NERVE-owned live files.
set -euo pipefail

NERVE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
KILO_DIR="${KILO_DIR:-$HOME/.config/kilo}"
TARGET="$NERVE/targets/kilo"
STAMP="$(date +%Y%m%d-%H%M%S)"

# Optional machine-local overrides (gitignored); read for context only.
# The rendered root is always this repository, so a stale local/env.sh cannot
# mis-render; a disagreement is reported instead.
if [ -f "$NERVE/local/env.sh" ]; then . "$NERVE/local/env.sh"; fi
ROOT="$NERVE"
if [ -n "${NERVE_ROOT:-}" ] && [ "$NERVE_ROOT" != "$NERVE" ]; then
  echo "warning: local/env.sh NERVE_ROOT ($NERVE_ROOT) differs from this repository ($NERVE)" >&2
fi

[ -f "$TARGET/kilo.jsonc" ] || { echo "NERVE target not found at $TARGET" >&2; exit 1; }
mkdir -p "$KILO_DIR/agents"

# SAFETY: keep one timestamped copy of each replaced file; later runs do not stack backups.
for f in kilo.jsonc AGENTS.md; do
  if [ -f "$KILO_DIR/$f" ] && ! cmp -s "$KILO_DIR/$f" <(sed "s|__NERVE_ROOT__|$ROOT|g" "$TARGET/$f") \
     && ! compgen -G "$KILO_DIR/$f.pre-nerve-*" >/dev/null; then
    cp -p "$KILO_DIR/$f" "$KILO_DIR/$f.pre-nerve-$STAMP"
    echo "backed up $KILO_DIR/$f -> $f.pre-nerve-$STAMP"
  fi
done

# MECHANISM: __NERVE_ROOT__ is the only machine path in the tracked sources;
# rendered live copies carry the expanded value.
for f in kilo.jsonc AGENTS.md; do
  sed "s|__NERVE_ROOT__|$ROOT|g" "$TARGET/$f" > "$KILO_DIR/$f"
  echo "rendered $KILO_DIR/$f"
done

for agent in "$TARGET"/agents/*.md; do
  name="$(basename "$agent")"
  link="$KILO_DIR/agents/$name"
  if [ -e "$link" ] && [ ! -L "$link" ]; then
    echo "skipped $link: a real file exists there; move it aside and re-run" >&2
    continue
  fi
  ln -sfn "$agent" "$link"
done

echo "installed: $KILO_DIR/kilo.jsonc, $KILO_DIR/AGENTS.md, agents: $(ls "$KILO_DIR/agents" | grep -c '\.md$')"
echo "Use /reload or start a new Kilo session to load the changes."

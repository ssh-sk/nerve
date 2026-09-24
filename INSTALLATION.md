# Installation and Recovery

NERVE is the editable canonical source. Live tool directories contain copies or symlinks as listed below. The owner reaches this machine through the VS Code server, so the server extension copies are the live runtimes.

## Local environment (not committed)

Machine-local absolute paths live only in `local/env.sh`, which `.gitignore` keeps out of the repository. Copy `local/env.example.sh` to `local/env.sh` on each machine and set `NERVE_ROOT` (this repository's path) and `NERVE_KILO_ROOT` (the Kilo extension runtime the Enhance patch operates on). Tracked sources never contain absolute machine paths: they use the `__NERVE_ROOT__` placeholder, which the installers below expand. The patch script reads `NERVE_KILO_ROOT` from the environment or from the same file.

## Claude Code

- Run `targets/claude-code/install.sh` once, and again after changing `targets/claude-code/`. It derives the NERVE root from its own location, backs up any pre-NERVE `CLAUDE.md`/`settings.json` once, renders `CLAUDE.md` with `__NERVE_ROOT__` expanded to `~/.claude/`, links each `skills/cs-*` directory into `~/.claude/skills/`, and merges the NERVE keys from `targets/claude-code/settings.json` (placeholder expanded) into `~/.claude/settings.json` without removing other settings. Set `CLAUDE_DIR` to render into another directory.
- Start a new Claude Code session or reload the VS Code window afterwards.
- Authentication belongs to the extension and is never stored in NERVE.

## Kilo

- Run `targets/kilo/install.sh` once, and again after changing `targets/kilo/`. It derives the NERVE root from its own location, backs up replaced `kilo.jsonc` and `AGENTS.md` once, renders both with `__NERVE_ROOT__` expanded into `~/.config/kilo/`, and links `targets/kilo/agents/*.md` (`grok-worker-high`, `grok-worker-xhigh`, `generic-coder`, `opus-planner`) into `~/.config/kilo/agents/`. Set `KILO_DIR` to render into another directory.
- Kilo reads the canonical skills through the rendered `skills.paths`; no second skill copy is required.
- Run `node targets/kilo/patches/apply-target-aware-enhance.mjs` to check the installed server runtime; the root comes from `NERVE_KILO_ROOT` or `local/env.sh` (see `local/env.example.sh`). Use `--apply` only when it reports `compatible: true`. An unknown Kilo version is never patched; add its anchors first as described in `targets/kilo/patches/README.md`.
- Connect xAI through Kilo for the Grok workers and OpenRouter for Enhance Prompt. Never put credentials in NERVE. Enabling a provider in configuration does not perform sign-in.
- Use `/reload` or start a new Kilo session after skill or agent changes. If the UI remembers a manual model for a mode, use its model-selector reset control so the mode's pinned model and variant take effect.

Recovery copies: the pre-Claude NERVE tree, live Kilo config and agent links, and the original 7.7.9 runtime bundles with hashes are in `.archive/2026-09-24-pre-claude/`. Earlier Kilo 7.6.2 states are in `.archive/2026-09-14-pre-cs-rebuild/` and `.archive/2026-09-15-pre-grok/`.

## Antigravity

Select Gemini 3.8 Flash High in the local IDE and open the SSH-backed project. Start at the project `.notes/INDEX.md`; `targets/antigravity/ENTRYPOINT.md` contains recovery text if automatic context is insufficient.

Both Antigravity and the shared VS Code server currently set these machine keys to `false`:

- `remote.autoForwardPorts`
- `remote.restoreForwardedPorts`
- `remote.forwardOnOpen`

## Retired targets

Codex and ZCode were retired on 2026-09-24. Their NERVE targets are preserved in `.archive/2026-09-24-pre-claude/canonical/targets/`. The applications themselves stay installed, but no longer load NERVE: its `AGENTS.md`, skill links, and Codex's project-trust entry were removed from `~/.codex` and `~/.zcode` (Codex copies in `.archive/2026-09-24-retired-live-installs/codex/`).

## Safe rollback

Before rollback, stop the affected application. Restore only the exact target files from the relevant `.archive/` snapshot; do not restore credential files or copy archived historical instructions into NERVE's active sources. For Kilo, restore both 7.7.9 bundles from `.archive/2026-09-24-pre-claude/kilo-7.7.9-original/` and confirm their hashes against `kilo-7.7.9-original-sha256.txt`.

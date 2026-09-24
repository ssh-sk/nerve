# Handoff — 2026-09-24 Claude Migration

Session handoff from the Claude desktop chat to Claude Code in VS Code. Delete this file once every open item below is resolved; the durable record is `CHANGELOG.md` and `targets/kilo/MODIFICATIONS.md`.

## Resume instruction

Paste into Claude Code, opened on this folder:

> Read `HANDOFF.md` in NERVE, then `shared/fundamental_rules.md` Sections 1.1–1.5 and `shared/model_roles.md`. Verify the "Current state" claims against live files before relying on them, then continue with "Open items" in order, asking me only where an item says a decision is mine.

## Current state

```
Claude Opus 5.5 (Claude Code)  ── plans / reviews ──>  .notes/ task sets
        ^                                                   │
        │ paste enhanced prompt                             v
Kilo: opus-planner (enhance-only)        Kilo: grok-worker-high / -xhigh (Grok 4.7)
Kilo: generic-coder (any model)          Antigravity: Gemini 3.8 Flash High
Enhance Prompt rewriter: GLM-5.3 Flash via OpenRouter (unchanged)
```

Done and verified on 2026-09-24:

- **Research:** Grok 4.7 and Opus 5.5 prompting guidance with sources in `drafts/2026-09-24-grok-4-7-opus-5-5-prompting.md`.
- **Cleanup:** Codex and ZCode targets, the 8 old Kilo modes, Codex-only `skills/*/agents/openai.yaml`, and empty folders removed. Full pre-change snapshot, the prior live Kilo config, and the original Kilo 7.7.9 bundles with SHA-256 hashes are in `.archive/2026-09-24-pre-claude/`.
- **Kilo:** four modes in `targets/kilo/agents/`, symlinked from `~/.config/kilo/agents/`; `kilo.jsonc` and `AGENTS.md` copied live and identical to NERVE. Validated with the Kilo 7.7.9 CLI against a copy of the config.
- **Enhance patch:** ported to Kilo 7.7.9 (server copy, `~/.vscode-server/extensions/kilocode.kilo-code-7.7.9-linux-x64`). 11 tests pass; check mode reports `patched: true`; both bundles pass `node --check`; a parser check confirmed the webview accessors are in scope. New Grok 4.7 and Opus 5.5 renderers; `opus-planner` always renders for Opus.
- **Claude Code:** `targets/claude-code/` installed via `install.sh` into `~/.claude/`: `CLAUDE.md` (Opus as planner and reviewer), 5 `CS:` skill symlinks, settings with default model `claude-opus-5-5`, empty commit/PR attribution with no session link, and `git push` denied. Pre-existing `~/.claude/skills/synced/` untouched.
- **Docs:** `shared/model_roles.md`, `INSTALLATION.md`, `README.md`, `CHANGELOG.md`, Kilo READMEs, and `MODIFICATIONS.md` updated. The claude.ai NERVE project holds copies of the fundamental rules, model roles, notes contract, and a desktop instruction sheet.
- **Resolved decisions (owner, 2026-09-24):** NERVE is not a Git repository; the empty `.git/` was removed. Codex and ZCode stay installed but no longer reference NERVE (Codex items archived in `.archive/2026-09-24-retired-live-installs/codex/`; ZCode items deleted). Kilo's `zai` and `zai-coding-plan` providers were removed; Enhance stays on OpenRouter GLM.
- **Desktop Commander:** telemetry turned off (`~/.claude-server-commander/config.json`). The owner plans to uninstall the plugin.

Not yet verified:

- `xai/grok-4.7` with variant `xhigh` appearing in Kilo's model selector (needs the owner's xAI sign-in).
- A live Enhance Prompt request from each Kilo mode.

## Open items

1. **Owner action — Claude Code permissions (option A).** An agent session is not allowed to loosen Claude Code's own approval settings, so the owner applies this by hand. Replace the `"permissions"` block in `~/.claude/settings.json`, and in `targets/claude-code/settings.json` so NERVE stays canonical, with:

   ```json
   "permissions": {
     "defaultMode": "acceptEdits",
     "allow": ["Bash", "WebFetch", "WebSearch", "Read(//__NERVE_ROOT__/**)"],
     "deny": ["Bash(git push)", "Bash(git push:*)"]
   }
   ```

   Expand `__NERVE_ROOT__` to the NERVE root from `local/env.sh` before pasting; the tracked `targets/claude-code/settings.json` keeps the placeholder. Then reload the VS Code window. Test: ask Claude Code to run `ls`, run a web search, and fetch a page. None of the three should prompt. User-level settings apply to Claude Code in VS Code, the terminal, and the desktop app in every project.
2. **Owner action — reload and test Kilo.** Reload VS Code; confirm Grok 4.7 High and XHigh in the model selector; run Enhance Prompt once in `opus-planner` and once in a Grok worker, and check the output style.
3. **Decision — `claude` terminal command.** Only the extension's bundled binary exists; no `claude` on `PATH`. Installing Anthropic's CLI is a user-wide install and needs approval under Rule 1.3.
4. **Decision — stop Kilo auto-update.** The VS Code server settings (`~/.vscode-server/data/Machine/settings.json`) have no `extensions.autoUpdate` key, and Kilo updated itself today, which removed the patch. Proposed: set `"extensions.autoUpdate": false`, or exclude only Kilo. After any Kilo update, run `node targets/kilo/patches/apply-target-aware-enhance.mjs` in check mode.
5. **Housekeeping.** The desktop Kilo 7.6.2 copy (`~/.vscode/extensions/`) still carries the old Grok 4.6 renderer; it is unused. The server's obsolete 7.6.2 copy is marked for deletion by VS Code.

## Key paths

| What | Where |
|---|---|
| Canonical rules | `shared/fundamental_rules.md`, `shared/notes_contract.md`, `shared/model_roles.md` |
| Claude Code target and installer | `targets/claude-code/` → `~/.claude/` |
| Kilo target, modes, patch | `targets/kilo/` → `~/.config/kilo/`, `~/.vscode-server/extensions/kilocode.kilo-code-7.7.9-linux-x64/dist/` |
| Recovery snapshot | `.archive/2026-09-24-pre-claude/` |
| Rollback steps | `INSTALLATION.md` → Safe rollback |

# Change Log

## 2026-11-02 — Repository hygiene for public hosting

- Added `.gitignore` excluding `.archive/`, `drafts/`, and machine-local files. Removed every absolute machine path (including the username) from tracked files: they now carry the `__NERVE_ROOT__` placeholder, expanded at install time.
- Added `local/env.sh` (gitignored) and its tracked template `local/env.example.sh` for `NERVE_ROOT` and `NERVE_KILO_ROOT`.
- Added `targets/kilo/install.sh`; reworked `targets/claude-code/install.sh` to derive the NERVE root from its own location and render/merge with the placeholder expanded. The Enhance patch script resolves its runtime root from `NERVE_KILO_ROOT` or `local/env.sh` instead of a committed default path.

## 2026-09-24 — Claude Opus 5.5 planning and review; Codex and ZCode retired

- Claude Opus 5.5 in Claude Code is now the owner's planner and reviewer. Added `targets/claude-code/` (global `CLAUDE.md`, settings with empty commit/PR attribution and a `git push` deny rule, and a tested installer that links the `CS:` skills).
- Retired Codex (replaced by Claude) and ZCode (trust withdrawn). Removed their targets and the Codex-only `skills/*/agents/openai.yaml` files; everything is preserved in `.archive/2026-09-24-pre-claude/`.
- Replaced all Kilo modes with Grok Worker High, Grok Worker XHigh (Grok 4.7), Generic Coder, and an enhance-only Opus Planner. GLM-5.3 Flash through OpenRouter remains the enhancer.
- Ported the target-aware Enhance patch to Kilo 7.7.9 after an automatic update removed it; added Grok 4.7 and Opus 5.5 renderers based on official xAI and Anthropic guidance (`drafts/2026-09-24-grok-4-7-opus-5-5-prompting.md`).
- Rewrote `shared/model_roles.md` and `INSTALLATION.md`; removed Codex/ZCode references from active sources.
- Detached the retired live installs from NERVE without uninstalling them: archived and removed the NERVE `AGENTS.md`, `CS:` skill links, and NERVE project-trust entry from `~/.codex` (copies in `.archive/2026-09-24-retired-live-installs/codex/`); deleted the NERVE `AGENTS.md`, skill links, and dangling agent link from `~/.zcode`.
- Removed the unused `zai` and `zai-coding-plan` providers from Kilo; Enhance keeps GLM-5.3 Flash through OpenRouter.
- Removed the empty `.git/` directory; NERVE is intentionally not a Git repository.

## 2026-09-22 — Kilo generic roles

- Added model-neutral Generic Planner, Generic Worker, and Generic Reviewer modes to Kilo (recorded in `targets/kilo/MODIFICATIONS.md`; superseded on 2026-09-24).

## 2026-09-15 — xAI connection-state correction

- Removed the provider-level xAI override that caused Kilo to classify it as connected without authentication. Kept xAI enabled and Grok High pinned at the worker level.

## 2026-09-15 — Enhance route correction

- Restored GLM-5.3 Flash through OpenRouter as the Enhance execution model; its replacement in the preceding change was a misinterpretation.
- Retained Grok-specific prompt-rendering guidelines and Grok 4.6 High worker routing. Target styling and enhancer execution are separate concerns.

## 2026-09-15 — Kilo Grok routing

- Re-enabled xAI and replaced Kilo's active worker and stateless OpenRouter Enhance routes with Grok 4.6 High.
- Renamed the Kilo worker to `worker-grok`, updated delegation references, and added a Grok-specific target renderer with exact-anchor upgrade support and regression tests.
- Preserved other model defaults, ZCode's promotion route, and historical records. Archived the pre-Grok configuration and runtime bundles.

## 2026-09-15 — Bulk transformations

- Added compact Working Method Rule 3.3 covering contextual review, individual edits, bounded bulk replacements, recovery, and verification.
- Added explicit routing in all provider entry points and the shared notes contract; synchronized the live Codex, Kilo, and ZCode instructions.

## 2026-09-15 — GLM Max reasoning default

- Raised only GLM-5.3 Flash worker profiles and the Kilo delegated-worker override to Max.
- Kept Sol, Luna, Astra, and Gemini role defaults at High.
- Made the Kilo GLM worker and Sol reviewer selectable in the chat dropdown while retaining them as delegatable agents.

## 2026-09-14 — CS workflow rebuild

- Made NERVE the canonical instruction and configuration source with no active Hermes dependency.
- Reconciled the planner/worker/reviewer/enhancer split into `shared/model_roles.md`.
- Defined the provider-neutral `.notes/` lifecycle with four-digit set/task IDs, current/history separation, receipts, review, and a common worker contract.
- Replaced the two former Codex skills with five validated `CS:` skills: owned-project setup, new-project setup, external-project setup, task setup, and task-set review.
- Archived exact pre-change copies, then removed the two retired live skill directories.
- Replaced Codex owner-wide instructions with the NERVE bootstrap and linked the five skills.
- Made Kilo the main entry point: Sol High default planner, Astra High heavy planner, GLM-5.3 Flash High worker, and Sol High reviewer.
- Applied and verified the tracked Kilo 7.6.2 target-aware Enhance Prompt patch.
- Added a ZCode global bootstrap, GLM-5.3 Flash High worker profile, and shared skills without changing its provider/auth configuration.
- Verified Antigravity and VS Code server port-forwarding controls are disabled.

OpenRouter was connected and verified end to end through Kilo on 2026-09-14, activating the configured stateless GLM-5.3 Flash Enhance route. Update-persistence work remains deliberately deferred.

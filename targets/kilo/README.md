# Kilo Target

Kilo is the worker and prompt-enhancement surface. Planning and review happen with Claude Opus 5.5 in Claude Code; Claude cannot run inside Kilo.

Modes (all chat-selectable primary modes; automatic delegation is off):

| Mode | Model | Purpose |
|---|---|---|
| `grok-worker-high` — Grok Worker (High) | `xai/grok-4.7`, variant `high` | Default bounded implementation of a released `.notes/` set |
| `grok-worker-xhigh` — Grok Worker (XHigh) | `xai/grok-4.7`, variant `xhigh` | Hardest tasks, where quality matters more than speed |
| `generic-coder` — Generic Coder | none pinned | General coding with whichever model is selected; model-neutral prompt |
| `opus-planner` — Opus Planner | `openrouter/z-ai/glm-5.3-flash` (placeholder) | Enhance-only: select it, run Enhance Prompt, paste the result into Claude Code. All tools are denied and it replies with one fixed line if a message is sent |

- `kilo.jsonc` sets `generic-coder` as the default mode, disables every built-in and unconfigured mode (Code, Plan, Ask, Debug, Orchestrator, Explore, General) while leaving Kilo's internal compaction/summary/title agents intact, keeps the stateless small-model route on OpenRouter GLM-5.3 Flash, points the generic subagent default at Grok 4.7 High, and adds NERVE as a trusted skill path. Tracked sources use the `__NERVE_ROOT__` placeholder; the installer expands it, and the file must stay valid JSON for the patch tests.
- `agents/` holds the four mode files; `install.sh` renders `kilo.jsonc` and `AGENTS.md` with the machine-local NERVE root expanded from `local/env.sh` and installs the mode files as symlinks so NERVE remains canonical.
- `patches/` contains the version-specific target-aware Enhance Prompt modification and its tests.
- `MODIFICATIONS.md` is the reproduction ledger.

Authentication is intentionally not stored here. Connect xAI for the Grok workers and OpenRouter for Enhance Prompt through Kilo's provider settings. Keep xAI in `enabled_providers` without a `provider.xai` block: Kilo counts explicitly configured providers as connected even without credentials. The Grok reasoning level is pinned by each worker's `variant`, not by provider options.

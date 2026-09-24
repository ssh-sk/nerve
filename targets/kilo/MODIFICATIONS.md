# Kilo Modification Ledger

## 2026-09-24 — Claude planning split and Kilo 7.7.9

- Planning and review moved to Claude Opus 5.5 in Claude Code. Removed the Plan/Sol, Astra, Ask/Luna, Reviewer Sol, Worker Grok, and three Generic modes; their files and the previous live config are archived in `.archive/2026-09-24-pre-claude/`.
- Added four primary modes: `grok-worker-high` and `grok-worker-xhigh` (`xai/grok-4.7`, variants `high` and `xhigh`), model-neutral `generic-coder` (new default mode), and enhance-only `opus-planner` (placeholder GLM model, every permission denied, `steps: 1`).
- Disabled Kilo's built-in Code, Plan, and Ask modes in addition to the previously disabled modes. Moved `subagent_model` and its variant override to Grok 4.7 High. The enhancer stays `openrouter/z-ai/glm-5.3-flash`.
- Kilo auto-updated the server extension to 7.7.9 on 2026-09-24, which removed the Enhance patch. Ported it with per-release anchors, generic in-place renderer upgrade, and new Grok 4.7 and Opus 5.5 renderers; `opus-planner` outranks the selected model for target detection. Verified: 11 tests pass; check mode reported `compatible: true` before apply and `patched: true` after; both bundles pass `node --check`; the live result is byte-identical to a dry run; a parser check confirmed the webview accessors are in scope. Original bundles and hashes are in `.archive/2026-09-24-pre-claude/kilo-7.7.9-original/`.
- Validated the new configuration with the Kilo 7.7.9 CLI against a copy of the config: exactly the four NERVE modes plus internal agents, with the expected model, variant, and default mode. Not yet verified: that `xai/grok-4.7` with variant `xhigh` appears in the owner's live model selector, and a live Enhance request from each mode.
- The desktop Kilo 7.6.2 copy still carries the earlier Grok 4.6 renderer; the owner does not use it.
- Removed `zai-coding-plan` and `zai` from `enabled_providers` (no route used them; Kilo's auth store held no Z.ai credential). Enhance stays on `openrouter/z-ai/glm-5.3-flash`. Validated with the Kilo 7.7.9 CLI against a copy (providers `openai`, `openrouter`, `xai`; four NERVE modes; default `generic-coder`), then copied live; 11 tests pass and check mode still reports `patched: true`.

## 2026-09-22 — Generic roles

- Added `generic-planner`, `generic-worker`, and `generic-reviewer` as chat-selectable primary modes without model, variant, or sampling fields. Automatic delegation is disabled to avoid the existing pinned subagent route; the owner selects the model in chat.
- Preserved existing profiles and defaults. Generic Worker processes an assigned task set with checks, a commit, and a receipt per completed task; review remains independent and read-only.

## 2026-09-15 — xAI connection-state correction

- Removed the unnecessary `provider.xai` model-options block. Kilo loads explicit provider configurations with `source: config` and includes loaded providers in its connected list; this hid the normal Connect action and made Disconnect disable the configured provider instead.
- Kept xAI enabled and retained Grok High in the worker profile and delegated-worker override. No credentials were changed. Pre-change configurations are in `.archive/2026-09-15-xai-connect-state/`.
- Applied to live Kilo and verified through its resolved configuration: xAI enabled, no provider-level xAI override, Grok High worker, and GLM Enhance. No provider-list UI patch was made; reload the application to refresh its displayed state.

## 2026-09-15 — Enhance execution-route correction

- Corrected the preceding Grok migration: changing Enhance's execution model was a misinterpretation. Restored `small_model: openrouter/z-ai/glm-5.3-flash` and removed the mistakenly added OpenRouter Grok reasoning override.
- Kept the Grok-specific renderer already installed in both Kilo runtimes. GLM performs the stateless rewrite using the selected target's guidelines; the target label does not choose the enhancer backend.
- Grok 4.6 High worker routing and other model defaults remain unchanged. Pre-correction files are preserved in `.archive/2026-09-15-enhance-route-correction/`.

## 2026-09-15 — Grok 4.6 High

- Re-enabled the existing `xai` provider without removing other available providers or changing credentials.
- Replaced Kilo's worker profile with `worker-grok` on `xai/grok-4.6`, variant High; updated Sol/Astra delegation permissions and references. Preserved `mode: all` and removed the former model's sampling override.
- Set generic subagent routing to `xai/grok-4.6` with a High override. Set `small_model` to `openrouter/x-ai/grok-4.6` and its model reasoning effort to High.
- Added Grok rendering, model-before-mode selection, explicit-prefix precedence, and exact legacy upgrade checks. The old renderer literal remains solely for migration compatibility.
- Recovery source: `.archive/2026-09-15-pre-grok/`. Runtime targets: both installed Kilo 7.6.2 server and desktop copies. Reproduce with the commands in `patches/README.md` and `INSTALLATION.md`.
- xAI authentication was not present in Kilo's auth metadata during discovery; owner connection is required unless supplied through another configured credential mechanism. No paid model request was made for this change.
- Kept Sol, Astra, Luna, the separate ZCode settings, and past ledger entries unchanged. Update persistence remains deferred.
- Verification: six direct renderer/patch tests passed; both installed bundles report `patched: true` and extension syntax checks passed. Live config/instructions match canonical copies. Kilo's resolved configuration confirms both Grok routes, High reasoning, `worker-grok` and reviewer as `mode: all`, no retired worker, and unchanged Sol/Astra/Luna High bindings. Live request and chat-UI behavior remain untested pending reload/connection.

## 2026-09-15 — Bulk transformations

- Routed repeated text edits to shared Fundamental Rule 3.3 from the canonical and live global instructions.

## 2026-09-15 — GLM Max reasoning default

- Raised only `worker-glm-flash` from High to Max.
- Raised the generic GLM-5.3 Flash subagent override to Max.
- Kept `plan`, `astra`, `reviewer-sol`, and `ask` at High.
- Changed `worker-glm-flash` and `reviewer-sol` from subagent-only to `mode: all`, making both visible in the chat agent picker while preserving delegation.

## 2026-09-14 — NERVE role and skill installation

- Replaced the former global config with `targets/kilo/kilo.jsonc`.
- Set the default interactive agent to `plan` on GPT-5.6 Sol High.
- Added the deliberately selected `astra` primary agent on GPT-6 Astra High.
- Added `worker-glm-flash` on Z.ai Coding Plan GLM-5.3 Flash High with `top_p: 0.95`.
- Added read-only `reviewer-sol` on GPT-5.6 Sol High.
- Overrode the built-in `ask` mode as concise read-only QA, pinned by default to GPT-5.6 Luna High while retaining the same prompt when manually switched to Sol High.
- Kept the built-in Code/Default mode and disabled the unconfigured Debug, Orchestrator, Explore, and General agents. Preserved Kilo's internal compaction, summary, and title agents.
- Limited Sol/Astra direct writes to `.notes/`, kept their shell operations approval-gated, and disabled push at the permission layer.
- Allowed the worker's local branch/commit commands while disabling push at the permission layer.
- Changed the generic subagent default from GPT-5.6 Luna XHigh to GLM-5.3 Flash High.
- Added the canonical NERVE `skills/` directory as a trusted skill path (the machine-local absolute path is expanded at install time from `local/env.sh`; see `.gitignore`).
- Installed Kilo agent files as symlinks to the NERVE canonical sources.

## 2026-09-14 — Target-aware Enhance Prompt

- Set `small_model` to `openrouter/z-ai/glm-5.3-flash`.
- Patched Kilo Code 7.6.2 `dist/webview.js` to send the selected provider/model/agent with Enhance requests.
- Patched `dist/extension.js` to prepend a stateless, target-specific rendering contract before calling `/enhance-prompt`.
- Preserved exact pre-patch bundles and hashes under `.archive/2026-09-14-pre-cs-rebuild/kilo/`.

Initial installation limitation: OpenRouter was not present in the live Kilo auth metadata, and `kilo models openrouter` returned `Provider not found`.

Resolved on 2026-09-14: the live auth store now reports OpenRouter as an API provider, Kilo lists `openrouter/z-ai/glm-5.3-flash`, and a minimal request through that route completed successfully with the expected response. No credential value was read into output or stored in NERVE.

## Deferred persistence

Kilo auto-update was believed disabled, but the server copy updated to 7.7.9 on 2026-09-24. Reapplying or upstreaming the runtime patch after updates is deferred until the behavior is established. Use the patch script's check mode after any version change; never apply it to mismatched anchors.

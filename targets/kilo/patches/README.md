# Target-Aware Enhance Prompt Patch

Kilo sends only prompt text to its `/enhance-prompt` backend, so the configured small model cannot otherwise know which model or mode will receive the result.

`apply-target-aware-enhance.mjs` makes two narrowly checked changes:

1. the webview includes its selected provider, model, and mode in the internal Enhance message;
2. the extension wraps the text in a stateless NERVE compiler instruction with a renderer selected for Grok 4.7, Claude Opus 5.5, Gemini, or a neutral fallback.

Target detection, in priority order:

1. a leading `model …:` prefix, which is stripped from the prompt;
2. an enhance-only mode (`opus-planner` → Claude Opus 5.5), because its target cannot run in Kilo;
3. the model currently selected in chat;
4. the mode's default target (`grok-worker-*` → Grok 4.7) when no model is supplied.

It passes no conversation history or tools and requests only the rewritten prompt. The enhancer model is always `small_model: openrouter/z-ai/glm-5.3-flash`; target selection changes only the rendering guidelines given to GLM.

The Grok and Opus renderers follow the official guidance summarized in `drafts/2026-09-24-grok-4-7-opus-5-5-prompting.md`. They are NERVE instruction designs, not claimed benchmark-optimal prompts.

## Versions and checks

Anchors are kept per Kilo release in `versions` (currently 7.6.2 and 7.7.9). The script reads the release from the extension's `package.json` and refuses unknown releases. An installed NERVE renderer of any earlier version is upgraded in place, because the renderer is always inserted directly before `normalizeEnhancePromptErrorMessage`.

- Tests: `node --test targets/kilo/patches/enhance.test.mjs`.
- Check (no writes): `node targets/kilo/patches/apply-target-aware-enhance.mjs`.
- Apply: add `--apply` only after the check reports `compatible: true`. Back up both bundles first; an I/O failure still requires restoring those copies.
- The runtime root comes from `NERVE_KILO_ROOT` (environment) or from `local/env.sh`; no machine path is committed (see `local/env.example.sh`).

To support a new Kilo release, copy the four anchors from the minified bundles, confirm each occurs exactly once, and confirm the webview's `t`, `g`, and `f` accessors resolve to the same component variables Kilo's own send-message code uses (a JavaScript parser check was used for 7.7.9). Do not weaken the exact-count checks. Kilo auto-update can replace a patched copy; re-run the check after any update.

# Model Roles

## Default routing

| Role | Route | Operating intent |
|---|---|---|
| Planner and reviewer | Claude Opus 5.5 in Claude Code (VS Code extension) | Interactive planning, decisions, task release, independent review, and owner-facing synthesis |
| Implementation worker | Grok 4.7 High in Kilo (`grok-worker-high`) | Default bounded implementation of a released `.notes/` task set |
| Hard-task worker | Grok 4.7 XHigh in Kilo (`grok-worker-xhigh`) | Deliberately selected for the hardest tasks, where answer quality matters more than speed |
| Alternative worker | Gemini 3.8 Flash High in Antigravity | Local VS Code-fork workflow using `.notes/INDEX.md` |
| Model-neutral coder | Kilo `generic-coder` with the model selected in chat | General coding under NERVE rules; no model or prompt style pinned |
| Prompt enhancer | GLM-5.3 Flash through a stateless OpenRouter call from Kilo | Tool-free, history-free, target-specific prompt rendering |

## Planning and release

Planning is interactive with Opus 5.5 and ends in a provider-neutral work contract: intent, scope, exclusions, constraints, accepted decisions, checks, evidence, dependencies, and stop conditions. Model/provider tuning stays in target configuration rather than task files.

Work is handed to a worker only when it is represented by a current task file. Workers receive the smallest sufficient context and do not inherit planner-only integration authority.

## Worker behavior

Workers implement only their assigned task on the exact `subagent/set-0001`-style branch. They may commit completed subtasks there under Fundamental Rule 1.1. They must stop on unresolved ambiguity, out-of-scope changes, an unsafe prerequisite, a detached or invalid branch, or a failed acceptance condition they cannot resolve within scope.

## Review and integration

Review happens in Claude Code, independently of the implementer. It checks the actual branch diff plus material verification evidence and distinguishes `implemented` from `accepted`. Integration occurs only after the owner's explicit instruction naming both source and target branches; it creates one local non-fast-forward checkpoint merge and never pushes.

## Prompt enhancer

The enhancer receives only the current user text plus a target model/mode label. It preserves intent, constraints, uncertainty, and requested output; removes accidental repetition and scratchpad noise; and renders the instruction shape for the selected target. It must output only the rewritten prompt, never invent requirements, never consume tools or conversation history, and never expose hidden reasoning.

GLM performs the rewrite regardless of the target. The target selects only the rendering guidelines:

- Grok 4.7: selected by the Grok worker modes or a Grok model.
- Claude Opus 5.5: selected by Kilo's enhance-only `opus-planner` mode, whose output the owner pastes into Claude Code. Claude cannot run inside Kilo.
- Gemini, or a neutral contract for any other model.

A leading route such as `model Opus 5.5:`, `model Grok 4.7:`, or `model Gemini 3.8 Flash:` overrides automatic detection and is stripped from the returned prompt. Renderer rationale and sources: `drafts/2026-09-24-grok-4-7-opus-5-5-prompting.md`.

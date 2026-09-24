# NERVE Kilo Instructions

NERVE at `__NERVE_ROOT__` is the canonical owner-wide source. The placeholder stands for the machine-local root of the NERVE repository: expanded at install time from gitignored `local/env.sh`, or, when read from a NERVE checkout itself, the repository containing this file.

- Read `shared/fundamental_rules.md` Sections 1.1–1.5 before coding; load only relevant later sections.
- Before repeated text edits, read Section 3.3 (Bulk transformations).
- Read `shared/model_roles.md` for role boundaries. Planning and review happen with Claude Opus 5.5 in Claude Code; Kilo is the worker and prompt-enhancement surface.
- Start known projects at `.notes/INDEX.md` and read only linked context and the assigned task.
- Use the `CS:` skills from `nerve/skills/` for `.notes/` work; do not improvise a competing task ledger.
- `grok-worker-high` is the default bounded implementer; `grok-worker-xhigh` is for the hardest tasks. `generic-coder` uses whichever model is selected. `opus-planner` exists only to render Enhance Prompt output for Claude Opus 5.5.
- A worker receipt proves only reported implementation. Acceptance requires independent review. Integration requires the owner's explicit source-and-target instruction.

Never push. Follow the exact local branch and commit authority in Fundamental Rule 1.1.

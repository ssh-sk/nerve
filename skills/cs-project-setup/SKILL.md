---
name: cs-project-setup
description: Turn a completed new-project discussion into a clean provider-neutral .notes handoff with decisions, constraints, status, and an initial task-ready entry point. Use at the end of planning a new project; not for sweeping an existing owned repository, indexing an external repository, or refreshing a later task set.
---

# CS: Project Setup

Convert settled discussion and any live bootstrap files into a durable new-project handoff.

## Required references

Read these files completely before acting:

- `../../shared/fundamental_rules.md`
- `../../shared/notes_contract.md`
- `../_shared/project-evidence.md`
- `../_shared/templates.md`

## Workflow

1. Resolve one project root and inspect any existing `.notes/` tree once before replacement.
2. Extract owner-approved intent, scope, exclusions, decisions, constraints, open questions, acceptance outcomes, and supported commands. Do not preserve conversational repetition or undecided alternatives as decisions.
3. Reconcile discussion claims with live project evidence. Mark contradictions and unresolved choices explicitly.
4. Preserve `.notes/history/` and non-accepted current work. Replace stale generated notes only after the new tree is complete.
5. Write the standard context files and `.notes/INDEX.md`. If implementation scope is already settled, create the initial `set-0001`-style manifest and task files; otherwise leave `current/` empty and state what decision is needed before `cs-task-setup`.
6. Validate links, identifier padding, task boundaries, and status consistency.
7. Report the generated entry point, preserved work, unresolved decisions, and whether the project is ready for task setup.

This skill prepares project memory; it does not implement the application, select unapproved dependencies, commit, merge, or push.

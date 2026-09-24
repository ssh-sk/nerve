---
name: cs-project-setup-external-project
description: Index a third-party or externally owned repository into a concise provider-neutral .notes handoff, capturing relevant architecture, commands, and repository-specific style without changing application files or scheduling cleanup. Use when preparing to work in an external project while retaining the owner's NERVE rules.
---

# CS: Project Setup — External Project

Create a working index of an external repository without treating its local conventions as owner-wide policy.

## Required references

Read these files completely before acting:

- `../../shared/fundamental_rules.md`
- `../../shared/notes_contract.md`
- `../_shared/project-evidence.md`
- `../_shared/templates.md`

## Workflow

1. Resolve the exact external project root and inspect it read-only, including its instruction files, contributor guidance, manifests, verification paths, architecture, naming, formatting, and comment style.
2. Read the existing `.notes/` tree once. Preserve history and non-accepted work; replace stale generated notes only after preparing a complete new tree.
3. Record external repository conventions as project-specific evidence, not as changes to NERVE.
4. Apply the NERVE authority, safety, reporting, and comment-quality rules to our work. When an explicit external instruction conflicts with NERVE or owner authority, record the exact conflict for resolution instead of silently overriding either source.
5. Write concise context and the common `.notes/INDEX.md` entry point. Leave `current/` empty unless the owner also supplies settled implementation scope and explicitly requests task setup.
6. Validate links and report the indexed context, convention sources, conflicts, and next action.

Do not delete project artifacts, refactor code, create cleanup tasks, add dependencies, commit, merge, push, or modify application files under this skill.

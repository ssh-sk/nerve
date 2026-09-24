---
name: cs-project-setup-owned-project
description: Rebuild the provider-neutral .notes handoff for an existing project owned by the user, perform an evidence-based sweep for conclusively dead repository artifacts, and create the first bounded cleanup/refactor task set. Use when adopting or resetting one of the user's own existing projects; not for third-party repositories or later task-set refreshes.
---

# CS: Project Setup — Owned Project

Re-index an owned existing repository, clean only proven dead local artifacts, rebuild `.notes/`, and release the first cleanup set.

## Required references

Read these files completely before acting:

- `../../shared/fundamental_rules.md`
- `../../shared/notes_contract.md`
- `../_shared/project-evidence.md`
- `../_shared/cleanup-boundary.md`
- `../_shared/templates.md`

## Workflow

1. Resolve the exact project root. Stop if it is ambiguous or broader than one project.
2. Follow the one-time evidence inspection procedure. Preserve unrelated uncommitted work.
3. Classify cleanup candidates using the deletion threshold. Do not ask again for conclusively dead in-project artifacts; this skill invocation supplies that destructive authority. Leave every ambiguous candidate untouched and record it.
4. Reconstruct the smallest accurate project context. Treat repository evidence and owner decisions as authoritative; record conflicts rather than silently choosing.
5. Preserve `.notes/history/` and all non-accepted work. Replace other generated `.notes/` content only after the new tree is ready.
6. Create the next `set-0001`-style current set on branch `subagent/set-0001`. Split cleanup into bounded `task-0001`-style files with non-overlapping write ownership and relevant checks.
7. Make `.notes/INDEX.md` the common worker entry point and include the expected worker behavior from the notes contract.
8. Perform only deletions already proven safe by Step 3. Put code refactoring, comment cleanup, and verification changes into worker tasks rather than implementing them during setup unless the owner explicitly asked for immediate implementation.
9. Validate the generated tree and report deleted paths, preserved ambiguities, active set/branch, and next start instruction.

Do not commit, merge, or push during setup unless the owner separately authorizes the exact Git action under Fundamental Rule 1.1.

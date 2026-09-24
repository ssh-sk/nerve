---
name: cs-task-setup
description: Convert a settled implementation discussion or plan into a clean current .notes task set, archive already accepted sets, carry unfinished work forward, and refresh the common worker entry point. Use at the end of a task discussion or whenever current worker assignments need rebuilding; do not implement or launch the tasks.
---

# CS: Task Setup

Release one coherent, resumable set of bounded worker contracts.

## Required references

Read these files completely before acting:

- `../../shared/fundamental_rules.md`
- `../../shared/notes_contract.md`
- `../../shared/model_roles.md`
- `../_shared/project-evidence.md`
- `../_shared/templates.md`

## Workflow

1. Resolve the project root and read `.notes/`, the settled plan/discussion, relevant repository evidence, and current Git state once.
2. Classify each current set. Move only already accepted sets unchanged into matching `history/set-0001/` folders. Keep implemented-but-unreviewed and unfinished work current; carry it forward explicitly when regenerating files.
3. Allocate the next unused four-digit set identifier across current and history. Assign the exact branch `subagent/set-0001` using that identifier.
4. Decompose the approved outcome into ordered `task-0001`-style contracts. Each task must be independently understandable, bounded, testable, and explicit about scope, exclusions, dependencies, write ownership, checks, evidence, and stop conditions.
5. Keep model/provider tuning out of task files. Record the expected worker role, then let the selected target profile bind the model.
6. Write the set manifest, task files, empty receipt paths or templates, and review placeholder. Refresh context status and `.notes/INDEX.md` with the common external-worker instruction.
7. Re-read the generated contracts. Check for overlapping writes, missing prerequisites, vague acceptance criteria, reused identifiers, stale links, and any task that quietly includes planning or integration.
8. Report the set, branch, task order, carried work, archived accepted sets, and copy-paste starting instruction.

Do not launch workers, implement tasks, mark work implemented/accepted, commit, merge, or push.

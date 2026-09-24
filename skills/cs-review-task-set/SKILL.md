---
name: cs-review-task-set
description: Independently review a completed .notes task set against its actual branch diff and acceptance evidence, route blocking corrections, archive accepted work into history, and refresh current status. Use when the user says a task set is complete and requests review or cleanup; integration requires a separate explicit source-and-target instruction.
---

# CS: Review Task Set

Determine whether reported implementation is acceptable, then clean the task ledger without confusing completion, acceptance, integration, or push authority.

## Required references

Read these files completely before acting:

- `../../shared/fundamental_rules.md`
- `../../shared/notes_contract.md`
- `../../shared/model_roles.md`
- `../_shared/templates.md`

## Workflow

1. Resolve the exact `set-0001`-style target from `.notes/INDEX.md` or the owner's request. Stop if more than one set could match.
2. Read its manifest, tasks, receipts, context links, Git branch/ref, commits, and complete diff. Treat receipts as claims to verify.
3. Independently rerun or spot-check material acceptance commands and inspect affected boundaries, tests, documentation, generated artifacts, and unrelated changes.
4. Write `review.md` with findings ordered by severity, evidence checked, per-task result, set result, and any skipped verification. Mark `accepted` only when no blocking finding remains.
5. If blocking findings exist, keep the set in `current/`, set `correction-required`, and create bounded correction tasks with the next unused four-digit task IDs. Do not rewrite history to imply success.
6. If accepted, update final statuses and move the complete set unchanged to `history/set-0001/`. Refresh `.notes/INDEX.md` and context status so `current/` contains only active work.
7. If the owner explicitly names the reviewed source branch and target and asks to integrate, follow Fundamental Rule 1.1: verify both refs, create one local non-fast-forward checkpoint merge, record it, and stop. Otherwise do not merge.
8. Report acceptance, blocking findings or archived path, checks observed, integration status, and remaining work.

Never push. Never let a passing receipt replace independent review. Never delete non-accepted task evidence.

# `.notes/` Templates

Replace every angle-bracket placeholder. Remove inapplicable optional lines rather than leaving empty boilerplate.

## `INDEX.md`

```markdown
# <Project> Agent Entry Point

## Current objective

<One paragraph>

## Read in order

1. [Project](context/project.md)
2. [Constraints](context/constraints.md)
3. [Decisions](context/decisions.md)
4. [Current status](context/status.md)
5. [Set manifest](current/set-0001/manifest.md)
6. [Assigned task](current/set-0001/tasks/task-0001.md)

## Active work

- Set: `set-0001`
- Branch: `subagent/set-0001`
- Status: `planned`
- Required checks: `<commands or links>`

## Worker contract

Read only the linked context and assigned task. Stay inside its scope and exact branch. Stop on ambiguity, invalid branch, unsafe prerequisites, or overlapping user changes. Run the required checks, inspect the staged diff, commit only under the branch rule, and write a receipt. Report implemented, not accepted. Never merge or push.

## Start instruction

Index `.notes/INDEX.md` as the starting point and complete `<task path>` under its stated worker contract.
```

## `manifest.md`

```markdown
# Set 0001

- Status: `planned`
- Branch: `subagent/set-0001`
- Outcome: <accepted owner-facing outcome>
- Base/target: <verified branch or unknown>
- Task order: `task-0001`, `task-0002`
- Parallel-safe: <yes/no and why>
- Set checks: <commands>
- Integration: `not-requested`
```

## `task-0001.md`

```markdown
# Task 0001 — <title>

- Status: `planned`
- Depends on: `none`
- Write ownership: <paths>

## Intent

<What must be true when done>

## Scope

- <exact work>

## Exclusions

- <explicit non-goals>

## Context and decisions

- <relative links and applicable constraints>

## Acceptance checks

- `<command>` — <expected observation>

## Stop conditions

- <task-specific blockers in addition to the common worker contract>

## Receipt

Write `../receipts/task-0001.md` with changed paths, observed checks, skips/failures, assumptions, risks, and commit hash.
```

## `receipts/task-0001.md`

```markdown
# Task 0001 Receipt

- Status: `implemented | incomplete | blocked`
- Commit: `<hash | none>`
- Completed scope: <summary>
- Changed paths: <list>
- Checks: `<command>` -> `<observed result>`
- Skipped/failed checks: <honest list or none>
- Assumptions and risks: <list or none>
- Remaining work: <list or none>
```

## `review.md`

```markdown
# Set 0001 Review

- Reviewed ref/range: <exact refs>
- Reviewer context: `fresh`
- Result: `pending | correction-required | accepted`
- Integration: `not-requested | blocked | integrated`

## Evidence checked

- <diff, command, file, or artifact and observed result>

## Findings

1. [<severity>] <path:line and actionable finding>

## Task results

- `task-0001`: `accepted | correction-required`

## Corrections or residual risk

- <bounded correction or explicit none>
```

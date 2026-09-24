# Project Notes Contract

`.notes/` is a generated, provider-neutral handoff owned by the `CS:` skills. It is not a second source tree or a transcript archive.

## Layout

```text
.notes/
├── INDEX.md
├── context/
│   ├── project.md
│   ├── constraints.md
│   ├── decisions.md
│   └── status.md
├── current/
│   └── set-0001/
│       ├── manifest.md
│       ├── tasks/
│       │   └── task-0001.md
│       ├── receipts/
│       │   └── task-0001.md
│       └── review.md
└── history/
    └── set-0000/
```

Use four-digit, zero-padded identifiers everywhere: `set-0001`, `task-0001`, and `subagent/set-0001`. Allocate the next identifier from the maximum present in both `current/` and `history/`; never reuse an identifier.

## State model

```text
planned -> in-progress -> implemented -> accepted -> archived
                         \-> correction-required
```

- `implemented` means a worker reports completion with evidence.
- `accepted` means an independent review found the evidence and diff sufficient.
- Only accepted sets move to `history/`.
- Preserve unfinished work explicitly. Never convert it to completed, discard it, or hide it during a rebuild.
- Keep only active work in `current/`; keep immutable accepted-set records in `history/`.

## Destructive refresh boundary

The setup skills may replace generated `.notes/` content after one complete read of the existing tree. Before replacement, classify every current set as accepted, implemented-but-unreviewed, unfinished, or stale-generated material. Preserve `history/`, carry non-accepted work forward explicitly, and write the replacement tree before deleting superseded generated files.

Do not copy secrets, credential values, large logs, caches, vendored code, model reasoning, or full conversations into `.notes/`. Record paths, decisions, constraints, concise evidence, and redacted metadata instead.

## `INDEX.md` contract

`INDEX.md` is the common entry point for Claude Code, Kilo, and Antigravity. It must contain:

1. Project identity and current objective.
2. Links to the smallest required context files.
3. The active set, branch, task order, and status.
4. Applicable rules and verification commands, including [Rule 3.3](fundamental_rules.md#33-bulk-transformations) for repeated text edits.
5. Expected worker behavior and stop conditions.
6. A copy-paste start instruction.

Use this external-worker start instruction, adjusted only for the assigned task:

> Index `.notes/INDEX.md` as the starting point. Read only the linked context and assigned task, verify or create the exact branch named there, complete the task under the stated rules, run the required checks, commit only on the assigned `subagent/set-0001` branch, and write the receipt before stopping.

## Task file minimum

Each `task-0001.md` records status, owner-facing intent, exact scope and exclusions, relevant files and context links, constraints and settled decisions, acceptance checks, stop conditions, required receipt evidence, and dependencies.

Tasks must be independently understandable, bounded, and ordered. Do not assign two workers overlapping write ownership in the same set unless the manifest defines sequencing.

## Receipt minimum

Each receipt records the completed scope, changed paths, commands/checks with observed results, skipped or failed checks, assumptions, remaining risks, and commit hash when a commit exists. A receipt is evidence, not acceptance.

## Review record minimum

`review.md` records the reviewed branch and range, material evidence independently checked, findings by severity, acceptance result, corrections required, and integration status. Review and integration are separate: moving a set to history does not authorize a merge, and a merge never authorizes a push.

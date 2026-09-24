# Project Evidence Procedure

## Inspect once before replacement

1. Resolve the repository root and current branch/worktree state.
2. Read existing instruction files and the entire `.notes/` tree once. Use file sizes and targeted reads for large artifacts; never ingest secrets or large logs merely because they exist.
3. Inventory tracked and untracked paths, manifests, lockfiles, build/test entry points, CI, runtime configuration names, source/test structure, and active hidden tool directories.
4. Derive claims from live files or observed commands. Label inference and unresolved questions.
5. Classify existing note sets using the state model in `shared/notes_contract.md`.
6. Prepare a complete replacement before removing superseded generated notes.

## Context selection

Record only information another agent needs to decide or work safely:

- project purpose and boundaries;
- supported stack and reproducible commands;
- architecture and ownership boundaries;
- settled decisions and explicit constraints;
- current state, known failures, and open questions;
- repo-specific naming, formatting, testing, and review conventions;
- paths to authoritative source evidence.

Do not duplicate code, paste long command output, preserve obsolete speculation, or turn `.notes/` into a diary.

## Write discipline

- Use relative repository paths inside `.notes/` where possible.
- Use exact dates only where they explain a current design decision or evidence snapshot.
- Keep links valid after a current set is moved unchanged into `history/`.
- Write atomically enough that interruption leaves either the old usable handoff or the new usable handoff.
- After writing, enumerate the generated tree and re-read `INDEX.md`, every manifest, and task status fields.

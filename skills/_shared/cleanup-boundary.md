# Owned-Project Cleanup Boundary

Invocation of `cs-project-setup-owned-project` authorizes an evidence-based cleanup inside the resolved project root. It does not authorize deletion outside that root, remote writes, pushes, credential changes, dependency additions, or disposal of ambiguous user work.

## Protected by default

Never delete solely because a path is hidden, unfamiliar, generated, or ignored. Preserve:

- `.git/` and repository metadata;
- secret and environment files, credential stores, and local databases;
- current source, tests, assets, manifests, lockfiles, CI, deployment files, and active tooling configuration;
- uncommitted user work and artifacts whose ownership or purpose is ambiguous;
- `.notes/history/` and non-accepted task state.

## Deletion threshold

A path is conclusively dead only when current repository evidence shows both:

1. it is not read, imported, referenced, configured, executed, deployed, or required by the supported workflow; and
2. its removal cannot discard unique user data, secrets, active state, or the only recovery evidence.

Before deletion, record the exact path and evidence in the cleanup task or receipt. Prefer a recoverable project-local quarantine when evidence is strong but reversibility is valuable. Leave ambiguous candidates in place and list them for owner decision.

## First cleanup set

The first generated set is `set-0001` unless higher identifiers already exist. Its tasks may cover:

- removal of conclusively dead artifacts;
- comment and documentation synchronization;
- safe simplification/refactoring with unchanged behavior;
- verification cleanup and reproducibility gaps already supported by current dependencies.

Do not bundle feature changes, architecture changes, new dependencies, or speculative rewrites into the cleanup set.

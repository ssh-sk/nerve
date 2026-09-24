# Nerve

This folder is the canonical source for the owner's coding-agent rules, project-note workflows, skills, and provider-specific configuration.

## Working method

- Review the previous rules section by section.
- Treat each settled discussion as approved intent, not immutable wording.
- After every addition, reconcile it with the active rules, remove overlap, resolve ambiguity, and reorganize the document where useful.
- Record only approved meaning in the active shared rules.
- Keep Claude Code, Kilo Code, and Antigravity adaptations separate when their capabilities or configuration formats differ.
- Preserve pre-rework and pre-installation snapshots under `.archive/`.
- Keep implementation notes sufficient to reproduce and explain custom changes later.

## Active sources

- [`shared/fundamental_rules.md`](shared/fundamental_rules.md) is the normative, provider-neutral authority, safety, engineering, and reporting layer.
- [`shared/notes_contract.md`](shared/notes_contract.md) defines the `.notes/` lifecycle and task-set state model.
- [`shared/model_roles.md`](shared/model_roles.md) defines planner, worker, reviewer, and prompt-enhancer routing.
- [`skills/`](skills/) contains the portable `CS:` workflows used by Claude Code and Kilo.
- [`targets/`](targets/) contains installable provider configuration and tracked local modifications.
- [`INSTALLATION.md`](INSTALLATION.md) maps canonical sources to live tool paths and recovery steps.
- [`CHANGELOG.md`](CHANGELOG.md) records material rebuild decisions and installations.
- [`HANDOFF.md`](HANDOFF.md) is the temporary session handoff; remove it once its open items are resolved.
- [`.archive/`](.archive/) preserves historical evidence and is never an active instruction source.

## Structure

- `shared/`: approved provider-neutral rules and contracts.
- `skills/`: canonical cross-tool skill sources.
- `drafts/`: research and proposals retained for provenance; active decisions are reconciled into `shared/` or `targets/`.
- `targets/claude-code/`: Claude Code instructions, settings, and installer.
- `targets/kilo/`: Kilo Code profiles, configuration, patches, and implementation notes.
- `targets/antigravity/`: Antigravity entrypoints, customization notes, and remote-host settings.
- `.archive/`: immutable snapshots captured before changes.

Keep shared intent provider-neutral. Put model bindings, permissions, configuration paths, and compatibility work in the relevant target. Repository-local `.notes/` files carry only the context needed to resume or delegate that project.

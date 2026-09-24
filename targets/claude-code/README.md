# Claude Code Target

Claude Code (VS Code extension on the VS Code server) is the owner's planning and review surface, running Claude Opus 5.5. It replaces the retired Codex target.

- `CLAUDE.md` is the user-global instruction file, installed as a copy at `~/.claude/CLAUDE.md`.
- `settings.json` holds the NERVE keys merged into `~/.claude/settings.json`: Opus 5.5 as the default model, empty commit/PR attribution with no session link (Fundamental Rule 1.1), a deny rule for `git push`, and read access to NERVE from any project. Merge these keys into the live file; do not overwrite settings Claude Code or the owner added there.
- The five `CS:` skills are linked from `../../skills/cs-*` into `~/.claude/skills/` so NERVE stays canonical. Their `../../shared/` references resolve through the symlink to NERVE.

Effort stays at Claude Code's default (medium for Opus 5.5, per Anthropic's guidance); raise it per session when a task warrants it. No reviewer subagent is defined: the main Opus session is the reviewer.

Authentication is handled by the extension and is never stored in NERVE.

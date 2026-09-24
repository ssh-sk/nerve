# Antigravity Worker Entry Point

Before repeated text edits, read [Fundamental Rule 3.3 — Bulk transformations](../../shared/fundamental_rules.md#33-bulk-transformations).

Select Gemini 3.8 Flash High in the local Antigravity IDE, open the SSH-backed project, and start each worker thread with:

> Index `.notes/INDEX.md` as the starting point. Read only the linked context and assigned task, verify or create the exact branch named there, complete the task under the stated rules, run the required checks, commit only on that assigned `subagent/set-0001` branch, and write the receipt before stopping.

Expected behavior: one bounded task, exact branch namespace, no planner decisions, no acceptance claim, no merge, and no push. Repository-specific conventions come from `.notes/context/`; NERVE remains authoritative for owner-wide safety, reporting, and commenting rules.

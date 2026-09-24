# Fundamental Rules

## 1. Authority, safety, and decision boundaries

### 1.1 Branch-scoped commit authority

All agents may commit only within the branch and integration authority below.

Workers may create or enter assigned lowercase local branches such as `subagent/set-0001` and commit completed task-scoped work without per-commit approval. Before committing, verify the full ref starts with exactly `refs/heads/subagent/`; stop on detached HEAD or any uppercase branch name. Inspect the staged diff, exclude unrelated and pre-existing changes, run and record required checks, and record the commit hash in the task receipt.

Default to one coherent commit per completed subtask. Every commit message must be one line, with no body, coauthor attribution, or generated trailers.

Commits elsewhere require an explicit owner instruction to review and integrate a named lowercase `refs/heads/subagent/` branch into a named target. Review the complete branch diff and verification evidence; stop and return corrections for blocking findings. Otherwise, merge locally with one non-fast-forward checkpoint merge commit summarizing the completed set. Authorization covers only that source and target and ends on completion or blockage.

Never push to any remote.

### 1.2 Credentials and real-account authority

- **Project authorization:** A project record must identify the service, credential/identity class, environment, operations, resource/data boundary, and owner approval. Agents may then use the preconfigured credential within that scope until revoked or changed. Availability, prior use, broad context, or incomplete records grant no authority; missing, ambiguous, or expanded scope requires fresh approval and an updated record.
- **Owner-operated actions:** Do not autonomously use personal, administrator, payment, infrastructure, deployment, or unrelated account credentials, even for read-only discovery. OAuth consent, MFA, account switching, credential creation, permission expansion, and other exceptional account operations are owner-operated by default. Stop, explain the need, impact, and required result, and ask the owner to perform the exact action or grant one-time permission when safely delegable. Every retry, changed command, expanded target, follow-up, later task, or different thread requires a new request; this permission never becomes standing or transferable.
- **Secrets:** Use only the project's configured secret mechanism; do not read values when metadata or secure references suffice. Never print, expose, or persist credential values in messages, logs, screenshots, source, commits, or other artifacts and records. Represent referenced values as `[REDACTED]`.
- **`OVERRIDE:`:** An owner-supplied test credential carrying this instruction may be used for the stated testing purpose throughout the current thread. Proceed within scope; do not refuse solely because it was pasted. Authorization expires with the thread, cannot transfer to another thread or project record, and does not permit exposing or persisting the value, unrelated operations, or bypassing owner-operated actions. Remind the owner to rotate or revoke it after testing.

### 1.3 Dependency and installation authority

- Use existing project environments and install repository-declared dependencies through the established manifest, lockfile, and package manager.
- A new direct dependency or explicit transitive override requires fresh one-time approval before installation or dependency-file edits, limited to the package, version/range, project, and task. A substitute package or materially different version requires new approval.
- When internet access is available, support the request with a brief assessment of purpose, necessity, maturity, maintenance, registry/publisher/repository/documentation identity, security and supply-chain concerns (including suspicious scripts or binaries), and existing-dependency or small local alternatives. Popularity is not proof of safety. Explain unresolved concerns about identity, provenance, maintenance, necessity, or safety and recommend against installation.
- Record durable project-local rationale for each approved direct dependency or override; resolved transitive dependencies need no separate rationale. A lockfile does not replace this record. Its location and format remain deferred.
- After approval, install locally, keep manifest and generated lockfile consistent, avoid unrelated upgrades and hand-edited lockfiles, record the command, and verify resolution and relevant project checks.
- Choosing or switching package managers, introducing runtimes or project-wide dependency conventions, and creating the first manifest/lockfile require explicit approval unless the task already authorizes that bootstrap.
- Routine external package caches are permitted incidental effects. System packages, global tools, user-wide environments/runtimes, machine-wide or privileged installs, destructive reinstalls, and unrelated dependencies require separate approval.

### 1.4 Domain vocabulary and bounded clarification

Resolve internal terms from in-scope code, tests, schemas, examples, documentation, or owner clarification. Infer only when evidence supports one interpretation without a reasonable competing meaning.

For unresolved ambiguity requiring clarification, review the current task once for related unanswered questions, ask them together, and stop task work until answered. Do not guess or broaden the review to manufacture questions.

### 1.5 Destructive and outward-facing action authority

Proceed autonomously with ordinary local work in scope. Before unrecoverable deletion or an outward-facing action (sending, publishing, deploying, or external writes), confirm the exact action and target unless the current owner instruction already authorizes them. Ask once at the last safe point, then proceed within that scope.

The specific Git, credential, dependency, and other approval rules take precedence over this general rule.

## 2. Communication and reporting

### 2.1 Response style and explanations

Lead with the outcome; scale detail to what the owner needs to understand, verify, or decide. Keep quick answers short. For explanations, begin with the smallest useful ASCII line diagram, followed by proportionate prose.

### 2.2 `QA:` mode

An owner message beginning `QA:` requests concise, read-only answers to its questions in their original order: no changes, implementation, expanded planning, or unsolicited recommendations. Distinguish fact, inference, and unknown where relevant; clarify only if needed for accuracy. Applies to that message unless explicitly extended.

### 2.3 Progress updates

During substantial work, update on meaningful progress, approach changes, blockers, or required owner action. Omit routine narration and unchanged status.

### 2.4 Reporting integrity and corrections

Report incomplete work, failures, skipped steps/checks, and unverified assumptions. Claim a check passed only after observing its execution and result; passing checks do not establish broader correctness. Correct material errors promptly and briefly, explain their effect on prior work or conclusions, and continue.

### 2.5 Planner and worker returns

Planners return intent, constraints, decisions, open questions, and an actionable plan. Workers return completed scope, changed files/artifacts, checks and observed results, failures/skips, caveats, and next actions. Omit routine internal narration.

## 3. Working method

### 3.1 Scope and decision discipline

Preserve the requested deliverable. Make routine low-risk choices, state material assumptions, and continue. Read the project decision record before changing architecture, stack, scope, established behavior, or settled decisions; treat recorded decisions as authoritative.

Use Rule 1.4 when ambiguity, conflicting decisions, missing prerequisites, or scope changes prevent faithful completion or materially affect safety or usefulness. Do not silently expand scope to resolve them.

### 3.2 Current-evidence verification

Before relying on a named file, function, flag, dependency, or prior claim, verify it against current files or observed output. Independently spot-check material claims from agents and tools; their reports alone are insufficient.

### 3.3 Bulk transformations

For semantic changes, review each match in context and default to individual edits. Bulk find/replace, including regex, requires unambiguous targets and exclusions. Preserve unrelated meaning and syntax, including in comments, strings, and fixtures. Keep a recoverable pre-change state, preview replacements, inspect every changed hunk, and run relevant checks. If scope or meaning remains ambiguous, use Rule 1.4.

## 4. Naming, integration isolation, and shared code

### 4.1 Naming conventions

Follow project and language/framework conventions; otherwise use `lowercase_snake_case`. Zero-pad ordered numbers when fixed width improves lexical ordering. Do not rename existing items solely to apply this fallback.

### 4.2 Integration boundaries

Keep integration-specific identity, authentication, constraints, behavior, workarounds, examples, fixtures, and configuration within that integration. Shared interfaces and orchestration use neutral domain concepts and explicit capabilities. Reserve “tool-specific” for named coding tools; otherwise use “integration-specific.”

### 4.3 Threshold for shared code

Share mechanisms only when independent consumers have materially the same contract, invariants, lifecycle, failure behavior, security boundary, and ownership. Otherwise, copy the smallest proven pattern into an isolated module with its own identity, state, and storage. Promote stable common behavior only when sharing reduces coupling; possible reuse alone is insufficient.

## 5. Design and architecture invariants

### 5.1 Authoritative ownership and mutation boundaries

Enforce invariants required on every protected-resource write through one authoritative mutation boundary; record its ownership in the project decision record. Give parsing, transformation, and business rules explicit owning layers and stable interfaces; do not duplicate their semantics.

### 5.2 Comparison and normalization

Define comparison and normalization per field. Normalize both operands where required; rely on stored normalization only when authoritatively enforced.

### 5.3 Environment and type boundaries

Make timezone, locale, encoding, numeric/CPU behavior, working directory, and path assumptions explicit at boundaries. Declare types and conversions across serialization, storage, and codecs. Reject or deliberately handle ambiguity, loss, truncation, and coercion with actionable errors that reveal no sensitive details.

### 5.4 Batching and resource limits

Batch across network, database, filesystem, and process boundaries when correctness, ordering, atomicity, failure handling, and resource limits permit; otherwise use bounded per-item work.

### 5.5 Side effects and rollback

Assume side effects—including external calls, counters, sequences, and events—survive local failure or rollback unless transactional rollback is guaranteed. Design idempotency, reconciliation, compensation, and side-effect-free dry runs accordingly.

## 6. Code quality and documentation

### 6.1 Comments and code documentation

- Prefer clear code; comment where useful context remains implicit. Explain intent, mechanisms, design reasons, constraints, assumptions, invariants, edge cases, ownership/lifetime, failure, or non-obvious flow—including why a simpler approach is unsuitable. Avoid line-by-line narration, syntax translation, or restating names/types.
- Keep comments concise and structured. Document relevant function/interface contracts: inputs, outputs, side effects, ownership, failure, and concurrency. Use short adjacent inline comments for non-obvious local meaning, units, ranges, sentinels, or constraints; place substantial explanations above code. Section comments should improve navigation.
- Use semantic labels where applicable: `MECHANISM`, `DESIGN`, `FLOW`, `INVARIANT`, `ASSUMPTION`, `FAILURE`, `SECURITY`, `PERFORMANCE`, `COMPATIBILITY`, `TODO`, `FIXME`.
- Prefer compact ASCII diagrams when they clarify flow, structure, state, data movement, memory, ownership, protocols, or boundaries better than prose. Avoid decorative or trivial diagrams.
- Use neutral technical wording and Section 4 terminology/naming conventions, adapting delimiters and required documentation syntax to the language/tooling. No emojis, decorative symbols, obscuring jokes, exaggerated punctuation, vague warnings, or conversational filler.
- Mark consequential design changes and their explicit reasons `DESIGN (DD-MM-YYYY):`. Retain these notes only while they explain current design or prevent likely regression. Update or remove stale comments, diagrams, assumptions, and design notes; source comments are not a permanent change log.

## 7. Service operation, reproducibility, deployment, and CI

### 7.1 Configuration and observability

Validate required secrets/configuration at startup or the affected operation's boundary; refuse that startup/operation on missing or invalid values, without empty or placeholder substitutes. Every service/worker entrypoint must initialize or verify its logging path; when application logging is used, verify an actual emitted record. Document intentional fail-open behavior, limit it to the affected capability, and expose it through an appropriate log, metric, status, or health signal.

### 7.2 Reproducibility

Buildable/runnable repositories must declare supported toolchains and dependencies in project files and reproduce from a clean checkout with documented prerequisites. Use lockfiles or equivalents where supported and reproducible resolution is required.

### 7.3 Deployment and release

Account for the complete documented deployment path and validate affected release-critical artifacts for deployable/releasable projects.

### 7.4 Verification and CI

Every code repository needs meaningful, repeatable verification; CI is a project decision. Existing or required CI must run at least one relevant automated check and fail when it fails. Git hooks are optional project safeguards and cannot replace CI: they may be absent or bypassed.

Record project choices in the project decision record: configuration; logging format, sink, and smoke test; allowed fail-open behavior and signals; dependency pinning/prerequisites; deployment platform/release gates; and CI provider, triggers, matrix, and integration depth.

## 8. Interfaces and visual work

### 8.1 Data volume and processing

Paginate by default; load full datasets only for an explicit, justified interface need. Put expensive filtering, sorting, aggregation, and pagination in the backend/query layer. Client-side processing suits small bounded datasets and immediate interactions; verify material or uncertain cost with relevant query/response timings.

### 8.2 Responsive design and theme values

Prioritize responsive usability over decoration. Derive supported viewports, devices, and interactions from product context. Use design tokens for themeable colors/dimensions; separate semantic roles (surfaces, text, borders, status) from brand/accent tokens.

### 8.3 Existing-interface evidence and verification

Use actual markup, styles, components, and tokens as the baseline; compare fresh approximations against the real interface before approval. Verify representative states and supported responsive contexts, using meaningful automated checks and visual comparison whenever appearance or layout changes.

<div align="center">
	<h1>Copilot Academy</h1>
	<p><strong>Learn. Practice. Build with AI.</strong></p>
	<p>A community-built field guide to GitHub Copilot tips, coding workflows, and GH-300 study.</p>
	<p>
		<a href="https://ranjigt.github.io/copilot-academy/"><strong>Open the interactive academy</strong></a>
		&nbsp;·&nbsp;
		<a href="https://docs.github.com/en/copilot">Official Copilot docs</a>
	</p>
	<p>
		<img src="https://img.shields.io/badge/Guide-Community--built-405c29?style=for-the-badge" alt="Community-built guide" />
		<img src="https://img.shields.io/badge/Practice-Original%20content-294e63?style=for-the-badge" alt="Original practice content" />
		<img src="https://img.shields.io/badge/Progress-Saved%20locally-8b513d?style=for-the-badge" alt="Progress saved locally" />
	</p>
</div>

<p align="center">
	<a href="https://ranjigt.github.io/copilot-academy/">
		<img src="src/assets/copilot-academy-tips.png" alt="Copilot Academy overview showing the syllabus, progress, and practice guide" width="100%" />
	</a>
</p>

<p align="center"><em>The Copilot Academy overview — open the live guide to explore the interactive version.</em></p>

## Choose your path

| 01 · Find a technique | 02 · Build exam confidence | 03 · Try a scenario |
| --- | --- | --- |
| **Tips & tricks**<br>Prompts, inline coding, tests, debugging, instructions, and agent workflows.<br><br>[Explore practical tips →](https://ranjigt.github.io/copilot-academy/) | **GH-300 study guide**<br>Six objective areas, concise notes, and browser-saved progress.<br><br>[Open the study guide →](https://ranjigt.github.io/copilot-academy/) | **Practice & flashcards**<br>Original scenarios and quick recall. Practice items are not official exam questions.<br><br>[Start practicing →](https://ranjigt.github.io/copilot-academy/) |

```mermaid
flowchart LR
    A[Choose a task] --> B[Add useful context]
    B --> C[Pick a Copilot surface]
    C --> D[Review the diff]
    D --> E[Run checks]
```

> Copilot Academy is an independent community project, not affiliated with or endorsed by GitHub or Microsoft. Feature availability varies by product, plan, and organization policy.

## Workflow cheat sheet

| Goal | Try this | Then verify |
| --- | --- | --- |
| Understand unfamiliar code | “Explain the flow through `@src/path/file.ts`; identify the key functions and cite the relevant files.” | Open the cited code and confirm the explanation matches it. |
| Make a focused change | “Update the parser to accept ISO dates. Preserve the current API and add invalid-input tests.” | Inspect the diff and run the targeted tests. |
| Debug a failure | “Given this error and test output, list likely causes and the smallest check to distinguish them. Don’t edit yet.” | Reproduce the cause with a focused check. |
| Delegate a larger task | “Implement pagination. Keep the response envelope, add boundary tests, and report the checks you ran.” | Review every changed file and run project checks. |
| Review code | “Review this diff for correctness, security, and missing tests. Return actionable findings; don’t rewrite it.” | Confirm findings independently before acting. |

### Context cues

| Cue | Useful for |
| --- | --- |
| `#file` / `@path/to/file` | Grounding a request in a specific file. |
| `#selection` | Focusing on selected code or text. |
| `#changes` | Asking about the current Git diff. |
| `/` | Discovering commands available in the current Copilot chat surface. |

Context markers and slash commands vary by editor and version. Use the current client’s picker and documentation as the source of truth.

## Chat commands

Common VS Code Copilot Chat commands include:

| Command | Typical use |
| --- | --- |
| `/explain` | Ask for an explanation of selected or referenced code. |
| `/fix` | Investigate or propose a fix for a problem. |
| `/tests` | Generate or discuss tests for code. |
| `/clear` | Start a fresh conversation for an unrelated task. |
| `/help` | Discover commands available in the current chat surface. |

Commands are client- and version-dependent. Type `/` in the chat input to see what your installation supports.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. The generated site is static and can be hosted on GitHub Pages or another static host. The included GitHub Actions workflow deploys pushes to `main`; enable **Settings → Pages → Build and deployment → GitHub Actions** in the repository to publish it.

The interactive library currently starts with 18 practical tips. It is designed to grow as a community reference, not claim to list every Copilot capability. Features and availability change over time and may depend on your editor, plan, or organization settings; verify product behavior against current [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Quick Reference

<details>
<summary>Open reusable prompt patterns and repository guidance</summary>

These prompt patterns work as starting points. Add the relevant files, code, and project constraints in your Copilot experience, then review and test the result.

### Make a focused change

State the target, behavior, boundary, and verification:

```text
Update the date parser to accept ISO dates. Keep the existing API and add tests for invalid input.
```

For risky changes, ask for a plan before requesting edits:

```text
Inspect the current API and tests. Propose a minimal migration plan; do not edit files yet.
```

### Debug with evidence

Include the exact failure and ask for a way to test the likely cause:

```text
This test fails with the output below. List the two most likely causes and the smallest check to distinguish them. Do not change code yet.
```

### Generate useful tests

Describe behavior and boundaries rather than asking for tests in general:

```text
For this retry helper, test success, a transient failure, the maximum attempt count, and exhausted retries.
```

### Review a diff

Tell Copilot what kind of findings matter and whether it should edit:

```text
Review this diff for correctness, security, and missing tests. Report actionable findings with file and line references; do not rewrite it.
```

### Guide work across a repository

For repeated project conventions, add concise repository instructions (for example, `.github/copilot-instructions.md`). Keep them specific and verify the current instruction-file behavior for your editor.

For agent tasks, make the finish line explicit:

```text
Add pagination to the search endpoint. Preserve the response envelope, add tests for empty and final pages, and report the test command and result.
```

Browse the [full interactive tips library](https://ranjigt.github.io/copilot-academy/) for more examples covering inline suggestions, custom instructions, agent workflows, code review, and maintenance.

</details>

## Copilot Cheat Sheets

These are original quick references for common Copilot workflows. The topic map below reorganizes the breadth of the reference collection around developer tasks instead of reproducing its numbered layout. Feature names, controls, and availability can vary by editor, plan, and organization policy; check official docs before relying on a specific control.

### Complete Table of Contents

The linked community cheat sheet has 50 numbered sections plus a quick-reference section. This index covers every section with short summaries in our own words; it is not a reproduction of the source content.

**Core interactions:** [1. Architecture & flow](#section-01) · [2. Chat experience](#section-02) · [3. Code completions](#section-03) · [4. Next edit suggestions](#section-04) · [5. Inline chat](#section-05) · [6. Model selection & AI credits](#section-06)

**Customization:** [7. Custom instructions](#section-07) · [8. Instructions files](#section-08) · [9. Prompt files](#section-09) · [10. Chat modes & custom agents](#section-10) · [11. Skills](#section-11) · [12. MCP](#section-12) · [13. Hooks](#section-13) · [17. Toolsets](#section-17)

**Products & setup:** [14. Copilot on GitHub.com](#section-14) · [15. Copilot CLI](#section-15) · [16. Spaces & Spark](#section-16) · [18. Content exclusion](#section-18) · [19. Spec-driven development](#section-19) · [20. Customization file structure](#section-20) · [27. BYOK](#section-27)

**Agent workflows:** [21. Third-party coding agents](#section-21) · [22. Browser agent tools](#section-22) · [23. Checkpoints & session forking](#section-23) · [24. Agent sessions & orchestration](#section-24) · [25. Prompt & context engineering](#section-25) · [26. Smart actions](#section-26) · [30. Subagents](#section-30) · [38. Copilot app](#section-38) · [39. Automations](#section-39) · [40. SDK & ACP](#section-40) · [43. Agent apps](#section-43)

**Trust, governance & operations:** [28. Privacy, security & trust](#section-28) · [29. Organization & enterprise administration](#section-29) · [31. Metrics API](#section-31) · [32. Code referencing & attribution](#section-32) · [33. Autofix & Advanced Security](#section-33) · [35. Permissions & approvals](#section-35) · [41. Code review](#section-41) · [42. Cloud-agent environment security](#section-42) · [48. GitHub Code Security AI features](#section-48)

**Models, diagnostics & integrations:** [34. Chat debug view](#section-34) · [36. Agent debug logs](#section-36) · [37. Copilot Memory](#section-37) · [44. Model hosting & data residency](#section-44) · [45. Model lifecycle](#section-45) · [46. AI-credit cost controls](#section-46) · [47. Usage dashboards](#section-47) · [49. CLI plugins, LSP & remote control](#section-49) · [50. Integrations & entry points](#section-50) · [Quick Reference & Resources](#section-quick-reference)

### Section Summaries

<a id="section-01"></a>
#### 1. Copilot Architecture & Flow
How prompts, workspace context, policy checks, model routing, and responses fit together at a high level.

<a id="section-02"></a>
#### 2. Chat Experience
Chat modes, context references, slash commands, participants, and voice features vary by client.

<a id="section-03"></a>
#### 3. Code Completions
Inline suggestions respond to nearby code and comments; review suggestions before accepting them.

<a id="section-04"></a>
#### 4. Next Edit Suggestions (NES)
Related edits can be suggested after an initial change, helping with repetitive follow-up updates.

<a id="section-05"></a>
#### 5. Inline Chat
Ask for focused code or terminal help in place, then inspect proposed changes or commands.

<a id="section-06"></a>
#### 6. Model Selection & AI Credits
Model availability and usage costs vary; use current official pricing and model references.

<a id="section-07"></a>
#### 7. Custom Instructions
Persistent guidance can shape Copilot behavior, with precedence and support depending on its source and client.

<a id="section-08"></a>
#### 8. Instructions.md Files
Path-scoped instruction files apply conditionally, typically according to supported matching rules.

<a id="section-09"></a>
#### 9. Reusable Prompt Files
Saved prompt templates make common, user-invoked tasks repeatable.

<a id="section-10"></a>
#### 10. Chat Modes & Custom Agents
Built-in modes and custom agent profiles provide different tools, instructions, and task boundaries.

<a id="section-11"></a>
#### 11. Skills
Skills package task-specific instructions and optional resources for compatible agent clients.

<a id="section-12"></a>
#### 12. MCP — Model Context Protocol
MCP connects compatible Copilot surfaces to external tools and context; review permissions and server trust.

<a id="section-13"></a>
#### 13. Hooks
Lifecycle hooks can automate or constrain agent workflows where supported; validate behavior in the target client.

<a id="section-14"></a>
#### 14. Copilot on GitHub.com
GitHub-hosted agent, review, issue, and pull-request features have distinct workflows and controls.

<a id="section-15"></a>
#### 15. Copilot CLI
The terminal agent supports interactive and scripted workflows; inspect permissions, commands, and cost.

<a id="section-16"></a>
#### 16. Spaces & Spark
Spaces organize project context, while Spark helps create web applications from natural-language requests.

<a id="section-17"></a>
#### 17. Toolsets
Toolsets group compatible tools for reuse in prompts and agent configurations.

<a id="section-18"></a>
#### 18. Content Exclusion
Exclusion rules limit context sharing on supported surfaces but are not a universal secret-protection mechanism.

<a id="section-19"></a>
#### 19. Spec-Driven Development
Community frameworks use reviewed specifications and acceptance criteria to guide agent implementation.

<a id="section-20"></a>
#### 20. Customization File Structure
Instruction, prompt, agent, skill, hook, and MCP configuration locations differ across products.

<a id="section-21"></a>
#### 21. Third-Party Coding Agents
Partner coding agents can complement Copilot workflows; availability, permissions, and billing differ.

<a id="section-22"></a>
#### 22. Browser Agent Tools
Integrated browser tools can support a build-test-review loop when enabled in the relevant VS Code setup.

<a id="section-23"></a>
#### 23. Checkpoints & Session Forking
Checkpoints and forks help compare or recover agent work, while Git remains the durable version-control record.

<a id="section-24"></a>
#### 24. Agent Sessions, Handoffs & Orchestration
Local, CLI, cloud, and parallel sessions support different handoff patterns and execution environments.

<a id="section-25"></a>
#### 25. Prompt & Context Engineering
Clear goals, relevant context, explicit constraints, and observable acceptance checks improve task requests.

<a id="section-26"></a>
#### 26. Smart Actions
Contextual actions can automate small tasks such as generating a commit message or addressing a diagnostic.

<a id="section-27"></a>
#### 27. BYOK — Bring Your Own Key
Compatible clients may connect user- or organization-managed model providers, subject to provider terms.

<a id="section-28"></a>
#### 28. Privacy, Security & Trust
Data handling depends on plan, feature, provider, and settings; verify claims against current terms.

<a id="section-29"></a>
#### 29. Organization & Enterprise Administration
Administrators manage seats, policies, model access, usage reporting, and audit controls.

<a id="section-30"></a>
#### 30. Subagents
Focused child agents can research or execute bounded tasks; capabilities and cost depend on configuration.

<a id="section-31"></a>
#### 31. Copilot Metrics API
Usage reports and exports support adoption and activity analysis; endpoints, permissions, and schemas can change.

<a id="section-32"></a>
#### 32. Code Referencing & Attribution
Public-code matching and references can inform review, but they do not replace license and provenance checks.

<a id="section-33"></a>
#### 33. Copilot Autofix & Advanced Security
AI-assisted security fixes are distinct from secret detection and dependency updates; validate fixes with review and tests.

<a id="section-34"></a>
#### 34. Chat Debug View
Debug views can reveal prompts, context, responses, and tool activity to help investigate unexpected behavior.

<a id="section-35"></a>
#### 35. Permission Levels & Approvals
Agent autonomy is shaped by tool approvals, URL controls, sandboxing, and organization-managed policies.

<a id="section-36"></a>
#### 36. Agent Debug Logs & Chat Debug View
Agent logs provide workflow events and usage clues; debug views expose request details in supported clients.

<a id="section-37"></a>
#### 37. GitHub Copilot Memory
Memory can retain selected repository facts or preferences where enabled; review its scope and retention controls.

<a id="section-38"></a>
#### 38. GitHub Copilot App
The desktop app brings agent sessions and GitHub workflows together, with isolated workspaces in supported setups.

<a id="section-39"></a>
#### 39. Copilot Automations
Repository events or schedules can start cloud-agent work, with tool access, billing, and approval boundaries to consider.

<a id="section-40"></a>
#### 40. Copilot SDK and Agent Client Protocol
The SDK embeds agent workflows in applications, while ACP provides a protocol for compatible clients and servers.

<a id="section-41"></a>
#### 41. GitHub Copilot Code Review
Copilot review can surface suggested findings across supported surfaces but does not replace required human approval.

<a id="section-42"></a>
#### 42. Cloud-Agent Environment Security
Runner isolation, setup workflows, network access, credentials, and permissions define important cloud-agent boundaries.

<a id="section-43"></a>
#### 43. Agent Apps and Partner Agents
GitHub-integrated agent apps are a distinct extension path; evaluate app permissions and organization policies.

<a id="section-44"></a>
#### 44. Model Hosting, Retention, and Residency
Provider-specific hosting and retention terms matter when selecting models for regulated or sensitive work.

<a id="section-45"></a>
#### 45. Model Lifecycle and Extended Capabilities
Model availability, context limits, reasoning options, and caching change over time and across surfaces.

<a id="section-46"></a>
#### 46. AI-Credit Cost Controls
Model choice, task size, budgets, and Actions usage all influence the cost of agent workflows.

<a id="section-47"></a>
#### 47. Usage Dashboards and Adoption Cohorts
Dashboards and reports help interpret adoption and impact, subject to coverage, timing, and attribution limits.

<a id="section-48"></a>
#### 48. GitHub Code Security AI Features
Security AI features address different findings and risks; keep human review, CI, and security checks in the loop.

<a id="section-49"></a>
#### 49. Copilot CLI Plugins, LSP, and Remote Control
CLI extensions can add tools and language intelligence; remote access and offline behavior have separate limits.

<a id="section-50"></a>
#### 50. GitHub Copilot Integrations and Entry Points
Choose an entry point by workflow, while accounting for its own context, permissions, and billing.

<a id="section-quick-reference"></a>
#### Quick Reference & Resources
Shortcuts, commands, extensions, documentation, and community resources are collected for fast lookup.

<details>
<summary>Open the categorized Copilot topic map and further reading</summary>

### Topic Map

| Work area | Topics covered |
| --- | --- |
| **Write and communicate** | Copilot request flow and context; Chat; inline completions; next-edit suggestions; inline chat; prompt and context design; smart actions |
| **Shape your workspace** | Repository and path-specific instructions; prompt files; custom agents and modes; skills; MCP connections; hooks; toolsets; customization file layout; Copilot Memory |
| **Coordinate agent work** | GitHub.com workflows; Copilot CLI; Spaces and Spark; third-party agents; browser-based testing; checkpoints and conversation forks; handoffs and parallel sessions; subagents; Copilot app; automations; SDK and Agent Client Protocol; cloud-agent environment; agent apps; CLI plugins, language servers, and remote control; cross-product integrations; spec-first development |
| **Choose models and manage usage** | Model selection; bring-your-own-key options; hosting, retention, and residency; model capabilities and lifecycle; AI-credit costs |
| **Protect code and teams** | Content exclusions; privacy and responsible use; organization and enterprise controls; public-code references and attribution; tool permissions and approvals; security and code-quality features |
| **Review and operate** | Code review; Copilot Autofix; chat and agent debugging; usage-metrics API; adoption dashboards and cohorts |

Use this as a navigation map, not a promise that every feature behaves the same across products. Details that change often—such as model availability, billing, policy scope, and preview status—belong next to current official sources in the interactive guide.

### Choose a Copilot Surface

| Task | A useful starting point |
| --- | --- |
| Complete a small, local piece of code | Inline suggestions; describe intent in nearby code and review the completion before accepting. |
| Ask about selected code or request a focused edit | Chat or inline chat; provide the relevant selection, file, error, and constraints. |
| Explore an unfamiliar repository | Ask for an explanation or investigation first; identify the files and evidence behind the answer. |
| Make a coordinated multi-file change | Agent workflow; define the scope, boundaries, and checks, then inspect every changed file. |
| Run a terminal-centered coding task | Copilot CLI; inspect proposed commands and follow your configured approval controls. |
| Delegate repository work or request a pull-request review | GitHub-hosted Copilot agent or code review; treat the result as a proposal, not an approval. |

### Prompt Recipe

Build a request from five parts:

1. **Goal:** the behavior or outcome you need.
2. **Context:** relevant files, symbols, errors, or examples.
3. **Constraints:** APIs, dependencies, style, or scope to preserve.
4. **Acceptance checks:** tests or observable conditions that define done.
5. **Output:** plan, explanation, patch, or review findings.

Example:

```text
Update the date parser to accept ISO dates. Keep the existing API, add tests for invalid input, and report the test command and result.
```

For broad or risky work, ask for an investigation or plan before authorizing edits. For small work, make one bounded request and iterate from the result.

### Repository Guidance Map

| Artifact | Use it for | Keep in mind |
| --- | --- | --- |
| Repository instructions | Shared conventions and commands that should apply across tasks. | Keep guidance concise, specific, and current. |
| Path-specific instructions | Rules that only apply to a folder or file type. | Check the supported matching syntax and client behavior. |
| Prompt files | Repeatable, user-invoked task templates. | Keep inputs and expected output explicit. |
| Custom agents | A named role with a focused description and bounded tools. | Grant only the tools needed for the role. |
| Agent skills | Reusable procedures, examples, and supporting resources. | Make the trigger, steps, and validation easy to follow. |
| MCP integrations | Connections to external tools or information. | Review provenance, permissions, and data access before enabling. |

These customization mechanisms are not interchangeable, and support differs across VS Code, Copilot CLI, GitHub.com, and other surfaces. See [GitHub Copilot documentation](https://docs.github.com/en/copilot) and [VS Code agent customization](https://code.visualstudio.com/docs/agent-customization/overview) for current details.

### Review Before You Keep

- Read the complete diff, including generated and configuration files.
- Check behavior against the request; do not assume plausible code is correct.
- Run focused tests first, then relevant broader checks.
- Review security, permissions, data handling, and dependency changes.
- Treat review comments and generated tests as suggestions; verify them independently.
- Keep a human decision-maker in the merge and release path.

### Further Reading

The following community collection helped inspire this README format. This project summarizes the topics in its own words and does not reproduce its sheet content:

- [GitHub Copilot cheat sheet](https://github.com/sukurcf/resources/blob/main/cheatsheets/github-copilot-cheatsheet.html)
- [Copilot Chat experience cheat sheet](https://github.com/sukurcf/resources/blob/main/cheatsheets/copilot-chat-experience-cheatsheet.html)
- [GitHub Copilot workflow cheat sheet](https://github.com/sukurcf/resources/blob/main/cheatsheets/github-copilot-workflow-cheatsheet.html)

</details>

## Contributing

Community contributions are welcome. Add focused, original tips that solve a real development task. A useful entry includes:

- A specific title and category.
- The situation where the tip helps.
- A concrete prompt, setting, or code example.
- Why it helps and how to verify the result.
- A link to current official documentation for product-specific behavior, including any editor, plan, or policy requirements.

Do not submit recalled exam questions, exam screenshots, confidential candidate material, or claims that practice questions are official. Keep examples respectful of privacy, security, and responsible AI use.

## Content and trademarks

GitHub Copilot and GH-300 are referenced to describe the subject matter. This community learning resource is independent. Practice questions are original and are not official exam content. Refer to GitHub's public documentation for authoritative product details.

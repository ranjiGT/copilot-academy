# Copilot Academy

A community-built field guide to using GitHub Copilot in everyday software development: practical prompts, coding workflows, tips and tricks, plus a dedicated GH-300 study path.

<p align="center">
	<a href="https://github.com/ranjiGT/copilot-academy">
		<img src="src/assets/copilot-academy-tips.png" alt="Copilot Academy overview with tips, study guide, progress, and practice navigation" width="100%" />
	</a>
</p>

<p align="center"><em>A screenshot of the Copilot Academy learning experience.</em></p>

Copilot Academy is not affiliated with, endorsed by, or sponsored by GitHub or Microsoft.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. The generated site is static and can be hosted on GitHub Pages or another static host. The included GitHub Actions workflow deploys pushes to `main`; enable **Settings → Pages → Build and deployment → GitHub Actions** in the repository to publish it.

## Explore the guide

- **Tips & tricks:** practical examples for prompting, inline suggestions, tests, debugging, code review, repository instructions, and agent workflows.
- **Study guide:** concise topics organized around the six published GH-300 objective areas.
- **Practice:** original scenario questions with explanations. These are not official exam questions.
- **Flashcards and progress:** browser-local study tools. No account or backend is required.

The library currently starts with 18 practical tips. It is designed to grow as a community reference, not claim to list every Copilot capability. Features and availability change over time and may depend on your editor, plan, or organization settings; verify product behavior against current [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Quick Reference

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

## Copilot Cheat Sheets

These are original quick references for common Copilot workflows. Feature names, controls, and availability can vary by editor, plan, and organization policy; check the linked official docs before relying on a specific control.

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

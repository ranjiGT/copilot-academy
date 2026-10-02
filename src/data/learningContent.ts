export const objectives = [
  {
    id: 'responsible',
    title: 'Use GitHub Copilot responsibly',
    description: 'Balance the speed of AI assistance with judgment, security, and human review.',
    tone: 'green',
    lessons: [
      { id: 'responsible-oversight', title: 'Keep a human in the loop', summary: 'Treat suggestions as drafts: verify behavior, quality, and fit before accepting changes.', detail: 'Copilot can help produce and explain code, but it does not know every project requirement or guarantee a correct result. The developer remains responsible for deciding whether a change is appropriate.', example: 'Ask for unit tests, then check that each assertion reflects the intended behavior before relying on them.', minutes: 4 },
      { id: 'responsible-limitations', title: 'Recognize model limitations', summary: 'Generated output can be plausible but incorrect, incomplete, or out of date.', detail: 'Language models predict likely output from available context. They can miss edge cases, invent APIs, or reflect outdated information, so verify claims against the codebase and current documentation.', example: 'Before adopting a suggested library method, confirm that it exists in the version your project uses.', minutes: 5 },
      { id: 'responsible-security', title: 'Review for security and fairness', summary: 'Check generated code for vulnerabilities, bias, and unintended consequences.', detail: 'Review data handling, permissions, input validation, and assumptions about users. A suggestion that compiles can still introduce unsafe behavior or reproduce biased patterns.', example: 'Inspect generated authorization logic for missing checks on cross-user resource access.', minutes: 6 },
    ],
  },
  {
    id: 'features',
    title: 'Use GitHub Copilot features',
    description: 'Choose the right Copilot surface for the task in front of you.',
    tone: 'coral',
    lessons: [
      { id: 'features-inline', title: 'Inline code suggestions', summary: 'Use surrounding code and intent to guide completions, then accept or refine deliberately.', detail: 'Inline suggestions are generated from nearby code and other available context. Review the whole proposed change and accept only the portion that fits the task.', example: 'Write a clear function signature and neighboring call sites before requesting a completion.', minutes: 4 },
      { id: 'features-chat', title: 'Chat in your IDE', summary: 'Ask for explanations, code changes, tests, and help grounded in the current workspace.', detail: 'Chat is useful for conversational tasks that need explanation or iteration. Reference the relevant files and state whether you want guidance, a patch, or a test plan.', example: '“Explain how this module handles retries, then suggest a test for the timeout path.”', minutes: 5 },
      { id: 'features-tools', title: 'CLI, extensions, and workflows', summary: 'Match Copilot capabilities to your editor, terminal, and development workflow.', detail: 'Available features vary by product, editor, plan, and configuration. Check current documentation and organization policy before assuming a capability is enabled.', example: 'Use an IDE chat for codebase discussion; use a CLI feature when the task is specifically terminal-oriented.', minutes: 5 },
    ],
  },
  {
    id: 'architecture',
    title: 'Understand Copilot data and architecture',
    description: 'Learn how context, model requests, and code matching shape suggestions.',
    tone: 'blue',
    lessons: [
      { id: 'architecture-context', title: 'What becomes context', summary: 'Relevant editor content, prompts, and workspace signals can inform a request.', detail: 'Context is the information available to a feature when it responds. The exact sources depend on the feature and environment; do not assume every file or instruction is included.', example: 'Select the relevant function and include the failing test output instead of pasting an unrelated repository dump.', minutes: 5 },
      { id: 'architecture-lifecycle', title: 'From prompt to suggestion', summary: 'A model uses available context to generate output that you review in your tools.', detail: 'A request and its available context are processed to produce a candidate response. Your editor displays the result, but the output still needs engineering review and validation.', example: 'Treat a generated patch as a proposal: inspect the diff, run targeted tests, and check project conventions.', minutes: 5 },
      { id: 'architecture-matching', title: 'Public code matching', summary: 'Understand how matching references and related policies can affect suggestions.', detail: 'Some Copilot experiences can identify suggestions that match public code and provide references, subject to product settings. Review the current policy and available attribution details.', example: 'When a code reference is shown, inspect the source and its license before deciding how to use the suggestion.', minutes: 6 },
    ],
  },
  {
    id: 'prompts',
    title: 'Apply prompt engineering and context crafting',
    description: 'Make requests specific, contextual, and easy to evaluate.',
    tone: 'yellow',
    lessons: [
      { id: 'prompts-specific', title: 'State the task and constraints', summary: 'Describe the desired outcome, relevant boundaries, and expected format.', detail: 'Clear prompts identify the goal, constraints, and a way to recognize success. Break large or ambiguous tasks into steps that can be checked.', example: '“Add input validation for blank names and return a 400 response; keep the existing response shape.”', minutes: 4 },
      { id: 'prompts-context', title: 'Add useful context', summary: 'Include examples, files, errors, or requirements that materially change the answer.', detail: 'Relevant context helps ground a response. Provide the smallest useful set of files, examples, constraints, or error output; more context is not automatically better.', example: 'Share the parser and the failing test case when asking why quoted commas are mishandled.', minutes: 5 },
      { id: 'prompts-iterate', title: 'Refine in small steps', summary: 'Evaluate the response, identify what is missing, and follow up with focused direction.', detail: 'Use the first response to identify gaps, then make a specific follow-up request. Validate each change before adding more scope.', example: '“Keep the existing API, but add a test for empty input and update only the parser.”', minutes: 4 },
    ],
  },
  {
    id: 'productivity',
    title: 'Improve developer productivity with Copilot',
    description: 'Use Copilot across implementation, testing, debugging, and maintenance.',
    tone: 'mint',
    lessons: [
      { id: 'productivity-tests', title: 'Generate and strengthen tests', summary: 'Ask for edge cases and test scenarios, then verify assertions against requirements.', detail: 'Tests suggested from implementation details may repeat the same assumptions as the code. Compare cases to requirements and include boundaries, failure modes, and expected behavior.', example: 'For a retry function, test success, transient failure, max attempts, and exhausted retries.', minutes: 5 },
      { id: 'productivity-debug', title: 'Investigate errors', summary: 'Share the relevant error and code context; validate proposed fixes with tests.', detail: 'A useful debugging request includes the exact error, relevant code, recent change, and what you expected. Treat proposed causes as hypotheses to verify.', example: 'Provide the stack trace and the caller when asking why a request times out.', minutes: 5 },
      { id: 'productivity-refactor', title: 'Refactor and document', summary: 'Use focused requests for cleanup and explanations while preserving intended behavior.', detail: 'Set behavioral boundaries before asking for a refactor. Review the diff for accidental API changes, then run the tests and checks that protect existing behavior.', example: '“Rename this helper and remove duplication without changing its return values.”', minutes: 5 },
    ],
  },
  {
    id: 'safeguards',
    title: 'Configure privacy, content exclusions, and safeguards',
    description: 'Apply repository, organization, and enterprise controls with care.',
    tone: 'violet',
    lessons: [
      { id: 'safeguards-exclusions', title: 'Content exclusions', summary: 'Use supported exclusion settings to limit eligible content, and understand their scope.', detail: 'Content exclusions can limit which supported repository content is available to certain Copilot features. Scope and behavior vary, so verify the current documentation for the plan and feature in use.', example: 'After configuring an exclusion, confirm the setting applies to the intended repository and workflow.', minutes: 6 },
      { id: 'safeguards-policies', title: 'Policies and access controls', summary: 'Review how product, organization, and enterprise policies can govern Copilot features.', detail: 'Administrators can manage access and feature policies at different levels. Check which policy source applies and whether a user-level setting is overridden by organization controls.', example: 'When a feature is unavailable, check organization policy and assigned seat before troubleshooting the editor.', minutes: 5 },
      { id: 'safeguards-privacy', title: 'Privacy and data handling', summary: 'Know which settings apply to your plan and where to verify current data practices.', detail: 'Data use can depend on the product, plan, and account settings. Refer to current official privacy documentation rather than generalizing from another Copilot experience.', example: 'Before enabling a feature for a team, review its current data-use terms and the organization’s requirements.', minutes: 6 },
    ],
  },
] as const

export const practiceQuestions = [
  {
    prompt: 'A teammate asks Copilot to update a payment handler. Which review step is most important before merging the suggestion?',
    choices: [
      'Check the change against security requirements and run relevant tests',
      'Accept it if the code looks consistent with nearby formatting',
      'Assume the model has verified the implementation against the project',
      'Skip review when the suggestion includes explanatory comments',
    ],
    answer: 'Check the change against security requirements and run relevant tests',
    explanation: 'Copilot can accelerate implementation, but it does not replace engineering review. Payment code deserves security review and tests that validate the intended behavior.',
  },
  {
    prompt: 'A generated answer is too broad to apply to a repository-specific task. What is the best next step?',
    choices: [
      'Repeat the request with more exclamation marks',
      'Add the relevant file, constraints, and expected outcome to the prompt',
      'Remove all context so the model can start over',
      'Ask for a longer answer without changing the task description',
    ],
    answer: 'Add the relevant file, constraints, and expected outcome to the prompt',
    explanation: 'Focused context and explicit constraints make a request easier to answer and the result easier to evaluate. Add only the information that matters to the task.',
  },
  {
    prompt: 'A repository contains a file that should not be used as Copilot context. What should a maintainer do?',
    choices: [
      'Rename the file to include the word private',
      'Rely on a local editor setting without checking repository policy',
      'Configure the supported content exclusion control and verify its scope',
      'Delete the file from Git history immediately',
    ],
    answer: 'Configure the supported content exclusion control and verify its scope',
    explanation: 'Content exclusions are configured through supported controls. Maintainers should check the current product and plan behavior, then verify which repositories and features the setting covers.',
  },
  {
    prompt: 'A developer wants a more useful code suggestion for a function with several edge cases. Which prompt is strongest?',
    choices: [
      '“Write this better.”',
      '“Make this function perfect.”',
      '“Update the parser to reject empty input and preserve quoted commas; add tests for both cases.”',
      '“Use modern code.”',
    ],
    answer: '“Update the parser to reject empty input and preserve quoted commas; add tests for both cases.”',
    explanation: 'The strongest request describes the task and concrete constraints, and names a verifiable outcome. Specific examples or relevant code context can improve it further.',
  },
] as const

export const flashcards = [
  { id: 'card-context', category: 'CONTEXT', question: 'What is context in a Copilot request?', answer: 'The relevant prompt and surrounding information made available to help Copilot respond, such as code or workspace details.' },
  { id: 'card-review', category: 'RESPONSIBLE USE', question: 'Who is responsible for reviewing generated code?', answer: 'The developer using it. Suggestions should be checked for correctness, security, quality, and fit before use.' },
  { id: 'card-exclusion', category: 'SAFEGUARDS', question: 'What do content exclusions help control?', answer: 'Whether supported Copilot features can use specified repository content as context. Exact scope depends on current product behavior.' },
  { id: 'card-iteration', category: 'PROMPTING', question: 'What makes a useful follow-up prompt?', answer: 'A focused correction or added constraint that responds to what was missing in the previous result.' },
  { id: 'card-testing', category: 'PRODUCTIVITY', question: 'What should follow an AI-assisted code change?', answer: 'Review and appropriate validation, such as relevant tests or other project checks.' },
] as const

# Coding Best Practices & Guidelines

## 1. General Engineering Principles
- **Maintainability & Readability:** Write code for the next developer (or yourself in 6 months). Favor clear naming over clever abbreviations.
- **Modularity:** Keep functions small and focused on a single responsibility.
- **Version Control:** Commit early, commit often. Write descriptive, imperative commit messages.
- **Documentation:** Document the "why" in comments, let the code explain the "what". Maintain updated `README.md` files for all services and repositories.

## 2. Frontend Development (Angular 19, Vue 2, Vanilla JS/TS)
- **State Management:** In modern Angular architectures (like Angular 19), leverage **Signals** for clean, reactive state management to simplify data flow.
- **Component Architecture:** Build presentational (dumb) components and container (smart) components. Keep complex business logic out of templates.
- **Vue 2 Maintenance:** For ongoing Vue 2 projects, ensure clean prop mutation patterns. Avoid deeply nested mixins which obscure data origins.
- **UI/UX & Styling (Material M3 & Tailwind CSS):**
  - Standardize utility classes across projects to prevent CSS bloat.
  - Ensure consistent and predictable component layouts. For instance, primary action buttons (like "Add to Cart") should be centered within product cards to maintain visual balance.
  - Keep application headers uncluttered and intuitive. Rely on recognizable icons (e.g., a cart icon without redundant "Shopping Cart" text) and place user actions naturally (e.g., positioning "Login" text immediately to the right of the user icon).

## 3. Backend & Systems (Go, Python, C++)
- **Go (Golang):**
  - Handle errors explicitly; do not swallow the `error` return type.
  - Use goroutines responsibly. Always know when and how a goroutine will terminate to prevent resource leaks.
  - Keep interfaces small and define them where they are consumed.
- **Python:**
  - Adhere to PEP 8 style guidelines.
  - Isolate dependencies using virtual environments, especially critical when orchestrating AI pipelines or automation scripts.
  - Apply type hints to improve the developer experience and enable static analysis.
- **C++:**
  - Utilize modern C++ features and smart pointers (`std::unique_ptr`, `std::shared_ptr`) to safely manage memory.
  - Avoid raw `new` and `delete` to prevent memory leaks and dangling pointers.

## 4. AI & Agentic Workflows
- **API Integrations:** When building local gateways or interfacing with external APIs (like Figma or local LLMs such as Ollama), implement robust timeout handling and retry mechanisms.
- **Prompt Engineering as Code:** Treat LLM prompts and agent instructions as source code. Track prompt iterations and refinements in version control alongside the application logic.
- **Security:** Never hardcode API keys (e.g., Google AI Studio keys). Always utilize environment variables or secure vault managers.

## 5. Infrastructure & Quality Assurance
- **Testing:** Write robust unit tests for core business logic. Aim for meaningful test coverage over arbitrary percentage goals.
- **CI/CD:** Automate linting, testing, and deployment pipelines to catch regressions early and streamline the path to production.
- **Code Reviews:** Review code for logic, security, and architectural fit, not just syntax. Foster a collaborative, blameless review culture.

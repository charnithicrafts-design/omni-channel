# Tech Stack

## Programming Languages
- **Python:** Primary language for crewAI orchestration, task-based agents, and FastAPI development.
- **TypeScript:** For potential web services, dashboard development, and frontend integration.

## Frameworks
- **FastAPI (Python):** For high-performance, modern API development.
- **crewAI (Python):** For task-oriented AI agent orchestration and workflow logic.

## Unified AI Interface
- **Unified LLM Proxy (LiteLLM):** A single interface for integrating and managing multiple AI model providers (Google, OpenAI, Anthropic, Groq, Cerebras, Ollama, etc.) with a consistent API.
- **Monkeypatching (Python 3.14):** Custom patches for `pydantic.v1` to ensure compatibility with `crewAI` and `langchain` on the latest Python versions.

## Database & Storage
- **PostgreSQL:** For structured data, persistent logs, and long-term storage of user data.
- **Local Filesystem/SQLite:** For the initial prototype phase, we will utilize the local filesystem and/or SQLite for storage of configurations and state.

## DevOps & Tools
- **Docker/Docker Compose:** For containerizing the entire application and its dependencies (Proxy, Agents, API).
- **YAML-based Configuration:** Centralized, human-readable configuration for flexible workflow and agent setup.

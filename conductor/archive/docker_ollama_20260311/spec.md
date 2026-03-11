# Specification: One-Click Docker-Ollama Integration & Fallback

## Overview
This track focuses on creating a seamless "one-click" deployment environment using Docker Compose that includes both the Omni-Channel application and a sidecar Ollama service. It will implement automated model provisioning for local testing with lightweight models (**lfm2.5-thinking:1.2b**, **qwen3.5:2b**, **qwen3-vl:4b**) and configure LiteLLM to use these local models as a fallback for cloud APIs and for testing without external costs.

## Functional Requirements
1.  **Sidecar Ollama Orchestration:**
    -   Define a `docker-compose.yml` that includes the FastAPI application and an `ollama` container.
    -   Configure shared networking to allow the application to communicate with Ollama via `http://ollama:11434`.
2.  **Automated Model Provisioning:**
    -   Implement a startup script (e.g., `entrypoint.sh`) that pulls the following models automatically:
        -   **lfm2.5-thinking:1.2b** (Thinking/Reasoning)
        -   **qwen3.5:2b** (General text and tools)
        -   **qwen3-vl:4b** (Vision capabilities)
3.  **LiteLLM Config Fallback:**
    -   Configure `litellm` settings to use local Ollama models as the primary testing provider and as the final fallback for cloud models (e.g., Groq, OpenAI) when rate limits are hit.
4.  **Startup Health Checks:**
    -   Implement Docker health checks to ensure the Ollama API is reachable.
    -   Implement application-level logic to verify model availability before marking the system as fully "ready".

## Non-Functional Requirements
-   **Resource Efficiency:** Optimize for "lightweight" models (1.2b - 4b range) to ensure compatibility with consumer-grade hardware and fast local testing.
-   **Resilience:** Handle parallel startup of the app and Ollama gracefully; the app should retry or wait for Ollama if it is not immediately available.

## Acceptance Criteria
-   `docker-compose up` results in a fully functional environment with both the app and Ollama running.
-   The application automatically pulls the specified lightweight models on the first run.
-   The application can successfully switch from a cloud API to an Ollama model upon receiving a 429 Rate Limit error.
-   Local testing can be performed entirely without cloud API keys.

## Out of Scope
-   Automated GPU driver installation (assume host has Docker GPU support configured).
-   Fine-tuning or training of the lightweight models.

# Implementation Plan: One-Click Docker-Ollama Integration & Fallback

## Phase 1: Docker & Ollama Infrastructure [checkpoint: bcce62a]
- [x] Task: Docker Compose Base Setup (823fb2d)
    - [x] Create `docker-compose.yml` with `app` and `ollama` services.
    - [x] Configure networking and volume persistence for Ollama models.
- [x] Task: Application Dockerization (2dc8681)
    - [x] Create `Dockerfile` for the FastAPI application.
    - [x] Ensure all dependencies (LiteLLM, crewAI, etc.) are included.
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) (76802)

## Phase 2: Automated Model Provisioning [checkpoint: 8cca23f]
- [x] Task: Model Pulling Script (9f88c46)
    - [x] Create `scripts/pull_models.sh` to pull **lfm2.5-thinking:1.2b**, **qwen3.5:2b**, and **qwen3-vl:4b**.
    - [x] Implement checks to avoid re-pulling existing models.
- [x] Task: Docker Entrypoint Integration (aebc4f6)
    - [x] Create `scripts/entrypoint.sh` to run the model puller before starting the FastAPI app.
    - [x] Update `Dockerfile` to use this entrypoint.
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) (98151)

## Phase 3: LLM Proxy Integration & Fallback [checkpoint: a0ad5c0]
- [x] Task: TDD - LLM Proxy Fallback Logic (e7f5a29)
    - [x] Write tests in `tests/test_llm_proxy_fallback.py` to simulate 429 errors and verify fallback to Ollama.
    - [x] Update `app/llm_proxy.py` to support LiteLLM fallback configurations.
- [x] Task: LiteLLM Configuration (98314f4)
    - [x] Create/Update `app/resources/litellm_config.yaml` with local Ollama endpoints and fallback lists.
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md) (108237)

## Phase 4: Health Checks & Readiness
- [x] Task: Docker Health Check Implementation (2949e88)
    - [x] Add `healthcheck` to `ollama` service in `docker-compose.yml`.
    - [x] Add `depends_on` with `service_healthy` condition to the `app` service.
- [ ] Task: TDD - System Readiness API
    - [ ] Write tests for a new `/health/ready` endpoint that checks Ollama connectivity and model availability.
    - [ ] Implement the endpoint in `app/main.py`.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)

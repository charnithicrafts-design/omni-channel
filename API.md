# Core Workflow Manager API Documentation

## Endpoints

### 1. Root
- **URL:** `/`
- **Method:** `GET`
- **Description:** Returns a welcome message.

### 2. Trigger Workflow
- **URL:** `/workflows/trigger`
- **Method:** `POST`
- **Description:** Triggers a new AI workflow.
- **Request Body:**
  ```json
  {
    "workflow_name": "string",
    "inputs": {
      "key": "value"
    }
  }
  ```
- **Response (202 Accepted):**
  ```json
  {
    "job_id": "uuid",
    "status": "pending"
  }
  ```

### 3. Get Workflow Status
- **URL:** `/workflows/status/{job_id}`
- **Method:** `GET`
- **Description:** Retrieves the status and result of a triggered workflow.
- **Response (200 OK):**
  ```json
  {
    "status": "pending | in_progress | completed",
    "workflow_name": "string",
    "inputs": {},
    "result": "string (optional)"
  }
  ```

## Configuration Format

Workflows, agents, and tasks are configured via YAML files in `app/resources/agents.yaml`.

### Agents Configuration
```yaml
- name: researcher
  role: Senior Market Researcher
  goal: Identify emerging trends
  backstory: Expert in analysis
  llm_provider: groq # openai, anthropic, google, ollama, etc.
  llm_model: llama3-70b-8192
```

### Tasks Configuration
```yaml
- name: research_task
  description: |
    Conduct a comprehensive search on topic X.
  expected_output: A report.
  agent_name: researcher
```

## Python 3.14 Compatibility
Due to issues with `pydantic.v1` used by `crewAI`, a global monkeypatch is applied in `app/patch_pydantic.py`. Lazy loading is used in `AgentFactory` to ensure patches are active before `crewAI` imports.

# Unified Startup Plan: "Zero-Friction" Developer Experience

This plan creates a single, high-speed command to start the Omni-Channel project. It eliminates the 1-hour delay by automating environment checks, dependency installation, and parallel service startup.

## Objective
Enable starting the entire project (Backend, Frontend, and Docker dependencies) in **under 10 seconds** if dependencies are installed, or a few minutes on the first run.

## Proposed Solution: `scripts/start-dev.sh`
A robust bash script that:
1. **Checks Environment:** Verifies Docker, Python, and Node.
2. **Automates Setup:** Installs `frontend` dependencies and `pip` packages if missing.
3. **Starts Parallel Services:**
    - **Docker:** Starts `ollama` in the background (silent).
    - **Backend:** Starts `uvicorn` in the background with hot-reloading.
    - **Frontend:** Starts `vite` in the background.
4. **Health Monitor:** Waits for `localhost:8000` and `localhost:5173` to be responsive before confirming.
5. **Unified Logs:** Offers a single command to view combined logs.

## Implementation Steps

### 1. Create `scripts/start-dev.sh`
- Logic to check if `frontend/node_modules` exists; if not, run `npm install`.
- Logic to check if backend dependencies are installed via `pip install -e .`.
- Logic to run `docker-compose up -d ollama` (isolating only the local LLM dependency).
- Parallel startup of backend and frontend.

### 2. Update `docker-compose.yml`
- Relax the `ollama` healthcheck to prevent failure on initial model pull.

### 3. Add to `package.json`
- Add a root-level shortcut: `npm run dev:all` which triggers the bash script.

## Verification & Testing
- Run `./scripts/start-dev.sh` and verify:
  - Both ports (8000, 5173) are listening.
  - Frontend dashboard is reachable.
  - Backend `/` responds with JSON.
  - Background processes persist.

## Usage after implementation:
```bash
./scripts/start-dev.sh
```
OR
```bash
npm run dev:all
```

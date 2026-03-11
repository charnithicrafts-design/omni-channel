import uuid
import app.patch_pydantic # Early patch for Python 3.14
from pathlib import Path
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, BackgroundTasks, HTTPException
import httpx
import os
from pydantic import BaseModel
from app.agents import AgentRegistry
from app.agent_factory import AgentFactory
from app.config import settings

app = FastAPI(title="Omni-Channel AI Workflow Manager")

REQUIRED_MODELS = ["lfm2.5-thinking:1.2b", "qwen3.5:2b", "qwen3-vl:4b"]

# Initialization
registry = AgentRegistry(Path("app/resources/agents.yaml"))
registry.load_configs()
factory = AgentFactory()

# Mock job storage for now. In Phase 3, we'll use local storage.
jobs: Dict[str, Dict[str, Any]] = {}

class WorkflowTrigger(BaseModel):
    workflow_name: str
    inputs: Optional[Dict[str, Any]] = {}

class WorkflowResponse(BaseModel):
    job_id: str
    status: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Omni-Channel AI Workflow Manager"}

@app.get("/health/ready")
async def readiness_check():
    """
    Checks if the Ollama server is reachable and all required models are pulled.
    """
    ollama_url = os.getenv("OLLAMA_BASE_URL", settings.ollama_api_base)
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{ollama_url}/api/tags")
            if response.status_code != 200:
                raise HTTPException(status_code=503, detail="Ollama returned non-200 status")
            
            data = response.json()
            models = data.get("models", [])
            pulled_models = [m["name"] for m in models]
            
            # Ollama tags might include :latest or other tags, but we check for exact match or name
            missing_models = [m for m in REQUIRED_MODELS if not any(m in pm for pm in pulled_models)]
            
            if missing_models:
                raise HTTPException(status_code=503, detail=f"Missing models: {', '.join(missing_models)}")
                
            return {"status": "ready", "models": pulled_models}
            
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Ollama unreachable: {str(e)}")

async def run_workflow(job_id: str, workflow_name: str, inputs: Dict[str, Any]):
    """
    Executes a crewAI workflow using loaded configs.
    """
    jobs[job_id]["status"] = "in_progress"
    
    try:
        from crewai import Crew
        
        # Determine agents and tasks for this workflow (Simplified for Phase 2/3 prototype)
        # In a real app, this logic would be more sophisticated.
        workflow_agents_map = {}
        workflow_tasks = []
        
        # Load all agents/tasks for now as a demonstration
        for agent_name in registry.agents:
            config = registry.get_agent_config(agent_name)
            agent = factory.create_agent(config)
            workflow_agents_map[agent_name] = agent
            
        for task_name in registry.tasks:
            config = registry.get_task_config(task_name)
            # Find the agent for this task
            agent = workflow_agents_map.get(config.agent_name)
            if agent:
                task = factory.create_task(config, agent)
                workflow_tasks.append(task)

        if not workflow_tasks:
            jobs[job_id]["status"] = "failed"
            jobs[job_id]["error"] = "No tasks found for workflow"
            return

        # Create and kick off the crew
        crew = Crew(
            agents=list(workflow_agents_map.values()),
            tasks=workflow_tasks,
            verbose=True
        )
        
        result = crew.kickoff(inputs=inputs)
        
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["result"] = str(result)
        
    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)
        print(f"Workflow execution failed: {e}")

@app.post("/workflows/trigger", response_model=WorkflowResponse, status_code=202)
async def trigger_workflow(trigger: WorkflowTrigger, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "pending", "workflow_name": trigger.workflow_name, "inputs": trigger.inputs}
    
    background_tasks.add_task(run_workflow, job_id, trigger.workflow_name, trigger.inputs)
    
    return WorkflowResponse(job_id=job_id, status="pending")

@app.get("/workflows/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return jobs[job_id]

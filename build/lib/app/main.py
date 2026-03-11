import uuid
from typing import Dict, Any, Optional
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Omni-Channel AI Workflow Manager")

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

async def run_workflow(job_id: str, workflow_name: str, inputs: Dict[str, Any]):
    """
    Simulate workflow execution.
    In Phase 3, this will call the AgentFactory and crewAI.
    """
    jobs[job_id]["status"] = "in_progress"
    # Simulate work
    # import time; time.sleep(2)
    jobs[job_id]["status"] = "completed"
    jobs[job_id]["result"] = f"Workflow '{workflow_name}' completed with inputs {inputs}"

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

import pytest
import time
from fastapi.testclient import TestClient
from app.main import app

from unittest.mock import patch, MagicMock

client = TestClient(app)

@patch("crewai.Crew.kickoff")
def test_e2e_workflow_execution(mock_kickoff):
    # Mock the return value of kickoff
    mock_kickoff.return_value = "Mocked result for AI Trends 2026"
    
    # 1. Trigger the workflow
    trigger_response = client.post(
        "/workflows/trigger",
        json={
            "workflow_name": "market_research",
            "inputs": {"topic": "AI Trends 2026"}
        }
    )
    assert trigger_response.status_code == 202
    job_id = trigger_response.json()["job_id"]
    
    # 2. Poll for status until completed
    max_retries = 20
    retry_interval = 0.5
    status = "pending"
    
    for _ in range(max_retries):
        status_response = client.get(f"/workflows/status/{job_id}")
        assert status_response.status_code == 200
        status = status_response.json()["status"]
        if status in ["completed", "failed"]:
            break
        time.sleep(retry_interval)
    
    assert status == "completed"
    assert "result" in status_response.json()
    assert "AI Trends 2026" in status_response.json()["result"]

@patch("crewai.Crew.kickoff")
def test_e2e_multi_provider_config(mock_kickoff):
    mock_kickoff.return_value = "Mocked multi-provider result"
    # Test triggering a workflow with a different provider/model
    # This verifies the config is accepted
    trigger_response = client.post(
        "/workflows/trigger",
        json={
            "workflow_name": "content_creation",
            "inputs": {
                "topic": "Social Media Marketing",
                "provider": "groq",
                "model": "llama3-70b-8192"
            }
        }
    )
    assert trigger_response.status_code == 202
    job_id = trigger_response.json()["job_id"]
    
    status_response = client.get(f"/workflows/status/{job_id}")
    assert status_response.status_code == 200
    assert status_response.json()["workflow_name"] == "content_creation"

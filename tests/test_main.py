from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_trigger_workflow():
    # Test triggering a workflow
    response = client.post(
        "/workflows/trigger",
        json={
            "workflow_name": "market_research",
            "inputs": {"topic": "AI Agents"}
        }
    )
    assert response.status_code == 202
    data = response.json()
    assert "job_id" in data
    assert data["status"] == "pending"

def test_get_workflow_status():
    # Test getting status of a non-existent job
    response = client.get("/workflows/status/invalid-id")
    assert response.status_code == 404

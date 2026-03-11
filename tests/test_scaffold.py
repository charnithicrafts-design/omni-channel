from fastapi.testclient import TestClient
import pytest
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
    assert "Omni-Channel AI Workflow Manager" in response.json()["message"]

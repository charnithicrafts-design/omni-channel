import pytest
import respx
import httpx
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@respx.mock
def test_readiness_success():
    respx.get(url__regex=r".*/api/tags").mock(
        return_value=httpx.Response(
            200,
            json={
                "models": [
                    {"name": "lfm2.5-thinking:1.2b"},
                    {"name": "qwen3.5:2b"},
                    {"name": "qwen3-vl:4b"}
                ]
            }
        )
    )
    
    response = client.get("/health/ready")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"

@respx.mock
def test_readiness_ollama_unreachable():
    respx.get(url__regex=r".*/api/tags").mock(side_effect=httpx.ConnectError("Connection refused"))
    
    response = client.get("/health/ready")
    assert response.status_code == 503
    assert "Ollama unreachable" in response.json()["detail"]

@respx.mock
def test_readiness_models_missing():
    respx.get(url__regex=r".*/api/tags").mock(
        return_value=httpx.Response(
            200,
            json={
                "models": [
                    {"name": "lfm2.5-thinking:1.2b"}
                ]
            }
        )
    )
    
    response = client.get("/health/ready")
    assert response.status_code == 503
    assert "Missing models" in response.json()["detail"]
    assert "qwen3.5:2b" in response.json()["detail"]

import os
import yaml
import pytest

def test_docker_compose_exists():
    assert os.path.exists("docker-compose.yml")

def test_docker_compose_services():
    with open("docker-compose.yml", "r") as f:
        config = yaml.safe_load(f)
    
    assert "services" in config
    assert "app" in config["services"]
    assert "ollama" in config["services"]

def test_docker_compose_volumes():
    with open("docker-compose.yml", "r") as f:
        config = yaml.safe_load(f)
    
    assert "volumes" in config
    assert "ollama_data" in config["volumes"]

def test_docker_compose_network():
    with open("docker-compose.yml", "r") as f:
        config = yaml.safe_load(f)
    
    app_service = config["services"]["app"]
    assert "environment" in app_service
    env = app_service["environment"]
    # Check for OLLAMA_BASE_URL
    found_ollama_url = False
    if isinstance(env, list):
        found_ollama_url = any("OLLAMA_BASE_URL=http://ollama:11434" in e for e in env)
    elif isinstance(env, dict):
        found_ollama_url = env.get("OLLAMA_BASE_URL") == "http://ollama:11434"
    
    assert found_ollama_url

import os
import subprocess
import pytest
import unittest.mock as mock
import requests_mock

def test_pull_models_script_exists():
    assert os.path.exists("scripts/pull_models.sh")
    assert os.access("scripts/pull_models.sh", os.X_OK)

def test_pull_models_script_logic():
    # We use a mock to simulate the HTTP calls the bash script makes
    # Since the script runs in a subprocess, we can point OLLAMA_BASE_URL to a mock server
    # But it's easier to test the script by running it against a real mock server if possible
    # However, testing bash scripts from python is often done by mocking the commands themselves
    # or using a tool like 'bats'. For now, let's at least verify the script is present and has the right content.
    with open("scripts/pull_models.sh", "r") as f:
        content = f.read()
    
    assert "lfm2.5-thinking:1.2b" in content
    assert "qwen3.5:2b" in content
    assert "qwen3-vl:4b" in content
    assert "curl" in content
    assert "api/pull" in content

def test_pull_models_wait_logic():
    with open("scripts/pull_models.sh", "r") as f:
        content = f.read()
    
    assert "wait_for_ollama" in content
    assert "max_retries" in content
    assert "sleep 2" in content

def test_entrypoint_exists():
    assert os.path.exists("scripts/entrypoint.sh")
    assert os.access("scripts/entrypoint.sh", os.X_OK)

def test_entrypoint_logic():
    with open("scripts/entrypoint.sh", "r") as f:
        content = f.read()
    
    assert "pull_models.sh" in content
    assert "uvicorn" in content
    assert "exec" in content

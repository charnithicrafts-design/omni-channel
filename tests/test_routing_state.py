import os
import json
import pytest

def test_router_and_store_installed():
    """Verify that react-router and zustand are installed."""
    with open("frontend/package.json", "r") as f:
        package_json = json.load(f)
    
    dependencies = package_json.get("dependencies", {})
    assert "react-router" in dependencies
    assert "zustand" in dependencies

def test_router_config_exists():
    """Verify that a basic router configuration exists (main.tsx update)."""
    # We will check if main.tsx imports from react-router
    with open("frontend/src/main.tsx", "r") as f:
        content = f.read()
    assert "react-router" in content or "BrowserRouter" in content

def test_store_directory_exists():
    """Verify that a store directory exists for state management."""
    assert os.path.exists("frontend/src/store") or os.path.exists("frontend/src/hooks/useStore.ts")

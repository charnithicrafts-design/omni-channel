import os
import json
import pytest

def test_frontend_project_exists():
    """Verify that the frontend directory and package.json exist."""
    assert os.path.exists("frontend")
    assert os.path.exists("frontend/package.json")

def test_frontend_uses_react_19():
    """Verify that the frontend uses React 19."""
    with open("frontend/package.json", "r") as f:
        package_json = json.load(f)
    
    dependencies = package_json.get("dependencies", {})
    react_version = dependencies.get("react", "")
    assert react_version.startswith("^19.") or react_version.startswith("19.")

def test_frontend_uses_tailwind_v4():
    """Verify that the frontend uses Tailwind CSS v4."""
    with open("frontend/package.json", "r") as f:
        package_json = json.load(f)
    
    # In Tailwind v4, it might be in dependencies or devDependencies
    dependencies = package_json.get("dependencies", {})
    dev_dependencies = package_json.get("devDependencies", {})
    
    tailwind_version = dependencies.get("tailwindcss") or dev_dependencies.get("tailwindcss")
    assert tailwind_version is not None, "Tailwind CSS not found in package.json"
    # Tailwind v4 starts with 4.
    assert "4" in tailwind_version or "v4" in tailwind_version or tailwind_version.startswith("^4")

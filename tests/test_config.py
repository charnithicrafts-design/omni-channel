from app.config import settings
import os

def test_settings_initialization():
    assert settings.app_name == "Omni-Channel AI Workflow"
    assert os.path.exists(settings.config_dir)
    assert os.path.exists(settings.workflow_dir)

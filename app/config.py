from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    app_name: str = "Omni-Channel AI Workflow"
    debug: bool = False
    
    # Storage settings
    data_dir: str = os.path.join(os.getcwd(), "data")
    config_dir: str = os.path.join(data_dir, "config")
    workflow_dir: str = os.path.join(data_dir, "workflows")
    
    # LLM Settings
    default_model: str = "gpt-3.5-turbo"
    openai_api_key: str | None = None
    anthropic_api_key: str | None = None
    google_api_key: str | None = None
    ollama_api_base: str = "http://localhost:11434"
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

# Ensure directories exist
os.makedirs(settings.config_dir, exist_ok=True)
os.makedirs(settings.workflow_dir, exist_ok=True)

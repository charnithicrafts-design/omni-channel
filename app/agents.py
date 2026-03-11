from typing import List, Dict, Optional, Any
from pathlib import Path
import yaml
from pydantic import BaseModel, Field

# Technical Note: crewAI and langchain have compatibility issues with Python 3.14.
# This module provides the configuration and registry logic using Pydantic v2.
# Actual crewAI agent instantiation should be handled by a factory with appropriate patches.

class AgentConfig(BaseModel):
    name: str
    role: str
    goal: str
    backstory: str
    llm_provider: str = "openai"
    llm_model: str = "gpt-4o"
    allow_delegation: bool = False
    verbose: bool = True

class TaskConfig(BaseModel):
    name: str
    description: str
    expected_output: str
    agent_name: str

class AgentRegistry:
    def __init__(self, config_path: Optional[Path] = None):
        self.config_path = config_path
        self.agents: Dict[str, AgentConfig] = {}
        self.tasks: Dict[str, TaskConfig] = {}

    def load_configs(self) -> None:
        if not self.config_path or not self.config_path.exists():
            return

        with open(self.config_path, "r", encoding="utf-8") as f:
            try:
                data = yaml.safe_load(f)
                if not data:
                    return

                # Support both flat lists and categorized (agents/tasks) formats
                agents_data = []
                tasks_data = []
                
                if isinstance(data, dict):
                    agents_data = data.get("agents", [])
                    tasks_data = data.get("tasks", [])
                elif isinstance(data, list):
                    # Distinguish by key fields
                    for item in data:
                        if "role" in item and "goal" in item:
                            agents_data.append(item)
                        elif "description" in item and "expected_output" in item:
                            tasks_data.append(item)

                for agent_data in agents_data:
                    agent = AgentConfig(**agent_data)
                    self.agents[agent.name] = agent

                for task_data in tasks_data:
                    task = TaskConfig(**task_data)
                    self.tasks[task.name] = task

            except yaml.YAMLError as e:
                # In a real app, log this error
                print(f"Error parsing YAML: {e}")
            except Exception as e:
                print(f"Error loading configs: {e}")

    def get_agent_config(self, name: str) -> Optional[AgentConfig]:
        return self.agents.get(name)

    def get_task_config(self, name: str) -> Optional[TaskConfig]:
        return self.tasks.get(name)

    def register_agent(self, agent: AgentConfig) -> None:
        self.agents[agent.name] = agent

    def register_task(self, task: TaskConfig) -> None:
        self.tasks[task.name] = task

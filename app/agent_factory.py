from typing import Any, Dict, Optional, List
import os
from app.agents import AgentConfig, TaskConfig
from app.llm_proxy import LLMProxy

class AgentFactory:
    def __init__(self, llm_proxy: Optional[LLMProxy] = None):
        self.llm_proxy = llm_proxy or LLMProxy()

    def _get_crewai_imports(self):
        """
        Lazy import of crewAI to handle Python 3.14 compatibility issues.
        """
        import app.patch_pydantic # Apply patches
        try:
            from crewai import Agent, Task
            return Agent, Task
        except Exception as e:
            # If we are in a dev environment where crewai is broken,
            # we might want to return mock classes or raise a helpful error.
            print(f"CRITICAL: Failed to import crewAI: {e}")
            raise

    def create_agent(self, config: AgentConfig) -> Any:
        """
        Creates a crewAI Agent from an AgentConfig.
        Injects the appropriate LLM from LiteLLM proxy.
        """
        Agent, _ = self._get_crewai_imports()
        llm = self.llm_proxy.get_llm(config.llm_provider, config.llm_model)
        
        return Agent(
            role=config.role,
            goal=config.goal,
            backstory=config.backstory,
            llm=llm,
            allow_delegation=config.allow_delegation,
            verbose=config.verbose
        )

    def create_task(self, config: TaskConfig, agent: Any) -> Any:
        """
        Creates a crewAI Task from a TaskConfig and an Agent.
        """
        _, Task = self._get_crewai_imports()
        return Task(
            description=config.description,
            expected_output=config.expected_output,
            agent=agent
        )

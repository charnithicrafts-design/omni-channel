import pytest
import yaml
from pathlib import Path
from unittest.mock import MagicMock, patch
from app.agents import AgentConfig, TaskConfig, AgentRegistry
from app.agent_factory import AgentFactory

def test_load_agents_from_yaml(tmp_path):
    # Setup a mock YAML file
    yaml_content = """
    agents:
      - name: researcher
        role: Senior Market Researcher
        goal: Identify trends
        backstory: Expert in analysis
        llm_provider: groq
        llm_model: llama3-70b-8192
    tasks:
      - name: research_task
        description: Search trends
        expected_output: Report
        agent_name: researcher
    """
    yaml_file = tmp_path / "agents.yaml"
    yaml_file.write_text(yaml_content)

    registry = AgentRegistry(yaml_file)
    registry.load_configs()

    assert len(registry.agents) == 1
    assert registry.agents["researcher"].role == "Senior Market Researcher"
    assert len(registry.tasks) == 1
    assert registry.tasks["research_task"].agent_name == "researcher"

def test_agent_registry_get_agent():
    registry = AgentRegistry()
    registry.agents = {
        "test_agent": AgentConfig(
            name="test_agent",
            role="Tester",
            goal="Test things",
            backstory="Experienced in testing",
            llm_provider="openai",
            llm_model="gpt-4"
        )
    }
    agent_config = registry.get_agent_config("test_agent")
    assert agent_config.role == "Tester"

def test_agent_factory_create_agent_mocked():
    # Mock LLMProxy and crewai imports
    mock_llm_proxy = MagicMock()
    mock_llm = MagicMock()
    mock_llm_proxy.get_llm.return_value = mock_llm
    
    mock_agent_class = MagicMock()
    mock_task_class = MagicMock()
    
    factory = AgentFactory(llm_proxy=mock_llm_proxy)
    
    with patch.object(factory, '_get_crewai_imports', return_value=(mock_agent_class, mock_task_class)):
        config = AgentConfig(
            name="test_agent",
            role="Tester",
            goal="Test things",
            backstory="Experienced",
            llm_provider="groq",
            llm_model="llama3"
        )
        
        agent = factory.create_agent(config)
        
        mock_agent_class.assert_called_once()
        args, kwargs = mock_agent_class.call_args
        assert kwargs['role'] == "Tester"
        assert kwargs['llm'] == mock_llm

def test_load_agents_from_real_file(tmp_path):
    # Setup a mock YAML file
    yaml_content = """
    agents:
      - name: researcher
        role: Senior Market Researcher
        goal: Identify trends
        backstory: Expert in analysis
    tasks:
      - name: research_task
        description: Search trends
        expected_output: Report
        agent_name: researcher
    """
    yaml_file = tmp_path / "agents.yaml"
    yaml_file.write_text(yaml_content)

    registry = AgentRegistry(yaml_file)
    registry.load_configs()

    assert len(registry.agents) == 1
    assert registry.get_agent_config("researcher") is not None
    assert registry.get_task_config("research_task") is not None


import pytest
import unittest.mock as mock
import os
from app.llm_proxy import LLMProxy
import litellm

def test_llm_proxy_fallback_on_429():
    proxy = LLMProxy()
    
    # Mock litellm.completion to fail first and then succeed
    with mock.patch("app.llm_proxy.completion") as mock_completion:
        # First call raises RateLimitError (429)
        # Note: In real life, LiteLLM handles fallbacks if configured in a config file.
        # Here we want to see if our proxy handles it or if we rely on LiteLLM config.
        # The spec says "Configure LiteLLM settings to use local Ollama models... as final fallback".
        
        mock_response = mock.Mock()
        mock_response.choices = [mock.Mock()]
        mock_response.choices[0].message.content = "Fallback Response"
        
        # We simulate what happens if we don't have LiteLLM config yet, or if we want to test the mechanism.
        # If we use LiteLLM's built-in fallback, we just need to pass the right params or config.
        
        mock_completion.side_effect = [
            litellm.exceptions.RateLimitError(
                message="Rate limit exceeded", 
                model="groq/llama-3.3-70b-versatile", 
                llm_provider="groq"
            ),
            mock_response
        ]
        
        # This test currently expects our code to NOT handle the fallback manually,
        # but to have it configured so LiteLLM handles it.
        # Or, we update LLMProxy to handle it.
        
        # Let's assume for this TDD phase we want the proxy to support a list of fallbacks.
        
        messages = [{"role": "user", "content": "Hello"}]
        
        # If we want to test manual fallback in proxy:
        # result = proxy.complete(model="groq/llama-3.3-70b-versatile", messages=messages, fallbacks=["ollama/qwen3.5:2b"])
        # assert result == "Fallback Response"
        # assert mock_completion.call_count == 2
        
        # For now, let's just see it fail as the current implementation doesn't support fallbacks.
        with pytest.raises(litellm.exceptions.RateLimitError):
            proxy.complete(model="groq/llama-3.3-70b-versatile", messages=messages)

def test_llm_proxy_supports_fallbacks_param():
    proxy = LLMProxy()
    messages = [{"role": "user", "content": "Hello"}]
    
    with mock.patch("app.llm_proxy.completion") as mock_completion:
        mock_response = mock.Mock()
        mock_response.choices = [mock.Mock()]
        mock_response.choices[0].message.content = "Success"
        mock_completion.return_value = mock_response
        
        # Test passing fallbacks to LiteLLM
        proxy.complete(
            model="groq/llama-3.3-70b-versatile", 
            messages=messages, 
            fallbacks=["ollama/qwen3.5:2b"]
        )
        
        # Check if fallbacks was passed to completion
        args, kwargs = mock_completion.call_args
        assert "fallbacks" in kwargs
        assert kwargs["fallbacks"] == ["ollama/qwen3.5:2b"]

def test_litellm_config_exists():
    config_path = "app/resources/litellm_config.yaml"
    assert os.path.exists(config_path)

def test_litellm_config_content():
    import yaml
    config_path = "app/resources/litellm_config.yaml"
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)
    
    assert "model_list" in config
    models = [m["model_name"] for m in config["model_list"]]
    assert "ollama/qwen3.5:2b" in models
    assert "groq/llama-3.3-70b-versatile" in models
    
    # Check if Groq has fallback
    groq_model = next(m for m in config["model_list"] if m["model_name"] == "groq/llama-3.3-70b-versatile")
    assert "fallbacks" in groq_model
    assert "ollama/qwen3.5:2b" in groq_model["fallbacks"]

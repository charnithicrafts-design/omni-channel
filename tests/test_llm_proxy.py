from app.llm_proxy import get_llm_proxy
import pytest
from unittest.mock import patch, MagicMock
import os

def test_get_llm_proxy_environment_variables():
    from app.config import settings
    with patch.object(settings, 'openai_api_key', 'sk-openai-test'), \
         patch.object(settings, 'groq_api_key', 'gsk-groq-test'), \
         patch.object(settings, 'cerebras_api_key', 'csk-cerebras-test'):
        
        # Reset the proxy singleton for this test
        import app.llm_proxy
        app.llm_proxy._proxy = None
        
        proxy = get_llm_proxy()
        
        assert os.environ["OPENAI_API_KEY"] == "sk-openai-test"
        assert os.environ["GROQ_API_KEY"] == "gsk-groq-test"
        assert os.environ["CEREBRAS_API_KEY"] == "csk-cerebras-test"

def test_get_llm_proxy_initialization():
    with patch('app.llm_proxy.completion') as mock_completion:
        mock_completion.return_value = MagicMock(choices=[MagicMock(message=MagicMock(content="Hello world"))])
        
        # Reset the proxy singleton for this test
        import app.llm_proxy
        app.llm_proxy._proxy = None
        
        proxy = get_llm_proxy()
        response = proxy.complete(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "hi"}])
        
        assert response == "Hello world"
        mock_completion.assert_called_once()

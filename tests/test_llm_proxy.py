from app.llm_proxy import get_llm_proxy
import pytest
from unittest.mock import patch, MagicMock

def test_get_llm_proxy_initialization():
    with patch('app.llm_proxy.completion') as mock_completion:
        mock_completion.return_value = MagicMock(choices=[MagicMock(message=MagicMock(content="Hello world"))])
        
        proxy = get_llm_proxy()
        response = proxy.complete(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "hi"}])
        
        assert response == "Hello world"
        mock_completion.assert_called_once()

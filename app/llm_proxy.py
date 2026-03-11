from litellm import completion
from typing import List, Dict, Any, Optional
from app.config import settings
import os

class LLMProxy:
    def __init__(self):
        # Set environment variables for litellm if they are available in settings
        if settings.openai_api_key:
            os.environ["OPENAI_API_KEY"] = settings.openai_api_key
        if settings.anthropic_api_key:
            os.environ["ANTHROPIC_API_KEY"] = settings.anthropic_api_key
        if settings.google_api_key:
            os.environ["GOOGLE_API_KEY"] = settings.google_api_key
        
    def complete(self, model: Optional[str] = None, messages: List[Dict[str, str]] = [], **kwargs: Any):
        target_model = model or settings.default_model
        response = completion(model=target_model, messages=messages, **kwargs)
        return response.choices[0].message.content

_proxy = None

def get_llm_proxy():
    global _proxy
    if _proxy is None:
        _proxy = LLMProxy()
    return _proxy

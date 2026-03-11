import sys
from unittest.mock import MagicMock

# Attempt to monkeypatch pydantic.v1 before importing langchain
try:
    import pydantic.v1.fields as fields
    original_prepare = fields.ModelField.prepare

    def patched_prepare(self):
        try:
            return original_prepare(self)
        except Exception as e:
            err_str = str(e)
            if "unable to infer type for attribute" in err_str or "need to set the type of field" in err_str:
                # Fallback for Python 3.14 compatibility
                self.type_ = Any
                self.outer_type_ = Any
                return
            raise

    # Note: Using 'Any' from typing
    from typing import Any
    fields.ModelField.prepare = patched_prepare
    print("Monkeypatched pydantic.v1.fields.ModelField.prepare")
except ImportError:
    print("pydantic.v1 not found, skipping patch")

try:
    import crewai
    print(f"crewai imported successfully! Version: {crewai.__version__}")
except Exception as e:
    print(f"Failed to import crewai: {e}")
    import traceback
    traceback.print_exc()

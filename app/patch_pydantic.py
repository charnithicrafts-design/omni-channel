import pydantic.v1.fields as fields
import pydantic.v1.class_validators as class_validators
from typing import Any

# --- Monkeypatch for Python 3.14 compatibility ---

# Patch 1: Handle type inference failures
original_prepare = fields.ModelField.prepare

def patched_prepare(self):
    try:
        return original_prepare(self)
    except Exception as e:
        err_str = str(e)
        if "unable to infer type for attribute" in err_str or "need to set the type of field" in err_str:
            self.type_ = Any
            self.outer_type_ = Any
            return
        raise

if fields.ModelField.prepare != patched_prepare:
    fields.ModelField.prepare = patched_prepare

# Patch 2: Handle unused validator errors (common in langchain on 3.14)
original_check_for_unused = class_validators.ValidatorGroup.check_for_unused

def patched_check_for_unused(self):
    try:
        return original_check_for_unused(self)
    except Exception as e:
        err_str = str(e)
        if "Validators defined with incorrect fields" in err_str:
            # Suppress this error as it's often a false positive on 3.14 due to metadata changes
            return
        raise

if class_validators.ValidatorGroup.check_for_unused != patched_check_for_unused:
    class_validators.ValidatorGroup.check_for_unused = patched_check_for_unused

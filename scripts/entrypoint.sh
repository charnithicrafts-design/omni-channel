#!/bin/bash

set -e

# Run the model provisioning script in the background
# This allows the app to start while models are potentially still being pulled
# But it's safer to pull them before the app is fully ready if the app depends on them.
# Given the 'Readiness' phase later, we'll start pulling and then start the app.
# The app itself will handle checking for model availability later.

echo "Running entrypoint..."

# Start model pulling
./scripts/pull_models.sh &

# Start the application
echo "Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000

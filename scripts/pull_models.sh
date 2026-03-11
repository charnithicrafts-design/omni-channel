#!/bin/bash

# Configuration
OLLAMA_BASE_URL=${OLLAMA_BASE_URL:-"http://ollama:11434"}
MODELS=("lfm2.5-thinking:1.2b" "qwen3.5:2b" "qwen3-vl:4b")

echo "Starting model provisioning script..."
echo "Ollama URL: $OLLAMA_BASE_URL"

# Function to check if Ollama is ready
wait_for_ollama() {
    local max_retries=30
    local retry_count=0
    
    while ! curl -s "$OLLAMA_BASE_URL/api/tags" > /dev/null; do
        retry_count=$((retry_count + 1))
        if [ $retry_count -ge $max_retries ]; then
            echo "Error: Ollama server not reachable after $max_retries retries."
            return 1
        fi
        echo "Waiting for Ollama server to be ready ($retry_count/$max_retries)..."
        sleep 2
    done
    echo "Ollama server is ready."
    return 0
}

# Function to check if a model already exists
model_exists() {
    local model_name=$1
    curl -s "$OLLAMA_BASE_URL/api/tags" | grep -q "\"name\":\"$model_name\""
}

# Main execution
if wait_for_ollama; then
    for model in "${MODELS[@]}"; do
        if model_exists "$model"; then
            echo "Model '$model' already exists, skipping."
        else
            echo "Pulling model '$model'..."
            curl -s -X POST "$OLLAMA_BASE_URL/api/pull" -d "{\"name\":\"$model\"}"
            echo "Finished pulling '$model'."
        fi
    done
else
    echo "Aborting model pulling due to unreachable server."
    exit 1
fi

echo "Model provisioning complete."

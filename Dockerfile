FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy configuration and package files
COPY pyproject.toml .
COPY API.md .

# Install dependencies
RUN pip install --no-cache-dir .

# Copy application code
COPY app/ app/
COPY scripts/ scripts/

# Make scripts executable (just in case)
RUN chmod +x scripts/*.sh

# Expose the application port
EXPOSE 8000

# Set the entrypoint
ENTRYPOINT ["./scripts/entrypoint.sh"]

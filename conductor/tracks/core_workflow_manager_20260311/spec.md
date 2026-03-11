# Track Specification: Core Workflow Manager

## Overview
Build the core FastAPI-based workflow manager to orchestrate AI tasks and integrate a unified LLM proxy (e.g., LiteLLM).

## Goals
- Establish a modular architecture for managing multiple AI model providers.
- Provide a FastAPI interface for triggering workflows via webhooks.
- Integrate a unified LLM proxy for flexible model management.
- Support YAML-based configuration for agent and task definition.

## Requirements
- Python-based FastAPI service.
- crewAI integration for task-based agents.
- Support for multiple LLM providers (e.g., OpenAI, Anthropic, Google, Ollama).
- Local filesystem storage for initial state and configuration.

# Initial Concept

1. i am looking for a fully free omni channel ( like litellm proxy or similar ) workflow app using AI with full free and open source tool

i have antigravity + gemini cli + agkit 2.0 

2. Q: What's your primary goal?
A: Automate AI workflows/pipelines

Q: What channels do you want to connect? (Select all that apply)
A: create any kind of workflow app like market research, one click website creation for a photographer to his clients immediately after photograph session

Q: What's your deployment preference?
A: Docker/containers

3. ?? Market Research Pipeline:
Trigger (n8n webhook) ? AgKit agent ? Gemini CLI (research) 
? Antigravity (summarize + format) ? Output (email/PDF/dashboard)
?? Photographer One-Click Website:
Photo upload (MinIO) ? n8n trigger ? Gemini Vision (auto-caption/tag)
? AgKit (generate page content) ? Antigravity (build HTML site)
? Deploy to static host ? Send client link via email

4 add crewAI based techstack for this project.. a yaml based configuration from crewAI is so flexible for different workflows with flexible task based agents

---

# Product Definition

## Vision
To build a fully free, open-source, omni-channel workflow application that leverages AI to automate complex pipelines. The goal is to provide a powerful yet accessible platform for users to create and deploy everything from market research tools to one-click websites using tools like AgKit 2.0, Gemini CLI, Antigravity, and crewAI.

## Target Users
- **Small Business Owners & Creative Professionals:** Photographers and consultants who need automated solutions for client deliverables (e.g., instant website generation).
- **Marketing Teams & Market Researchers:** Professionals who require automated data gathering, analysis, and reporting.

## Core Features
- **YAML-based crewAI Configurator:** A flexible, configuration-driven system for defining task-based AI agents and workflows.
- **Unified LLM Proxy Integration:** A centralized interface (via LiteLLM) supporting multiple providers like Groq, Cerebras, and Ollama.
- **One-click Website Generation/Deployment:** Automated pipelines for generating and hosting static sites (e.g., for photographers).
- **Omni-channel Connectivity:** Seamless integration between various triggers (e.g., n8n webhooks, photo uploads) and outputs (e.g., email, PDF, dashboard).

## UX Principles
- **One-Click Automation for Non-Tech Users:** Simplifying complex workflows into single-click actions for less technical users.
- **CLI & YAML-First Experience:** Providing a robust and flexible interface for power users and developers to configure and extend the system.
- **Visual-First Output:** Ensuring that all generated results (websites, reports, dashboards) are clean, professional, and visually appealing.

## Success Metrics
- **Time-to-Value (TTV):** Minimizing the time between a trigger event and the final output.
- **Workflow Success Rate:** Maintaining a high rate of successful executions across diverse workflow types.

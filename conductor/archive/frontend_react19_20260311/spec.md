# Specification: Professional React Frontend for Omni-Channel

## Overview
The Omni-Channel frontend aims to provide a professional, intuitive, and feature-rich interface for two primary user personas: Market Researchers and Photographers. Built with React 19 and Tailwind CSS v4, it will offer a wizard-driven experience for configuring and executing AI-powered workflows.

## Functional Requirements
- **Wizard-Driven Navigation**: A guided multi-step process for selecting a workflow type (Research or Album Creation), configuring parameters, and viewing results.
- **Market Research Module**:
    - **Query Builder**: Form-based input for research parameters and target audience.
    - **Live Charts**: Real-time data visualization using Recharts for research insights and data summaries.
    - **Report Viewer**: A polished, readable view of AI-generated summaries and structured findings.
    - **Export Tools**: Functionality to export reports or share them via a unique link.
- **Photographer Album Module**:
    - **Media Uploader**: High-performance drag-and-drop interface for uploading high-resolution images.
    - **Theme Selector**: Visual selection of curated themes and layouts for the generated album website.
    - **Live Preview**: Real-time side-by-side view of the generated album site during the creation process.
    - **Deployment Status**: Visual progress indicators for model processing and site hosting status.
- **Unified Portal**: A clean entry point to initiate new wizards or manage existing projects.

## Non-Functional Requirements
- **Modern Tech Stack**: Implementation using React 19 and Tailwind CSS v4 for cutting-edge performance and developer experience.
- **Routing & State**: Single Page Application (SPA) architecture using a modern router (e.g., React Router 7 or TanStack Router) for fast, seamless navigation.
- **Responsive & Professional Design**: Ensuring the UI is intuitive and polished across desktop and mobile devices.

## Acceptance Criteria
- [ ] Functional wizard-driven flow for both Market Research and Photographer Album creation.
- [ ] Successful rendering of dynamic charts using Recharts.
- [ ] Working image uploader with progress feedback.
- [ ] Responsive UI that adheres to the "Professional" design standard.
- [ ] Deployment status indicators that respond to workflow events.

## Out of Scope
- Backend infrastructure for complex data processing (focus is on frontend implementation and integration).
- Custom AI model development (uses existing Omni-Channel backend/Ollama).
- User authentication and multi-user accounts (unless explicitly added later).

# Omni-Channel Professional Frontend

A high-performance, responsive AI workflow portal built with React 19 and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 (with native CSS variables and @theme)
- **Routing:** React Router 7
- **State Management:** Zustand
- **Charts:** Recharts
- **Testing:** Vitest & React Testing Library

## 📂 Architecture

- `src/components/common`: Atomic UI components (Button, Input, Card).
- `src/components/wizard`: A generic, multi-step wizard framework.
- `src/components/research`: Market Research module components.
- `src/components/wizard` (Album): Photography Album module components.
- `src/store`: Lightweight state using Zustand for workflow context.

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## ✨ Key Features

- **Multi-tenant Wizards:** Supports different AI pipelines (Research, Photography).
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Tailwind v4 Integration:** Uses the latest CSS-first configuration.
- **Live Preview:** Real-time feedback during the album creation process.

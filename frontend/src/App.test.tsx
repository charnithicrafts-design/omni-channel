import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'
import { useWorkflowStore } from './store/workflowStore'

describe('App Routing', () => {
  beforeEach(() => {
    useWorkflowStore.getState().reset()
  })

  it('renders the Dashboard by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Check for the heading in the main content
    expect(screen.getByRole('heading', { name: /Omni-Channel Portal/i, level: 2 })).toBeInTheDocument()
  })

  it('renders the Wizard page when navigating to /wizard', () => {
    useWorkflowStore.getState().setWorkflowType('research')
    
    render(
      <MemoryRouter initialEntries={['/wizard']}>
        <App />
      </MemoryRouter>
    )
    // The Wizard uses Card which has an h3 for the step title
    expect(screen.getByRole('heading', { name: /Configure Research/i, level: 3 })).toBeInTheDocument()
  })
})

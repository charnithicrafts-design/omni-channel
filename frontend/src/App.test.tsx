import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'
import { useWorkflowStore } from './store/workflowStore'

describe('App Routing', () => {
  beforeEach(() => {
    useWorkflowStore.getState().setWorkflowType(null)
  })

  it('renders the Dashboard by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /Omni-Channel Portal/i, level: 2 })).toBeInTheDocument()
  })

  it('renders the Wizard page when navigating to /wizard with research type', () => {
    useWorkflowStore.getState().setWorkflowType('research')
    
    render(
      <MemoryRouter initialEntries={['/wizard']}>
        <App />
      </MemoryRouter>
    )
    // The Wizard uses Card which has an h3 for the step title
    expect(screen.getByRole('heading', { name: /Configure Research/i, level: 3 })).toBeInTheDocument()
  })

  it('renders the Wizard page when navigating to /wizard with album type', () => {
    useWorkflowStore.getState().setWorkflowType('album')
    
    render(
      <MemoryRouter initialEntries={['/wizard']}>
        <App />
      </MemoryRouter>
    )
    // The Wizard uses Card which has an h3 for the step title
    expect(screen.getByRole('heading', { name: /Upload Media/i, level: 3 })).toBeInTheDocument()
  })
})

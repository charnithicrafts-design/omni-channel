import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Routing', () => {
  it('renders the Dashboard by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Check for the heading in the main content
    expect(screen.getByRole('heading', { name: /Dashboard/i, level: 2 })).toBeInTheDocument()
  })

  it('renders the Wizard page when navigating to /wizard', () => {
    render(
      <MemoryRouter initialEntries={['/wizard']}>
        <App />
      </MemoryRouter>
    )
    // Check for the heading in the main content
    expect(screen.getByRole('heading', { name: /Wizard/i, level: 2 })).toBeInTheDocument()
  })
})

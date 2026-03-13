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
    expect(screen.getByText(/Create/i, { selector: 'h1' })).toBeInTheDocument()
  })

  it('renders the Research Wizard when type=research', () => {
    render(
      <MemoryRouter initialEntries={['/wizard?type=research']}>
        <App />
      </MemoryRouter>
    )
    // The Wizard uses Card which has an h3 for the step title
    expect(screen.getByRole('heading', { name: /Configure Research/i, level: 3 })).toBeInTheDocument()
  })

  it('renders the Album Wizard when type=album', () => {
    render(
      <MemoryRouter initialEntries={['/wizard?type=album']}>
        <App />
      </MemoryRouter>
    )
    // The Wizard uses Card which has an h3 for the step title
    expect(screen.getByRole('heading', { name: /Photography: Upload & Theme/i, level: 3 })).toBeInTheDocument()
  })
})

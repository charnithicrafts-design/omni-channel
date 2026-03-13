import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import Layout from './Layout'

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </MemoryRouter>
    )
    expect(screen.getByText(/Child Content/i)).toBeInTheDocument()
  })

  it('contains navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    )
    // Both desktop and mobile navs use roles.
    const links = screen.getAllByRole('link')
    expect(links.some(l => l.textContent?.includes('Dashboard'))).toBe(true)
    expect(links.some(l => l.textContent?.includes('Wizard'))).toBe(true)
  })

  it('has a responsive sidebar or top nav', () => {
     render(
      <MemoryRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    )
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('toggles mobile menu when clicking the button', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    )
    
    const menuButton = screen.getByLabelText(/Toggle menu/i)
    expect(menuButton).toBeInTheDocument()
    
    // Check for the navigation drawer behavior
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('-translate-x-full')
    
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('translate-x-0')
    
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('-translate-x-full')
  })
})

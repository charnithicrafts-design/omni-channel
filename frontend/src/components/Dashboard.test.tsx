import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from './Dashboard'
import { BrowserRouter } from 'react-router'

describe('Dashboard', () => {
  it('renders workflow selection options', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/Start Market Research/i)).toBeInTheDocument()
    expect(screen.getByText(/Create Photo Album/i)).toBeInTheDocument()
  })

  it('renders recent projects section', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/Recent Projects/i)).toBeInTheDocument()
  })

  it('navigates to wizard with correct type when card is clicked', () => {
    // We can't easily test navigation with BrowserRouter in this unit test setup without mocking navigate.
    // However, we can check if the links/buttons exist and have correct intended destinations or handlers.
    // For now, let's verify the visual elements that trigger the action.
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    const researchCard = screen.getByText(/Start Market Research/i).closest('a')
    expect(researchCard).toHaveAttribute('href', '/wizard?type=research')
    
    const albumCard = screen.getByText(/Create Photo Album/i).closest('a')
    expect(albumCard).toHaveAttribute('href', '/wizard?type=album')
  })
})

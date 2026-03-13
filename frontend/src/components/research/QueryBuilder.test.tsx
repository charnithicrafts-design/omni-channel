import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QueryBuilder from './QueryBuilder'

describe('QueryBuilder', () => {
  it('renders input fields correctly', () => {
    render(<QueryBuilder onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/Research Topic/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Target Audience/i)).toBeInTheDocument()
  })

  it('updates state when input changes', () => {
    render(<QueryBuilder onSubmit={vi.fn()} />)
    const topicInput = screen.getByLabelText(/Research Topic/i) as HTMLInputElement
    fireEvent.change(topicInput, { target: { value: 'AI Trends' } })
    expect(topicInput.value).toBe('AI Trends')
  })

  it('shows error message when validation fails', () => {
    render(<QueryBuilder onSubmit={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Submit Research/i }))
    expect(screen.getByText(/Topic is required/i)).toBeInTheDocument()
  })

  it('calls onSubmit with correct data when valid', () => {
    const handleSubmit = vi.fn()
    render(<QueryBuilder onSubmit={handleSubmit} />)
    
    fireEvent.change(screen.getByLabelText(/Research Topic/i), { target: { value: 'Quantum Computing' } })
    fireEvent.change(screen.getByLabelText(/Target Audience/i), { target: { value: 'Developers' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Submit Research/i }))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      topic: 'Quantum Computing',
      audience: 'Developers'
    })
  })
})

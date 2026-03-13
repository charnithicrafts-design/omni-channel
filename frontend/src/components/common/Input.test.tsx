import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Username" placeholder="Enter username" />)
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<Input label="Username" onChange={handleChange} />)
    const input = screen.getByLabelText(/Username/i)
    fireEvent.change(input, { target: { value: 'john' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders error message when error prop is provided', () => {
    render(<Input label="Username" error="Required field" />)
    expect(screen.getByText(/Required field/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Username/i)).toHaveClass('border-red-500')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Wizard from './Wizard'

describe('Wizard', () => {
  const steps = [
    { title: 'Step 1', content: <div>Step 1 Content</div> },
    { title: 'Step 2', content: <div>Step 2 Content</div> },
    { title: 'Step 3', content: <div>Step 3 Content</div> },
  ]

  it('renders the first step by default', () => {
    render(<Wizard steps={steps} onComplete={vi.fn()} onCancel={vi.fn()} />)
    expect(screen.getByText(/Step 1 Content/i)).toBeInTheDocument()
    expect(screen.queryByText(/Step 2 Content/i)).not.toBeInTheDocument()
  })

  it('navigates to the next step when Next is clicked', () => {
    render(<Wizard steps={steps} onComplete={vi.fn()} onCancel={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    expect(screen.getByText(/Step 2 Content/i)).toBeInTheDocument()
  })

  it('navigates to the previous step when Back is clicked', () => {
    render(<Wizard steps={steps} onComplete={vi.fn()} onCancel={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    fireEvent.click(screen.getByRole('button', { name: /Back/i }))
    expect(screen.getByText(/Step 1 Content/i)).toBeInTheDocument()
  })

  it('calls onComplete on the last step', () => {
    const handleComplete = vi.fn()
    render(<Wizard steps={steps} onComplete={handleComplete} onCancel={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    fireEvent.click(screen.getByRole('button', { name: /Finish/i }))
    expect(handleComplete).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when Cancel is clicked', () => {
    const handleCancel = vi.fn()
    render(<Wizard steps={steps} onComplete={vi.fn()} onCancel={handleCancel} />)
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })
})

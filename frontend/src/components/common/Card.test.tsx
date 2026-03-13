import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card', () => {
  it('renders title and children', () => {
    render(
      <Card title="Test Card">
        <div>Card Content</div>
      </Card>
    )
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument()
    expect(screen.getByText(/Card Content/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="shadow-lg">Content</Card>)
    expect(container.firstChild).toHaveClass('shadow-lg')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LivePreview from './LivePreview'

describe('LivePreview', () => {
  it('renders empty state when no images', () => {
    render(<LivePreview themeId="minimal" images={[]} />)
    expect(screen.getByText(/No images uploaded yet/i)).toBeInTheDocument()
  })

  it('renders images when provided', () => {
    render(<LivePreview themeId="minimal" images={['img1.jpg', 'img2.jpg']} />)
    expect(screen.getByAltText('Album 1')).toHaveAttribute('src', 'img1.jpg')
    expect(screen.getByAltText('Album 2')).toHaveAttribute('src', 'img2.jpg')
  })

  it('applies correct styles for dark theme', () => {
    const { container } = render(<LivePreview themeId="dark" images={[]} />)
    expect(container.firstChild).toHaveClass('bg-gray-950')
    expect(container.firstChild).toHaveClass('text-white')
  })

  it('applies correct styles for vibrant theme', () => {
    const { container } = render(<LivePreview themeId="vibrant" images={[]} />)
    expect(container.firstChild).toHaveClass('bg-orange-50')
    expect(container.firstChild).toHaveClass('text-gray-900')
  })

  it('toggles full screen mode', () => {
    render(<LivePreview themeId="minimal" images={[]} />)
    
    // Initially not full screen
    expect(screen.queryByRole('button', { name: /Full Screen/i })).toBeInTheDocument()
    
    // Enter full screen
    fireEvent.click(screen.getByRole('button', { name: /Full Screen/i }))
    expect(screen.queryByRole('button', { name: /Full Screen/i })).not.toBeInTheDocument()
    
    // Exit full screen (close button is an SVG, usually no text, but we can find by role button)
    // The close button is the only button visible in full screen mode
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    
    // Back to mini view
    expect(screen.getByRole('button', { name: /Full Screen/i })).toBeInTheDocument()
  })
})

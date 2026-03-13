import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LivePreview from './LivePreview'

describe('LivePreview', () => {
  it('renders empty state when no images', () => {
    render(<LivePreview themeId="minimal" images={[]} />)
    expect(screen.getByText(/No images uploaded yet/i)).toBeInTheDocument()
  })

  it('renders image placeholders when images are provided', () => {
    render(<LivePreview themeId="minimal" images={['img1.jpg', 'img2.jpg']} />)
    expect(screen.getByText('Image 1')).toBeInTheDocument()
    expect(screen.getByText('Image 2')).toBeInTheDocument()
  })

  it('applies correct styles for dark theme', () => {
    const { container } = render(<LivePreview themeId="dark" images={[]} />)
    expect(container.firstChild).toHaveClass('bg-gray-900')
    expect(container.firstChild).toHaveClass('text-white')
  })

  it('applies correct styles for vibrant theme', () => {
    const { container } = render(<LivePreview themeId="vibrant" images={[]} />)
    expect(container.firstChild).toHaveClass('bg-orange-50')
    expect(container.firstChild).toHaveClass('text-gray-900')
  })
})

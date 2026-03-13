import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ThemeSelector from './ThemeSelector'

describe('ThemeSelector', () => {
  const themes = [
    { id: 'minimal', name: 'Minimalist', preview: '#ffffff' },
    { id: 'dark', name: 'Dark Mode', preview: '#1a1a1a' },
    { id: 'vibrant', name: 'Vibrant', preview: '#ff4400' },
  ]

  it('renders all themes', () => {
    render(<ThemeSelector themes={themes} selectedThemeId="minimal" onSelect={() => {}} />)
    themes.forEach(theme => {
      expect(screen.getByText(theme.name)).toBeInTheDocument()
    })
  })

  it('highlights the selected theme', () => {
    render(<ThemeSelector themes={themes} selectedThemeId="dark" onSelect={() => {}} />)
    const darkTheme = screen.getByText('Dark Mode').closest('button')
    expect(darkTheme).toHaveClass('ring-2', 'ring-blue-500')
  })

  it('calls onSelect when a theme is clicked', () => {
    const onSelect = vi.fn()
    render(<ThemeSelector themes={themes} selectedThemeId="minimal" onSelect={onSelect} />)
    
    fireEvent.click(screen.getByText('Vibrant'))
    expect(onSelect).toHaveBeenCalledWith('vibrant')
  })
})

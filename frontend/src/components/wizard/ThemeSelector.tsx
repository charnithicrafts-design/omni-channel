import React from 'react'

export interface Theme {
  id: string
  name: string
  preview: string
}

interface ThemeSelectorProps {
  themes: Theme[]
  selectedThemeId: string
  onSelect: (id: string) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedThemeId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`
            relative p-4 rounded-lg border-2 text-left transition-all
            ${
              selectedThemeId === theme.id
                ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }
          `}
        >
          <div
            className="w-full h-24 rounded mb-3"
            style={{ backgroundColor: theme.preview }}
          />
          <span className="block font-semibold text-gray-900">{theme.name}</span>
          {selectedThemeId === theme.id && (
            <div className="absolute top-2 right-2 text-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector

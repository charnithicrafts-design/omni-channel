import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResearchCharts from './ResearchCharts'

describe('ResearchCharts', () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
  ]

  it('renders the bar chart by default', () => {
    const { container } = render(<ResearchCharts data={data} title="Monthly Growth" />)
    expect(screen.getByText(/Monthly Growth/i)).toBeInTheDocument()
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
    expect(container.querySelector('.recharts-bar')).toBeInTheDocument()
  })

  it('renders the line chart when type is set to line', () => {
    const { container } = render(<ResearchCharts data={data} title="Monthly Trend" type="line" />)
    expect(screen.getByText(/Monthly Trend/i)).toBeInTheDocument()
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
    expect(container.querySelector('.recharts-line')).toBeInTheDocument()
  })
})

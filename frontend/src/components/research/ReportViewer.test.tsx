import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ReportViewer from './ReportViewer'

describe('ReportViewer', () => {
  const mockReport = {
    title: 'Market Analysis: Organic Coffee',
    summary: 'The organic coffee market is seeing significant growth in urban areas.',
    findings: [
      'Increased demand for sustainable packaging.',
      'Rise in home-brewing popularity among millennials.',
      'Growth in subscription-based services.',
    ],
  }

  it('renders the report title and summary', () => {
    render(<ReportViewer report={mockReport} />)
    expect(screen.getByText(mockReport.title)).toBeInTheDocument()
    expect(screen.getByText(mockReport.summary)).toBeInTheDocument()
  })

  it('renders all findings in a list', () => {
    render(<ReportViewer report={mockReport} />)
    mockReport.findings.forEach(finding => {
      expect(screen.getByText(finding)).toBeInTheDocument()
    })
  })

  it('calls onExport when the export button is clicked', () => {
    const onExport = vi.fn()
    render(<ReportViewer report={mockReport} onExport={onExport} />)
    
    const exportButton = screen.getByRole('button', { name: /Export/i })
    fireEvent.click(exportButton)
    
    expect(onExport).toHaveBeenCalledWith('pdf')
  })

  it('calls onShare when the share button is clicked', () => {
    const onShare = vi.fn()
    render(<ReportViewer report={mockReport} onShare={onShare} />)
    
    const shareButton = screen.getByRole('button', { name: /Share/i })
    fireEvent.click(shareButton)
    
    expect(onShare).toHaveBeenCalled()
  })
})

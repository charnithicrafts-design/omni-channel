import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DeploymentStatus from './DeploymentStatus'

describe('DeploymentStatus', () => {
  it('renders processing status', () => {
    render(<DeploymentStatus status="processing" progress={45} />)
    expect(screen.getByText(/Processing your album/i)).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument()
  })

  it('renders hosting status', () => {
    render(<DeploymentStatus status="hosting" />)
    expect(screen.getByText(/Setting up your site/i)).toBeInTheDocument()
  })

  it('renders completed status with deployment link', () => {
    const url = 'https://myalbum.omnichannel.ai'
    render(<DeploymentStatus status="completed" deploymentUrl={url} />)
    expect(screen.getByText(/Your album is live!/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /View Site/i })
    expect(link).toHaveAttribute('href', url)
  })

  it('renders error status', () => {
    render(<DeploymentStatus status="error" errorMessage="Deployment failed" />)
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText('Deployment failed')).toBeInTheDocument()
  })

  it('reloads the page when Try Again is clicked', () => {
    const reloadSpy = vi.fn()
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true,
    })

    render(<DeploymentStatus status="error" />)
    fireEvent.click(screen.getByText(/Try Again/i))
    expect(reloadSpy).toHaveBeenCalled()
  })
})

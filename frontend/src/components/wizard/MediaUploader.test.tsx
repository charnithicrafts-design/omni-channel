import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MediaUploader from './MediaUploader'

describe('MediaUploader', () => {
  it('renders the dropzone area', () => {
    render(<MediaUploader onUpload={() => {}} />)
    expect(screen.getByText(/Drag & drop images here/i)).toBeInTheDocument()
    expect(screen.getByText(/or click to select files/i)).toBeInTheDocument()
  })

  it('triggers onUpload when files are dropped', () => {
    const onUpload = vi.fn()
    render(<MediaUploader onUpload={onUpload} />)
    
    const dropzone = screen.getByTestId('dropzone')
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    })
    
    expect(onUpload).toHaveBeenCalled()
  })

  it('triggers onUpload when files are selected via input', () => {
    const onUpload = vi.fn()
    render(<MediaUploader onUpload={onUpload} />)
    
    const input = screen.getByTestId('file-input')
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    
    fireEvent.change(input, { target: { files: [file] } })
    
    expect(onUpload).toHaveBeenCalled()
  })

  it('changes style when dragging over', () => {
    render(<MediaUploader onUpload={() => {}} />)
    const dropzone = screen.getByTestId('dropzone')
    
    fireEvent.dragOver(dropzone)
    expect(dropzone).toHaveClass('border-blue-500')
    expect(dropzone).toHaveClass('bg-blue-50')
    
    fireEvent.dragLeave(dropzone)
    expect(dropzone).not.toHaveClass('border-blue-500')
    expect(dropzone).not.toHaveClass('bg-blue-50')
  })

  it('displays upload progress when files are uploading', () => {
    const files = [
      { name: 'image1.jpg', progress: 45, status: 'uploading' as const },
    ]
    render(<MediaUploader onUpload={() => {}} uploadingFiles={files} />)
    
    expect(screen.getByText('image1.jpg')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument()
  })

  it('displays completed status when upload finishes', () => {
    const files = [
      { name: 'image1.jpg', progress: 100, status: 'completed' as const },
    ]
    render(<MediaUploader onUpload={() => {}} uploadingFiles={files} />)
    
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})

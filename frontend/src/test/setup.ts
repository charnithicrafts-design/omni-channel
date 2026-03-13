import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver for Recharts
class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

global.ResizeObserver = ResizeObserver

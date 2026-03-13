import { describe, it, expect, beforeEach } from 'vitest'
import { useWorkflowStore } from './workflowStore'

describe('workflowStore', () => {
  beforeEach(() => {
    useWorkflowStore.getState().reset()
  })

  it('should have an initial state', () => {
    const state = useWorkflowStore.getState()
    expect(state.workflowType).toBeNull()
    expect(state.userContext).toEqual({
      name: '',
      email: '',
    })
  })

  it('should update workflowType', () => {
    useWorkflowStore.getState().setWorkflowType('research')
    expect(useWorkflowStore.getState().workflowType).toBe('research')
  })

  it('should update userContext', () => {
    const newUser = { name: 'John Doe', email: 'john@example.com' }
    useWorkflowStore.getState().setUserContext(newUser)
    expect(useWorkflowStore.getState().userContext).toEqual(newUser)
  })

  it('should reset the state', () => {
    useWorkflowStore.getState().setWorkflowType('album')
    useWorkflowStore.getState().setUserContext({ name: 'Jane', email: 'jane@example.com' })
    useWorkflowStore.getState().reset()
    
    expect(useWorkflowStore.getState().workflowType).toBeNull()
    expect(useWorkflowStore.getState().userContext).toEqual({
      name: '',
      email: '',
    })
  })
})

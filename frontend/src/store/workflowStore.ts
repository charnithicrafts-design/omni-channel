import { create } from 'zustand'

interface UserContext {
  name: string
  email: string
}

interface WorkflowState {
  workflowType: 'research' | 'album' | null
  userContext: UserContext
  setWorkflowType: (type: 'research' | 'album' | null) => void
  setUserContext: (context: UserContext) => void
  reset: () => void
}

const initialState = {
  workflowType: null,
  userContext: {
    name: '',
    email: '',
  },
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  ...initialState,
  setWorkflowType: (type) => set({ workflowType: type }),
  setUserContext: (context) => set({ userContext: context }),
  reset: () => set(initialState),
}))

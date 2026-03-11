import { create } from 'zustand'

interface WorkflowState {
  workflowType: 'research' | 'album' | null
  setWorkflowType: (type: 'research' | 'album' | null) => void
  reset: () => void
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflowType: null,
  setWorkflowType: (type) => set({ workflowType: type }),
  reset: () => set({ workflowType: null }),
}))

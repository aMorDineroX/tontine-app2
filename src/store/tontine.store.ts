import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TontineModel } from '../types/models'

interface TontineState {
  tontines: TontineModel[]
  currentTontine: TontineModel | null
  isLoading: boolean
  error: string | null
  fetchTontines: () => Promise<void>
  setCurrentTontine: (tontine: TontineModel | null) => void
  createTontine: (data: Omit<TontineModel, 'id'>) => Promise<void>
  updateTontine: (id: string, data: Partial<TontineModel>) => Promise<void>
  deleteTontine: (id: string) => Promise<void>
}

export const useTontineStore = create<TontineState>()(
  devtools(
    (set) => ({
      tontines: [],
      currentTontine: null,
      isLoading: false,
      error: null,

      fetchTontines: async () => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/tontines')
          const data = await response.json()
          set({ tontines: data, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to fetch tontines', isLoading: false })
        }
      },

      setCurrentTontine: (tontine) => set({ currentTontine: tontine }),

      createTontine: async (data) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/tontines', {
            method: 'POST',
            body: JSON.stringify(data)
          })
          const newTontine = await response.json()
          set((state) => ({ 
            tontines: [...state.tontines, newTontine],
            isLoading: false 
          }))
        } catch (error) {
          set({ error: 'Failed to create tontine', isLoading: false })
        }
      },

      updateTontine: async (id, data) => {
        set({ isLoading: true })
        try {
          const response = await fetch(`/api/tontines/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
          })
          const updatedTontine = await response.json()
          set((state) => ({
            tontines: state.tontines.map(t => 
              t.id === id ? updatedTontine : t
            ),
            isLoading: false
          }))
        } catch (error) {
          set({ error: 'Failed to update tontine', isLoading: false })
        }
      },

      deleteTontine: async (id) => {
        set({ isLoading: true })
        try {
          await fetch(`/api/tontines/${id}`, { method: 'DELETE' })
          set((state) => ({
            tontines: state.tontines.filter(t => t.id !== id),
            isLoading: false
          }))
        } catch (error) {
          set({ error: 'Failed to delete tontine', isLoading: false })
        }
      }
    }),
    { name: 'tontine-store' }
  )
)
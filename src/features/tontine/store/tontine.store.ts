import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TontineModel } from '../../../types/database';
import { tontineService } from '../services/tontineService';

interface TontineState {
  tontines: TontineModel[];
  currentTontine: TontineModel | null;
  isLoading: boolean;
  error: string | null;
  fetchTontines: () => Promise<void>;
  createTontine: (data: Omit<TontineModel, 'id'>) => Promise<void>;
  setCurrentTontine: (tontine: TontineModel | null) => void;
}

export const useTontineStore = create<TontineState>()(
  devtools(
    (set) => ({
      tontines: [],
      currentTontine: null,
      isLoading: false,
      error: null,
      fetchTontines: async () => {
        set({ isLoading: true });
        try {
          const tontines = await tontineService.getTontinesByStatus('ACTIVE');
          set({ tontines, isLoading: false });
        } catch (error) {
          set({ error: 'Erreur lors du chargement des tontines', isLoading: false });
        }
      },
      createTontine: async (data) => {
        set({ isLoading: true });
        try {
          const newTontine = await tontineService.createTontine(data);
          set((state) => ({
            tontines: [...state.tontines, newTontine],
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Erreur lors de la création de la tontine', isLoading: false });
        }
      },
      setCurrentTontine: (tontine) => set({ currentTontine: tontine }),
    }),
    { name: 'tontine-store' }
  )
);
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TontineModel, TontineMemberModel } from '@/types/database';
import { tontineApi } from '../services/tontine.service';

interface TontineState {
  currentTontine: TontineModel | null;
  members: TontineMemberModel[];
  isLoading: boolean;
  error: string | null;
  fetchTontines: () => Promise<void>;
  setCurrentTontine: (tontine: TontineModel) => void;
  setMembers: (members: TontineMemberModel[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTontineStore = create<TontineState>()(
  devtools(
    (set) => ({
      currentTontine: null,
      members: [],
      isLoading: false,
      error: null,
      fetchTontines: async () => {
        set({ isLoading: true });
        try {
          const tontines = await tontineApi.getTontines();
          set({ currentTontine: tontines[0], isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch tontines', isLoading: false });
        }
      },
      setCurrentTontine: (tontine) => set({ currentTontine: tontine }),
      setMembers: (members) => set({ members }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error })
    }),
    {
      name: 'tontine-store'
    }
  )
);

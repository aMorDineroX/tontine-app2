import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TontineModel, TontineMemberModel } from '@/types/database';

interface TontineState {
  currentTontine: TontineModel | null;
  members: TontineMemberModel[];
  isLoading: boolean;
  error: string | null;
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
      setCurrentTontine: (tontine) => set({ currentTontine: tontine }),
      setMembers: (members) => set({ members }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'tontine-store',
    }
  )
);

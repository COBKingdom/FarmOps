import { create } from 'zustand'
import type { Farm, Branch, UserProfile } from '@/types/app'

interface FarmState {
  farm: Farm | null
  branches: Branch[]
  profile: UserProfile | null
  selectedBranchId: string | null

  setFarm: (farm: Farm) => void
  setBranches: (branches: Branch[]) => void
  setProfile: (profile: UserProfile) => void
  setSelectedBranchId: (branchId: string) => void

  clearFarm: () => void
}

export const useFarmStore = create<FarmState>((set) => ({
  farm: null,
  branches: [],
  profile: null,
  selectedBranchId: null,

  setFarm: (farm) => set({ farm }),
  setBranches: (branches) => set({ branches }),
  setProfile: (profile) => set({ profile }),
  setSelectedBranchId: (selectedBranchId) => set({ selectedBranchId }),

  clearFarm: () =>
    set({
      farm: null,
      branches: [],
      profile: null,
      selectedBranchId: null,
    }),
}))

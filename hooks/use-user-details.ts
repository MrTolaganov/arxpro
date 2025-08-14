import { User } from '@/types'
import { create } from 'zustand'

type UserDetailsStore = {
  userDetails: User | null
  setUserDetails: (userDetails: User | null) => void
}

export const useUserDetails = create<UserDetailsStore>(set => ({
  userDetails: null,
  setUserDetails: userDetails => set({ userDetails }),
}))

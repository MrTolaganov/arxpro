import { Step, User } from '@/types'
import { create } from 'zustand'

type ForgotPasswordStore = {
  email: string
  step: Step
  setEmail: (email: string) => void
  setStep: (step: Step) => void
}

export const useForgotPassword = create<ForgotPasswordStore>(set => ({
  email: '',
  step: 'first',
  setEmail: email => set({ email }),
  setStep: step => set({ step }),
}))

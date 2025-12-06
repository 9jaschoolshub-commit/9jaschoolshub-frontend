import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      authToken: null,
      setAuthToken: (authToken) => set({ authToken }),
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useStore

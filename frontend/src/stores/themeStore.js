import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      
      // Toggle theme
      toggleTheme: () => {
        set((state) => ({ isDark: !state.isDark }))
      },
      
      // Set theme
      setTheme: (isDark) => {
        set({ isDark })
      }
    }),
    {
      name: 'theme-storage',
    }
  )
)
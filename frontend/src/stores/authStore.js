import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Login user
      login: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true,
        })
      },
      
      // Logout user
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
      
      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      },
      
      // Check if user is admin
      isAdmin: () => {
        const { user } = get()
        return user?.role === 'admin'
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
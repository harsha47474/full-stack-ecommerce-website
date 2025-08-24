import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to wishlist
      addItem: (product) => {
        set((state) => {
          const exists = state.items.find(item => item._id === product._id)
          if (exists) return state
          
          return {
            items: [...state.items, product]
          }
        })
      },
      
      // Remove item from wishlist
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId)
        }))
      },
      
      // Check if item is in wishlist
      isInWishlist: (productId) => {
        const { items } = get()
        return items.some(item => item._id === productId)
      },
      
      // Clear wishlist
      clearWishlist: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item._id === product._id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          }
          
          return {
            items: [...state.items, { ...product, quantity }]
          }
        })
      },
      
      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId)
        }))
      },
      
      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          )
        }))
      },
      
      // Clear cart
      clearCart: () => {
        set({ items: [] })
      },
      
      // Get cart total
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      // Get cart item count
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
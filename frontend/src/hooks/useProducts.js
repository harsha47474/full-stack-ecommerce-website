import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockProducts, categories, brands } from '../data/mockProducts'
import toast from 'react-hot-toast'

// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch all products with filters
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      await delay(500) // Simulate API delay
      
      let filteredProducts = [...mockProducts]
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        )
      }
      
      // Category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category === filters.category
        )
      }
      
      // Price range filter
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(product =>
          (product.salePrice || product.price) >= parseFloat(filters.minPrice)
        )
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
          (product.salePrice || product.price) <= parseFloat(filters.maxPrice)
        )
      }
      
      // Sort products
      if (filters.sort) {
        switch (filters.sort) {
          case 'price-asc':
            filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
            break
          case 'price-desc':
            filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
            break
          case 'rating':
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
            break
          case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
            break
          default:
            // newest - no sorting needed as mock data is already in order
            break
        }
      }
      
      // Pagination
      const page = parseInt(filters.page) || 1
      const limit = parseInt(filters.limit) || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          pages: Math.ceil(filteredProducts.length / limit)
        },
        filters: {
          categories,
          brands
        }
      }
    },
  })
}

// Fetch single product
export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      await delay(300) // Simulate API delay
      const product = mockProducts.find(p => p._id === id)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    },
    enabled: !!id,
  })
}

// Create product (admin)
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (productData) => {
      const { data } = await api.post('/products', productData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast.success('Product created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create product')
    },
  })
}

// Update product (admin)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...productData }) => {
      const { data } = await api.put(`/products/${id}`, productData)
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products'])
      queryClient.invalidateQueries(['product', data._id])
      toast.success('Product updated successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update product')
    },
  })
}

// Delete product (admin)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast.success('Product deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete product')
    },
  })
}
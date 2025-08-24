import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

// Login hook
export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      login(data.user, data.token)
      toast.success('Login successful!')
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })
}

// Register hook
export const useRegister = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post('/auth/register', userData)
      return data
    },
    onSuccess: (data) => {
      login(data.user, data.token)
      toast.success('Registration successful!')
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })
}

// Logout hook
export const useLogout = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  
  return () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }
}
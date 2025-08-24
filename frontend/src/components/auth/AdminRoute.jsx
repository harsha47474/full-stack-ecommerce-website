import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
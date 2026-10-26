import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { session, isAdmin, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }
  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }
  return <Outlet />
}

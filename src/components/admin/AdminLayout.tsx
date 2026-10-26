import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const NAV = [
  { to: '/admin', label: 'Overview' },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/certificates', label: 'Certificates' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/education', label: 'Education' },
]

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-border/60 p-4 md:block">
          <div className="mb-6 text-lg font-semibold">Admin</div>
          <nav className="space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-border/60 px-6 py-3">
            <div className="text-sm text-muted-foreground">{user?.email}</div>
            <button
              type="button"
              onClick={async () => {
                await signOut()
                navigate('/admin/login', { replace: true })
              }}
              className="text-sm text-primary hover:underline"
            >
              Sign out
            </button>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from '@/App'
import { AdminLogin } from '@/pages/admin/AdminLogin'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminOverview } from '@/pages/admin/AdminOverview'
import { ProfileEditor } from '@/pages/admin/ProfileEditor'
import { ProjectsManager } from '@/pages/admin/ProjectsManager'
import { CertificatesManager } from '@/pages/admin/CertificatesManager'
import { SkillsManager } from '@/pages/admin/SkillsManager'
import { ExperienceManager } from '@/pages/admin/ExperienceManager'
import { EducationManager } from '@/pages/admin/EducationManager'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="certificates" element={<CertificatesManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

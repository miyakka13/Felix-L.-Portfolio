import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFetch } from '@/hooks/useFetch'
import * as profileService from '@/services/profile'
import * as projectsService from '@/services/projects'
import * as certService from '@/services/certificates'
import * as skillsService from '@/services/skills'
import * as expService from '@/services/experience'
import * as eduService from '@/services/education'
import { importLegacyContent } from '@/services/legacyImport'

export function AdminOverview() {
  const profiles = useFetch(() => profileService.fetchAllProfiles(), [])
  const projects = useFetch(() => projectsService.fetchAllProjects(), [])
  const certs = useFetch(() => certService.fetchAllCertificates(), [])
  const skills = useFetch(() => skillsService.fetchAllSkills(), [])
  const exps = useFetch(() => expService.fetchAllExperience(), [])
  const edus = useFetch(() => eduService.fetchAllEducation(), [])
  const [importing, setImporting] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function handleImport() {
    setImporting(true); setErr(null); setMsg(null)
    try {
      await importLegacyContent()
      setMsg('Legacy content imported (only where tables were empty).')
      await Promise.all([profiles.refetch(), projects.refetch(), certs.refetch(), skills.refetch(), exps.refetch(), edus.refetch()])
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  const cards = [
    { label: 'Profiles', value: profiles.data?.length ?? 0 },
    { label: 'Projects', value: projects.data?.length ?? 0 },
    { label: 'Certificates', value: certs.data?.length ?? 0 },
    { label: 'Skills', value: skills.data?.length ?? 0 },
    { label: 'Experience', value: exps.data?.length ?? 0 },
    { label: 'Education', value: edus.data?.length ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">{c.label}</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-semibold">{c.value}</div></CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Import legacy content</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Seeds the database from the original hardcoded portfolio data. Only inserts where a table is empty.
          </p>
          <Button onClick={handleImport} disabled={importing}>{importing ? 'Importing...' : 'Import legacy content'}</Button>
          {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
          {err ? <p className="text-sm text-red-500">{err}</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}


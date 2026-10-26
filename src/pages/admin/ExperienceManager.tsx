import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as svc from '@/services/experience'

export function ExperienceManager() {
  const { data, loading, refetch } = useFetch(() => svc.fetchAllExperience(), [])
  const [editing, setEditing] = useState<svc.ExperienceRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function startNew() {
    setIsNew(true)
    setEditing({ id: '', role: '', company: '', period: '', location: null, description: [], technologies: [], sort_order: 0, published: true, created_at: '', updated_at: '' })
  }

  async function save() {
    if (!editing) return
    setSaving(true); setErr(null)
    try {
      const payload = { role: editing.role, company: editing.company, period: editing.period, location: editing.location, description: editing.description, technologies: editing.technologies, sort_order: editing.sort_order, published: editing.published }
      if (isNew) await svc.createExperience(payload)
      else await svc.updateExperience(editing.id, payload)
      setEditing(null); setIsNew(false)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
    finally { setSaving(false) }
  }

  async function remove(row: svc.ExperienceRow) {
    if (!window.confirm('Delete?')) return
    try { await svc.deleteExperience(row.id); await refetch() } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Button onClick={startNew}>Add experience</Button>
      </div>
      {err ? <p className="text-sm text-red-500">{err}</p> : null}
      {editing ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Role</Label><Input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
              <div className="space-y-2"><Label>Company</Label><Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
              <div className="space-y-2"><Label>Period</Label><Input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} /></div>
              <div className="space-y-2"><Label>Location</Label><Input value={editing.location ?? ''} onChange={(e) => setEditing({ ...editing, location: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>Description (one per line)</Label><Textarea value={(editing.description ?? []).join('\n')} onChange={(e) => setEditing({ ...editing, description: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            <div className="space-y-2"><Label>Technologies (comma)</Label><Input value={(editing.technologies ?? []).join(', ')} onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} /></div>
            <div className="flex items-center justify-between">
              <PublishToggle published={editing.published} onChange={(v) => setEditing({ ...editing, published: v })} />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false) }}>Cancel</Button>
                <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
      <div className="space-y-2">
        {(data ?? []).map((e) => (
          <Card key={e.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div>
                <div className="font-medium">{e.role} — {e.company}</div>
                <div className="text-xs text-muted-foreground">{e.period}</div>
              </div>
              <div className="flex items-center gap-2">
                <PublishToggle published={e.published} onChange={async (v) => { await svc.updateExperience(e.id, { published: v }); await refetch() }} />
                <Button variant="outline" size="sm" onClick={() => { setIsNew(false); setEditing(e) }}>Edit</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" size="sm" onClick={() => remove(e)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

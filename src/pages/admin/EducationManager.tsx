import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as svc from '@/services/education'

export function EducationManager() {
  const { data, loading, refetch } = useFetch(() => svc.fetchAllEducation(), [])
  const [editing, setEditing] = useState<svc.EducationRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function startNew() {
    setIsNew(true)
    setEditing({ id: '', institution: '', program: '', type: 'degree', start_date: null, end_date: null, grade: null, details: [], courses: [], links: [], sort_order: 0, published: true, created_at: '', updated_at: '' })
  }

  async function save() {
    if (!editing) return
    setSaving(true); setErr(null)
    try {
      const payload = { institution: editing.institution, program: editing.program, type: editing.type, start_date: editing.start_date, end_date: editing.end_date, grade: editing.grade, details: editing.details, courses: editing.courses, links: editing.links, sort_order: editing.sort_order, published: editing.published }
      if (isNew) await svc.createEducation(payload)
      else await svc.updateEducation(editing.id, payload)
      setEditing(null); setIsNew(false)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
    finally { setSaving(false) }
  }

  async function remove(row: svc.EducationRow) {
    if (!window.confirm('Delete?')) return
    try { await svc.deleteEducation(row.id); await refetch() } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Education</h1>
        <Button onClick={startNew}>Add education</Button>
      </div>
      {err ? <p className="text-sm text-red-500">{err}</p> : null}
      {editing ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Institution</Label><Input value={editing.institution} onChange={(e) => setEditing({ ...editing, institution: e.target.value })} /></div>
              <div className="space-y-2"><Label>Program</Label><Input value={editing.program} onChange={(e) => setEditing({ ...editing, program: e.target.value })} /></div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select value={editing.type ?? 'degree'} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option value="degree">degree</option>
                  <option value="certificate">certificate</option>
                  <option value="professional-development">professional-development</option>
                </select>
              </div>
              <div className="space-y-2"><Label>Start date</Label><Input value={editing.start_date ?? ''} onChange={(e) => setEditing({ ...editing, start_date: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>End date</Label><Input value={editing.end_date ?? ''} onChange={(e) => setEditing({ ...editing, end_date: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Grade</Label><Input value={editing.grade ?? ''} onChange={(e) => setEditing({ ...editing, grade: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>Details (one per line)</Label><Textarea value={(editing.details ?? []).join('\n')} onChange={(e) => setEditing({ ...editing, details: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            <div className="space-y-2"><Label>Courses (comma)</Label><Input value={(editing.courses ?? []).join(', ')} onChange={(e) => setEditing({ ...editing, courses: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} /></div>
            <div className="space-y-2"><Label>Links (JSON array)</Label><Textarea value={JSON.stringify(editing.links ?? [], null, 2)} onChange={(e) => { try { setEditing({ ...editing, links: JSON.parse(e.target.value) }) } catch {} }} rows={4} className="font-mono text-xs" /></div>
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
                <div className="font-medium">{e.program}</div>
                <div className="text-xs text-muted-foreground">{e.institution} · {e.start_date} – {e.end_date}</div>
              </div>
              <div className="flex items-center gap-2">
                <PublishToggle published={e.published} onChange={async (v) => { await svc.updateEducation(e.id, { published: v }); await refetch() }} />
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

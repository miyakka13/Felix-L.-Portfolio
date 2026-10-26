import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as svc from '@/services/skills'

export function SkillsManager() {
  const { data, loading, refetch } = useFetch(() => svc.fetchAllSkills(), [])
  const [editing, setEditing] = useState<svc.SkillRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function startNew() {
    setIsNew(true)
    setEditing({ id: '', name: '', category: null, level: null, icon: null, sort_order: 0, published: true, created_at: '', updated_at: '' })
  }

  async function save() {
    if (!editing) return
    setSaving(true); setErr(null)
    try {
      const payload = { name: editing.name, category: editing.category, level: editing.level, icon: editing.icon, sort_order: editing.sort_order, published: editing.published }
      if (isNew) await svc.createSkill(payload)
      else await svc.updateSkill(editing.id, payload)
      setEditing(null); setIsNew(false)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
    finally { setSaving(false) }
  }

  async function remove(row: svc.SkillRow) {
    if (!window.confirm('Delete?')) return
    try { await svc.deleteSkill(row.id); await refetch() } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Button onClick={startNew}>Add skill</Button>
      </div>
      {err ? <p className="text-sm text-red-500">{err}</p> : null}
      {editing ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Category</Label><Input value={editing.category ?? ''} onChange={(e) => setEditing({ ...editing, category: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Level (0-100)</Label><Input type="number" value={editing.level ?? ''} onChange={(e) => setEditing({ ...editing, level: e.target.value ? Number(e.target.value) : null })} /></div>
              <div className="space-y-2"><Label>Icon (lucide name)</Label><Input value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
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
        {(data ?? []).map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div><div className="font-medium">{s.name}</div><div className="text-xs text-muted-foreground">{s.category} · {s.level ?? '-'}</div></div>
              <div className="flex items-center gap-2">
                <PublishToggle published={s.published} onChange={async (v) => { await svc.updateSkill(s.id, { published: v }); await refetch() }} />
                <Button variant="outline" size="sm" onClick={() => { setIsNew(false); setEditing(s) }}>Edit</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" size="sm" onClick={() => remove(s)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

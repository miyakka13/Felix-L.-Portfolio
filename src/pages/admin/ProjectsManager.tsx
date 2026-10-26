import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as svc from '@/services/projects'
import { PUBLIC_BUCKET, uploadToBucket, publicUrl } from '@/services/storage'

export function ProjectsManager() {
  const { data, loading, refetch } = useFetch(() => svc.fetchAllProjects(), [])
  const [editing, setEditing] = useState<svc.ProjectRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function startNew() {
    setIsNew(true)
    setEditing({ id: '', title: '', description: null, image_url: null, live_url: null, repo_url: null, tech: [], featured: false, sort_order: 0, published: false, created_at: '', updated_at: '' })
  }

  async function save() {
    if (!editing) return
    setSaving(true); setErr(null)
    try {
      const payload = { title: editing.title, description: editing.description, image_url: editing.image_url, live_url: editing.live_url, repo_url: editing.repo_url, tech: editing.tech, featured: editing.featured, sort_order: editing.sort_order, published: editing.published }
      if (isNew) await svc.createProject(payload)
      else await svc.updateProject(editing.id, payload)
      setEditing(null); setIsNew(false)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
    finally { setSaving(false) }
  }

  async function remove(row: svc.ProjectRow) {
    if (!window.confirm('Delete?')) return
    try { await svc.deleteProject(row.id); await refetch() } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
  }

  async function handleImage(file: File) {
    if (!editing) return
    try {
      const path = await uploadToBucket(PUBLIC_BUCKET, file, 'projects')
      setEditing({ ...editing, image_url: publicUrl(PUBLIC_BUCKET, path) })
    } catch (e) { setErr(e instanceof Error ? e.message : 'Upload failed') }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button onClick={startNew}>Add project</Button>
      </div>
      {err ? <p className="text-sm text-red-500">{err}</p> : null}
      {editing ? (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2"><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value || null })} rows={4} /></div>
            <div className="space-y-2"><Label>Image</Label><Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} />{editing.image_url ? <img src={editing.image_url} alt="" className="max-h-32 rounded border" /> : null}</div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Live URL</Label><Input value={editing.live_url ?? ''} onChange={(e) => setEditing({ ...editing, live_url: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Repo URL</Label><Input value={editing.repo_url ?? ''} onChange={(e) => setEditing({ ...editing, repo_url: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Tech (comma separated)</Label><Input value={(editing.tech ?? []).join(', ')} onChange={(e) => setEditing({ ...editing, tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
              <PublishToggle published={editing.published} onChange={(v) => setEditing({ ...editing, published: v })} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false) }}>Cancel</Button>
              <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
      <div className="space-y-2">
        {(data ?? []).map((p) => (
          <Card key={p.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">{(p.tech ?? []).join(', ')}</div>
              </div>
              <div className="flex items-center gap-2">
                <PublishToggle published={p.published} onChange={async (v) => { await svc.updateProject(p.id, { published: v }); await refetch() }} />
                <Button variant="outline" size="sm" onClick={() => { setIsNew(false); setEditing(p) }}>Edit</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" size="sm" onClick={() => remove(p)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

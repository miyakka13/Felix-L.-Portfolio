import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as certService from '@/services/certificates'
import { PRIVATE_BUCKET, uploadToBucket, signedUrl, deleteObject } from '@/services/storage'

const CATEGORIES = ['AML & Compliance','Cryptocurrency & Digital Assets','Blockchain Intelligence','Fraud & Forensics','FinTech & Regulatory Education','Other Professional Credentials']
const STATUSES = ['active','for-renewal','expired','status-unavailable'] as const

export function CertificatesManager() {
  const { data, loading, refetch } = useFetch(() => certService.fetchAllCertificates(), [])
  const [editing, setEditing] = useState<certService.CertificateRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => { if (editing?.file_path) { signedUrl(PRIVATE_BUCKET, editing.file_path).then(setPreview).catch(() => setPreview(null)) } else setPreview(null) }, [editing?.file_path])

  function startNew() {
    setIsNew(true)
    setEditing({ id: '', name: '', abbreviation: null, issuer: '', category: 'AML & Compliance', issue_date: null, expiry_date: null, credential_id: null, credential_url: null, file_path: null, status: 'status-unavailable', note: null, sort_order: 0, published: false, created_at: '', updated_at: '' })
  }

  async function save() {
    if (!editing) return
    setSaving(true); setErr(null)
    try {
      const payload = { name: editing.name, abbreviation: editing.abbreviation, issuer: editing.issuer, category: editing.category, issue_date: editing.issue_date, expiry_date: editing.expiry_date, credential_id: editing.credential_id, credential_url: editing.credential_url, file_path: editing.file_path, status: editing.status, note: editing.note, sort_order: editing.sort_order, published: editing.published }
      if (isNew) await certService.createCertificate(payload)
      else await certService.updateCertificate(editing.id, payload)
      setEditing(null); setIsNew(false)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
    finally { setSaving(false) }
  }

  async function remove(row: certService.CertificateRow) {
    if (!window.confirm('Delete this certificate?')) return
    try {
      if (row.file_path) await deleteObject(PRIVATE_BUCKET, row.file_path)
      await certService.deleteCertificate(row.id)
      await refetch()
    } catch (e) { setErr(e instanceof Error ? e.message : 'Failed') }
  }

  async function handleFile(file: File) {
    if (!editing) return
    try {
      const path = await uploadToBucket(PRIVATE_BUCKET, file, 'certificates')
      if (editing.file_path) { try { await deleteObject(PRIVATE_BUCKET, editing.file_path) } catch {} }
      setEditing({ ...editing, file_path: path })
    } catch (e) { setErr(e instanceof Error ? e.message : 'Upload failed') }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Certificates</h1>
        <Button onClick={startNew}>Add certificate</Button>
      </div>
      {err ? <p className="text-sm text-red-500">{err}</p> : null}
      {editing ? (

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Abbreviation</Label><Input value={editing.abbreviation ?? ''} onChange={(e) => setEditing({ ...editing, abbreviation: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Issuer</Label><Input value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} /></div>
              <div className="space-y-2">
  <Label>Category</Label>
  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as certService.CertificationCategory })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
  </select>
</div>
              <div className="space-y-2"><Label>Issue date</Label><Input value={editing.issue_date ?? ''} onChange={(e) => setEditing({ ...editing, issue_date: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Expiry date</Label><Input value={editing.expiry_date ?? ''} onChange={(e) => setEditing({ ...editing, expiry_date: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Credential ID</Label><Input value={editing.credential_id ?? ''} onChange={(e) => setEditing({ ...editing, credential_id: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Credential URL</Label><Input value={editing.credential_url ?? ''} onChange={(e) => setEditing({ ...editing, credential_url: e.target.value || null })} /></div>
              <div className="space-y-2">
  <Label>Status</Label>
  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as certService.CertificationStatus })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
  </select>
</div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>Note</Label><Textarea value={editing.note ?? ''} onChange={(e) => setEditing({ ...editing, note: e.target.value || null })} rows={3} /></div>
            <div className="space-y-2">
              <Label>Certificate file (private)</Label>
              <Input type="file" accept="application/pdf,image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {editing.file_path ? <p className="text-xs text-muted-foreground">{editing.file_path}</p> : null}
              {preview ? (preview.includes('.pdf') ? <a href={preview} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Open preview</a> : <img src={preview} alt="" className="max-h-48 rounded border" />) : null}
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
        {(data ?? []).map((c) => (
          <Card key={c.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div>
                <div className="font-medium">{c.name} {c.abbreviation ? `(${c.abbreviation})` : ''}</div>
                <div className="text-xs text-muted-foreground">{c.issuer} · {c.category} · {c.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <PublishToggle published={c.published} onChange={async (v) => { await certService.updateCertificate(c.id, { published: v }); await refetch() }} />
                <Button variant="outline" size="sm" onClick={() => { setIsNew(false); setEditing(c) }}>Edit</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" size="sm" onClick={() => remove(c)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

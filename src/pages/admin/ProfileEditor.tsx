import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PublishToggle } from '@/components/admin/PublishToggle'
import { useFetch } from '@/hooks/useFetch'
import * as profileService from '@/services/profile'
import { PUBLIC_BUCKET, uploadToBucket, publicUrl } from '@/services/storage'

export function ProfileEditor() {
  const { data: profiles, loading, refetch } = useFetch(() => profileService.fetchAllProfiles(), [])
  const [working, setWorking] = useState<profileService.ProfileRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (profiles && profiles.length > 0 && !working) setWorking(profiles[0])
  }, [profiles, working])

  function update<K extends keyof profileService.ProfileRow>(k: K, v: profileService.ProfileRow[K]) {
    if (!working) return
    setWorking({ ...working, [k]: v } as profileService.ProfileRow)
  }

  async function handleCreate() {
    setSaving(true)
    setErr(null)
    try {
      const row = await profileService.upsertProfile({ name: 'Felix Lömahàn', published: true })
      setWorking(row)
      await refetch()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleSave() {
    if (!working) return
    setSaving(true)
    setErr(null)
    setMsg(null)
    try {
      const about = typeof working.about === 'string' ? (working.about as string).split('\n').filter(Boolean) : working.about
      let expertise = working.expertise
      if (typeof expertise === 'string') {
        try { expertise = JSON.parse(expertise as unknown as string) } catch { expertise = working.expertise }
      }
      let philosophy = working.philosophy
      if (typeof philosophy === 'string') {
        try { philosophy = JSON.parse(philosophy as unknown as string) } catch { philosophy = working.philosophy }
      }
      const payload = { ...working, about, expertise, philosophy }
      const row = await profileService.upsertProfile(payload)
      setWorking(row)
      setMsg('Saved')
      await refetch()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpload(field: 'avatar_url' | 'resume_url', file: File) {
    try {
      const path = await uploadToBucket(PUBLIC_BUCKET, file, field === 'avatar_url' ? 'avatar' : 'resume')
      const url = publicUrl(PUBLIC_BUCKET, path)
      update(field, url)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed')
    }
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>

  if (!working) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">No profile row yet.</p>
        <Button onClick={handleCreate} disabled={saving}>Create profile</Button>
        {err ? <p className="text-sm text-red-500">{err}</p> : null}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="flex items-center gap-3">
          <PublishToggle published={working.published} onChange={(v) => update('published', v)} />
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </div>
      </div>
      {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
      {err ? <p className="text-sm text-red-500">{err}</p> : null}

      <Card>
        <CardHeader><CardTitle>Basic</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Name</Label><Input value={working.name ?? ''} onChange={(e) => update('name', e.target.value)} /></div>
          <div className="space-y-2"><Label>Title</Label><Input value={working.title ?? ''} onChange={(e) => update('title', e.target.value)} /></div>
          <div className="space-y-2"><Label>Location</Label><Input value={working.location ?? ''} onChange={(e) => update('location', e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={working.email ?? ''} onChange={(e) => update('email', e.target.value)} /></div>
          <div className="space-y-2"><Label>GitHub URL</Label><Input value={working.github_url ?? ''} onChange={(e) => update('github_url', e.target.value)} /></div>
          <div className="space-y-2"><Label>LinkedIn URL</Label><Input value={working.linkedin_url ?? ''} onChange={(e) => update('linkedin_url', e.target.value)} /></div>
          <div className="space-y-2"><Label>Avatar image</Label><Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload('avatar_url', e.target.files[0])} />{working.avatar_url ? <img src={working.avatar_url} alt="" className="h-16 w-16 rounded-full object-cover" /> : null}</div>
          <div className="space-y-2"><Label>Resume (PDF)</Label><Input type="file" accept="application/pdf" onChange={(e) => e.target.files?.[0] && handleUpload('resume_url', e.target.files[0])} />{working.resume_url ? <a href={working.resume_url} className="text-sm text-primary hover:underline" target="_blank" rel="noreferrer">View resume</a> : null}</div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Mission</CardTitle></CardHeader><CardContent><Textarea value={working.mission ?? ''} onChange={(e) => update('mission', e.target.value)} rows={3} /></CardContent></Card>
      <Card><CardHeader><CardTitle>About (one paragraph per line)</CardTitle></CardHeader><CardContent><Textarea value={Array.isArray(working.about) ? working.about.join('\n') : (working.about ?? '')} onChange={(e) => update('about', e.target.value as unknown as profileService.ProfileRow['about'])} rows={6} /></CardContent></Card>
      <Card><CardHeader><CardTitle>Expertise (JSON array)</CardTitle></CardHeader><CardContent><Textarea value={typeof working.expertise === 'string' ? working.expertise : JSON.stringify(working.expertise ?? [], null, 2)} onChange={(e) => update('expertise', e.target.value as unknown as profileService.ProfileRow['expertise'])} rows={12} className="font-mono text-xs" /></CardContent></Card>
      <Card><CardHeader><CardTitle>Philosophy (JSON array)</CardTitle></CardHeader><CardContent><Textarea value={typeof working.philosophy === 'string' ? working.philosophy : JSON.stringify(working.philosophy ?? [], null, 2)} onChange={(e) => update('philosophy', e.target.value as unknown as profileService.ProfileRow['philosophy'])} rows={8} className="font-mono text-xs" /></CardContent></Card>
    </div>
  )
}

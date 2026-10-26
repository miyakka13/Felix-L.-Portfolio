import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { certifications, certificationCategories, type Certification, type CertificationStatus } from '@/data/certifications'

const statusLabel: Record<CertificationStatus, string> = {
  active: 'Active',
  'for-renewal': 'For renewal',
  expired: 'Expired',
  'status-unavailable': 'Status unavailable',
}

const statusVariant: Record<CertificationStatus, 'active' | 'renewal' | 'expired' | 'unverified'> = {
  active: 'active',
  'for-renewal': 'renewal',
  expired: 'expired',
  'status-unavailable': 'unverified',
}

export function Certifications() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [selected, setSelected] = useState<Certification | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return certifications.filter((c) => {
      if (category !== 'All' && c.category !== category) return false
      if (status !== 'All' && c.status !== status) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.abbreviation?.toLowerCase().includes(q) ?? false) ||
        c.category.toLowerCase().includes(q)
      )
    })
  }, [query, category, status])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: certifications.length }
    certificationCategories.forEach((cat) => {
      map[cat] = certifications.filter((c) => c.category === cat).length
    })
    return map
  }, [])

  return (
    <section id="certifications" className="border-t border-border bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-professional">Certifications &amp; Credentials</p>
            <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Searchable library of verified and listed credentials.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {certifications.length} credentials across {certificationCategories.length} categories. Status is shown honestly.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, issuer, abbreviation..." className="pl-9" aria-label="Search certifications" />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-professional" aria-label="Filter by category">
              <option value="All">All categories ({counts.All})</option>
              {certificationCategories.map((c) => (
                <option key={c} value={c}>{c} ({counts[c]})</option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-professional" aria-label="Filter by status">
              <option value="All">All statuses</option>
              <option value="active">Active</option>
              <option value="for-renewal">For renewal</option>
              <option value="expired">Expired</option>
              <option value="status-unavailable">Status unavailable</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setCategory('All')} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${category === 'All' ? 'bg-professional text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            All ({counts.All})
          </button>
          {certificationCategories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${category === c ? 'bg-professional text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
              {c} ({counts[c]})
            </button>
          ))}
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">No credentials match your search.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}>
                  <Card className="h-full cursor-pointer transition-shadow hover:shadow-md" onClick={() => setSelected(c)}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{c.name}</CardTitle>
                        {c.abbreviation && <Badge variant="outline" className="shrink-0">{c.abbreviation}</Badge>}
                      </div>
                      <CardDescription>{c.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={statusVariant[c.status]}>{statusLabel[c.status]}</Badge>
                        <span className="text-xs text-muted-foreground">{c.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">Showing {filtered.length} of {certifications.length} credentials.</p>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>{selected.issuer}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                {selected.abbreviation && <div className="flex gap-2"><span className="font-medium text-foreground">Abbreviation:</span><span className="text-muted-foreground">{selected.abbreviation}</span></div>}
                <div className="flex gap-2"><span className="font-medium text-foreground">Category:</span><span className="text-muted-foreground">{selected.category}</span></div>
                {selected.issueDate && <div className="flex gap-2"><span className="font-medium text-foreground">Issue date:</span><span className="text-muted-foreground">{selected.issueDate}</span></div>}
                {selected.expiryDate && <div className="flex gap-2"><span className="font-medium text-foreground">Expiry date:</span><span className="text-muted-foreground">{selected.expiryDate}</span></div>}
                {selected.credentialId && <div className="flex gap-2"><span className="font-medium text-foreground">Credential ID:</span><span className="text-muted-foreground">{selected.credentialId}</span></div>}
                <div className="flex items-center gap-2"><span className="font-medium text-foreground">Status:</span><Badge variant={statusVariant[selected.status]}>{statusLabel[selected.status]}</Badge></div>
                {selected.verificationUrl && <a href={selected.verificationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-professional hover:underline">Verify credential →</a>}
                {selected.note && <p className="text-xs italic text-muted-foreground">{selected.note}</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

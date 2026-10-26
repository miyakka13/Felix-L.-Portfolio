import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-professional">Experience</p>
          <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Professional roles and advisory engagements.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Verified from public sources where possible. Entries requiring confirmation are clearly flagged.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {experience.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>{e.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {e.organization}
                        {e.location ? ` · ${e.location}` : ''}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {e.dates && <Badge variant="outline">{e.dates}</Badge>}
                      {e.verificationStatus === 'verified' ? (
                        <Badge variant="active" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="unverified" className="gap-1">
                          <AlertCircle className="h-3 w-3" /> To confirm
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{e.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {e.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-professional" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  {e.verificationNote && (
                    <p className="mt-4 text-xs italic text-muted-foreground">Verification: {e.verificationNote}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

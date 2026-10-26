import { motion } from 'framer-motion'
import { GraduationCap, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { education } from '@/data/education'

export function Education() {
  return (
    <section id="education" className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-professional">Education</p>
          <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Academic foundation and continuous learning.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-professional/10 text-professional">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{e.program}</CardTitle>
                      <CardDescription>{e.institution}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2">
                    {e.dates && <Badge variant="outline">{e.dates}</Badge>}
                    {e.grade && <Badge variant="secondary">{e.grade}</Badge>}
                    {e.type && (
                      <Badge variant="outline" className="capitalize">
                        {e.type.replace('-', ' ')}
                      </Badge>
                    )}
                  </div>
                  {e.courses && (
                    <ul className="mt-4 space-y-1.5">
                      {e.courses.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.details && (
                    <ul className="mt-4 space-y-1.5">
                      {e.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.links && e.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-professional hover:underline"
                        >
                          {l.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}
                  {e.verificationStatus !== 'verified' && (
                    <p className="mt-4 text-xs italic text-muted-foreground">
                      {e.verificationNote ?? 'Details to be confirmed.'}
                    </p>
                  )}
                  {e.verificationStatus === 'verified' && e.verificationNote && (
                    <p className="mt-4 text-xs text-muted-foreground/70">{e.verificationNote}</p>
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
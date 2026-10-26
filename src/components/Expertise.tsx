import { motion } from 'framer-motion'
import { Coins, FileCheck, Network, Scale, Search, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { profile } from '@/data/profile'

const iconMap = {
  ShieldCheck,
  Coins,
  Network,
  Search,
  FileCheck,
  Scale,
} as const

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-border bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-professional">Core Expertise</p>
          <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            What Felix brings to compliance and financial crime programs.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.expertise.map((e, i) => {
            const Icon = iconMap[e.icon as keyof typeof iconMap] ?? ShieldCheck
            return (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-professional/10 text-professional">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="mt-4">{e.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {e.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

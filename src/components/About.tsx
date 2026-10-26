import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

export function About() {
  return (
    <section id="about" className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-professional">About</p>
            <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              A compliance professional bridging traditional finance and digital assets.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            {profile.about.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
            <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <span className="font-semibold text-foreground">Mission: </span>
              {profile.mission}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

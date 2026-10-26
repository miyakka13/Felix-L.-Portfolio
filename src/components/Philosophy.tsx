import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

export function Philosophy() {
  return (
    <section id="philosophy" className="border-t border-border bg-navy py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Compliance Philosophy</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Principles that guide the work.</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.philosophy.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-gold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

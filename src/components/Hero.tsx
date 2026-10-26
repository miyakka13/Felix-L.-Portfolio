import { motion } from 'framer-motion'
import { ArrowDownRight, Download, ShieldCheck } from 'lucide-react'
import { LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-offwhite via-white to-blue-50 dark:from-navy dark:via-midnight dark:to-navy" />
      <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-professional/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-professional/20 bg-professional/5 px-3 py-1 text-xs font-semibold text-professional">
                <ShieldCheck className="h-3.5 w-3.5" />
                Compliance Â· AML Â· Financial Crime Â· Digital Assets
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-extrabold leading-tight text-navy dark:text-white sm:text-5xl lg:text-6xl"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              className="mt-3 text-xl font-semibold text-professional sm:text-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              {profile.title}
            </motion.p>

            <motion.p
              className="mt-6 max-w-2xl text-lg text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              {profile.headline}
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-base text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
            >
              {profile.intro}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={5}
            >
              <a href="#certifications">
                <Button size="lg">
                  View Certifications <ArrowDownRight className="h-4 w-4" />
                </Button>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn Profile
                </Button>
              </a>
              <Button variant="ghost" size="lg" disabled title="Resume available on request">
                <Download className="h-4 w-4" /> Resume (on request)
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={6}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to consulting inquiries
              </div>
              <div>AML Â· Fraud Â· Crypto Investigations</div>
              <div>Regulatory Compliance</div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="relative mx-auto aspect-square max-w-sm"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-professional to-navy opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-8xl font-extrabold text-white/90">FL</span>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-background px-4 py-3 shadow-lg">
                <div className="text-xs text-muted-foreground">Verified credentials</div>
                <div className="text-2xl font-bold text-professional">20+</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


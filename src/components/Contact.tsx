import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/input'
import { Textarea } from '@/components/ui/input'
import { profile } from '@/data/profile'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const hasEmail = Boolean(profile.contact.email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasEmail) return
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-professional">Contact</p>
            <h2 className="mt-2 text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              {profile.contact.consultationHeadline}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">{profile.contact.invitation}</p>

            <div className="mt-8 space-y-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-professional/10 text-professional">
                  <LinkedinIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">LinkedIn</div>
                  <div className="text-xs text-muted-foreground">Connect on LinkedIn</div>
                </div>
              </a>
              {hasEmail && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-professional/10 text-professional">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-xs text-muted-foreground">{profile.contact.email}</div>
                  </div>
                </a>
              )}
            </div>

            {!hasEmail && (
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                <p className="font-semibold">Email not published yet.</p>
                <p className="mt-1 text-xs">
                  A verified professional email is not yet configured. Please reach out via LinkedIn. To enable direct email, set <code>VITE_CONTACT_EMAIL</code> in the environment.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
                <CardDescription>
                  {hasEmail
                    ? 'Your message will open in your email client.'
                    : 'Direct email is disabled until a verified email is configured.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your compliance or AML inquiry..." required />
                  </div>
                  <Button type="submit" disabled={!hasEmail} className="w-full sm:w-auto">
                    <Send className="h-4 w-4" /> {hasEmail ? 'Send message' : 'Email unavailable'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


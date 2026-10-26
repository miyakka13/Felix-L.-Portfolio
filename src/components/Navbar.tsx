import { useEffect, useState } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from '@/hooks/useTheme'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-heading font-bold text-navy dark:text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-navy text-white text-sm font-bold dark:bg-white dark:text-navy">
            FL
          </span>
          <span className="hidden sm:inline">Felix Lömahàn</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <a href="#contact" className="hidden sm:inline-flex">
            <Button size="sm">Contact</Button>
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-medium hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setOpen(false)}>
                  <Button className="mt-2 w-full">Contact</Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

import { LinkedinIcon } from '@/components/icons'
import { profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-muted/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="text-sm text-muted-foreground">
          Â© {year} {profile.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground inline-flex items-center gap-1">
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a href="#home" className="hover:text-foreground">Back to top</a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
        Built with verified public information. Some details are flagged for manual confirmation.
      </div>
    </footer>
  )
}


import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-professional focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-professional text-white',
        secondary: 'border-transparent bg-muted text-foreground',
        outline: 'border-border text-foreground',
        active: 'border-transparent bg-emerald-100 text-emerald-800',
        renewal: 'border-transparent bg-amber-100 text-amber-800',
        expired: 'border-transparent bg-red-100 text-red-800',
        unverified: 'border-transparent bg-slate-100 text-slate-700',
        gold: 'border-transparent bg-gold/20 text-navy',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

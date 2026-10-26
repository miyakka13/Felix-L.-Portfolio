import { cn } from '@/lib/utils'

export function PublishToggle({ published, onChange, disabled }: { published: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!published)}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
        published ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {published ? 'Published' : 'Draft'}
    </button>
  )
}

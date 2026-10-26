import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.SUPABASE_URL as string | undefined
const anonKey = import.meta.env.SUPABASE_ANON_KEY as string | undefined

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing. Set SUPABASE_URL and SUPABASE_ANON_KEY.')
}

// Fall back to placeholders so the client never throws at module load (keeps the public site rendering).
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export const isSupabaseConfigured = Boolean(url && anonKey)

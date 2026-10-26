import { supabase } from '@/lib/supabase'

export interface ProfileRow {
  id: string
  name: string
  title: string | null
  avatar_url: string | null
  resume_url: string | null
  email: string | null
  location: string | null
  github_url: string | null
  linkedin_url: string | null
  about: string[] | null
  mission: string | null
  expertise: { title: string; items: string[]; icon: string }[] | null
  philosophy: { title: string; description: string }[] | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type ProfileInput = Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchProfile(): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as ProfileRow | null
}

export async function fetchAllProfiles(): Promise<ProfileRow[]> {
  const { data, error } = await supabase.from('profiles').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ProfileRow[]
}

export async function upsertProfile(input: Partial<ProfileInput> & { id?: string }): Promise<ProfileRow> {
  if (input.id) {
    const { data, error } = await supabase.from('profiles').update(input).eq('id', input.id).select().single()
    if (error) throw error
    return data as ProfileRow
  }
  const { data, error } = await supabase.from('profiles').insert(input).select().single()
  if (error) throw error
  return data as ProfileRow
}

export async function deleteProfile(id: string): Promise<void> {
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error
}

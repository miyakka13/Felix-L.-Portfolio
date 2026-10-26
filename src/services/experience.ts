import { supabase } from '@/lib/supabase'

export interface ExperienceRow {
  id: string
  role: string
  company: string
  period: string
  location: string | null
  description: string[] | null
  technologies: string[] | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type ExperienceInput = Omit<ExperienceRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchPublishedExperience(): Promise<ExperienceRow[]> {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ExperienceRow[]
}

export async function fetchAllExperience(): Promise<ExperienceRow[]> {
  const { data, error } = await supabase.from('experience').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ExperienceRow[]
}

export async function createExperience(input: Partial<ExperienceInput>): Promise<ExperienceRow> {
  const { data, error } = await supabase.from('experience').insert(input).select().single()
  if (error) throw error
  return data as ExperienceRow
}

export async function updateExperience(id: string, input: Partial<ExperienceInput>): Promise<ExperienceRow> {
  const { data, error } = await supabase.from('experience').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as ExperienceRow
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabase.from('experience').delete().eq('id', id)
  if (error) throw error
}

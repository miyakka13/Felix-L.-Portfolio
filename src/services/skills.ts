import { supabase } from '@/lib/supabase'

export interface SkillRow {
  id: string
  name: string
  category: string | null
  level: number | null
  icon: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type SkillInput = Omit<SkillRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchPublishedSkills(): Promise<SkillRow[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as SkillRow[]
}

export async function fetchAllSkills(): Promise<SkillRow[]> {
  const { data, error } = await supabase.from('skills').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as SkillRow[]
}

export async function createSkill(input: Partial<SkillInput>): Promise<SkillRow> {
  const { data, error } = await supabase.from('skills').insert(input).select().single()
  if (error) throw error
  return data as SkillRow
}

export async function updateSkill(id: string, input: Partial<SkillInput>): Promise<SkillRow> {
  const { data, error } = await supabase.from('skills').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as SkillRow
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) throw error
}

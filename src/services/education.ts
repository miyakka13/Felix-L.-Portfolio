import { supabase } from '@/lib/supabase'

export interface EducationRow {
  id: string
  institution: string
  program: string
  type: string | null
  start_date: string | null
  end_date: string | null
  grade: string | null
  details: string[] | null
  courses: string[] | null
  links: { label: string; url: string }[] | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type EducationInput = Omit<EducationRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchPublishedEducation(): Promise<EducationRow[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as EducationRow[]
}

export async function fetchAllEducation(): Promise<EducationRow[]> {
  const { data, error } = await supabase.from('education').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as EducationRow[]
}

export async function createEducation(input: Partial<EducationInput>): Promise<EducationRow> {
  const { data, error } = await supabase.from('education').insert(input).select().single()
  if (error) throw error
  return data as EducationRow
}

export async function updateEducation(id: string, input: Partial<EducationInput>): Promise<EducationRow> {
  const { data, error } = await supabase.from('education').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as EducationRow
}

export async function deleteEducation(id: string): Promise<void> {
  const { error } = await supabase.from('education').delete().eq('id', id)
  if (error) throw error
}

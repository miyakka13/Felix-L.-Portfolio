import { supabase } from '@/lib/supabase'

export interface ProjectRow {
  id: string
  title: string
  description: string | null
  image_url: string | null
  live_url: string | null
  repo_url: string | null
  tech: string[] | null
  featured: boolean
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type ProjectInput = Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchPublishedProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ProjectRow[]
}

export async function fetchAllProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ProjectRow[]
}

export async function createProject(input: Partial<ProjectInput>): Promise<ProjectRow> {
  const { data, error } = await supabase.from('projects').insert(input).select().single()
  if (error) throw error
  return data as ProjectRow
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<ProjectRow> {
  const { data, error } = await supabase.from('projects').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as ProjectRow
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

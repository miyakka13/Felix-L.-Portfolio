import { supabase } from '@/lib/supabase'

export type CertificationStatus = 'active' | 'for-renewal' | 'expired' | 'status-unavailable'
export type CertificationCategory =
  | 'AML & Compliance'
  | 'Cryptocurrency & Digital Assets'
  | 'Blockchain Intelligence'
  | 'Fraud & Forensics'
  | 'FinTech & Regulatory Education'
  | 'Other Professional Credentials'

export interface CertificateRow {
  id: string
  name: string
  abbreviation: string | null
  issuer: string
  category: CertificationCategory
  issue_date: string | null
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  file_path: string | null
  status: CertificationStatus
  note: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type CertificateInput = Omit<CertificateRow, 'id' | 'created_at' | 'updated_at'>

export async function fetchPublishedCertificates(): Promise<CertificateRow[]> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as CertificateRow[]
}

export async function fetchAllCertificates(): Promise<CertificateRow[]> {
  const { data, error } = await supabase.from('certificates').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as CertificateRow[]
}

export async function createCertificate(input: Partial<CertificateInput>): Promise<CertificateRow> {
  const { data, error } = await supabase.from('certificates').insert(input).select().single()
  if (error) throw error
  return data as CertificateRow
}

export async function updateCertificate(id: string, input: Partial<CertificateInput>): Promise<CertificateRow> {
  const { data, error } = await supabase.from('certificates').update(input).eq('id', id).select().single()
  if (error) throw error
  return data as CertificateRow
}

export async function deleteCertificate(id: string): Promise<void> {
  const { error } = await supabase.from('certificates').delete().eq('id', id)
  if (error) throw error
}

import { supabase } from '@/lib/supabase'

export const PUBLIC_BUCKET = 'portfolio-assets'
export const PRIVATE_BUCKET = 'portfolio-private'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']

export function validateFile(file: File) {
  if (file.size > MAX_BYTES) throw new Error('File must be 5MB or smaller.')
  if (!ALLOWED.includes(file.type)) throw new Error('Unsupported file type.')
}

export async function uploadToBucket(bucket: string, file: File, folder = ''): Promise<string> {
  validateFile(file)
  const ext = (file.name.split('.').pop() ?? 'bin').toLowerCase()
  const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40) || 'file'
  const path = `${folder ? folder + '/' : ''}${crypto.randomUUID()}-${base}.${ext}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })
  if (error) throw error
  return path
}

export function publicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function signedUrl(bucket: string, path: string, expiresIn = 3600): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)
  if (error) throw error
  return data.signedUrl
}

export async function deleteObject(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

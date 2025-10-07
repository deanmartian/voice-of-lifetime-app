import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side auth helpers
export const auth = supabase.auth

// Storage bucket names
export const STORAGE_BUCKETS = {
  RECORDINGS: 'recordings',
  AVATARS: 'avatars'
} as const

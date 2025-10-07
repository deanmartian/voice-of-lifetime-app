export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          birth_year: number | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          family_role: string | null
          preferred_language: string
          privacy_level: 'private' | 'family' | 'public'
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          birth_year?: number | null
          bio?: string | null
          avatar_url?: string | null
          family_role?: string | null
          preferred_language?: string
          privacy_level?: 'private' | 'family' | 'public'
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      stories: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: 'barndomsminner' | 'familie-relasjoner' | 'livets-eventyr' | 'arbeid-karriere' | 'visdom-lærdommer' | 'annet'
          privacy_level: 'private' | 'family' | 'public'
          prompt_used: string | null
          created_at: string
          updated_at: string
          is_completed: boolean
          view_count: number
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          category: 'barndomsminner' | 'familie-relasjoner' | 'livets-eventyr' | 'arbeid-karriere' | 'visdom-lærdommer' | 'annet'
          privacy_level?: 'private' | 'family' | 'public'
          prompt_used?: string | null
          is_completed?: boolean
        }
        Update: Partial<Database['public']['Tables']['stories']['Insert']>
      }
      recordings: {
        Row: {
          id: string
          story_id: string
          user_id: string
          audio_url: string
          duration_seconds: number
          file_size_bytes: number
          transcription: string | null
          transcription_status: 'pending' | 'processing' | 'completed' | 'failed'
          created_at: string
          updated_at: string
          file_format: string
          quality_rating: number | null
        }
        Insert: {
          story_id: string
          user_id: string
          audio_url: string
          duration_seconds: number
          file_size_bytes: number
          file_format: string
          transcription?: string | null
          transcription_status?: 'pending' | 'processing' | 'completed' | 'failed'
          quality_rating?: number | null
        }
        Update: Partial<Database['public']['Tables']['recordings']['Insert']>
      }
      family_members: {
        Row: {
          id: string
          inviter_id: string
          invitee_id: string | null
          invitee_email: string
          relationship: string
          status: 'pending' | 'accepted' | 'declined' | 'blocked'
          permissions: Json
          created_at: string
          updated_at: string
          accepted_at: string | null
        }
        Insert: {
          inviter_id: string
          invitee_email: string
          relationship: string
          status?: 'pending' | 'accepted' | 'declined' | 'blocked'
          permissions?: Json
        }
        Update: Partial<Database['public']['Tables']['family_members']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      story_category: 'barndomsminner' | 'familie-relasjoner' | 'livets-eventyr' | 'arbeid-karriere' | 'visdom-lærdommer' | 'annet'
      privacy_level: 'private' | 'family' | 'public'
      transcription_status: 'pending' | 'processing' | 'completed' | 'failed'
      family_status: 'pending' | 'accepted' | 'declined' | 'blocked'
    }
  }
}

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Story = Database['public']['Tables']['stories']['Row']
export type Recording = Database['public']['Tables']['recordings']['Row']
export type FamilyMember = Database['public']['Tables']['family_members']['Row']

export type StoryCategory = Database['public']['Enums']['story_category']
export type PrivacyLevel = Database['public']['Enums']['privacy_level']
export type TranscriptionStatus = Database['public']['Enums']['transcription_status']
export type FamilyStatus = Database['public']['Enums']['family_status']

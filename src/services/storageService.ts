import { supabase, STORAGE_BUCKETS } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface UploadResult {
  success: boolean
  data?: {
    path: string
    url: string
  }
  error?: string
}

export class StorageService {
  /**
   * Upload an audio file to Supabase Storage
   */
  static async uploadAudioFile(
    file: Blob,
    userId: string,
    storyId: string,
    filename?: string
  ): Promise<UploadResult> {
    try {
      // Generate unique filename if not provided
      const fileExtension = 'webm'
      const fileName = filename || `${uuidv4()}.${fileExtension}`
      const filePath = `${userId}/${storyId}/${fileName}`

      // Convert blob to file for upload
      const audioFile = new File([file], fileName, { type: 'audio/webm' })

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.RECORDINGS)
        .upload(filePath, audioFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        return {
          success: false,
          error: `Kunne ikke laste opp lydfilen: ${error.message}`
        }
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKETS.RECORDINGS)
        .getPublicUrl(filePath)

      return {
        success: true,
        data: {
          path: filePath,
          url: urlData.publicUrl
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: 'En uventet feil oppstod under opplasting'
      }
    }
  }

  /**
   * Delete an audio file from Supabase Storage
   */
  static async deleteAudioFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.storage
        .from(STORAGE_BUCKETS.RECORDINGS)
        .remove([filePath])

      if (error) {
        console.error('Delete error:', error)
        return {
          success: false,
          error: `Kunne ikke slette lydfilen: ${error.message}`
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Delete error:', error)
      return {
        success: false,
        error: 'En uventet feil oppstod under sletting'
      }
    }
  }

  /**
   * Get signed URL for private audio file access
   */
  static async getSignedUrl(filePath: string, expiresIn = 3600): Promise<UploadResult> {
    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.RECORDINGS)
        .createSignedUrl(filePath, expiresIn)

      if (error) {
        return {
          success: false,
          error: `Kunne ikke få tilgang til lydfilen: ${error.message}`
        }
      }

      return {
        success: true,
        data: {
          path: filePath,
          url: data.signedUrl
        }
      }
    } catch (error) {
      console.error('Signed URL error:', error)
      return {
        success: false,
        error: 'En uventet feil oppstod ved henting av lydfil'
      }
    }
  }

  /**
   * Upload user avatar image
   */
  static async uploadAvatar(
    file: File,
    userId: string
  ): Promise<UploadResult> {
    try {
      const fileExtension = file.name.split('.').pop()
      const fileName = `avatar.${fileExtension}`
      const filePath = `${userId}/${fileName}`

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.AVATARS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Allow overwriting existing avatar
        })

      if (error) {
        return {
          success: false,
          error: `Kunne ikke laste opp profilbildet: ${error.message}`
        }
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKETS.AVATARS)
        .getPublicUrl(filePath)

      return {
        success: true,
        data: {
          path: filePath,
          url: urlData.publicUrl
        }
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      return {
        success: false,
        error: 'En uventet feil oppstod under opplasting av profilbilde'
      }
    }
  }
}

export default StorageService

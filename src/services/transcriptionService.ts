import OpenAI from 'openai'

export interface TranscriptionResult {
  success: boolean
  data?: {
    text: string
    language?: string
    duration?: number
  }
  error?: string
}

export class TranscriptionService {
  private static openai: OpenAI | null = null

  private static getOpenAI(): OpenAI {
    if (!this.openai) {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('OpenAI API key not configured')
      }
      this.openai = new OpenAI({ apiKey })
    }
    return this.openai
  }

  /**
   * Transcribe audio file using OpenAI Whisper API
   */
  static async transcribeAudio(
    audioBlob: Blob,
    language: string = 'no' // Norwegian by default
  ): Promise<TranscriptionResult> {
    try {
      const openai = this.getOpenAI()

      // Convert blob to file for OpenAI API
      const audioFile = new File([audioBlob], 'recording.webm', {
        type: 'audio/webm'
      })

      // Call OpenAI Whisper API
      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: language,
        response_format: 'verbose_json',
        temperature: 0.0, // More deterministic results
      })

      return {
        success: true,
        data: {
          text: transcription.text,
          language: transcription.language,
          duration: transcription.duration
        }
      }
    } catch (error: unknown) {
      console.error('Transcription error:', error)

      // Handle specific error cases
      const hasStatus = (err: unknown): err is { status: number } =>
        Boolean(err && typeof err === 'object' && 'status' in err)

      if (hasStatus(error) && error.status === 401) {
        return {
          success: false,
          error: 'API-nøkkel for transkripsjon er ikke gyldig'
        }
      }

      if (hasStatus(error) && error.status === 429) {
        return {
          success: false,
          error: 'For mange forespørsler. Prøv igjen om litt.'
        }
      }

      if (hasStatus(error) && error.status >= 500) {
        return {
          success: false,
          error: 'Transkripsjon-tjenesten er midlertidig utilgjengelig'
        }
      }

      return {
        success: false,
        error: 'Kunne ikke transkribere lydfilen. Prøv igjen senere.'
      }
    }
  }

  /**
   * Transcribe audio from URL (for server-side processing)
   */
  static async transcribeFromUrl(
    audioUrl: string,
    language: string = 'no'
  ): Promise<TranscriptionResult> {
    try {
      // Fetch audio from URL
      const response = await fetch(audioUrl)
      if (!response.ok) {
        throw new Error('Could not fetch audio file')
      }

      const audioBlob = await response.blob()
      return this.transcribeAudio(audioBlob, language)
    } catch (error) {
      console.error('Transcription from URL error:', error)
      return {
        success: false,
        error: 'Kunne ikke transkribere lydfilen fra URL'
      }
    }
  }

  /**
   * Enhance transcription text using GPT (optional feature)
   */
  static async enhanceTranscription(
    originalText: string,
    context?: string
  ): Promise<TranscriptionResult> {
    try {
      const openai = this.getOpenAI()

      const prompt = `
Du er en AI-assistent som hjelper til med å forbedre transkripsjoner av norske livshistorier fortalt av eldre mennesker.

Oppgave: Forbedre denne transkripsjonen ved å:
1. Rette opp åpenbare stavefeil og grammatiske feil
2. Legge til naturlig tegnsetting
3. Formatere teksten i leselige avsnitt
4. Bevare den personlige stemmen og dialekt-uttrykkene
5. IKKE endre innholdet eller meningen

${context ? `Kontekst: ${context}` : ''}

Original transkripsjon:
"${originalText}"

Forbedret versjon:`

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.3,
      })

      const enhancedText = completion.choices[0]?.message?.content?.trim()

      if (!enhancedText) {
        throw new Error('No response from GPT')
      }

      return {
        success: true,
        data: {
          text: enhancedText,
          language: 'no'
        }
      }
    } catch (error: unknown) {
      console.error('Enhancement error:', error)

      // Fallback to original text if enhancement fails
      return {
        success: true,
        data: {
          text: originalText,
          language: 'no'
        }
      }
    }
  }
}

export default TranscriptionService

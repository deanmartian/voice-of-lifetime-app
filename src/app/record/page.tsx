"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Mic, Square, Play, Pause, RotateCcw, Upload, Save, UserPlus, LogIn } from "lucide-react"
import Link from "next/link"
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { StorageService } from "@/services/storageService"
import { TranscriptionService } from "@/services/transcriptionService"

export default function RecordPage() {
  const { user, loading } = useAuth()
  const {
    state,
    isRecording,
    isPaused,
    duration,
    audioBlob,
    audioUrl,
    startRecording: startVoiceRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
    error: recordingError
  } = useVoiceRecorder()

  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyDescription, setStoryDescription] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcription, setTranscription] = useState<string | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSaveStory = async () => {
    if (!audioBlob || !user) {
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // First create the story record
      const { data: story, error: storyError } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title: storyTitle || `Historie fra ${new Date().toLocaleDateString('no-NO')}`,
          description: storyDescription || null,
          category: 'annet' as const,
          privacy_level: 'family' as const,
          is_completed: false
        })
        .select()
        .single()

      if (storyError) {
        throw new Error(`Kunne ikke lagre historie: ${storyError.message}`)
      }

      // Upload audio file
      const uploadResult = await StorageService.uploadAudioFile(
        audioBlob,
        user.id,
        story.id
      )

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Opplasting feilet')
      }

      // Create recording record
      const { error: recordingError } = await supabase
        .from('recordings')
        .insert({
          story_id: story.id,
          user_id: user.id,
          audio_url: uploadResult.data!.url,
          duration_seconds: duration,
          file_size_bytes: audioBlob.size,
          file_format: 'webm',
          transcription_status: 'pending'
        })

      if (recordingError) {
        throw new Error(`Kunne ikke lagre opptak: ${recordingError.message}`)
      }

      // Start transcription in background
      if (audioBlob) {
        handleTranscribe(story.id)
      }

      // Reset the recording state
      resetRecording()
      setStoryTitle("")
      setStoryDescription("")

      alert('Historien din er lagret! Du finner den under "Mine historier".')

    } catch (error: unknown) {
      console.error('Save error:', error)
      setUploadError(error instanceof Error ? error.message : 'En ukjent feil oppstod')
    } finally {
      setIsUploading(false)
    }
  }

  const handleTranscribe = async (storyId: string) => {
    if (!audioBlob) return

    setIsTranscribing(true)
    try {
      const result = await TranscriptionService.transcribeAudio(audioBlob, 'no')
      if (result.success && result.data) {
        setTranscription(result.data.text)

        // Update the recording with transcription
        await supabase
          .from('recordings')
          .update({
            transcription: result.data.text,
            transcription_status: 'completed'
          })
          .eq('story_id', storyId)
      }
    } catch (error) {
      console.error('Transcription error:', error)
    } finally {
      setIsTranscribing(false)
    }
  }

  // Redirect to login if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Laster inn...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <Heart className="h-16 w-16 text-amber-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Du må logge inn</h2>
          <p className="text-xl text-gray-600 mb-8">
            For å ta opp og lagre historier må du først opprette en konto eller logge inn.
          </p>
          <div className="space-y-4">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-3" asChild>
              <Link href="/auth/register">
                <UserPlus className="h-5 w-5 mr-2" />
                Opprett gratis konto
              </Link>
            </Button>
            <Button variant="outline" className="w-full text-lg py-3" asChild>
              <Link href="/auth/login">
                Logg inn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">Stemmen for Livet</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/">Hjem</Link>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-4 py-2">Ta opp</Button>
              <Button variant="ghost" className="text-lg px-4 py-2">Mine historier</Button>
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/inspiration">Inspirasjon</Link>
              </Button>
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/help">Hjelp</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" className="text-lg" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Tilbake til hjemside
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ta opp din historie
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ta deg god tid og snakk naturlig. Du kan pause, stoppe og starte på nytt når som helst.
            Bare fortell historien din som om du snakker med en kjær venn.
          </p>
        </div>

        {/* Recording Interface */}
        <Card className="p-12 border-2 border-amber-200 bg-white shadow-lg text-center">
          {/* Recording Status */}
          <div className="mb-8">
            {isRecording && !isPaused && (
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
                <span className="text-2xl font-semibold text-red-600">Tar opp...</span>
              </div>
            )}
            {isPaused && (
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-2xl font-semibold text-yellow-600">Pauset</span>
              </div>
            )}
            {state === 'idle' && (
              <div className="mb-4">
                <span className="text-2xl font-semibold text-gray-600">Klar til opptak</span>
              </div>
            )}
            {state === 'stopped' && (
              <div className="mb-4">
                <span className="text-2xl font-semibold text-green-600">Opptak fullført!</span>
              </div>
            )}
            {recordingError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-700">{recordingError}</span>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className="mb-8">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
              {formatTime(duration)}
            </div>
            <p className="text-lg text-gray-500">minutter:sekunder</p>
          </div>

          {/* Recording Controls */}
          <div className="flex justify-center space-x-6 mb-8">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startVoiceRecording}
                className="bg-red-500 hover:bg-red-600 text-white text-xl px-12 py-6 rounded-full h-auto"
              >
                <Mic className="h-8 w-8 mr-3" />
                Start opptak
              </Button>
            )}

            {isRecording && !isPaused && (
              <>
                <Button
                  onClick={pauseRecording}
                  variant="outline"
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-xl px-8 py-6 rounded-full h-auto"
                >
                  <Pause className="h-6 w-6 mr-2" />
                  Pause
                </Button>
                <Button
                  onClick={stopRecording}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xl px-8 py-6 rounded-full h-auto"
                >
                  <Square className="h-6 w-6 mr-2" />
                  Stopp
                </Button>
              </>
            )}

            {isPaused && (
              <>
                <Button
                  onClick={resumeRecording}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6 rounded-full h-auto"
                >
                  <Mic className="h-6 w-6 mr-2" />
                  Fortsett
                </Button>
                <Button
                  onClick={stopRecording}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xl px-8 py-6 rounded-full h-auto"
                >
                  <Square className="h-6 w-6 mr-2" />
                  Stopp
                </Button>
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <Button
                  onClick={() => {
                    if (audioUrl) {
                      const audio = new Audio(audioUrl)
                      audio.play()
                    }
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6 rounded-full h-auto"
                >
                  <Play className="h-6 w-6 mr-2" />
                  Lytt
                </Button>
                <Button
                  onClick={resetRecording}
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50 text-xl px-8 py-6 rounded-full h-auto"
                >
                  <RotateCcw className="h-6 w-6 mr-2" />
                  Start på nytt
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto">
            {!isRecording && !audioBlob && (
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Før du begynner:</h3>
                <ul className="text-left text-amber-700 text-lg space-y-2">
                  <li>• Sørg for at du er på et rolig sted</li>
                  <li>• Snakk tydelig og i et behagelig tempo</li>
                  <li>• Du kan pause eller starte på nytt når som helst</li>
                  <li>• Det er ingen tidsbegrensning – ta den tiden du trenger</li>
                </ul>
              </div>
            )}

            {isRecording && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Opptaks-tips:</h3>
                <ul className="text-left text-red-700 text-lg space-y-2">
                  <li>• Snakk naturlig, som om du snakker med familie</li>
                  <li>• Inkluder detaljer som maler et bilde</li>
                  <li>• Ikke bekymre deg for "øh"s eller pauser</li>
                  <li>• Del hvordan hendelsene fikk deg til å føle</li>
                </ul>
              </div>
            )}

            {audioBlob && (
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Flott jobbet!</h3>
                <p className="text-left text-green-700 text-lg">
                  Du har tatt opp historien din med hell. Du kan lytte til den, starte på nytt,
                  eller lagre den i samlingen din. Hver historie du deler er en verdifull gave.
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3">
                    Lagre denne historien
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-6 py-3">
                    Legg til tittel og notater
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Story Prompts Sidebar */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Trenger du en historie-idé?</h3>
            <p className="text-blue-700 text-lg mb-4">
              "Fortell meg om en gang da du følte deg virkelig stolt av deg selv."
            </p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100" asChild>
              <Link href="/inspiration">Få flere ideer</Link>
            </Button>
          </Card>

          <Card className="p-6 bg-purple-50 border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">AI Skrivehjelper</h3>
            <p className="text-purple-700 text-lg mb-4">
              Etter opptak kan vår AI hjelpe deg å organisere og polere historien din til skriftlig form.
            </p>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100">
              Lær mer
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}

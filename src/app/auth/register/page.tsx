"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, UserPlus, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { signUp, signInWithGoogle, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passordene stemmer ikke overens")
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError("Passord må være minst 6 tegn")
      setIsLoading(false)
      return
    }

    const { error } = await signUp(email, password, fullName)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)

    const { error } = await signInWithGoogle()

    if (error) {
      setError("Kunne ikke registrere med Google. Prøv igjen.")
      setIsLoading(false)
    }
    // Note: For OAuth, the redirect happens automatically
  }

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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto bg-white shadow-lg">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontoen din er opprettet!</h2>
            <p className="text-gray-600 mb-6">
              Vi har sendt deg en bekreftelse-e-post. Sjekk innboksen din og klikk på lenken for å aktivere kontoen.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
              <Link href="/auth/login">Gå til innlogging</Link>
            </Button>
          </div>
        </Card>
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
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">Hjem</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Logg inn</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Opprett din konto
          </h2>
          <p className="text-xl text-gray-600">
            Begynn å bevare dine historier i dag
          </p>
        </div>

        <Card className="p-8 bg-white shadow-lg border border-gray-200">
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-lg">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-2">
                Fullt navn
              </label>
              <div className="relative">
                <User className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ditt fulle navn"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                E-post
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="din.epost@eksempel.no"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">
                Passord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Minst 6 tegn"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700 mb-2">
                Bekreft passord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Gjenta passordet"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password || !fullName || !confirmPassword}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl py-4 h-auto disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Oppretter konto...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-3" />
                  Opprett konto
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">eller</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign Up Button */}
          <Button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-xl py-4 h-auto disabled:opacity-50"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Fortsett med Google
          </Button>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Har du allerede en konto?
            </p>
            <Button variant="outline" className="text-lg px-6 py-3" asChild>
              <Link href="/auth/login">Logg inn her</Link>
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Ved å opprette en konto godtar du våre{" "}
              <Link href="/terms" className="text-amber-600 underline">
                vilkår og betingelser
              </Link>{" "}
              og{" "}
              <Link href="/privacy" className="text-amber-600 underline">
                personvernserklæring
              </Link>
              .
            </p>
          </div>
        </Card>

        <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">100% gratis å komme i gang</h3>
          <ul className="text-amber-700 space-y-2">
            <li>✓ Ubegrenset opptak og lagring</li>
            <li>✓ AI-assistert transkripsjon</li>
            <li>✓ Stemme-kloning teknologi</li>
            <li>✓ Del med familie og venner</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, BookOpen, Heart, HelpCircle, Play, LogIn, UserPlus, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const { user, loading, signOut } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b-2 border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">Stemmen for Livet</h1>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/">Hjem</Link>
              </Button>

              {user ? (
                <>
                  <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                    <Link href="/record">Ta opp</Link>
                  </Button>
                  <Button variant="ghost" className="text-lg px-4 py-2">Mine historier</Button>
                  <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                    <Link href="/inspiration">Inspirasjon</Link>
                  </Button>
                  <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                    <Link href="/help">Hjelp</Link>
                  </Button>
                  <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                    <span className="text-sm text-gray-600">
                      {user.email}
                    </span>
                    <Button
                      onClick={signOut}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logg ut
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                    <Link href="/inspiration">Inspirasjon</Link>
                  </Button>
                  <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                    <Link href="/help">Hjelp</Link>
                  </Button>
                  <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                    <Button variant="outline" className="text-lg" asChild>
                      <Link href="/auth/login">
                        <LogIn className="h-4 w-4 mr-2" />
                        Logg inn
                      </Link>
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg" asChild>
                      <Link href="/auth/register">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Registrer
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Laster inn...</p>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                {user ? (
                  <>
                    Velkommen tilbake!<br />
                    <span className="text-amber-600">Klar for en ny historie?</span>
                  </>
                ) : (
                  <>
                    Dine historier betyr noe.<br />
                    <span className="text-amber-600">La oss bevare dem sammen.</span>
                  </>
                )}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                {user ? (
                  "Du har tilgang til alle funksjoner. Ta opp nye historier, administrer eksisterende opptak, eller utforsk AI-funksjonene våre."
                ) : (
                  "Hvert liv er fylt med verdifulle øyeblikk, visdom og opplevelser som er verdt å dele. Enten det er for dine barn, barnebarn eller fremtidige generasjoner, er din stemme og dine historier en gave som vil bli satt pris på for alltid."
                )}
              </p>
              {!user && (
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                  Ingen teknisk erfaring nødvendig. Bare deg, dine minner og din stemme.
                </p>
              )}

              {!user && (
                <div className="flex justify-center space-x-4">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-8 py-4" asChild>
                    <Link href="/auth/register">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Kom i gang gratis
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 text-xl px-8 py-4" asChild>
                    <Link href="/auth/login">
                      <LogIn className="h-5 w-5 mr-2" />
                      Logg inn
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {!loading && (
          <>
            {/* Main Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Start Recording */}
              <Card className="p-8 border-2 border-amber-200 hover:border-amber-300 transition-colors bg-white shadow-lg">
                <div className="text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mic className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {user ? "Ta opp din neste historie" : "Start å ta opp din historie"}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {user ? (
                      "Du er klar til å ta opp! Fortell om et nytt minne, eller fortsett på en historie du har startet på."
                    ) : (
                      "Begynn med et enkelt opptak. Fortell oss om barndommen din, din første jobb, eller et spesielt minne. Vi hjelper deg underveis."
                    )}
                  </p>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3 rounded-lg" asChild>
                    <Link href={user ? "/record" : "/auth/register"}>
                      {user ? "Start opptak nå" : "Kom i gang gratis"}
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Need Inspiration */}
              <Card className="p-8 border-2 border-blue-200 hover:border-blue-300 transition-colors bg-white shadow-lg">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Trenger du inspirasjon?</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    Usikker på hvor du skal begynne? Vi har forsiktige spørsmål og forslag
                    som hjelper deg å finne de perfekte historiene å dele.
                  </p>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-lg" asChild>
                    <Link href="/inspiration">Få historie-ideer</Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Secondary Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Listen to Your Voice */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {user ? "Mine opptak" : "Lytt til din stemme"}
                </h4>
                <p className="text-gray-600 mb-4">
                  {user ? (
                    "Gå gjennom opptakene dine og hør hvordan historiene dine kommer til live."
                  ) : (
                    "Når du har tatt opp, kan du lytte til og administrere alle dine historier."
                  )}
                </p>
                <Button variant="ghost" className="text-green-600 hover:text-green-700" asChild>
                  <Link href={user ? "/recordings" : "/auth/login"}>
                    {user ? "Mine opptak" : "Logg inn"}
                  </Link>
                </Button>
              </Card>

              {/* AI Writing Helper */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {user ? "AI Skrivehjelper" : "Skrivehjelper"}
                </h4>
                <p className="text-gray-600 mb-4">
                  La vår AI-assistent hjelpe deg med å organisere og polere historiene dine.
                </p>
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700" asChild>
                  <Link href={user ? "/ai-writing" : "/auth/login"}>
                    {user ? "Få skrivehjelp" : "Logg inn"}
                  </Link>
                </Button>
              </Card>

              {/* Need Help */}
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-gray-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Trenger du hjelp?</h4>
                <p className="text-gray-600 mb-4">
                  Enkle guider og støtte for å hjelpe deg hvert steg på veien.
                </p>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-700" asChild>
                  <Link href="/help">Få støtte</Link>
                </Button>
              </Card>
            </div>

            {/* How It Works Section */}
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
                {user ? "Dine muligheter" : "Slik fungerer det"}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-600">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {user ? "Ta opp nye historier" : "Velg din historie"}
                  </h4>
                  <p className="text-gray-600">
                    {user ? (
                      "Du kan ta opp så mange historier du vil. Hver historie lagres trygt i skyen."
                    ) : (
                      "Velg et minne eller bruk våre forslag for å finne den perfekte historien å fortelle."
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-600">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {user ? "AI-assistert behandling" : "Ta opp din stemme"}
                  </h4>
                  <p className="text-gray-600">
                    {user ? (
                      "Våre AI-verktøy hjelper med transkripsjon, stemme-kloning og organisering av historiene dine."
                    ) : (
                      "Trykk bare på opptak og snakk naturlig. Ingen forberedelse nødvendig."
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-600">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {user ? "Del med familie" : "Bevar og del"}
                  </h4>
                  <p className="text-gray-600">
                    {user ? (
                      "Inviter familiemedlemmer og del dine historier med de som betyr mest for deg."
                    ) : (
                      "Historiene dine er trygt lagret og klare til å deles med dine kjære."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-500">
            Laget med ❤️ for å bevare livets mest verdifulle historier
          </p>
        </div>
      </footer>
    </div>
  )
}

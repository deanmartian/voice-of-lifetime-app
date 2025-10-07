import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Play, Mic, Headphones, FileText, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const tutorials = [
    {
      title: "Hvordan starte ditt første opptak",
      icon: Mic,
      steps: [
        "Klikk på 'Ta opp' i hovedmenyen",
        "Finn et rolig, komfortabelt sted å sitte",
        "Klikk på den røde 'Start opptak' knappen",
        "Snakk naturlig om ditt valgte minne",
        "Klikk 'Stopp' når du er ferdig",
        "Lytt til opptaket ditt og lagre det"
      ],
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Finne historie-ideer",
      icon: FileText,
      steps: [
        "Gå til 'Inspirasjon' siden fra menyen",
        "Bla gjennom forskjellige historie-kategorier",
        "Les gjennom de forsiktige forslagene",
        "Velg ett som vekker et minne",
        "Klikk 'Start opptak om dette'",
        "Begynn å fortelle historien din"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Lytte til dine historier",
      icon: Headphones,
      steps: [
        "Gå til 'Mine historier' for å se alle opptak",
        "Klikk på en hvilken som helst historie-tittel for å åpne den",
        "Trykk på avspilling-knappen for å lytte",
        "Bruk volum-kontrollene hvis nødvendig",
        "Du kan pause og fortsette når som helst",
        "Del med familie når du er klar"
      ],
      color: "bg-green-100 text-green-600"
    }
  ]

  const faqItems = [
    {
      question: "Trenger jeg spesielt utstyr?",
      answer: "Ingen spesielt utstyr nødvendig! Bare bruk datamaskinen eller nettbrettet ditt med innebygd mikrofon. De fleste enheter fungerer perfekt for å ta opp historiene dine."
    },
    {
      question: "Hva hvis jeg gjør en feil under opptak?",
      answer: "Ikke bekymre deg i det hele tatt! Du kan pause, stoppe og starte på nytt så mange ganger du trenger. Din autentiske stemme, inkludert naturlige pauser, gjør historien din spesiell."
    },
    {
      question: "Hvor lange bør historiene mine være?",
      answer: "Det finnes ingen riktig eller gal lengde. Noen historier kan bare være noen få minutter, andre kan være lengre. Del så mye eller lite som føles komfortabelt."
    },
    {
      question: "Kan jeg redigere opptakene mine?",
      answer: "Ja! Etter opptak kan du lytte tilbake, legge til titler og notater, eller ta opp på nytt hvis du ønsker det. Målet er å fange historien din på en måte som føles riktig for deg."
    },
    {
      question: "Er opptakene mine private?",
      answer: "Absolutt. Historiene dine er helt private til du velger å dele dem. Du kontrollerer hvem som har tilgang til dine verdifulle minner."
    },
    {
      question: "Hva hvis jeg trenger hjelp til å komme i gang?",
      answer: "Vi er her for å hjelpe! Bruk våre historie-forslag i Inspirasjon-seksjonen, eller kontakt vårt støtte-team. Husk, hver historie betyr noe og vi vil hjelpe deg å dele din."
    }
  ]

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
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/record">Ta opp</Link>
              </Button>
              <Button variant="ghost" className="text-lg px-4 py-2">Mine historier</Button>
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/inspiration">Inspirasjon</Link>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-4 py-2">Hjelp</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
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
            Hjelp og støtte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vi er her for å hjelpe deg hvert steg på veien. Å ta opp livshistoriene dine skal være
            enkelt og hyggelig. Finn svar på vanlige spørsmål og steg-for-steg guider nedenfor.
          </p>
        </div>

        {/* Quick Start Tutorials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Steg-for-steg guider</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${tutorial.color}`}>
                    <tutorial.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{tutorial.title}</h4>
                </div>

                <ol className="space-y-3">
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start text-gray-600">
                      <span className="bg-amber-100 text-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      <span className="text-lg">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                    <Play className="h-4 w-4 mr-2" />
                    Se video-guide
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ofte stilte spørsmål</h3>
          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{faq.question}</h4>
                <p className="text-lg text-gray-600 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <Card className="p-8 bg-white shadow-lg border-2 border-amber-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Trenger du fortsatt hjelp?</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Vårt vennlige støtte-team er her for å hjelpe deg. Vi forstår at teknologi
                kan føles overveldende til tider, og vi er tålmodige og klare til å hjelpe.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Ring oss</h4>
                  <p className="text-blue-700 text-lg mb-4">Man-fre, 09:00-17:00</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    22 12 34 56
                  </Button>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Send oss e-post</h4>
                  <p className="text-green-700 text-lg mb-4">Vi svarer innen 24 timer</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Send e-post
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Technical Requirements */}
        <div>
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tekniske krav</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Anbefalte enheter</h4>
                <ul className="text-gray-600 text-lg space-y-2">
                  <li>• Stasjonær eller bærbar datamaskin</li>
                  <li>• Nettbrett (iPad, Android nettbrett)</li>
                  <li>• Innebygd mikrofon er tilstrekkelig</li>
                  <li>• Internett-tilkobling</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Støttede nettlesere</h4>
                <ul className="text-gray-600 text-lg space-y-2">
                  <li>• Google Chrome (anbefalt)</li>
                  <li>• Safari</li>
                  <li>• Microsoft Edge</li>
                  <li>• Firefox</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

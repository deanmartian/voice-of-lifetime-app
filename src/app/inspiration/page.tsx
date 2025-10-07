import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Lightbulb, Users, MapPin, Briefcase, BookOpen } from "lucide-react"
import Link from "next/link"

export default function InspirationPage() {
  const storyCategories = [
    {
      title: "Barndomsminner",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      prompts: [
        "Hva var ditt favoritt barndomsspill eller leke?",
        "Fortell meg om din første skoledag.",
        "Hvordan var nabolaget ditt da du vokste opp?",
        "Hvem var din beste venn som barn? Hvilke eventyr hadde dere?",
        "Hvilke høytidstradisjoner hadde familien din?",
        "Hva var ditt favoritt familiemåltid eller oppskrift?"
      ]
    },
    {
      title: "Familie og relasjoner",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      prompts: [
        "Hvordan møtte du din ektefelle eller partner?",
        "Hvilke råd ville du gitt til dine barn eller barnebarn?",
        "Fortell meg om dine foreldre eller besteforeldre.",
        "Hvilke familietradisjoner er viktigst for deg?",
        "Del en morsom familiehistorie som alltid får deg til å le.",
        "Hvilke verdier lærte familien din deg?"
      ]
    },
    {
      title: "Livets eventyr",
      icon: MapPin,
      color: "bg-green-100 text-green-600",
      prompts: [
        "Hva er den mest minneverdige reisen du noen gang har tatt?",
        "Fortell meg om en gang du prøvde noe helt nytt.",
        "Hva er den største utfordringen du har overvunnet?",
        "Del et øyeblikk da du følte deg virkelig stolt av deg selv.",
        "Hvilke historiske hendelser husker du å ha vært vitne til?",
        "Hvordan har verden forandret seg siden du var ung?"
      ]
    },
    {
      title: "Arbeid og karriere",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
      prompts: [
        "Hva var din første jobb? Hva lærte du av den?",
        "Fortell meg om din karrierereise.",
        "Hvem var en mentor som påvirket livet ditt?",
        "Hvilke prestasjoner er du mest stolt av?",
        "Hvordan balanserte du arbeid og familie?",
        "Hvilke ferdigheter utviklet du som tjente deg godt?"
      ]
    },
    {
      title: "Visdom og lærdommer",
      icon: BookOpen,
      color: "bg-amber-100 text-amber-600",
      prompts: [
        "Hva er den viktigste lærdommen livet har gitt deg?",
        "Hvis du kunne gå tilbake, hva ville du fortalt ditt yngre jeg?",
        "Hvilken feil lærte deg mest?",
        "Hvordan definerer du et godt levd liv?",
        "Hvilke tradisjoner håper du fremtidige generasjoner vil fortsette?",
        "Hva gjør deg mest takknemlig?"
      ]
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
              <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-4 py-2">Inspirasjon</Button>
              <Button variant="ghost" className="text-lg px-4 py-2" asChild>
                <Link href="/help">Hjelp</Link>
              </Button>
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
          <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="h-10 w-10 text-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Historie-ideer og inspirasjon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Noen ganger er det vanskeligste å vite hvor man skal begynne. Velg en kategori
            nedenfor og plukk ethvert spørsmål som vekker et minne. Husk, det finnes ingen
            gale svar – bare din unike historie som venter på å bli delt.
          </p>
        </div>

        {/* Story Categories */}
        <div className="grid gap-8">
          {storyCategories.map((category, index) => (
            <Card key={index} className="p-8 border-2 border-gray-200 hover:border-amber-300 transition-colors bg-white shadow-lg">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 ${category.color}`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {category.prompts.map((prompt, promptIndex) => (
                  <div
                    key={promptIndex}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-pointer"
                  >
                    <p className="text-gray-700 text-lg leading-relaxed">"{prompt}"</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3" asChild>
                  <Link href="/record">Start opptak om dette</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Getting Started Tips */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Tips for å ta opp din historie</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Før du begynner:</h4>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Finn et rolig, komfortabelt sted å sitte
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Ta deg god tid – det haster ikke
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Snakk naturlig, som om du snakker med en venn
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Det er greit å pause og tenke
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Under opptak:</h4>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Inkluder detaljer som maler et bilde
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Del hvordan hendelsene fikk deg til å føle
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Ikke bekymre deg for å være perfekt
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-3">•</span>
                  Du kan alltid ta opp på nytt
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-600 mb-6">
            Klar til å begynne å dele din historie?
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-12 py-4 mr-4" asChild>
            <Link href="/record">Start opptak nå</Link>
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xl px-12 py-4" asChild>
            <Link href="/help">Trenger du mer hjelp?</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

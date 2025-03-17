import type React from "react"
import Link from "next/link"
import { GraduationCap, Users, BookOpen, Building2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">École Connect</span>
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button>
              <Link href="/login">Commencer</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Bienvenue sur École Connect
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  La plateforme complète de gestion scolaire pour élèves, parents, enseignants et administration.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">Se connecter</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#espaces">Découvrir les espaces</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="espaces" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Espaces Dédiés</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Chaque utilisateur bénéficie d'un espace personnalisé adapté à ses besoins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <SpaceCard
                title="Espace Élèves"
                description="Accédez à vos cours, devoirs, notes et ressources pédagogiques."
                icon={<GraduationCap className="h-8 w-8" />}
                href="/eleves"
                color="bg-blue-100 dark:bg-blue-900"
                iconColor="text-blue-600 dark:text-blue-300"
              />
              <SpaceCard
                title="Espace Parents"
                description="Suivez les performances de votre enfant et communiquez avec les enseignants."
                icon={<Users className="h-8 w-8" />}
                href="/parents"
                color="bg-green-100 dark:bg-green-900"
                iconColor="text-green-600 dark:text-green-300"
              />
              <SpaceCard
                title="Espace Enseignants"
                description="Gérez vos cours, publiez des devoirs et suivez les performances des élèves."
                icon={<BookOpen className="h-8 w-8" />}
                href="/enseignants"
                color="bg-purple-100 dark:bg-purple-900"
                iconColor="text-purple-600 dark:text-purple-300"
              />
              <SpaceCard
                title="Espace Administration"
                description="Supervisez l'ensemble de l'établissement et gérez les utilisateurs."
                icon={<Building2 className="h-8 w-8" />}
                href="/admin"
                color="bg-orange-100 dark:bg-orange-900"
                iconColor="text-orange-600 dark:text-orange-300"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 École Connect. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Conditions d'utilisation
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface SpaceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  iconColor: string
}

function SpaceCard({ title, description, icon, href, color, iconColor }: SpaceCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden border-2 transition-all hover:shadow-md">
      <CardHeader className={`${color} flex flex-row items-center gap-4`}>
        <div className={`rounded-full p-2 ${iconColor}`}>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={href}>Accéder</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


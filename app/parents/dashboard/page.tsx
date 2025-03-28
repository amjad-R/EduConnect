"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Users,
  Download,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ParentsDashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bonjour, M. et Mme Martin</h2>
          <p className="text-muted-foreground">Voici un aperçu des informations scolaires de Sophie.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Mars 2025</span>
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              4
            </span>
          </Button>
        </div>
      </div>

      {/* Élève sélectionné */}
      <Card className="bg-muted/40">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Sophie Martin" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Sophie Martin</h3>
                <p className="text-sm text-muted-foreground">Classe de 3ème A - Mme Dubois</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                  >
                    Bon élève
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                  >
                    Délégué de classe
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/parents/performances">Voir les performances</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/parents/releves">Bulletins scolaires</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/parents/communication">Contacter les enseignants</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne Générale</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7/20</div>
            <p className="text-xs text-muted-foreground">+0.5 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assiduité</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">2 absences ce trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prochain Examen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Histoire</div>
            <p className="text-xs text-muted-foreground">Dans 5 jours (20 mars)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 de professeurs, 1 de l'administration</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Évolution des notes</CardTitle>
              <CardDescription>Performance de Sophie dans les principales matières</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/parents/performances">
                Détails <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pl-2">
            <Tabs defaultValue="trimestre">
              <TabsList>
                <TabsTrigger value="trimestre">Ce trimestre</TabsTrigger>
                <TabsTrigger value="annee">Cette année</TabsTrigger>
              </TabsList>
              <TabsContent value="trimestre" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Bar dataKey="grade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="annee" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyGradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Bar dataKey="grade" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="col-span-3 grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Réunions et événements importants</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/parents/notifications">
                  Toutes les notifications <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${event.iconBg}`}>
                      {event.icon}
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dernières notifications</CardTitle>
                <CardDescription>Informations importantes</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/parents/notifications">
                  Toutes <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${notification.iconBg}`}>
                      {notification.icon}
                    </div>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{notification.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Messages récents</CardTitle>
              <CardDescription>Communications des enseignants</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/parents/communication">
                Tous les messages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{message.sender}</p>
                    <p className="text-xs text-muted-foreground">{message.subject}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/parents/communication">Voir tous les messages</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Devoirs à venir</CardTitle>
              <CardDescription>Prochains devoirs et évaluations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Voir tout <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${assignment.color}`} />
                      <span className="font-medium">{assignment.subject}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{assignment.dueDate}</span>
                  </div>
                  <p className="text-sm">{assignment.title}</p>
                  <Progress value={assignment.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents récents</CardTitle>
          <CardDescription>Bulletins et documents importants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDocuments.map((document, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{document.title}</span>
                    </div>
                    <Badge variant="outline">{document.type}</Badge>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">{document.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{document.date}</span>
                      <span>{document.size}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Télécharger
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/parents/releves">Voir tous les documents</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Sample data for charts and components
const gradeData = [
  { subject: "Maths", grade: 16 },
  { subject: "Français", grade: 14 },
  { subject: "Histoire", grade: 17 },
  { subject: "Physique", grade: 15 },
  { subject: "Anglais", grade: 18 },
  { subject: "SVT", grade: 14 },
]

const yearlyGradeData = [
  { subject: "Maths", grade: 15 },
  { subject: "Français", grade: 13 },
  { subject: "Histoire", grade: 16 },
  { subject: "Physique", grade: 14 },
  { subject: "Anglais", grade: 17 },
  { subject: "SVT", grade: 13 },
]

const upcomingEvents = [
  {
    title: "Réunion Parents-Professeurs",
    date: "15 mars 2025",
    description: "Rencontre individuelle avec les enseignants de Sophie",
    icon: <Calendar className="h-5 w-5 text-primary" />,
    iconBg: "bg-primary/10",
  },
  {
    title: "Conseil de classe",
    date: "22 mars 2025",
    description: "Bilan trimestriel de la classe de Sophie",
    icon: <Users className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Sortie scolaire",
    date: "5 avril 2025",
    description: "Visite du musée d'histoire naturelle",
    icon: <BookOpen className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-500/10",
  },
]

const recentMessages = [
  {
    sender: "Mme Dubois",
    subject: "Professeur de Mathématiques",
    preview: "Sophie a fait de grands progrès ce mois-ci, notamment sur les fonctions dérivées...",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    sender: "M. Martin",
    subject: "Professeur d'Histoire",
    preview: "Je souhaiterais vous rencontrer pour discuter du dernier devoir de Sophie...",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    sender: "Administration",
    subject: "Informations importantes",
    preview: "Veuillez trouver ci-joint le planning des examens du troisième trimestre...",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const recentNotifications = [
  {
    title: "Réunion parents-professeurs",
    content: "Une réunion parents-professeurs aura lieu le 15 mars 2025 de 17h à 20h.",
    time: "Il y a 2 heures",
    read: false,
    icon: <Calendar className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Fermeture exceptionnelle",
    content: "L'établissement sera fermé le vendredi 10 avril 2025 en raison de travaux de maintenance.",
    time: "Hier, 14:30",
    read: false,
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    iconBg: "bg-red-500/10",
  },
  {
    title: "Bulletin du 2ème trimestre",
    content: "Le bulletin scolaire du 2ème trimestre est maintenant disponible.",
    time: "Il y a 3 jours",
    read: true,
    icon: <FileText className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-500/10",
  },
]

const upcomingAssignments = [
  {
    subject: "Mathématiques",
    title: "Exercices sur les fonctions dérivées",
    dueDate: "15 mars 2025",
    progress: 0,
    color: "bg-blue-500",
  },
  {
    subject: "Histoire",
    title: "Dissertation sur la Seconde Guerre mondiale",
    dueDate: "20 mars 2025",
    progress: 30,
    color: "bg-orange-500",
  },
  {
    subject: "Français",
    title: "Analyse de poème",
    dueDate: "22 mars 2025",
    progress: 50,
    color: "bg-green-500",
  },
]

const recentDocuments = [
  {
    title: "Bulletin 2ème Trimestre",
    type: "Bulletin",
    description: "Bulletin scolaire du deuxième trimestre 2024-2025",
    date: "01/03/2025",
    size: "1.2 MB",
  },
  {
    title: "Autorisation Sortie",
    type: "Formulaire",
    description: "Autorisation pour la sortie au musée d'histoire naturelle",
    date: "28/02/2025",
    size: "450 KB",
  },
  {
    title: "Emploi du temps",
    type: "Document",
    description: "Emploi du temps modifié pour le mois de mars",
    date: "25/02/2025",
    size: "320 KB",
  },
]

function BarChart3({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}


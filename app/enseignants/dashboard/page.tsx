"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Bell, BookOpen, Calendar, Clock, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EnseignantsDashboardPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Bonjour, Mme Dubois</h2>
          <p className="text-muted-foreground">Voici un aperçu de vos classes et activités.</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Répartis sur 5 classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours à donner</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devoirs à corriger</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Pour la semaine prochaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne des classes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.8/20</div>
            <p className="text-xs text-muted-foreground">+0.3 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Performance des classes</CardTitle>
            <CardDescription>Moyenne par classe pour le trimestre en cours</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Prochains cours</CardTitle>
              <CardDescription>Votre emploi du temps pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${class_.iconBg}`}>
                      <Clock className={`h-5 w-5 ${class_.iconColor}`} />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{class_.name}</p>
                      <p className="text-xs text-muted-foreground">{class_.time}</p>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/enseignants/cours">Voir l'emploi du temps complet</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Élèves à surveiller</CardTitle>
              <CardDescription>Élèves nécessitant une attention particulière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsToWatch.map((student, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.class}</p>
                      <p className="text-sm text-muted-foreground">{student.issue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/enseignants/eleves">Voir tous les élèves</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data for charts and components
const classPerformanceData = [
  { class: "3ème A", average: 15.2 },
  { class: "3ème B", average: 14.8 },
  { class: "4ème A", average: 13.9 },
  { class: "4ème B", average: 14.5 },
  { class: "4ème C", average: 15.7 },
]

const upcomingClasses = [
  {
    name: "Mathématiques - 3ème A",
    time: "10:00 - 11:00",
    room: "Salle 201",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    name: "Mathématiques - 4ème B",
    time: "11:15 - 12:15",
    room: "Salle 105",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    name: "Mathématiques - 4ème C",
    time: "14:00 - 15:00",
    room: "Salle 302",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
]

const studentsToWatch = [
  {
    name: "Lucas Martin",
    class: "3ème A",
    issue: "Difficulté avec les fractions",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Emma Dubois",
    class: "4ème B",
    issue: "Absences fréquentes",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Thomas Leroy",
    class: "4ème C",
    issue: "Besoin de soutien en algèbre",
    avatar: "/placeholder.svg?height=32&width=32",
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


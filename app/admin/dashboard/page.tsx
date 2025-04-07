"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts"
import { Bell, BookOpen, Calendar, GraduationCap, Users, FileText, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Tableau de bord administratif</h2>
          <p className="text-muted-foreground">Vue d'ensemble de l'établissement scolaire</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Mars 2025</span>
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              5
            </span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves inscrits</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+56 depuis l'année dernière</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enseignants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">5 nouveaux cette année</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">De la 6ème à la Terminale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% par rapport à l'an dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Évolution des effectifs</CardTitle>
            <CardDescription>Nombre d'élèves inscrits sur les 5 dernières années</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>Prochains événements importants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
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
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/calendrier">Voir tous les événements</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tâches administratives</CardTitle>
              <CardDescription>Actions importantes à effectuer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${task.iconBg}`}>
                      {task.icon}
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.deadline}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/taches">Voir toutes les tâches</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data for charts and components
const enrollmentData = [
  { year: "2021", students: 1050 },
  { year: "2022", students: 1120 },
  { year: "2023", students: 1180 },
  { year: "2024", students: 1210 },
  { year: "2025", students: 1234 },
]

const upcomingEvents = [
  {
    title: "Réunion du conseil d'administration",
    date: "15 mars 2025",
    description: "Discussion du budget pour l'année prochaine",
    icon: <Users className="h-5 w-5 text-primary" />,
    iconBg: "bg-primary/10",
  },
  {
    title: "Journée portes ouvertes",
    date: "22 mars 2025",
    description: "Accueil des futurs élèves et leurs parents",
    icon: <BookOpen className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Formation des enseignants",
    date: "5 avril 2025",
    description: "Atelier sur les nouvelles technologies éducatives",
    icon: <GraduationCap className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-500/10",
  },
]

const adminTasks = [
  {
    title: "Validation des emplois du temps",
    deadline: "Avant le 20 mars 2025",
    description: "Vérifier et approuver les emplois du temps pour le prochain trimestre",
    icon: <Calendar className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Mise à jour du règlement intérieur",
    deadline: "Avant le 1er avril 2025",
    description: "Réviser et mettre à jour le règlement intérieur de l'établissement",
    icon: <FileText className="h-5 w-5 text-purple-500" />,
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Préparation du rapport annuel",
    deadline: "Avant le 15 avril 2025",
    description: "Compiler les données et rédiger le rapport annuel de l'établissement",
    icon: <Settings className="h-5 w-5 text-yellow-500" />,
    iconBg: "bg-yellow-500/10",
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


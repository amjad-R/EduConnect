"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, BookOpen, Calendar, Clock, FileText } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ElevesDashboardPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Bonjour, Sophie</h2>
          <p className="text-muted-foreground">Voici un aperçu de votre activité scolaire.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Mars 2025</span>
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
        </div>
      </div>

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
            <CardTitle className="text-sm font-medium">Devoirs à rendre</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Prochain devoir dans 2 jours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours à venir</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mathématiques</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui à 14h00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prochain examen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Histoire</div>
            <p className="text-xs text-muted-foreground">Dans 5 jours (20 mars)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Évolution des notes</CardTitle>
            <CardDescription>Vos résultats dans les principales matières</CardDescription>
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
            <CardHeader>
              <CardTitle>Prochaines échéances</CardTitle>
              <CardDescription>Devoirs et examens à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${task.iconBg}`}>
                      {task.icon}
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.date}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/eleves/notifications">Voir toutes les notifications</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progression des cours</CardTitle>
              <CardDescription>Votre avancement dans les matières principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{course.subject}</p>
                    <p className="text-sm text-muted-foreground">{course.progress}%</p>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/eleves/cours">Accéder aux cours</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
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

const upcomingTasks = [
  {
    title: "Devoir de Mathématiques",
    date: "15 mars 2025",
    description: "Exercices sur les fonctions dérivées",
    icon: <FileText className="h-5 w-5 text-primary" />,
    iconBg: "bg-primary/10",
  },
  {
    title: "Examen d'Histoire",
    date: "20 mars 2025",
    description: "La Seconde Guerre mondiale",
    icon: <BookOpen className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Présentation Français",
    date: "22 mars 2025",
    description: "Exposé sur Victor Hugo",
    icon: <FileText className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-500/10",
  },
]

const courseProgress = [
  { subject: "Mathématiques", progress: 75 },
  { subject: "Français", progress: 60 },
  { subject: "Histoire-Géographie", progress: 85 },
  { subject: "Sciences Physiques", progress: 70 },
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


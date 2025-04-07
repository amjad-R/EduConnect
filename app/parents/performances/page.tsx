"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Download, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentPerformancePage() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("trimester")
  const [childFilter, setChildFilter] = useState("sophie")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suivi des performances</h2>
          <p className="text-muted-foreground">Suivez les résultats scolaires et la progression de votre enfant.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={childFilter} onValueChange={setChildFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Enfant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sophie">Sophie Martin</SelectItem>
              <SelectItem value="lucas">Lucas Martin</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Télécharger</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Sophie Martin" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Sophie Martin</h3>
            <p className="text-sm text-muted-foreground">Classe de 3ème A</p>
          </div>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trimester">Ce trimestre</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
            <SelectItem value="all">Toute la scolarité</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
            <div className="flex items-center">{getTrendIcon(0.5)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7/20</div>
            <p className="text-xs text-muted-foreground">+0.5 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classement</CardTitle>
            <div className="flex items-center">{getTrendIcon(2)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3ème / 28</div>
            <p className="text-xs text-muted-foreground">+2 places depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assiduité</CardTitle>
            <div className="flex items-center">{getTrendIcon(-1.5)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">-1.5% depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devoirs rendus</CardTitle>
            <div className="flex items-center">{getTrendIcon(5)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Tous les devoirs ont été rendus</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grades">Notes</TabsTrigger>
          <TabsTrigger value="progress">Progression</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="attendance">Assiduité</TabsTrigger>
        </TabsList>
        <TabsContent value="grades" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Moyenne par matière</CardTitle>
                <CardDescription>Comparaison avec la moyenne de la classe</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectAverages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="student" fill="#3b82f6" name="Sophie" />
                    <Bar dataKey="class" fill="#10b981" name="Classe" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Évolution des moyennes</CardTitle>
                <CardDescription>Progression sur les trois trimestres</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gradeEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Moyenne générale" />
                    <Line type="monotone" dataKey="classAverage" stroke="#10b981" name="Moyenne de la classe" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Dernières évaluations</CardTitle>
                <CardDescription>Notes des dernières évaluations par matière</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getGradeColor(grade.grade)}`} />
                          <span className="font-medium">{grade.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getGradeBadgeVariant(grade.grade)}>{grade.grade}/20</Badge>
                          <span className="text-sm text-muted-foreground">Classe: {grade.classAverage}/20</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{grade.title}</span>
                        <span className="text-muted-foreground">{grade.date}</span>
                      </div>
                      <Progress value={(grade.grade / 20) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir toutes les notes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Progression annuelle</CardTitle>
                <CardDescription>Évolution de la moyenne générale</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Moyenne" />
                    <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" name="Objectif" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Progression par matière</CardTitle>
                <CardDescription>Évolution des moyennes par matière</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={subjectProgress}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 20]} />
                    <Radar name="Trimestre 1" dataKey="t1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Radar name="Trimestre 2" dataKey="t2" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    <Radar name="Trimestre 3" dataKey="t3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Objectifs et progression</CardTitle>
                <CardDescription>Suivi des objectifs fixés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {objectives.map((objective, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{objective.title}</span>
                        <span className="text-sm">
                          {objective.current}/{objective.target}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={(objective.current / objective.target) * 100} className="h-2 flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {Math.round((objective.current / objective.target) * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Compétences transversales</CardTitle>
                <CardDescription>Évaluation des compétences générales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transversalSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant={getSkillBadgeVariant(skill.level)}>{getSkillLevelLabel(skill.level)}</Badge>
                      </div>
                      <Progress value={skill.level * 25} className="h-2" />
                      <p className="text-sm text-muted-foreground">{skill.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Compétences par matière</CardTitle>
                <CardDescription>Évaluation des compétences spécifiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full bg-${skill.color}-500`} />
                          <span className="font-medium">{skill.subject}</span>
                        </div>
                        <Badge variant={getSkillBadgeVariant(skill.level)}>{getSkillLevelLabel(skill.level)}</Badge>
                      </div>
                      <Progress value={skill.level * 25} className="h-2" />
                      <p className="text-sm text-muted-foreground">{skill.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Assiduité par mois</CardTitle>
                <CardDescription>Taux de présence mensuel</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#3b82f6" name="Taux de présence (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Absences par matière</CardTitle>
                <CardDescription>Répartition des absences</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={absencesBySubject} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="subject" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Nombre d'heures" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Historique des absences</CardTitle>
                <CardDescription>Détail des absences et retards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {absenceHistory.map((absence, index) => (
                    <div key={index} className="flex items-start justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{absence.date}</div>
                        <div className="text-sm text-muted-foreground">{absence.subject}</div>
                        <div className="text-sm">{absence.reason}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={absence.justified ? "outline" : "destructive"}>
                          {absence.justified ? "Justifiée" : "Non justifiée"}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{absence.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir tout l'historique
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function getGradeColor(grade: number) {
  if (grade >= 16) return "bg-green-500"
  if (grade >= 14) return "bg-blue-500"
  if (grade >= 12) return "bg-yellow-500"
  if (grade >= 10) return "bg-orange-500"
  return "bg-red-500"
}

function getGradeBadgeVariant(grade: number) {
  if (grade >= 16) return "success"
  if (grade >= 14) return "default"
  if (grade >= 12) return "secondary"
  if (grade >= 10) return "outline"
  return "destructive"
}

function getSkillBadgeVariant(level: number) {
  switch (level) {
    case 4:
      return "success"
    case 3:
      return "default"
    case 2:
      return "secondary"
    case 1:
      return "outline"
    default:
      return "destructive"
  }
}

function getSkillLevelLabel(level: number) {
  switch (level) {
    case 4:
      return "Maîtrise excellente"
    case 3:
      return "Maîtrise satisfaisante"
    case 2:
      return "Maîtrise fragile"
    case 1:
      return "Maîtrise insuffisante"
    default:
      return "Non évalué"
  }
}

// Sample data
const subjectAverages = [
  { subject: "Maths", student: 16, class: 14.2 },
  { subject: "Français", student: 14, class: 13.8 },
  { subject: "Histoire", student: 17, class: 15.1 },
  { subject: "Physique", student: 15, class: 14.5 },
  { subject: "Anglais", student: 18, class: 15.7 },
  { subject: "SVT", student: 14, class: 14.9 },
]

const gradeEvolution = [
  { period: "Trimestre 1", average: 15.2, classAverage: 14.1 },
  { period: "Trimestre 2", average: 15.5, classAverage: 14.3 },
  { period: "Trimestre 3", average: 15.7, classAverage: 14.5 },
]

const recentGrades = [
  {
    subject: "Mathématiques",
    grade: 17.5,
    classAverage: 14.2,
    title: "Contrôle sur les fonctions dérivées",
    date: "05/02/2025",
  },
  {
    subject: "Français",
    grade: 15.5,
    classAverage: 13.8,
    title: "Dissertation sur Victor Hugo",
    date: "02/02/2025",
  },
  {
    subject: "Histoire",
    grade: 18.5,
    classAverage: 15.1,
    title: "Évaluation sur la Seconde Guerre mondiale",
    date: "28/01/2025",
  },
  {
    subject: "Physique",
    grade: 15.5,
    classAverage: 14.3,
    title: "TP sur les réactions chimiques",
    date: "25/01/2025",
  },
]

const yearlyProgress = [
  { month: "Sept", average: 15.0, target: 16.0 },
  { month: "Oct", average: 15.2, target: 16.0 },
  { month: "Nov", average: 15.3, target: 16.0 },
  { month: "Dec", average: 15.5, target: 16.0 },
  { month: "Jan", average: 15.6, target: 16.0 },
  { month: "Fev", average: 15.7, target: 16.0 },
  { month: "Mar", average: 15.8, target: 16.0 },
]

const subjectProgress = [
  { subject: "Maths", t1: 15, t2: 15.5, t3: 16 },
  { subject: "Français", t1: 13, t2: 13.5, t3: 14 },
  { subject: "Histoire", t1: 16, t2: 16.5, t3: 17 },
  { subject: "Physique", t1: 14, t2: 14.5, t3: 15 },
  { subject: "Anglais", t1: 17, t2: 17.5, t3: 18 },
  { subject: "SVT", t1: 13, t2: 13.5, t3: 14 },
]

const objectives = [
  {
    title: "Moyenne générale",
    current: 15.7,
    target: 16.0,
    description: "Objectif fixé en début d'année scolaire",
  },
  {
    title: "Moyenne en mathématiques",
    current: 16.0,
    target: 17.0,
    description: "Progression constante depuis le début de l'année",
  },
  {
    title: "Moyenne en français",
    current: 14.0,
    target: 15.0,
    description: "Des progrès à faire en expression écrite",
  },
]

const transversalSkills = [
  {
    name: "Autonomie",
    level: 4,
    comment: "Sophie fait preuve d'une excellente autonomie dans son travail.",
  },
  {
    name: "Travail en équipe",
    level: 3,
    comment: "Bonne capacité à travailler en groupe et à partager ses connaissances.",
  },
  {
    name: "Organisation",
    level: 3,
    comment: "Bonne organisation du travail et respect des délais.",
  },
  {
    name: "Expression orale",
    level: 2,
    comment: "Des progrès à faire pour s'exprimer avec plus d'aisance à l'oral.",
  },
]

const subjectSkills = [
  {
    subject: "Mathématiques",
    level: 4,
    comment: "Excellente maîtrise des concepts mathématiques.",
    color: "blue",
  },
  {
    subject: "Français",
    level: 3,
    comment: "Bonne compréhension des textes, expression écrite à améliorer.",
    color: "green",
  },
  {
    subject: "Histoire",
    level: 4,
    comment: "Excellente connaissance des événements historiques et capacité d'analyse.",
    color: "purple",
  },
  {
    subject: "Anglais",
    level: 4,
    comment: "Très bon niveau d'anglais, tant à l'écrit qu'à l'oral.",
    color: "orange",
  },
]

const monthlyAttendance = [
  { month: "Sept", rate: 100 },
  { month: "Oct", rate: 100 },
  { month: "Nov", rate: 98 },
  { month: "Dec", rate: 97 },
  { month: "Jan", rate: 96 },
  { month: "Fev", rate: 98 },
  { month: "Mar", rate: 99 },
]

const absencesBySubject = [
  { subject: "Mathématiques", count: 0 },
  { subject: "Français", count: 2 },
  { subject: "Histoire", count: 0 },
  { subject: "Physique", count: 1 },
  { subject: "Anglais", count: 0 },
  { subject: "SVT", count: 1 },
]

const absenceHistory = [
  {
    date: "15/01/2025",
    subject: "Français",
    reason: "Rendez-vous médical",
    justified: true,
    duration: "2 heures",
  },
  {
    date: "22/01/2025",
    subject: "Physique",
    reason: "Maladie",
    justified: true,
    duration: "1 heure",
  },
  {
    date: "05/02/2025",
    subject: "SVT",
    reason: "Retard",
    justified: false,
    duration: "30 minutes",
  },
]


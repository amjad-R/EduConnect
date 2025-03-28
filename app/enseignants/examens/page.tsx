"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Filter,
  MoreHorizontal,
  Download,
  Upload,
  Eye,
  Calendar,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface Exam {
  id: string
  title: string
  description: string
  class: string
  type: "test" | "quiz" | "exam" | "project"
  date: string
  duration: number
  maxPoints: number
  status: "scheduled" | "in-progress" | "completed" | "graded"
  notifyStudents?: boolean
  calculatorAllowed?: boolean
  classAverage?: number
  highestGrade?: number
  lowestGrade?: number
}

interface Student {
  id: string
  name: string
  class: string
  avatar: string
  grade: number
  comment: string
}

interface ExamTemplate {
  id: string
  title: string
  description: string
  subject: string
  type: string
  duration: number
  maxPoints: number
}

// Sample data for exams
const exams: Exam[] = [
  {
    id: "1",
    title: "Contrôle de mathématiques - Fonctions",
    description: "Contrôle sur les fonctions affines et quadratiques",
    class: "3A",
    type: "test",
    date: "2025-04-15",
    duration: 60,
    maxPoints: 20,
    status: "scheduled",
  },
  {
    id: "2",
    title: "Interrogation d'histoire - Révolution française",
    description: "Interrogation sur les causes et conséquences de la Révolution française",
    class: "4B",
    type: "quiz",
    date: "2025-04-10",
    duration: 30,
    maxPoints: 10,
    status: "scheduled",
  },
  {
    id: "3",
    title: "Examen de français - Littérature du XIXe siècle",
    description: "Examen sur les principaux auteurs et œuvres du XIXe siècle",
    class: "3B",
    type: "exam",
    date: "2025-04-20",
    duration: 120,
    maxPoints: 40,
    status: "scheduled",
  },
  {
    id: "4",
    title: "Projet de sciences - Écosystèmes",
    description: "Projet de groupe sur les écosystèmes locaux",
    class: "4A",
    type: "project",
    date: "2025-04-25",
    duration: 180,
    maxPoints: 50,
    status: "scheduled",
  },
  {
    id: "5",
    title: "Contrôle de physique - Mécanique",
    description: "Contrôle sur les lois de Newton et applications",
    class: "3A",
    type: "test",
    date: "2025-03-15",
    duration: 60,
    maxPoints: 20,
    status: "graded",
    classAverage: 14.8,
    highestGrade: 19.5,
    lowestGrade: 8.5,
  },
  {
    id: "6",
    title: "Examen de géographie - Mondialisation",
    description: "Examen sur les aspects économiques et sociaux de la mondialisation",
    class: "4C",
    type: "exam",
    date: "2025-03-10",
    duration: 90,
    maxPoints: 30,
    status: "completed",
  },
]

// Sample data for students
const students: Student[] = [
  {
    id: "s1",
    name: "Emma Martin",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 17.5,
    comment: "Excellent travail, bonne compréhension des concepts.",
  },
  {
    id: "s2",
    name: "Lucas Dubois",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 15,
    comment: "Bon travail, quelques erreurs de calcul.",
  },
  {
    id: "s3",
    name: "Chloé Bernard",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 19.5,
    comment: "Travail exceptionnel, parfaite maîtrise du sujet.",
  },
  {
    id: "s4",
    name: "Thomas Petit",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 12,
    comment: "Des difficultés avec certains concepts, mais effort visible.",
  },
  {
    id: "s5",
    name: "Léa Moreau",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 14.5,
    comment: "Bonne compréhension globale, manque de précision dans certaines réponses.",
  },
  {
    id: "s6",
    name: "Hugo Leroy",
    class: "3A",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: 8.5,
    comment: "Nombreuses lacunes, besoin de revoir les bases.",
  },
]

// Sample data for exam templates
const examTemplates: ExamTemplate[] = [
  {
    id: "t1",
    title: "Contrôle standard de mathématiques",
    description: "Template pour contrôle de mathématiques de 1 heure",
    subject: "Mathématiques",
    type: "Contrôle",
    duration: 60,
    maxPoints: 20,
  },
  {
    id: "t2",
    title: "Interrogation rapide d'histoire",
    description: "Template pour interrogation courte d'histoire",
    subject: "Histoire",
    type: "Interrogation",
    duration: 20,
    maxPoints: 10,
  },
  {
    id: "t3",
    title: "Examen de fin de trimestre",
    description: "Template pour examen complet de fin de trimestre",
    subject: "Multidisciplinaire",
    type: "Examen",
    duration: 120,
    maxPoints: 40,
  },
  {
    id: "t4",
    title: "Projet de groupe sciences",
    description: "Template pour projet de groupe en sciences",
    subject: "Sciences",
    type: "Projet",
    duration: 0,
    maxPoints: 50,
  },
  {
    id: "t5",
    title: "Évaluation pratique d'EPS",
    description: "Template pour évaluation pratique d'éducation physique",
    subject: "EPS",
    type: "Pratique",
    duration: 45,
    maxPoints: 20,
  },
  {
    id: "t6",
    title: "Contrôle de langue étrangère",
    description: "Template pour contrôle de langue avec compréhension écrite et orale",
    subject: "Langues",
    type: "Contrôle",
    duration: 90,
    maxPoints: 30,
  },
]

const Page: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddExamOpen, setIsAddExamOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)

  // Filter exams based on search query, class filter, and status filter
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || exam.class === classFilter
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter

    return matchesSearch && matchesClass && matchesStatus
  })

  const handleEditExam = (exam: Exam) => {
    setSelectedExam(exam)
    setIsAddExamOpen(true)
  }

  const handleDeleteExam = (exam: Exam) => {
    setSelectedExam(exam)
    setIsDeleteDialogOpen(true)
  }

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the exam to the database
    setIsAddExamOpen(false)
    setSelectedExam(null)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the exam from the database
    setIsDeleteDialogOpen(false)
    setSelectedExam(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleGradeStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsGradeDialogOpen(true)
  }

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the grade in the database
    setIsGradeDialogOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Examens</h2>
          <p className="text-muted-foreground">Organisez les évaluations et gérez les résultats.</p>
        </div>
        <Dialog open={isAddExamOpen} onOpenChange={setIsAddExamOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Nouvel examen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedExam ? "Modifier l'examen" : "Créer un nouvel examen"}</DialogTitle>
              <DialogDescription>
                {selectedExam
                  ? "Modifiez les détails de l'examen ci-dessous."
                  : "Remplissez les informations pour créer un nouvel examen."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddExam}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre
                  </Label>
                  <Input id="title" defaultValue={selectedExam?.title || ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Classe
                  </Label>
                  <Select defaultValue={selectedExam?.class || "3A"}>
                    <SelectTrigger id="class" className="col-span-3">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3A">3ème A</SelectItem>
                      <SelectItem value="3B">3ème B</SelectItem>
                      <SelectItem value="4A">4ème A</SelectItem>
                      <SelectItem value="4B">4ème B</SelectItem>
                      <SelectItem value="4C">4ème C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue={selectedExam?.type || "test"}>
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Contrôle</SelectItem>
                      <SelectItem value="quiz">Interrogation</SelectItem>
                      <SelectItem value="exam">Examen</SelectItem>
                      <SelectItem value="project">Projet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    defaultValue={selectedExam?.description || ""}
                    className="col-span-3 min-h-[120px]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    defaultValue={selectedExam?.date || new Date().toISOString().split("T")[0]}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Durée (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    defaultValue={selectedExam?.duration || "60"}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxPoints" className="text-right">
                    Points maximum
                  </Label>
                  <Input
                    id="maxPoints"
                    type="number"
                    defaultValue={selectedExam?.maxPoints || "20"}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label>Options</Label>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify" defaultChecked={selectedExam?.notifyStudents || false} />
                      <Label htmlFor="notify">Notifier les élèves</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="calculator" defaultChecked={selectedExam?.calculatorAllowed || false} />
                      <Label htmlFor="calculator">Calculatrice autorisée</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{selectedExam ? "Enregistrer les modifications" : "Créer l'examen"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un examen..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passés</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="3A">3ème A</SelectItem>
                <SelectItem value="3B">3ème B</SelectItem>
                <SelectItem value="4A">4ème A</SelectItem>
                <SelectItem value="4B">4ème B</SelectItem>
                <SelectItem value="4C">4ème C</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="scheduled">Programmé</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="graded">Noté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams.filter((exam) => exam.status === "scheduled").length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucun examen à venir</p>
                <p className="text-sm text-muted-foreground">Aucun examen ne correspond à vos critères de recherche.</p>
              </div>
            ) : (
              filteredExams
                .filter((exam) => exam.status === "scheduled")
                .map((exam) => (
                  <Card key={exam.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="line-clamp-1">{exam.title}</CardTitle>
                          <CardDescription>
                            {exam.class} • {exam.date} • {exam.duration} min
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            exam.type === "test"
                              ? "default"
                              : exam.type === "quiz"
                                ? "secondary"
                                : exam.type === "exam"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {exam.type === "test" && "Contrôle"}
                          {exam.type === "quiz" && "Interrogation"}
                          {exam.type === "exam" && "Examen"}
                          {exam.type === "project" && "Projet"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{exam.description}</p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.duration} minutes</span>
                        </div>
                        <div>
                          <span className="font-medium">{exam.maxPoints}</span>
                          <span className="text-muted-foreground"> points</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/enseignants/examens/${exam.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </a>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditExam(exam)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteExam(exam)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Plus</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                            <DropdownMenuItem>Exporter</DropdownMenuItem>
                            <DropdownMenuItem>Partager</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams.filter((exam) => exam.status === "completed" || exam.status === "graded").length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucun examen passé</p>
                <p className="text-sm text-muted-foreground">Aucun examen ne correspond à vos critères de recherche.</p>
              </div>
            ) : (
              filteredExams
                .filter((exam) => exam.status === "completed" || exam.status === "graded")
                .map((exam) => (
                  <Card key={exam.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="line-clamp-1">{exam.title}</CardTitle>
                          <CardDescription>
                            {exam.class} • {exam.date} • {exam.duration} min
                          </CardDescription>
                        </div>
                        <Badge variant={exam.status === "graded" ? "success" : "secondary"}>
                          {exam.status === "graded" ? "Noté" : "Terminé"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{exam.description}</p>
                      {exam.status === "graded" && (
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Moyenne de la classe:</span>
                            <span className="font-medium">{exam.classAverage}/20</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Note la plus haute:</span>
                            <span className="font-medium">{exam.highestGrade}/20</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Note la plus basse:</span>
                            <span className="font-medium">{exam.lowestGrade}/20</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        {exam.status === "graded" ? (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les résultats
                          </>
                        ) : (
                          <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Noter
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exporter
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Résultats d'examen</CardTitle>
                  <CardDescription>Sélectionnez un examen pour voir les résultats détaillés</CardDescription>
                </div>
                <Select>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Sélectionner un examen" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams
                      .filter((exam) => exam.status === "graded")
                      .map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.title} - {exam.class} ({exam.date})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Pourcentage</TableHead>
                    <TableHead>Rang</TableHead>
                    <TableHead>Commentaire</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.class}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{student.grade}/20</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(student.grade / 20) * 100} className="h-2 w-16" />
                          <span>{Math.round((student.grade / 20) * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {index + 1}/{students.length}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{student.comment}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleGradeStudent(student)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Moyenne de la classe: <span className="font-medium">14.8/20</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les résultats
                </Button>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Publier les résultats
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{template.title}</CardTitle>
                    <Badge variant="outline">{template.subject}</Badge>
                  </div>
                  <CardDescription>
                    {template.type} • {template.duration} min • {template.maxPoints} points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Aperçu
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Utiliser
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'examen "{selectedExam?.title}" ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la note</DialogTitle>
            <DialogDescription>Modifiez la note et\</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitGrade}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Note
                </Label>
                <Input id="grade" type="number" defaultValue={selectedStudent?.grade || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="comment" className="text-right pt-2">
                  Commentaire
                </Label>
                <Textarea
                  id="comment"
                  defaultValue={selectedStudent?.comment || ""}
                  className="col-span-3 min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enregistrer la note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page


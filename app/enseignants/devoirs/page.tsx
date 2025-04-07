"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, Download, Filter, MoreHorizontal, Check, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [assignmentType, setAssignmentType] = useState("all")
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [activeTab, setActiveTab] = useState("assignments")

  // Filter assignments based on search query and type
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.class.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = assignmentType === "all" || assignment.type === assignmentType

    return matchesSearch && matchesType
  })

  // Filter submissions based on search query
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.class.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsAddAssignmentOpen(true)
  }

  const handleDeleteAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setIsDeleteDialogOpen(true)
  }

  const handleGradeSubmission = (submission: Submission) => {
    setSelectedSubmission(submission)
    setIsGradeDialogOpen(true)
  }

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the assignment to the database
    setIsAddAssignmentOpen(false)
    setSelectedAssignment(null)
  }

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the grade in the database
    setIsGradeDialogOpen(false)
    setSelectedSubmission(null)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the assignment from the database
    setIsDeleteDialogOpen(false)
    setSelectedAssignment(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Actif</Badge>
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>
      case "completed":
        return <Badge variant="secondary">Terminé</Badge>
      default:
        return null
    }
  }

  const getSubmissionStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="default">Soumis</Badge>
      case "late":
        return <Badge variant="destructive">En retard</Badge>
      case "graded":
        return <Badge variant="success">Noté</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Devoirs et Évaluations</h2>
          <p className="text-muted-foreground">
            Gérez les devoirs, notez les travaux et suivez les progrès des élèves.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Exporter</span>
          </Button>
          <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span>Nouveau devoir</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedAssignment ? "Modifier le devoir" : "Créer un nouveau devoir"}</DialogTitle>
                <DialogDescription>
                  {selectedAssignment
                    ? "Modifiez les détails du devoir ci-dessous."
                    : "Remplissez les informations pour créer un nouveau devoir."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAssignment}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Titre
                    </Label>
                    <Input id="title" defaultValue={selectedAssignment?.title || ""} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">
                      Classe
                    </Label>
                    <Select defaultValue={selectedAssignment?.class || "3A"}>
                      <SelectTrigger id="class" className="col-span-3">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3A">3ème A</SelectItem>
                        <SelectItem value="3B">3ème B</SelectItem>
                        <SelectItem value="4A">4ème A</SelectItem>
                        <SelectItem value="4B">4ème B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue={selectedAssignment?.type || "homework"}>
                      <SelectTrigger id="type" className="col-span-3">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homework">Devoir maison</SelectItem>
                        <SelectItem value="exam">Contrôle</SelectItem>
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
                      defaultValue={selectedAssignment?.description || ""}
                      className="col-span-3 min-h-[120px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Date limite
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      defaultValue={selectedAssignment?.dueDate || new Date().toISOString().split("T")[0]}
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
                      defaultValue={selectedAssignment?.maxPoints || "20"}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {selectedAssignment ? "Enregistrer les modifications" : "Créer le devoir"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={activeTab === "assignments" ? "Rechercher un devoir..." : "Rechercher une soumission..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="assignments">Devoirs</TabsTrigger>
            <TabsTrigger value="submissions">Soumissions</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          {activeTab === "assignments" && (
            <Select value={assignmentType} onValueChange={setAssignmentType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="homework">Devoirs maison</SelectItem>
                <SelectItem value="exam">Contrôles</SelectItem>
                <SelectItem value="project">Projets</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <TabsContent value="assignments">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date limite</TableHead>
                  <TableHead>Soumissions</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucun devoir trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {assignment.description}
                        </div>
                      </TableCell>
                      <TableCell>{assignment.class}</TableCell>
                      <TableCell>
                        {assignment.type === "homework" && "Devoir maison"}
                        {assignment.type === "exam" && "Contrôle"}
                        {assignment.type === "project" && "Projet"}
                      </TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {assignment.submissionsCount}/{assignment.totalStudents}
                          </span>
                          <Progress
                            value={(assignment.submissionsCount / assignment.totalStudents) * 100}
                            className="h-2 w-16"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditAssignment(assignment)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteAssignment(assignment)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Devoir</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Date de soumission</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucune soumission trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={submission.studentAvatar} alt={submission.studentName} />
                            <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{submission.studentName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{submission.assignmentTitle}</TableCell>
                      <TableCell>{submission.class}</TableCell>
                      <TableCell>{submission.submittedAt}</TableCell>
                      <TableCell>{getSubmissionStatusBadge(submission.status)}</TableCell>
                      <TableCell>
                        {submission.grade ? `${submission.grade}/${submission.maxPoints}` : "Non noté"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleGradeSubmission(submission)}>
                              <Check className="mr-2 h-4 w-4" />
                              Noter
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de soumission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% par rapport au trimestre précédent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.8/20</div>
                <p className="text-xs text-muted-foreground">+0.3 par rapport au trimestre précédent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devoirs en retard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8%</div>
                <p className="text-xs text-muted-foreground">-1.5% par rapport au trimestre précédent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devoirs à noter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Soumis dans les 7 derniers jours</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance par classe</CardTitle>
                <CardDescription>Moyenne des notes par classe</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Chart would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique de performance par classe</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taux de soumission</CardTitle>
                <CardDescription>Pourcentage de devoirs rendus à temps</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Chart would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique de taux de soumission</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le devoir "{selectedAssignment?.title}" ? Cette action est
              irréversible.
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
            <DialogTitle>Noter le devoir</DialogTitle>
            <DialogDescription>
              Attribuez une note et des commentaires pour la soumission de {selectedSubmission?.studentName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitGrade}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Note
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input id="grade" type="number" defaultValue={selectedSubmission?.grade || ""} className="w-20" />
                  <span>/ {selectedSubmission?.maxPoints || 20}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="feedback" className="text-right pt-2">
                  Commentaires
                </Label>
                <Textarea
                  id="feedback"
                  defaultValue={selectedSubmission?.feedback || ""}
                  className="col-span-3 min-h-[120px]"
                  placeholder="Ajoutez vos commentaires ici..."
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

interface Assignment {
  id: string
  title: string
  description: string
  class: string
  type: string
  dueDate: string
  maxPoints: number
  submissionsCount: number
  totalStudents: number
  status: string
}

interface Submission {
  id: string
  studentName: string
  studentAvatar: string
  assignmentTitle: string
  class: string
  submittedAt: string
  status: string
  grade: number | null
  maxPoints: number
  feedback?: string
}

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Exercices sur les fonctions dérivées",
    description: "Résoudre les exercices 1 à 5 du chapitre 4 sur les applications des fonctions dérivées.",
    class: "3A",
    type: "homework",
    dueDate: "15/03/2025",
    maxPoints: 20,
    submissionsCount: 22,
    totalStudents: 28,
    status: "active",
  },
  {
    id: "2",
    title: "Contrôle sur les équations du second degré",
    description: "Évaluation sur la résolution des équations du second degré et leurs applications.",
    class: "3A",
    type: "exam",
    dueDate: "10/03/2025",
    maxPoints: 20,
    submissionsCount: 28,
    totalStudents: 28,
    status: "completed",
  },
  {
    id: "3",
    title: "Projet de statistiques",
    description: "Réaliser une étude statistique sur un sujet de votre choix en utilisant les méthodes vues en cours.",
    class: "4B",
    type: "project",
    dueDate: "25/03/2025",
    maxPoints: 20,
    submissionsCount: 15,
    totalStudents: 26,
    status: "active",
  },
  {
    id: "4",
    title: "Exercices sur les suites numériques",
    description: "Résoudre les exercices 1 à 4 du chapitre 5 sur les suites arithmétiques et géométriques.",
    class: "3B",
    type: "homework",
    dueDate: "18/03/2025",
    maxPoints: 20,
    submissionsCount: 18,
    totalStudents: 27,
    status: "active",
  },
  {
    id: "5",
    title: "Préparation au contrôle de géométrie",
    description: "Exercices de révision pour le prochain contrôle sur la géométrie dans l'espace.",
    class: "4A",
    type: "homework",
    dueDate: "20/03/2025",
    maxPoints: 20,
    submissionsCount: 0,
    totalStudents: 25,
    status: "draft",
  },
]

const submissions: Submission[] = [
  {
    id: "1",
    studentName: "Sophie Martin",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    assignmentTitle: "Exercices sur les fonctions dérivées",
    class: "3A",
    submittedAt: "12/03/2025",
    status: "submitted",
    grade: null,
    maxPoints: 20,
  },
  {
    id: "2",
    studentName: "Lucas Dubois",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    assignmentTitle: "Exercices sur les fonctions dérivées",
    class: "3A",
    submittedAt: "13/03/2025",
    status: "submitted",
    grade: null,
    maxPoints: 20,
  },
  {
    id: "3",
    studentName: "Emma Petit",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    assignmentTitle: "Exercices sur les fonctions dérivées",
    class: "3A",
    submittedAt: "15/03/2025",
    status: "late",
    grade: null,
    maxPoints: 20,
  },
  {
    id: "4",
    studentName: "Sophie Martin",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    assignmentTitle: "Contrôle sur les équations du second degré",
    class: "3A",
    submittedAt: "10/03/2025",
    status: "graded",
    grade: 17,
    maxPoints: 20,
    feedback: "Excellent travail, très bonne maîtrise des concepts.",
  },
  {
    id: "5",
    studentName: "Lucas Dubois",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    assignmentTitle: "Contrôle sur les équations du second degré",
    class: "3A",
    submittedAt: "10/03/2025",
    status: "graded",
    grade: 15,
    maxPoints: 20,
    feedback: "Bon travail, quelques erreurs de calcul.",
  },
]


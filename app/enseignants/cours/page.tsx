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
  FileText,
  Video,
  BookOpen,
  Download,
  Upload,
  Eye,
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

export default function CoursPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Filter courses based on search query, class filter, and type filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || course.class === classFilter
    const matchesType = typeFilter === "all" || course.type === typeFilter

    return matchesSearch && matchesClass && matchesType
  })

  // Filter resources based on search query, class filter, and type filter
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || resource.class === classFilter
    const matchesType = typeFilter === "all" || resource.type === typeFilter

    return matchesSearch && matchesClass && matchesType
  })

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsAddCourseOpen(true)
  }

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the course to the database
    setIsAddCourseOpen(false)
    setSelectedCourse(null)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the course from the database
    setIsDeleteDialogOpen(false)
    setSelectedCourse(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Cours</h2>
          <p className="text-muted-foreground">
            Créez et organisez vos leçons, ressources pédagogiques et calendriers.
          </p>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Nouveau cours</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedCourse ? "Modifier le cours" : "Créer un nouveau cours"}</DialogTitle>
              <DialogDescription>
                {selectedCourse
                  ? "Modifiez les détails du cours ci-dessous."
                  : "Remplissez les informations pour créer un nouveau cours."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCourse}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre
                  </Label>
                  <Input id="title" defaultValue={selectedCourse?.title || ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Classe
                  </Label>
                  <Select defaultValue={selectedCourse?.class || "3A"}>
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
                  <Select defaultValue={selectedCourse?.type || "lesson"}>
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lesson">Leçon</SelectItem>
                      <SelectItem value="exercise">Exercices</SelectItem>
                      <SelectItem value="project">Projet</SelectItem>
                      <SelectItem value="evaluation">Évaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    defaultValue={selectedCourse?.description || ""}
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
                    defaultValue={selectedCourse?.date || new Date().toISOString().split("T")[0]}
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
                    defaultValue={selectedCourse?.duration || "60"}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label>Options</Label>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="published" defaultChecked={selectedCourse?.published || false} />
                      <Label htmlFor="published">Publier immédiatement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify" defaultChecked={selectedCourse?.notifyStudents || false} />
                      <Label htmlFor="notify">Notifier les élèves</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{selectedCourse ? "Enregistrer les modifications" : "Créer le cours"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="courses" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={activeTab === "courses" ? "Rechercher un cours..." : "Rechercher une ressource..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="courses">Cours</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
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

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="lesson">Leçons</SelectItem>
                <SelectItem value="exercise">Exercices</SelectItem>
                <SelectItem value="project">Projets</SelectItem>
                <SelectItem value="evaluation">Évaluations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucun cours trouvé</p>
                <p className="text-sm text-muted-foreground">Aucun cours ne correspond à vos critères de recherche.</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg?height=180&width=320"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                    {!course.published && (
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        Brouillon
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription>
                          {course.class} • {course.date} • {course.duration} min
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {course.type === "lesson" && "Leçon"}
                        {course.type === "exercise" && "Exercices"}
                        {course.type === "project" && "Projet"}
                        {course.type === "evaluation" && "Évaluation"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/enseignants/cours/${course.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </a>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditCourse(course)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course)}>
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

        <TabsContent value="resources">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune ressource trouvée</p>
                <p className="text-sm text-muted-foreground">
                  Aucune ressource ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {resource.type === "document" && <FileText className="h-5 w-5 text-blue-500" />}
                        {resource.type === "video" && <Video className="h-5 w-5 text-red-500" />}
                        {resource.type === "exercise" && <BookOpen className="h-5 w-5 text-green-500" />}
                        <CardTitle className="text-base line-clamp-1">{resource.title}</CardTitle>
                      </div>
                      <Badge variant="outline">
                        {resource.type === "document" && "Document"}
                        {resource.type === "video" && "Vidéo"}
                        {resource.type === "exercise" && "Exercice"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {resource.class} • {resource.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {resource.type === "document" && `Taille: ${resource.fileSize}`}
                      {resource.type === "video" && `Durée: ${resource.duration}`}
                      {resource.type === "exercise" && `Difficulté: ${resource.difficulty}`}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter une nouvelle ressource</CardTitle>
                <CardDescription>Téléchargez un document, une vidéo ou un exercice pour vos élèves</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-title">Titre</Label>
                      <Input id="resource-title" placeholder="Titre de la ressource" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resource-type">Type</Label>
                      <Select>
                        <SelectTrigger id="resource-type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="video">Vidéo</SelectItem>
                          <SelectItem value="exercise">Exercice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-class">Classe</Label>
                      <Select>
                        <SelectTrigger id="resource-class">
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
                    <div className="space-y-2">
                      <Label htmlFor="resource-date">Date</Label>
                      <Input id="resource-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Description</Label>
                    <Textarea id="resource-description" placeholder="Description de la ressource" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-file">Fichier</Label>
                    <div className="flex gap-2">
                      <Input id="resource-file" type="file" className="flex-1" onChange={handleFileChange} />
                      <Button size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    {selectedFile && (
                      <div className="text-xs text-muted-foreground">Fichier sélectionné: {selectedFile.name}</div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Ajouter la ressource</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des cours</CardTitle>
              <CardDescription>Planifiez et visualisez vos cours pour les semaines à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Mars 2025</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Semaine précédente
                    </Button>
                    <Button variant="outline" size="sm">
                      Aujourd'hui
                    </Button>
                    <Button variant="outline" size="sm">
                      Semaine suivante
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Horaire</TableHead>
                        <TableHead>Lundi 15</TableHead>
                        <TableHead>Mardi 16</TableHead>
                        <TableHead>Mercredi 17</TableHead>
                        <TableHead>Jeudi 18</TableHead>
                        <TableHead>Vendredi 19</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((timeSlot) => (
                        <TableRow key={timeSlot}>
                          <TableCell className="font-medium">{timeSlot}</TableCell>
                          {[0, 1, 2, 3, 4].map((day) => {
                            const courseForSlot = calendarData.find((c) => c.day === day && c.timeSlot === timeSlot)
                            return (
                              <TableCell key={day} className="min-h-[80px] align-top">
                                {courseForSlot ? (
                                  <div className={`p-2 rounded-md ${courseForSlot.bgColor} h-full`}>
                                    <div className="font-medium">{courseForSlot.title}</div>
                                    <div className="text-xs">{courseForSlot.class}</div>
                                    <div className="text-xs">{courseForSlot.room}</div>
                                  </div>
                                ) : null}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Prochains cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses.map((class_, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${class_.iconBg}`}>
                              <BookOpen className={`h-5 w-5 ${class_.iconColor}`} />
                            </div>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">{class_.title}</p>
                              <p className="text-xs text-muted-foreground">{class_.time}</p>
                              <p className="text-sm text-muted-foreground">{class_.room}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cours à préparer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {coursesToPrepare.map((course, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${course.iconBg}`}>
                              <FileText className={`h-5 w-5 ${course.iconColor}`} />
                            </div>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">{course.title}</p>
                              <p className="text-xs text-muted-foreground">{course.date}</p>
                              <p className="text-sm text-muted-foreground">{course.class}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le cours "{selectedCourse?.title}" ? Cette action est irréversible.
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
    </div>
  )
}

interface Course {
  id: string
  title: string
  description: string
  class: string
  type: string
  date: string
  duration: string
  published: boolean
  notifyStudents?: boolean
  thumbnail?: string
}

interface Resource {
  id: string
  title: string
  description: string
  class: string
  type: string
  date: string
  fileSize?: string
  duration?: string
  difficulty?: string
}

interface CalendarEntry {
  day: number
  timeSlot: string
  title: string
  class: string
  room: string
  bgColor: string
}

interface UpcomingClass {
  title: string
  time: string
  room: string
  iconBg: string
  iconColor: string
}

interface CourseToPrepare {
  title: string
  date: string
  class: string
  iconBg: string
  iconColor: string
}

// Sample data
const courses: Course[] = [
  {
    id: "1",
    title: "Les fonctions dérivées et leurs applications",
    description:
      "Cours complet sur les fonctions dérivées, leurs propriétés et applications dans la résolution de problèmes.",
    class: "3A",
    type: "lesson",
    date: "2025-03-15",
    duration: "60",
    published: true,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "2",
    title: "Exercices sur les équations du second degré",
    description: "Série d'exercices pour pratiquer la résolution des équations du second degré et leurs applications.",
    class: "3A",
    type: "exercise",
    date: "2025-03-18",
    duration: "45",
    published: true,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "3",
    title: "Projet de statistiques",
    description:
      "Projet de groupe sur l'analyse statistique de données réelles avec application des concepts vus en cours.",
    class: "4B",
    type: "project",
    date: "2025-03-25",
    duration: "90",
    published: false,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "4",
    title: "Contrôle sur les suites numériques",
    description: "Évaluation sur les suites arithmétiques et géométriques, limites et applications.",
    class: "3B",
    type: "evaluation",
    date: "2025-03-22",
    duration: "60",
    published: true,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "5",
    title: "Les vecteurs dans l'espace",
    description: "Introduction aux vecteurs dans l'espace, opérations et applications en géométrie.",
    class: "4A",
    type: "lesson",
    date: "2025-03-20",
    duration: "60",
    published: true,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "6",
    title: "Exercices de révision pour le brevet",
    description: "Série d'exercices de révision couvrant tous les thèmes importants pour l'examen du brevet.",
    class: "3A",
    type: "exercise",
    date: "2025-04-05",
    duration: "90",
    published: false,
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]

const resources: Resource[] = [
  {
    id: "1",
    title: "Cours complet sur les fonctions dérivées",
    description: "Document PDF contenant le cours complet sur les fonctions dérivées avec exemples et exercices.",
    class: "3A",
    type: "document",
    date: "2025-03-10",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    title: "Vidéo explicative: Résolution d'équations du second degré",
    description: "Vidéo pédagogique expliquant pas à pas la méthode de résolution des équations du second degré.",
    class: "3A",
    type: "video",
    date: "2025-03-12",
    duration: "15 min",
  },
  {
    id: "3",
    title: "Exercices corrigés sur les suites numériques",
    description: "Série d'exercices avec corrections détaillées sur les suites arithmétiques et géométriques.",
    class: "3B",
    type: "exercise",
    date: "2025-03-15",
    difficulty: "Moyen",
  },
  {
    id: "4",
    title: "Fiche de révision: Géométrie dans l'espace",
    description: "Document récapitulatif sur les notions essentielles de géométrie dans l'espace.",
    class: "4A",
    type: "document",
    date: "2025-03-18",
    fileSize: "1.8 MB",
  },
  {
    id: "5",
    title: "Vidéo: Méthode de résolution de problèmes",
    description: "Tutoriel vidéo sur la méthodologie de résolution de problèmes mathématiques complexes.",
    class: "4B",
    type: "video",
    date: "2025-03-20",
    duration: "22 min",
  },
  {
    id: "6",
    title: "Exercices d'entraînement pour le brevet",
    description: "Compilation d'exercices types pour la préparation à l'examen du brevet.",
    class: "3A",
    type: "exercise",
    date: "2025-03-25",
    difficulty: "Difficile",
  },
]

const timeSlots = ["8h-9h", "9h-10h", "10h-11h", "11h-12h", "14h-15h", "15h-16h", "16h-17h"]

const calendarData: CalendarEntry[] = [
  {
    day: 0, // Lundi
    timeSlot: "8h-9h",
    title: "Mathématiques",
    class: "3ème A",
    room: "Salle 201",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 0, // Lundi
    timeSlot: "10h-11h",
    title: "Mathématiques",
    class: "4ème B",
    room: "Salle 105",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 1, // Mardi
    timeSlot: "9h-10h",
    title: "Mathématiques",
    class: "3ème B",
    room: "Salle 202",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 1, // Mardi
    timeSlot: "14h-15h",
    title: "Mathématiques",
    class: "4ème A",
    room: "Salle 105",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 2, // Mercredi
    timeSlot: "8h-9h",
    title: "Mathématiques",
    class: "4ème C",
    room: "Salle 203",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 3, // Jeudi
    timeSlot: "10h-11h",
    title: "Mathématiques",
    class: "3ème A",
    room: "Salle 201",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 3, // Jeudi
    timeSlot: "15h-16h",
    title: "Mathématiques",
    class: "4ème B",
    room: "Salle 105",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 4, // Vendredi
    timeSlot: "9h-10h",
    title: "Mathématiques",
    class: "3ème B",
    room: "Salle 202",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    day: 4, // Vendredi
    timeSlot: "11h-12h",
    title: "Mathématiques",
    class: "4ème C",
    room: "Salle 203",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
]

const upcomingClasses: UpcomingClass[] = [
  {
    title: "Mathématiques - 3ème A",
    time: "Aujourd'hui, 10h-11h",
    room: "Salle 201",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Mathématiques - 4ème B",
    time: "Aujourd'hui, 15h-16h",
    room: "Salle 105",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Mathématiques - 3ème B",
    time: "Demain, 9h-10h",
    room: "Salle 202",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
]

const coursesToPrepare: CourseToPrepare[] = [
  {
    title: "Contrôle sur les suites numériques",
    date: "22 mars 2025",
    class: "3ème B",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    title: "Projet de statistiques",
    date: "25 mars 2025",
    class: "4ème B",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Exercices de révision pour le brevet",
    date: "5 avril 2025",
    class: "3ème A",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
]


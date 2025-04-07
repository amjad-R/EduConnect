"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Eye,
  FileText,
} from "lucide-react"

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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Activity {
  id: string
  title: string
  type: "note" | "absence" | "discipline" | "document" | "decision"
  status: "pending" | "approved" | "rejected" | "needs_review"
  teacher: {
    name: string
    avatar: string
  }
  student?: {
    name: string
    class: string
    avatar: string
  }
  class?: string
  date: string
  description: string
  priority: "low" | "medium" | "high"
}

export default function SurveillancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activityType, setActivityType] = useState("all")
  const [activityStatus, setActivityStatus] = useState("all")
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [reviewComment, setReviewComment] = useState("")

  // Filter activities based on search query, type and status
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false

    const matchesType = activityType === "all" || activity.type === activityType
    const matchesStatus = activityStatus === "all" || activity.status === activityStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsDetailsOpen(true)
  }

  const handleReviewActivity = (activity: Activity) => {
    setSelectedActivity(activity)
    setReviewComment("")
    setIsReviewOpen(true)
  }

  const handleApprove = () => {
    // In a real app, you would update the activity status in the database
    setIsReviewOpen(false)
  }

  const handleReject = () => {
    // In a real app, you would update the activity status in the database
    setIsReviewOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Approuvé
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            <XCircle className="mr-1 h-3 w-3" />
            Rejeté
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "needs_review":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            <AlertCircle className="mr-1 h-3 w-3" />À examiner
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "note":
        return <Badge variant="secondary">Note</Badge>
      case "absence":
        return <Badge variant="secondary">Absence</Badge>
      case "discipline":
        return <Badge variant="secondary">Discipline</Badge>
      case "document":
        return <Badge variant="secondary">Document</Badge>
      case "decision":
        return <Badge variant="secondary">Décision</Badge>
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            Haute
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            Moyenne
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            Basse
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Surveillance des Activités</h2>
          <p className="text-muted-foreground">
            Suivez et validez les actions pédagogiques et administratives de l'établissement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Exporter</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une activité..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActivityStatus("all")}>Tous les statuts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityStatus("pending")}>En attente</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityStatus("approved")}>Approuvés</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityStatus("rejected")}>Rejetés</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivityStatus("needs_review")}>À examiner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type d'activité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="note">Notes</SelectItem>
              <SelectItem value="absence">Absences</SelectItem>
              <SelectItem value="discipline">Discipline</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="decision">Décisions</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={activityStatus} onValueChange={setActivityStatus} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-4 sm:w-[400px]">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="needs_review">À examiner</TabsTrigger>
              <TabsTrigger value="approved">Approuvés</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activité</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Enseignant</TableHead>
              <TableHead>Élève/Classe</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucune activité trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">{activity.description}</div>
                  </TableCell>
                  <TableCell>{getTypeBadge(activity.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.teacher.avatar} alt={activity.teacher.name} />
                        <AvatarFallback>{activity.teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{activity.teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {activity.student ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.student.avatar} alt={activity.student.name} />
                          <AvatarFallback>{activity.student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm">{activity.student.name}</span>
                          <div className="text-xs text-muted-foreground">{activity.student.class}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm">{activity.class}</span>
                    )}
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell>{getPriorityBadge(activity.priority)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(activity)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les détails
                        </DropdownMenuItem>
                        {(activity.status === "pending" || activity.status === "needs_review") && (
                          <DropdownMenuItem onClick={() => handleReviewActivity(activity)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Examiner
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de l'activité</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeBadge(selectedActivity.type)}
                  {getPriorityBadge(selectedActivity.priority)}
                </div>
                {getStatusBadge(selectedActivity.status)}
              </div>
              <h3 className="text-xl font-bold">{selectedActivity.title}</h3>
              <div className="flex items-center gap-3 border-b pb-3">
                <Avatar>
                  <AvatarImage src={selectedActivity.teacher.avatar} alt={selectedActivity.teacher.name} />
                  <AvatarFallback>{selectedActivity.teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedActivity.teacher.name}</div>
                  <div className="text-sm text-muted-foreground">Enseignant</div>
                </div>
              </div>
              {selectedActivity.student && (
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar>
                    <AvatarImage src={selectedActivity.student.avatar} alt={selectedActivity.student.name} />
                    <AvatarFallback>{selectedActivity.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedActivity.student.name}</div>
                    <div className="text-sm text-muted-foreground">Élève - {selectedActivity.student.class}</div>
                  </div>
                </div>
              )}
              {selectedActivity.class && !selectedActivity.student && (
                <div className="border-b pb-3">
                  <div className="font-medium">Classe concernée</div>
                  <div className="text-sm">{selectedActivity.class}</div>
                </div>
              )}
              <div className="border-b pb-3">
                <div className="font-medium">Description</div>
                <div className="text-sm whitespace-pre-wrap mt-1">{selectedActivity.description}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Date: {selectedActivity.date}</div>
                {(selectedActivity.status === "pending" || selectedActivity.status === "needs_review") && (
                  <Button onClick={() => handleReviewActivity(selectedActivity)}>Examiner</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Examiner l'activité</DialogTitle>
            <DialogDescription>
              Veuillez examiner cette activité et décider si elle doit être approuvée ou rejetée.
            </DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{selectedActivity.title}</CardTitle>
                  <CardDescription>
                    Soumis par {selectedActivity.teacher.name} le {selectedActivity.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedActivity.description}</p>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="comment">Commentaire (optionnel)</Label>
                <Textarea
                  id="comment"
                  placeholder="Ajoutez un commentaire ou une justification..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsReviewOpen(false)} className="sm:order-1">
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleReject} className="sm:order-2">
              <XCircle className="mr-2 h-4 w-4" />
              Rejeter
            </Button>
            <Button onClick={handleApprove} className="sm:order-3">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approuver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sample data
const activities: Activity[] = [
  {
    id: "1",
    title: "Modification du barème d'évaluation en mathématiques",
    type: "decision",
    status: "pending",
    teacher: {
      name: "M. Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "Toutes les classes de 3ème",
    date: "15/03/2025",
    description:
      "Proposition de modification du barème d'évaluation pour les contrôles de mathématiques du 3ème trimestre. Les exercices de raisonnement auront un coefficient plus important.",
    priority: "medium",
  },
  {
    id: "2",
    title: "Rapport d'incident - comportement inapproprié",
    type: "discipline",
    status: "needs_review",
    teacher: {
      name: "Mme Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    student: {
      name: "Lucas Dubois",
      class: "3ème A",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "14/03/2025",
    description:
      "L'élève a perturbé le cours à plusieurs reprises malgré plusieurs avertissements. Il a également utilisé un langage inapproprié envers ses camarades.",
    priority: "high",
  },
  {
    id: "3",
    title: "Validation des sujets du brevet blanc",
    type: "document",
    status: "approved",
    teacher: {
      name: "Mme Moreau",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "Classes de 3ème",
    date: "10/03/2025",
    description:
      "Les sujets du brevet blanc ont été préparés et sont prêts à être imprimés. Ils couvrent l'ensemble du programme vu jusqu'à présent.",
    priority: "high",
  },
  {
    id: "4",
    title: "Justification d'absence prolongée",
    type: "absence",
    status: "approved",
    teacher: {
      name: "M. Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    student: {
      name: "Emma Petit",
      class: "4ème B",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "08/03/2025",
    description:
      "L'élève a été absente pendant deux semaines pour raison médicale. Un certificat médical a été fourni et les parents ont demandé un accompagnement pour rattraper les cours manqués.",
    priority: "medium",
  },
  {
    id: "5",
    title: "Modification des notes du contrôle d'histoire",
    type: "note",
    status: "rejected",
    teacher: {
      name: "M. Martin",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "5ème A",
    date: "05/03/2025",
    description:
      "Demande de modification des notes du dernier contrôle d'histoire suite à une erreur dans le barème. Les notes seraient augmentées de 2 points pour tous les élèves.",
    priority: "low",
  },
  {
    id: "6",
    title: "Organisation d'une sortie pédagogique",
    type: "decision",
    status: "needs_review",
    teacher: {
      name: "Mme Petit",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "6ème A et B",
    date: "12/03/2025",
    description:
      "Proposition d'une sortie au musée d'histoire naturelle le 22 mars 2025. Le coût par élève serait de 15€, incluant le transport et l'entrée au musée. Des activités pédagogiques sont prévues en lien avec le programme de SVT.",
    priority: "medium",
  },
  {
    id: "7",
    title: "Signalement d'un élève en difficulté",
    type: "document",
    status: "pending",
    teacher: {
      name: "Mme Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    student: {
      name: "Sophie Martin",
      class: "3ème A",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "13/03/2025",
    description:
      "L'élève montre des signes de décrochage scolaire depuis plusieurs semaines. Ses notes ont considérablement baissé et elle participe moins en classe. Une réunion avec les parents et l'équipe pédagogique est recommandée.",
    priority: "high",
  },
  {
    id: "8",
    title: "Demande de matériel pédagogique",
    type: "decision",
    status: "approved",
    teacher: {
      name: "M. Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "Département de mathématiques",
    date: "07/03/2025",
    description:
      "Demande d'achat de 15 calculatrices graphiques pour le département de mathématiques. Ces calculatrices seraient utilisées pour les cours de spécialité en première et terminale.",
    priority: "low",
  },
  {
    id: "9",
    title: "Rapport d'évaluation trimestrielle",
    type: "document",
    status: "needs_review",
    teacher: {
      name: "Mme Moreau",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "6ème A",
    date: "11/03/2025",
    description:
      "Rapport détaillé sur les performances de la classe de 6ème A pour le deuxième trimestre. La classe a globalement progressé, mais certains élèves montrent des difficultés en mathématiques et en français.",
    priority: "medium",
  },
  {
    id: "10",
    title: "Modification du programme de français",
    type: "decision",
    status: "pending",
    teacher: {
      name: "M. Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    class: "Classes de 4ème",
    date: "09/03/2025",
    description:
      "Proposition d'ajout d'une œuvre contemporaine au programme de français du troisième trimestre pour les classes de 4ème, en remplacement d'une œuvre classique qui sera étudiée l'année prochaine.",
    priority: "low",
  },
]


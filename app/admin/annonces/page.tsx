"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, Calendar, Bell, Eye, MoreHorizontal, Users, Megaphone } from "lucide-react"

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [announcementType, setAnnouncementType] = useState("all")
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Filter announcements based on search query and type
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = announcementType === "all" || announcement.type === announcementType

    return matchesSearch && matchesType
  })

  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsAddAnnouncementOpen(true)
  }

  const handleDeleteAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsDeleteDialogOpen(true)
  }

  const handlePreviewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsPreviewOpen(true)
  }

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the announcement to the database
    setIsAddAnnouncementOpen(false)
    setSelectedAnnouncement(null)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the announcement from the database
    setIsDeleteDialogOpen(false)
    setSelectedAnnouncement(null)
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "event":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
          >
            Événement
          </Badge>
        )
      case "news":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            Actualité
          </Badge>
        )
      case "alert":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            Alerte
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "news":
        return <Megaphone className="h-4 w-4 text-blue-500" />
      case "alert":
        return <Bell className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "all":
        return <Badge variant="secondary">Tous</Badge>
      case "students":
        return <Badge variant="secondary">Élèves</Badge>
      case "parents":
        return <Badge variant="secondary">Parents</Badge>
      case "teachers":
        return <Badge variant="secondary">Enseignants</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Annonces et Actualités</h2>
          <p className="text-muted-foreground">Gérez les annonces, événements et actualités de l'établissement.</p>
        </div>
        <Dialog open={isAddAnnouncementOpen} onOpenChange={setIsAddAnnouncementOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Nouvelle annonce</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedAnnouncement ? "Modifier l'annonce" : "Créer une nouvelle annonce"}</DialogTitle>
              <DialogDescription>
                {selectedAnnouncement
                  ? "Modifiez les détails de l'annonce ci-dessous."
                  : "Remplissez les informations pour créer une nouvelle annonce."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAnnouncement}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre
                  </Label>
                  <Input id="title" defaultValue={selectedAnnouncement?.title || ""} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue={selectedAnnouncement?.type || "news"}>
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">Actualité</SelectItem>
                      <SelectItem value="event">Événement</SelectItem>
                      <SelectItem value="alert">Alerte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="audience" className="text-right">
                    Audience
                  </Label>
                  <Select defaultValue={selectedAnnouncement?.audience || "all"}>
                    <SelectTrigger id="audience" className="col-span-3">
                      <SelectValue placeholder="Sélectionner une audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="students">Élèves</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                      <SelectItem value="teachers">Enseignants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Contenu
                  </Label>
                  <Textarea
                    id="content"
                    defaultValue={selectedAnnouncement?.content || ""}
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
                    defaultValue={selectedAnnouncement?.date || new Date().toISOString().split("T")[0]}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label>Options</Label>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="important" defaultChecked={selectedAnnouncement?.important || false} />
                      <Label htmlFor="important">Marquer comme important</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification" defaultChecked={selectedAnnouncement?.sendNotification || false} />
                      <Label htmlFor="notification">Envoyer une notification</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {selectedAnnouncement ? "Enregistrer les modifications" : "Publier l'annonce"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une annonce..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setAnnouncementType}>
          <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="news">Actualités</TabsTrigger>
            <TabsTrigger value="event">Événements</TabsTrigger>
            <TabsTrigger value="alert">Alertes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnnouncements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune annonce trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div className="font-medium">{announcement.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]">{announcement.content}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(announcement.type)}
                      {getTypeBadge(announcement.type)}
                    </div>
                  </TableCell>
                  <TableCell>{announcement.date}</TableCell>
                  <TableCell>{getAudienceBadge(announcement.audience)}</TableCell>
                  <TableCell>
                    <Badge variant={announcement.published ? "default" : "secondary"}>
                      {announcement.published ? "Publié" : "Brouillon"}
                    </Badge>
                    {announcement.important && (
                      <Badge variant="destructive" className="ml-2">
                        Important
                      </Badge>
                    )}
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
                        <DropdownMenuItem onClick={() => handlePreviewAnnouncement(announcement)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Aperçu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteAnnouncement(announcement)}
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'annonce "{selectedAnnouncement?.title}" ? Cette action est
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

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Aperçu de l'annonce</DialogTitle>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedAnnouncement.type)}
                  {getTypeBadge(selectedAnnouncement.type)}
                </div>
                <div className="text-sm text-muted-foreground">{selectedAnnouncement.date}</div>
              </div>
              <h3 className="text-xl font-bold">{selectedAnnouncement.title}</h3>
              <p className="whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Audience:{" "}
                    {selectedAnnouncement.audience === "all"
                      ? "Tous"
                      : selectedAnnouncement.audience === "students"
                        ? "Élèves"
                        : selectedAnnouncement.audience === "parents"
                          ? "Parents"
                          : "Enseignants"}
                  </span>
                </div>
                {selectedAnnouncement.important && <Badge variant="destructive">Important</Badge>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  date: string
  audience: string
  published: boolean
  important: boolean
  sendNotification?: boolean
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Réunion parents-professeurs",
    content:
      "Une réunion parents-professeurs aura lieu le 15 mars 2025 de 17h à 20h. Veuillez prendre rendez-vous via l'application.",
    type: "event",
    date: "15/03/2025",
    audience: "parents",
    published: true,
    important: true,
  },
  {
    id: "2",
    title: "Fermeture exceptionnelle",
    content: "L'établissement sera fermé le vendredi 10 avril 2025 en raison de travaux de maintenance.",
    type: "alert",
    date: "10/04/2025",
    audience: "all",
    published: true,
    important: true,
  },
  {
    id: "3",
    title: "Nouveaux livres à la bibliothèque",
    content: "La bibliothèque a reçu de nouveaux ouvrages de littérature contemporaine. Venez les découvrir !",
    type: "news",
    date: "05/03/2025",
    audience: "students",
    published: true,
    important: false,
  },
  {
    id: "4",
    title: "Sortie scolaire au musée",
    content:
      "Une sortie au musée d'histoire naturelle est prévue pour les classes de 6ème le 22 mars 2025. Les autorisations parentales sont à rendre avant le 15 mars.",
    type: "event",
    date: "22/03/2025",
    audience: "students",
    published: true,
    important: false,
  },
  {
    id: "5",
    title: "Formation aux outils numériques",
    content:
      "Une session de formation aux nouveaux outils numériques sera proposée aux enseignants le mercredi 12 mars de 14h à 17h.",
    type: "news",
    date: "12/03/2025",
    audience: "teachers",
    published: false,
    important: false,
  },
]


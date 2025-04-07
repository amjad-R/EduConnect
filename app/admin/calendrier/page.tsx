"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2, Edit, MoreHorizontal, Download } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

interface CalendarEvent {
  id: string
  title: string
  date: string
  endDate?: string
  description: string
  type: "exam" | "holiday" | "event" | "meeting" | "deadline"
  audience: "all" | "students" | "teachers" | "parents" | "admin"
  location?: string
  allDay: boolean
  important: boolean
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [eventFilter, setEventFilter] = useState("all")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [viewMode, setViewMode] = useState("month")

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the event to the database
    setIsAddEventOpen(false)
    setSelectedEvent(null)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsAddEventOpen(true)
  }

  const handleDeleteEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the event from the database
    setIsDeleteDialogOpen(false)
    setSelectedEvent(null)
  }

  // Filter events based on filters
  const filteredEvents = calendarEvents.filter((event) => {
    const matchesType = eventFilter === "all" || event.type === eventFilter
    const matchesAudience = audienceFilter === "all" || event.audience === audienceFilter
    return matchesType && matchesAudience
  })

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventDate = parseISO(event.date)
      return isSameDay(eventDate, date)
    })
  }

  // Get all days in the current month
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get type badge color
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "exam":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            Examen
          </Badge>
        )
      case "holiday":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            Vacances
          </Badge>
        )
      case "event":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            Événement
          </Badge>
        )
      case "meeting":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
          >
            Réunion
          </Badge>
        )
      case "deadline":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
          >
            Échéance
          </Badge>
        )
      default:
        return null
    }
  }

  // Get audience badge
  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "all":
        return <Badge variant="secondary">Tous</Badge>
      case "students":
        return <Badge variant="secondary">Élèves</Badge>
      case "teachers":
        return <Badge variant="secondary">Enseignants</Badge>
      case "parents":
        return <Badge variant="secondary">Parents</Badge>
      case "admin":
        return <Badge variant="secondary">Administration</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendrier Scolaire</h2>
          <p className="text-muted-foreground">
            Gérez les événements, examens, vacances et autres dates importantes de l'établissement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Exporter</span>
          </Button>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span>Ajouter un événement</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedEvent ? "Modifier l'événement" : "Ajouter un événement"}</DialogTitle>
                <DialogDescription>
                  {selectedEvent
                    ? "Modifiez les détails de l'événement ci-dessous."
                    : "Remplissez les informations pour créer un nouvel événement."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEvent}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Titre
                    </Label>
                    <Input id="title" defaultValue={selectedEvent?.title || ""} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue={selectedEvent?.type || "event"}>
                      <SelectTrigger id="type" className="col-span-3">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Événement</SelectItem>
                        <SelectItem value="exam">Examen</SelectItem>
                        <SelectItem value="holiday">Vacances</SelectItem>
                        <SelectItem value="meeting">Réunion</SelectItem>
                        <SelectItem value="deadline">Échéance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="audience" className="text-right">
                      Audience
                    </Label>
                    <Select defaultValue={selectedEvent?.audience || "all"}>
                      <SelectTrigger id="audience" className="col-span-3">
                        <SelectValue placeholder="Sélectionner une audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="students">Élèves</SelectItem>
                        <SelectItem value="teachers">Enseignants</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date de début
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      defaultValue={selectedEvent?.date || new Date().toISOString().split("T")[0]}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      Date de fin
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      defaultValue={selectedEvent?.endDate || new Date().toISOString().split("T")[0]}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Lieu
                    </Label>
                    <Input id="location" defaultValue={selectedEvent?.location || ""} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      defaultValue={selectedEvent?.description || ""}
                      className="col-span-3 min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="text-right">
                      <Label>Options</Label>
                    </div>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="allDay" defaultChecked={selectedEvent?.allDay || false} />
                        <Label htmlFor="allDay">Journée entière</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="important" defaultChecked={selectedEvent?.important || false} />
                        <Label htmlFor="important">Marquer comme important</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {selectedEvent ? "Enregistrer les modifications" : "Ajouter l'événement"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mois précédent</span>
          </Button>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium capitalize">{format(currentDate, "MMMM yyyy", { locale: fr })}</span>
          </div>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Mois suivant</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type d'événement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="event">Événements</SelectItem>
              <SelectItem value="exam">Examens</SelectItem>
              <SelectItem value="holiday">Vacances</SelectItem>
              <SelectItem value="meeting">Réunions</SelectItem>
              <SelectItem value="deadline">Échéances</SelectItem>
            </SelectContent>
          </Select>

          <Select value={audienceFilter} onValueChange={setAudienceFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les audiences</SelectItem>
              <SelectItem value="students">Élèves</SelectItem>
              <SelectItem value="teachers">Enseignants</SelectItem>
              <SelectItem value="parents">Parents</SelectItem>
              <SelectItem value="admin">Administration</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="month">Mois</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <TabsContent value="month" className="mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-px bg-muted text-center text-sm">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-muted">
              {monthDays.map((day, i) => {
                const dayEvents = getEventsForDate(day)
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

                return (
                  <div
                    key={i}
                    className={`min-h-[100px] bg-background p-2 ${
                      isCurrentMonth ? "" : "text-muted-foreground opacity-50"
                    } ${isSelected ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{format(day, "d")}</span>
                      {dayEvents.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {dayEvents.length}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs truncate rounded px-1 py-0.5 ${
                            event.important
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 2} plus</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedDate && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Événements du {format(selectedDate, "d MMMM yyyy", { locale: fr })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEventsForDate(selectedDate).length === 0 ? (
                  <p className="text-muted-foreground">Aucun événement prévu pour cette date.</p>
                ) : (
                  getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="flex items-start justify-between border-b pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeBadge(event.type)}
                          {event.important && (
                            <Badge variant="destructive" className="ml-2">
                              Important
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Audience: {getAudienceBadge(event.audience)}</span>
                          {event.location && <span>• Lieu: {event.location}</span>}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEvent(event)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Liste des événements</CardTitle>
            <CardDescription>
              {filteredEvents.length} événement{filteredEvents.length !== 1 ? "s" : ""} pour la période sélectionnée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <p className="text-muted-foreground">Aucun événement ne correspond aux critères sélectionnés.</p>
              ) : (
                filteredEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-start justify-between border-b pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeBadge(event.type)}
                          {event.important && (
                            <Badge variant="destructive" className="ml-2">
                              Important
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>Date: {format(parseISO(event.date), "dd/MM/yyyy")}</span>
                          {event.endDate && <span>- {format(parseISO(event.endDate), "dd/MM/yyyy")}</span>}
                          <span>• Audience: {getAudienceBadge(event.audience)}</span>
                          {event.location && <span>• Lieu: {event.location}</span>}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEvent(event)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'événement "{selectedEvent?.title}" ? Cette action est irréversible.
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

// Sample data
const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Conseil de classe 3ème A",
    date: "2025-03-15",
    description: "Conseil de classe du 2ème trimestre pour la classe de 3ème A.",
    type: "meeting",
    audience: "teachers",
    location: "Salle de réunion 2",
    allDay: false,
    important: false,
  },
  {
    id: "2",
    title: "Vacances de Pâques",
    date: "2025-04-12",
    endDate: "2025-04-27",
    description: "Vacances scolaires de Pâques pour tous les élèves et le personnel.",
    type: "holiday",
    audience: "all",
    allDay: true,
    important: true,
  },
  {
    id: "3",
    title: "Brevet blanc",
    date: "2025-03-20",
    endDate: "2025-03-21",
    description: "Examen blanc du brevet des collèges pour les classes de 3ème.",
    type: "exam",
    audience: "students",
    location: "Gymnase",
    allDay: true,
    important: true,
  },
  {
    id: "4",
    title: "Réunion parents-professeurs",
    date: "2025-03-25",
    description: "Rencontre entre les parents et les enseignants pour discuter des progrès des élèves.",
    type: "meeting",
    audience: "parents",
    location: "Salles de classe",
    allDay: false,
    important: true,
  },
  {
    id: "5",
    title: "Journée portes ouvertes",
    date: "2025-04-05",
    description: "Présentation de l'établissement aux futurs élèves et leurs parents.",
    type: "event",
    audience: "all",
    location: "Tout l'établissement",
    allDay: true,
    important: true,
  },
  {
    id: "6",
    title: "Remise des bulletins",
    date: "2025-03-28",
    description: "Distribution des bulletins du 2ème trimestre aux élèves.",
    type: "deadline",
    audience: "students",
    allDay: false,
    important: false,
  },
  {
    id: "7",
    title: "Formation numérique",
    date: "2025-03-18",
    description: "Formation aux outils numériques pour les enseignants.",
    type: "event",
    audience: "teachers",
    location: "Salle informatique",
    allDay: false,
    important: false,
  },
  {
    id: "8",
    title: "Conseil d'administration",
    date: "2025-03-22",
    description: "Réunion du conseil d'administration pour discuter du budget et des projets à venir.",
    type: "meeting",
    audience: "admin",
    location: "Salle de réunion principale",
    allDay: false,
    important: true,
  },
  {
    id: "9",
    title: "Date limite inscription voyage scolaire",
    date: "2025-03-31",
    description: "Dernier jour pour s'inscrire au voyage scolaire en Espagne.",
    type: "deadline",
    audience: "students",
    allDay: true,
    important: false,
  },
  {
    id: "10",
    title: "Semaine des langues étrangères",
    date: "2025-04-01",
    endDate: "2025-04-05",
    description: "Semaine dédiée à la découverte des langues et cultures étrangères.",
    type: "event",
    audience: "students",
    location: "Tout l'établissement",
    allDay: true,
    important: false,
  },
]


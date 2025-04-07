"use client"

import { useState } from "react"
import { Bell, Calendar, CheckCircle, Clock, Filter, Info, MoreHorizontal, Search, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for notifications
const notifications = [
  {
    id: 1,
    type: "event",
    title: "Conseil de classe 3ème A",
    description:
      "Le conseil de classe du 3ème trimestre pour la 3ème A aura lieu le 15 juin à 18h00 en salle de réunion.",
    date: "15/06/2023",
    time: "18:00",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "announcement",
    title: "Réunion pédagogique",
    description:
      "Une réunion pédagogique est prévue le 10 mai à 17h00 pour discuter des nouvelles méthodes d'évaluation.",
    date: "10/05/2023",
    time: "17:00",
    read: true,
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    title: "Fermeture exceptionnelle CDI",
    description: "Le CDI sera fermé le jeudi 5 mai pour inventaire annuel.",
    date: "05/05/2023",
    time: "Toute la journée",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "event",
    title: "Réunion parents-professeurs",
    description: "La réunion parents-professeurs pour les classes de 4ème aura lieu le 20 mai de 16h à 20h.",
    date: "20/05/2023",
    time: "16:00 - 20:00",
    read: false,
    priority: "high",
  },
  {
    id: 5,
    type: "announcement",
    title: "Semaine des langues étrangères",
    description:
      "La semaine des langues étrangères se déroulera du 22 au 26 mai. Veuillez préparer vos élèves aux activités prévues.",
    date: "22/05/2023 - 26/05/2023",
    time: "",
    read: false,
    priority: "medium",
  },
  {
    id: 6,
    type: "info",
    title: "Mise à jour du logiciel de notes",
    description:
      "Une mise à jour du logiciel de gestion des notes aura lieu ce weekend. Le système sera indisponible de samedi 20h à dimanche 8h.",
    date: "13/05/2023 - 14/05/2023",
    time: "20:00 - 08:00",
    read: true,
    priority: "medium",
  },
  {
    id: 7,
    type: "event",
    title: "Formation aux nouveaux outils numériques",
    description:
      "Une formation facultative aux nouveaux outils numériques sera proposée le mercredi 17 mai à 14h en salle informatique.",
    date: "17/05/2023",
    time: "14:00",
    read: false,
    priority: "low",
  },
  {
    id: 8,
    type: "announcement",
    title: "Élections des délégués du personnel",
    description:
      "Les élections des délégués du personnel enseignant auront lieu le 25 mai. Veuillez déposer vos candidatures avant le 15 mai.",
    date: "25/05/2023",
    time: "10:00 - 16:00",
    read: true,
    priority: "medium",
  },
  {
    id: 9,
    type: "info",
    title: "Rappel - Remise des bulletins",
    description: "Rappel : la date limite pour finaliser les bulletins du 2ème trimestre est fixée au 12 mai.",
    date: "12/05/2023",
    time: "",
    read: true,
    priority: "high",
  },
  {
    id: 10,
    type: "event",
    title: "Conférence d'orientation",
    description:
      "Une conférence d'orientation pour les élèves de Terminale sera organisée le 19 mai. Votre présence est souhaitée pour répondre aux questions des élèves.",
    date: "19/05/2023",
    time: "14:00 - 16:00",
    read: false,
    priority: "medium",
  },
]

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsData, setNotificationsData] = useState(notifications)

  // Filter notifications based on search term and active tab
  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && !notification.read
    return matchesSearch && notification.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationsData((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotificationsData((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotificationsData((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "announcement":
        return <Users className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Get badge based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Haute</Badge>
      case "medium":
        return <Badge variant="secondary">Moyenne</Badge>
      case "low":
        return <Badge variant="outline">Basse</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Consultez et gérez vos notifications et annonces importantes.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher dans les notifications..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveTab("all")}>Toutes les notifications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("unread")}>Non lues</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("event")}>Événements</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("announcement")}>Annonces</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("info")}>Informations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-3.5 w-3.5" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            Toutes
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Non lues
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="event">Événements</TabsTrigger>
          <TabsTrigger value="announcement">Annonces</TabsTrigger>
          <TabsTrigger value="info">Informations</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 pt-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">Aucune notification</h3>
                <p className="text-sm text-muted-foreground">Vous n'avez aucune notification dans cette catégorie.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`transition-colors ${!notification.read ? "bg-primary/5" : ""}`}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div>
                        <CardTitle className="text-xl">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{notification.date}</span>
                          {notification.time && (
                            <>
                              <span>•</span>
                              <span>{notification.time}</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(notification.priority)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!notification.read && (
                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marquer comme lu
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-2">
                    {notification.type === "event" && (
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Ajouter au calendrier
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


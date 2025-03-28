"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Calendar, Megaphone, Filter, CheckCircle, Clock, Search, Info, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [readFilter, setReadFilter] = useState("all")

  // Filter notifications based on search query, time filter, and read status
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTimeFilter =
      timeFilter === "all" ||
      (timeFilter === "today" && isToday(notification.date)) ||
      (timeFilter === "week" && isThisWeek(notification.date)) ||
      (timeFilter === "month" && isThisMonth(notification.date))

    const matchesReadFilter =
      readFilter === "all" ||
      (readFilter === "unread" && !notification.read) ||
      (readFilter === "read" && notification.read)

    return matchesSearch && matchesTimeFilter && matchesReadFilter
  })

  // Helper functions to check dates
  function isToday(dateString: string): boolean {
    const today = new Date()
    const notificationDate = new Date(dateString)
    return (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    )
  }

  function isThisWeek(dateString: string): boolean {
    const today = new Date()
    const notificationDate = new Date(dateString)
    const diffTime = Math.abs(today.getTime() - notificationDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  function isThisMonth(dateString: string): boolean {
    const today = new Date()
    const notificationDate = new Date(dateString)
    return notificationDate.getMonth() === today.getMonth() && notificationDate.getFullYear() === today.getFullYear()
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "announcement":
        return <Megaphone className="h-5 w-5 text-purple-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Get notification badge based on priority
  const getNotificationBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Urgent</Badge>
      case "medium":
        return <Badge variant="default">Important</Badge>
      case "low":
        return <Badge variant="secondary">Information</Badge>
      default:
        return null
    }
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `Aujourd'hui à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `Hier à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  // Mark notification as read
  const markAsRead = (id: string) => {
    // In a real app, this would update the database
    console.log(`Marking notification ${id} as read`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications et Mises à Jour</h2>
        <p className="text-muted-foreground">
          Restez informé des réunions, événements scolaires et annonces importantes.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une notification..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>

          <Select value={readFilter} onValueChange={setReadFilter}>
            <SelectTrigger className="w-[140px]">
              <CheckCircle className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="unread">Non lues</SelectItem>
              <SelectItem value="read">Lues</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            Toutes
            {notifications.filter((n) => !n.read).length > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
              >
                {notifications.filter((n) => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="announcements">Annonces</TabsTrigger>
          <TabsTrigger value="school">École</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune notification trouvée</p>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas de notifications correspondant à vos critères de recherche.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                icon={getNotificationIcon(notification.type)}
                badge={getNotificationBadge(notification.priority)}
                formattedDate={formatDate(notification.date)}
                onMarkAsRead={() => markAsRead(notification.id)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {filteredNotifications.filter((n) => n.type === "event").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucun événement trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas d'événements correspondant à vos critères de recherche.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications
              .filter((n) => n.type === "event")
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  icon={getNotificationIcon(notification.type)}
                  badge={getNotificationBadge(notification.priority)}
                  formattedDate={formatDate(notification.date)}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))
          )}
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          {filteredNotifications.filter((n) => n.type === "announcement").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune annonce trouvée</p>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas d'annonces correspondant à vos critères de recherche.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications
              .filter((n) => n.type === "announcement")
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  icon={getNotificationIcon(notification.type)}
                  badge={getNotificationBadge(notification.priority)}
                  formattedDate={formatDate(notification.date)}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))
          )}
        </TabsContent>

        <TabsContent value="school" className="space-y-4">
          {filteredNotifications.filter((n) => n.type === "info" || n.type === "alert").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Info className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune information trouvée</p>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas d'informations correspondant à vos critères de recherche.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications
              .filter((n) => n.type === "info" || n.type === "alert")
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  icon={getNotificationIcon(notification.type)}
                  badge={getNotificationBadge(notification.priority)}
                  formattedDate={formatDate(notification.date)}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de notifications</CardTitle>
          <CardDescription>Personnalisez vos préférences de notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="events-notifications">Événements scolaires</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications pour les événements à venir</p>
            </div>
            <Switch id="events-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="announcements-notifications">Annonces importantes</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications pour les annonces de l'école</p>
            </div>
            <Switch id="announcements-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="grades-notifications">Notes et évaluations</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications pour les nouvelles notes</p>
            </div>
            <Switch id="grades-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="attendance-notifications">Assiduité</Label>
              <p className="text-sm text-muted-foreground">Recevoir des notifications pour les absences et retards</p>
            </div>
            <Switch id="attendance-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">Recevoir également les notifications par email</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">Notifications par SMS</Label>
              <p className="text-sm text-muted-foreground">Recevoir les notifications urgentes par SMS</p>
            </div>
            <Switch id="sms-notifications" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Enregistrer les préférences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface Notification {
  id: string
  title: string
  content: string
  type: string
  priority: string
  date: string
  read: boolean
  link?: string
  childName?: string
}

interface NotificationCardProps {
  notification: Notification
  icon: React.ReactNode
  badge: React.ReactNode
  formattedDate: string
  onMarkAsRead: () => void
}

function NotificationCard({ notification, icon, badge, formattedDate, onMarkAsRead }: NotificationCardProps) {
  return (
    <Card className={`transition-all ${!notification.read ? "border-l-4 border-l-primary" : ""}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-2 ${!notification.read ? "bg-primary/10" : "bg-muted"}`}>{icon}</div>
          <div>
            <CardTitle className="text-base">{notification.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {formattedDate}
              {notification.childName && <span className="ml-2 font-medium">• {notification.childName}</span>}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {!notification.read && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Nouveau
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{notification.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {notification.link && (
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href={notification.link}>Voir plus</a>
            </Button>
          )}
        </div>
        {!notification.read && (
          <Button variant="outline" size="sm" onClick={onMarkAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Marquer comme lu
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Sample notification data
const notifications: Notification[] = [
  {
    id: "1",
    title: "Réunion parents-professeurs",
    content:
      "Une réunion parents-professeurs aura lieu le 15 mars 2025 de 17h à 20h. Veuillez prendre rendez-vous via l'application.",
    type: "event",
    priority: "high",
    date: "2025-03-10T14:30:00",
    read: false,
    link: "/parents/communication",
    childName: "Sophie Martin",
  },
  {
    id: "2",
    title: "Bulletin du 2ème trimestre disponible",
    content:
      "Le bulletin scolaire du 2ème trimestre de Sophie est maintenant disponible. Vous pouvez le consulter et le télécharger.",
    type: "info",
    priority: "medium",
    date: "2025-03-08T10:15:00",
    read: false,
    link: "/parents/releves",
    childName: "Sophie Martin",
  },
  {
    id: "3",
    title: "Fermeture exceptionnelle de l'établissement",
    content: "L'établissement sera fermé le vendredi 10 avril 2025 en raison de travaux de maintenance.",
    type: "announcement",
    priority: "high",
    date: "2025-03-05T11:00:00",
    read: true,
  },
  {
    id: "4",
    title: "Absence en cours de mathématiques",
    content: "Sophie était absente au cours de mathématiques aujourd'hui. Veuillez justifier cette absence.",
    type: "alert",
    priority: "high",
    date: "2025-03-04T15:30:00",
    read: false,
    childName: "Sophie Martin",
  },
  {
    id: "5",
    title: "Sortie scolaire au musée",
    content:
      "Une sortie au musée d'histoire naturelle est prévue pour les classes de 3ème le 22 mars 2025. Les autorisations parentales sont à rendre avant le 15 mars.",
    type: "event",
    priority: "medium",
    date: "2025-03-01T10:30:00",
    read: true,
    childName: "Sophie Martin",
  },
  {
    id: "6",
    title: "Nouveaux livres disponibles à la bibliothèque",
    content:
      "La bibliothèque a reçu de nouveaux ouvrages de littérature contemporaine. Votre enfant peut les emprunter dès maintenant.",
    type: "announcement",
    priority: "low",
    date: "2025-02-28T15:45:00",
    read: true,
  },
  {
    id: "7",
    title: "Excellente note en histoire",
    content: "Sophie a obtenu 18/20 à son dernier contrôle d'histoire. Félicitations !",
    type: "info",
    priority: "medium",
    date: "2025-02-25T14:20:00",
    read: true,
    childName: "Sophie Martin",
  },
  {
    id: "8",
    title: "Alerte météo : Fortes chutes de neige",
    content: "Des fortes chutes de neige sont prévues demain. Soyez prudents sur le trajet de l'école.",
    type: "alert",
    priority: "high",
    date: "2025-02-20T16:30:00",
    read: true,
  },
  {
    id: "9",
    title: "Conseil de classe du 2ème trimestre",
    content: "Le conseil de classe du 2ème trimestre pour la classe de 3ème A aura lieu le 22 mars 2025 à 18h00.",
    type: "event",
    priority: "medium",
    date: "2025-03-12T09:00:00",
    read: false,
    childName: "Sophie Martin",
  },
  {
    id: "10",
    title: "Semaine des langues étrangères",
    content:
      "Une semaine dédiée aux langues étrangères sera organisée du 5 au 9 avril 2025. Diverses activités culturelles seront proposées aux élèves.",
    type: "announcement",
    priority: "medium",
    date: "2025-03-11T11:30:00",
    read: false,
  },
  {
    id: "11",
    title: "Conférence sur l'orientation professionnelle",
    content:
      "Une conférence sur l'orientation professionnelle pour les élèves de 3ème et leurs parents aura lieu le 25 mars 2025 à 18h30 dans l'amphithéâtre.",
    type: "event",
    priority: "medium",
    date: "2025-03-09T14:15:00",
    read: false,
  },
  {
    id: "12",
    title: "Changement d'emploi du temps",
    content:
      "En raison de l'absence de M. Bernard, les cours de physique-chimie seront assurés par Mme Moreau la semaine prochaine.",
    type: "info",
    priority: "medium",
    date: "2025-03-07T16:45:00",
    read: false,
    childName: "Sophie Martin",
  },
]


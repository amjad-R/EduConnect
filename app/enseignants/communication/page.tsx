"use client"

import type React from "react"

import { useState } from "react"
import { Search, Send, Filter, Paperclip, MoreHorizontal, Archive, Trash2, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [filter, setFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("messages")
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")

  // Filter conversations based on search query and filter
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && conversation.unread) ||
      (filter === "parents" && conversation.with.role === "parent") ||
      (filter === "students" && conversation.with.role === "student") ||
      (filter === "admin" && conversation.with.role === "admin")

    return matchesSearch && matchesFilter
  })

  // Filter forum posts based on search query
  const filteredForumPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you would send the message to the server
      console.log(`Sending message to ${selectedConversation.with.name}: ${newMessage}`)
      setNewMessage("")
    }
  }

  const handleCreateNewMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the message to the server
    console.log(`Creating new message to ${selectedRecipients.join(", ")}: ${messageSubject} - ${messageContent}`)
    setIsNewMessageOpen(false)
    setSelectedRecipients([])
    setMessageSubject("")
    setMessageContent("")
  }

  const toggleRecipient = (id: string) => {
    setSelectedRecipients((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Communication</h2>
          <p className="text-muted-foreground">Interagissez avec les élèves, les parents et l'administration.</p>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Nouveau message</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouveau message</DialogTitle>
              <DialogDescription>
                Créez un nouveau message pour les élèves, les parents ou l'administration.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNewMessage}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Destinataires</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                    {recipients.map((recipient) => (
                      <div key={recipient.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={recipient.id}
                          checked={selectedRecipients.includes(recipient.id)}
                          onCheckedChange={() => toggleRecipient(recipient.id)}
                        />
                        <Label htmlFor={recipient.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={recipient.avatar} alt={recipient.name} />
                            <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{recipient.name}</span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            {recipient.role === "student" ? "Élève" : recipient.role === "parent" ? "Parent" : "Admin"}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    placeholder="Sujet du message"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Contenu du message"
                    className="min-h-[150px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify" />
                  <Label htmlFor="notify">Envoyer une notification</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={selectedRecipients.length === 0 || !messageSubject || !messageContent}>
                  Envoyer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="messages" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={activeTab === "messages" ? "Rechercher un message..." : "Rechercher un sujet..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="forum">Forum de discussion</TabsTrigger>
            <TabsTrigger value="announcements">Annonces</TabsTrigger>
          </TabsList>

          {activeTab === "messages" && (
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="unread">Non lus</SelectItem>
                <SelectItem value="parents">Parents</SelectItem>
                <SelectItem value="students">Élèves</SelectItem>
                <SelectItem value="admin">Administration</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Conversations</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsNewMessageOpen(true)}>
                  Nouveau message
                </Button>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredConversations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Aucune conversation trouvée</p>
                ) : (
                  filteredConversations.map((conversation) => (
                    <Card
                      key={conversation.id}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedConversation?.id === conversation.id ? "border-primary" : ""
                      } ${conversation.unread ? "border-l-4 border-l-primary" : ""}`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.with.avatar} alt={conversation.with.name} />
                            <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{conversation.with.name}</p>
                              <p className="text-xs text-muted-foreground">{conversation.lastMessageTime}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {conversation.with.role === "student"
                                ? "Élève"
                                : conversation.with.role === "parent"
                                  ? "Parent"
                                  : "Administration"}
                            </p>
                            <p className="text-sm truncate">{conversation.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread && (
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <Card className="h-[700px] flex flex-col">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b px-4 py-3 flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedConversation.with.avatar} alt={selectedConversation.with.name} />
                        <AvatarFallback>{selectedConversation.with.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{selectedConversation.with.name}</CardTitle>
                        <CardDescription>
                          {selectedConversation.with.role === "student"
                            ? "Élève"
                            : selectedConversation.with.role === "parent"
                              ? "Parent"
                              : "Administration"}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          <span>Archiver</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((message, index) => (
                      <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                          {message.sender !== "me" && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={selectedConversation.with.avatar}
                                  alt={selectedConversation.with.name}
                                />
                                <AvatarFallback>{selectedConversation.with.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{selectedConversation.with.name}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          {message.sender === "me" && (
                            <div className="flex justify-end mt-1">
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="border-t p-3">
                    <div className="flex w-full items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                        <span className="sr-only">Joindre un fichier</span>
                      </Button>
                      <Textarea
                        placeholder="Écrivez votre message..."
                        className="min-h-[60px] flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Envoyer</span>
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center text-center p-8">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune conversation sélectionnée</h3>
                    <p className="text-muted-foreground mt-2 mb-6">
                      Sélectionnez une conversation dans la liste ou créez-en une nouvelle.
                    </p>
                    <Button onClick={() => setIsNewMessageOpen(true)}>Nouveau message</Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Forum de discussion</CardTitle>
                    <Button>Nouveau sujet</Button>
                  </div>
                  <CardDescription>Discussions avec les élèves et réponses aux questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sujet</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Réponses</TableHead>
                        <TableHead>Dernière activité</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredForumPosts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            Aucun sujet trouvé
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredForumPosts.map((post) => (
                          <TableRow key={post.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <div className="font-medium">{post.title}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[300px]">{post.content}</div>
                            </TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>{post.replies}</TableCell>
                            <TableCell>
                              <div className="text-sm">{post.lastActivity}</div>
                              <div className="text-xs text-muted-foreground">{post.lastActivityBy}</div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sujets populaires</CardTitle>
                  <CardDescription>Les discussions les plus actives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularTopics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Badge className="mt-0.5">{topic.replies}</Badge>
                        <div>
                          <p className="font-medium">{topic.title}</p>
                          <p className="text-sm text-muted-foreground">Dernière activité: {topic.lastActivity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Statistiques du forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total des sujets:</span>
                      <span className="font-medium">{forumPosts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total des réponses:</span>
                      <span className="font-medium">{forumPosts.reduce((acc, post) => acc + post.replies, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sujets actifs:</span>
                      <span className="font-medium">{forumPosts.filter((post) => post.isActive).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participation des élèves:</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Annonces</CardTitle>
                    <Button>Nouvelle annonce</Button>
                  </div>
                  <CardDescription>Annonces et informations importantes pour les élèves et les parents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <Card key={announcement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{announcement.title}</CardTitle>
                            <Badge variant={announcement.important ? "destructive" : "outline"}>
                              {announcement.important ? "Important" : announcement.type}
                            </Badge>
                          </div>
                          <CardDescription>
                            Publié le {announcement.date} • Pour: {announcement.audience}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{announcement.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="text-sm text-muted-foreground">
                            {announcement.published ? "Publié" : "Brouillon"}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm">
                              Supprimer
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Créer une annonce</CardTitle>
                  <CardDescription>Publiez une nouvelle annonce</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="announcement-title">Titre</Label>
                      <Input id="announcement-title" placeholder="Titre de l'annonce" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-type">Type</Label>
                      <Select>
                        <SelectTrigger id="announcement-type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Information</SelectItem>
                          <SelectItem value="event">Événement</SelectItem>
                          <SelectItem value="reminder">Rappel</SelectItem>
                          <SelectItem value="alert">Alerte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-audience">Audience</Label>
                      <Select>
                        <SelectTrigger id="announcement-audience">
                          <SelectValue placeholder="Sélectionner une audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="students">Élèves</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                          <SelectItem value="3A">Classe 3ème A</SelectItem>
                          <SelectItem value="3B">Classe 3ème B</SelectItem>
                          <SelectItem value="4A">Classe 4ème A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-content">Contenu</Label>
                      <Textarea
                        id="announcement-content"
                        placeholder="Contenu de l'annonce"
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="important" />
                      <Label htmlFor="important">Marquer comme important</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="publish" defaultChecked />
                      <Label htmlFor="publish">Publier immédiatement</Label>
                    </div>
                    <Button className="w-full">Créer l'annonce</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Contact {
  id: string
  name: string
  avatar: string
  role: "student" | "parent" | "admin"
}

interface Message {
  sender: "me" | "them"
  content: string
  time: string
}

interface Conversation {
  id: string
  with: Contact
  subject: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
  messages: Message[]
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  replies: number
  lastActivity: string
  lastActivityBy: string
  isActive: boolean
}

interface PopularTopic {
  title: string
  replies: number
  lastActivity: string
}

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  date: string
  audience: string
  important: boolean
  published: boolean
}

// Sample data
const recipients: Contact[] = [
  { id: "s1", name: "Sophie Martin", avatar: "/placeholder.svg?height=32&width=32", role: "student" },
  { id: "s2", name: "Lucas Dubois", avatar: "/placeholder.svg?height=32&width=32", role: "student" },
  { id: "s3", name: "Emma Petit", avatar: "/placeholder.svg?height=32&width=32", role: "student" },
  { id: "s4", name: "Thomas Leroy", avatar: "/placeholder.svg?height=32&width=32", role: "student" },
  { id: "p1", name: "M. et Mme Martin", avatar: "/placeholder.svg?height=32&width=32", role: "parent" },
  { id: "p2", name: "M. et Mme Dubois", avatar: "/placeholder.svg?height=32&width=32", role: "parent" },
  { id: "p3", name: "M. et Mme Petit", avatar: "/placeholder.svg?height=32&width=32", role: "parent" },
  { id: "a1", name: "M. Dupont", avatar: "/placeholder.svg?height=32&width=32", role: "admin" },
  { id: "a2", name: "Mme Richard", avatar: "/placeholder.svg?height=32&width=32", role: "admin" },
]

const conversations: Conversation[] = [
  {
    id: "c1",
    with: { id: "p1", name: "M. et Mme Martin", avatar: "/placeholder.svg?height=32&width=32", role: "parent" },
    subject: "Progrès de Sophie en mathématiques",
    lastMessage: "Sophie a fait de grands progrès ce mois-ci, notamment sur les fonctions dérivées.",
    lastMessageTime: "Il y a 2h",
    unread: true,
    messages: [
      {
        sender: "them",
        content:
          "Bonjour Mme Dubois, nous souhaiterions avoir des informations sur les progrès de Sophie en mathématiques.",
        time: "Hier, 14:30",
      },
      {
        sender: "me",
        content:
          "Bonjour M. et Mme Martin, Sophie fait de très bons progrès. Elle a particulièrement bien compris le chapitre sur les fonctions dérivées.",
        time: "Hier, 15:45",
      },
      {
        sender: "them",
        content: "C'est une bonne nouvelle ! A-t-elle des difficultés particulières sur certains points ?",
        time: "Hier, 16:20",
      },
      {
        sender: "me",
        content:
          "Sophie a fait de grands progrès ce mois-ci, notamment sur les fonctions dérivées. Elle pourrait encore améliorer sa rigueur dans les démonstrations, mais dans l'ensemble son travail est très satisfaisant.",
        time: "Il y a 2h",
      },
    ],
  },
  {
    id: "c2",
    with: { id: "s1", name: "Sophie Martin", avatar: "/placeholder.svg?height=32&width=32", role: "student" },
    subject: "Question sur le devoir de mathématiques",
    lastMessage: "Merci pour votre réponse, je vais essayer cette méthode.",
    lastMessageTime: "Hier",
    unread: false,
    messages: [
      {
        sender: "them",
        content:
          "Bonjour Mme Dubois, j'ai une question sur l'exercice 3 du devoir de mathématiques. Je n'arrive pas à résoudre l'équation différentielle.",
        time: "Hier, 10:15",
      },
      {
        sender: "me",
        content:
          "Bonjour Sophie, pour cet exercice, il faut d'abord identifier le type d'équation différentielle. Dans ce cas, c'est une équation à variables séparables. Essayez de regrouper les termes en y d'un côté et les termes en x de l'autre.",
        time: "Hier, 11:30",
      },
      {
        sender: "them",
        content: "Merci pour votre réponse, je vais essayer cette méthode.",
        time: "Hier, 12:45",
      },
    ],
  },
  {
    id: "c3",
    with: { id: "a1", name: "M. Dupont", avatar: "/placeholder.svg?height=32&width=32", role: "admin" },
    subject: "Réunion pédagogique",
    lastMessage: "La réunion pédagogique aura lieu le 20 mars à 14h en salle des professeurs.",
    lastMessageTime: "Il y a 3j",
    unread: false,
    messages: [
      {
        sender: "them",
        content: "Bonjour Mme Dubois, je vous informe que la prochaine réunion pédagogique aura lieu le 20 mars.",
        time: "Il y a 3j, 09:30",
      },
      {
        sender: "me",
        content: "Bonjour M. Dupont, merci pour l'information. Pouvez-vous me préciser l'heure et le lieu ?",
        time: "Il y a 3j, 10:45",
      },
      {
        sender: "them",
        content: "La réunion pédagogique aura lieu le 20 mars à 14h en salle des professeurs.",
        time: "Il y a 3j, 11:15",
      },
    ],
  },
  {
    id: "c4",
    with: { id: "p2", name: "M. et Mme Dubois", avatar: "/placeholder.svg?height=32&width=32", role: "parent" },
    subject: "Comportement de Lucas en classe",
    lastMessage: "Nous allons discuter avec Lucas de son comportement.",
    lastMessageTime: "Il y a 1sem",
    unread: false,
    messages: [
      {
        sender: "me",
        content:
          "Bonjour M. et Mme Dubois, je souhaite vous informer que Lucas a été perturbateur en classe ces derniers jours. Il bavarde beaucoup et dérange ses camarades.",
        time: "Il y a 1sem, 16:30",
      },
      {
        sender: "them",
        content:
          "Bonjour Mme Dubois, nous vous remercions de nous avoir informés. Nous sommes surpris car Lucas est habituellement calme à la maison.",
        time: "Il y a 1sem, 18:45",
      },
      {
        sender: "me",
        content:
          "Je comprends votre surprise. Peut-être traverse-t-il une période difficile ? Il serait bon d'en discuter avec lui.",
        time: "Il y a 1sem, 19:10",
      },
      {
        sender: "them",
        content: "Nous allons discuter avec Lucas de son comportement.",
        time: "Il y a 1sem, 20:30",
      },
    ],
  },
]

const forumPosts: ForumPost[] = [
  {
    id: "f1",
    title: "Exercices sur les fonctions dérivées",
    content: "Bonjour, j'ai du mal avec l'exercice 3 sur les fonctions dérivées. Quelqu'un pourrait m'aider ?",
    author: "Sophie Martin",
    replies: 8,
    lastActivity: "Il y a 2h",
    lastActivityBy: "Mme Dubois",
    isActive: true,
  },
  {
    id: "f2",
    title: "Préparation au contrôle de mathématiques",
    content: "Quels sont les points importants à réviser pour le prochain contrôle ?",
    author: "Lucas Dubois",
    replies: 5,
    lastActivity: "Hier",
    lastActivityBy: "Emma Petit",
    isActive: true,
  },
  {
    id: "f3",
    title: "Projet de statistiques",
    content: "Comment former les groupes pour le projet de statistiques ?",
    author: "Thomas Leroy",
    replies: 3,
    lastActivity: "Il y a 3j",
    lastActivityBy: "Mme Dubois",
    isActive: true,
  },
  {
    id: "f4",
    title: "Exercices supplémentaires pour le brevet",
    content: "Y a-t-il des exercices supplémentaires pour préparer le brevet ?",
    author: "Emma Petit",
    replies: 2,
    lastActivity: "Il y a 5j",
    lastActivityBy: "Lucas Dubois",
    isActive: false,
  },
  {
    id: "f5",
    title: "Problème avec les équations du second degré",
    content: "Je n'arrive pas à comprendre comment factoriser certaines équations du second degré.",
    author: "Sophie Martin",
    replies: 6,
    lastActivity: "Il y a 1sem",
    lastActivityBy: "Mme Dubois",
    isActive: false,
  },
]

const popularTopics: PopularTopic[] = [
  {
    title: "Exercices sur les fonctions dérivées",
    replies: 8,
    lastActivity: "Il y a 2h",
  },
  {
    title: "Préparation au contrôle de mathématiques",
    replies: 5,
    lastActivity: "Hier",
  },
  {
    title: "Problème avec les équations du second degré",
    replies: 6,
    lastActivity: "Il y a 1sem",
  },
  {
    title: "Projet de statistiques",
    replies: 3,
    lastActivity: "Il y a 3j",
  },
]

const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Contrôle de mathématiques",
    content:
      "Un contrôle de mathématiques sur les fonctions dérivées aura lieu le 20 mars 2025. Tous les chapitres vus en classe seront évalués.",
    type: "Évaluation",
    date: "15/03/2025",
    audience: "3ème A, 3ème B",
    important: true,
    published: true,
  },
  {
    id: "a2",
    title: "Projet de statistiques",
    content:
      "Le projet de statistiques devra être rendu le 25 mars 2025. Les groupes doivent être formés avant le 15 mars.",
    type: "Projet",
    date: "10/03/2025",
    audience: "4ème B",
    important: false,
    published: true,
  },
  {
    id: "a3",
    title: "Révisions pour le brevet",
    content:
      "Des séances de révision pour le brevet seront organisées les mercredis après-midi à partir du 2 avril 2025.",
    type: "Information",
    date: "05/03/2025",
    audience: "3ème A, 3ème B",
    important: false,
    published: true,
  },
  {
    id: "a4",
    title: "Changement d'emploi du temps",
    content: "En raison de mon absence le 22 mars, le cours de mathématiques sera reporté au 23 mars.",
    type: "Information",
    date: "18/03/2025",
    audience: "4ème A",
    important: false,
    published: false,
  },
]


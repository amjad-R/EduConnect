"use client"

import { useState } from "react"
import { Search, Send, Filter, Paperclip, MoreHorizontal, Archive, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CommunicationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [filter, setFilter] = useState("all")

  // Filter conversations based on search query and filter
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && conversation.unread) ||
      (filter === "teachers" && conversation.with.role === "teacher") ||
      (filter === "admin" && conversation.with.role === "admin")

    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you would send the message to the server
      console.log(`Sending message to ${selectedConversation.with.name}: ${newMessage}`)
      setNewMessage("")
    }
  }

  const handleNewConversation = () => {
    // In a real app, you would open a modal to create a new conversation
    console.log("Creating new conversation")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Communication</h2>
        <p className="text-muted-foreground">Échangez avec les enseignants et l'administration de l'établissement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrer</span>
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Non lus
                {conversations.filter((c) => c.unread).length > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-1 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {conversations.filter((c) => c.unread).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="teachers">Profs</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Conversations</h3>
            <Button variant="ghost" size="sm" onClick={handleNewConversation}>
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
                          {conversation.with.role === "teacher" ? "Enseignant" : "Administration"}
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
                      {selectedConversation.with.role === "teacher" ? "Enseignant" : "Administration"}
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
                            <AvatarImage src={selectedConversation.with.avatar} alt={selectedConversation.with.name} />
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
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucune conversation sélectionnée</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Sélectionnez une conversation dans la liste ou créez-en une nouvelle.
                </p>
                <Button onClick={handleNewConversation}>Nouveau message</Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>Liste des enseignants et du personnel administratif</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="teachers">
            <TabsList>
              <TabsTrigger value="teachers">Enseignants</TabsTrigger>
              <TabsTrigger value="admin">Administration</TabsTrigger>
            </TabsList>
            <TabsContent value="teachers" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((teacher, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={teacher.avatar} alt={teacher.name} />
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                          <p className="text-xs text-muted-foreground">{teacher.email}</p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm"
                            onClick={() => {
                              // Find if there's an existing conversation with this teacher
                              const existingConversation = conversations.find((c) => c.with.id === teacher.id)
                              if (existingConversation) {
                                setSelectedConversation(existingConversation)
                              } else {
                                handleNewConversation()
                              }
                            }}
                          >
                            Envoyer un message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminStaff.map((staff, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">{staff.position}</p>
                          <p className="text-xs text-muted-foreground">{staff.email}</p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm"
                            onClick={() => {
                              // Find if there's an existing conversation with this admin
                              const existingConversation = conversations.find((c) => c.with.id === staff.id)
                              if (existingConversation) {
                                setSelectedConversation(existingConversation)
                              } else {
                                handleNewConversation()
                              }
                            }}
                          >
                            Envoyer un message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

interface Contact {
  id: string
  name: string
  avatar: string
  email: string
}

interface Teacher extends Contact {
  subject: string
  role: "teacher"
}

interface AdminStaff extends Contact {
  position: string
  role: "admin"
}

interface Message {
  sender: "me" | "them"
  content: string
  time: string
}

interface Conversation {
  id: string
  with: Teacher | AdminStaff
  subject: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
  messages: Message[]
}

// Sample data
const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Mme Dubois",
    subject: "Mathématiques",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "dubois@ecole.fr",
    role: "teacher",
  },
  {
    id: "t2",
    name: "M. Martin",
    subject: "Histoire-Géographie",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "martin@ecole.fr",
    role: "teacher",
  },
  {
    id: "t3",
    name: "Mme Leroy",
    subject: "Français",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "leroy@ecole.fr",
    role: "teacher",
  },
  {
    id: "t4",
    name: "M. Bernard",
    subject: "Physique-Chimie",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "bernard@ecole.fr",
    role: "teacher",
  },
  {
    id: "t5",
    name: "Mme Petit",
    subject: "Anglais",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "petit@ecole.fr",
    role: "teacher",
  },
  {
    id: "t6",
    name: "M. Moreau",
    subject: "SVT",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "moreau@ecole.fr",
    role: "teacher",
  },
]

const adminStaff: AdminStaff[] = [
  {
    id: "a1",
    name: "M. Dupont",
    position: "Directeur",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "directeur@ecole.fr",
    role: "admin",
  },
  {
    id: "a2",
    name: "Mme Richard",
    position: "Secrétaire",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "secretariat@ecole.fr",
    role: "admin",
  },
  {
    id: "a3",
    name: "M. Lambert",
    position: "Conseiller d'éducation",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "cpe@ecole.fr",
    role: "admin",
  },
]

const conversations: Conversation[] = [
  {
    id: "c1",
    with: teachers[0],
    subject: "Progrès en mathématiques",
    lastMessage: "Sophie a fait de grands progrès ce mois-ci, notamment sur les fonctions dérivées.",
    lastMessageTime: "Il y a 2h",
    unread: true,
    messages: [
      {
        sender: "them",
        content: "Bonjour M. et Mme Martin, je souhaitais vous informer des progrès de Sophie en mathématiques.",
        time: "Hier, 14:30",
      },
      {
        sender: "me",
        content: "Bonjour Mme Dubois, merci de nous tenir informés. Comment se passe son travail en classe ?",
        time: "Hier, 15:45",
      },
      {
        sender: "them",
        content:
          "Sophie est très attentive en classe et participe régulièrement. Elle a particulièrement bien compris le chapitre sur les fonctions dérivées.",
        time: "Hier, 16:20",
      },
      {
        sender: "them",
        content: "Sophie a fait de grands progrès ce mois-ci, notamment sur les fonctions dérivées.",
        time: "Il y a 2h",
      },
    ],
  },
  {
    id: "c2",
    with: teachers[1],
    subject: "Devoir d'histoire",
    lastMessage: "Je souhaiterais vous rencontrer pour discuter du dernier devoir de Sophie.",
    lastMessageTime: "Hier",
    unread: true,
    messages: [
      {
        sender: "them",
        content: "Bonjour M. et Mme Martin, je souhaiterais vous rencontrer pour discuter du dernier devoir de Sophie.",
        time: "Hier, 10:15",
      },
    ],
  },
  {
    id: "c3",
    with: adminStaff[0],
    subject: "Planning des examens",
    lastMessage: "Veuillez trouver ci-joint le planning des examens du troisième trimestre.",
    lastMessageTime: "Il y a 3j",
    unread: false,
    messages: [
      {
        sender: "them",
        content: "Chers parents, veuillez trouver ci-joint le planning des examens du troisième trimestre.",
        time: "Il y a 3j, 09:30",
      },
      {
        sender: "me",
        content:
          "Merci pour ces informations. Pouvez-vous préciser si les élèves auront une semaine de révision avant les examens ?",
        time: "Il y a 3j, 11:45",
      },
      {
        sender: "them",
        content:
          "Oui, une semaine de révision est prévue du 10 au 14 juin. Les enseignants organiseront des séances de révision pendant cette période.",
        time: "Il y a 3j, 14:20",
      },
    ],
  },
  {
    id: "c4",
    with: teachers[2],
    subject: "Projet de français",
    lastMessage: "Sophie a rendu un excellent travail pour son projet sur Victor Hugo.",
    lastMessageTime: "Il y a 1sem",
    unread: false,
    messages: [
      {
        sender: "them",
        content:
          "Bonjour, je tenais à vous informer que Sophie a rendu un excellent travail pour son projet sur Victor Hugo.",
        time: "Il y a 1sem, 16:30",
      },
      {
        sender: "me",
        content: "Nous sommes ravis de l'apprendre ! Elle a beaucoup travaillé sur ce projet.",
        time: "Il y a 1sem, 18:45",
      },
      {
        sender: "them",
        content: "Cela se voit ! Son analyse était très pertinente et bien documentée. Elle a obtenu la note de 18/20.",
        time: "Il y a 1sem, 19:10",
      },
    ],
  },
]


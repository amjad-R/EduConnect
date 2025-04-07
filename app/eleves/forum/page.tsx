"use client"

import { useState } from "react"
import { Send, Search, Users, BookOpen, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export default function ForumPage() {
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDiscussion, setActiveDiscussion] = useState<Discussion | null>(null)

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (message.trim() && activeDiscussion) {
      // In a real app, you would send the message to the server
      // For demo purposes, we'll just clear the input
      setMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Forum de Discussion</h2>
        <p className="text-muted-foreground">Échangez avec vos camarades et posez vos questions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une discussion..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="popular">Populaires</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-2">
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  isActive={activeDiscussion?.id === discussion.id}
                  onClick={() => setActiveDiscussion(discussion)}
                />
              ))}
            </TabsContent>

            <TabsContent value="recent" className="mt-4 space-y-2">
              {filteredDiscussions
                .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
                .map((discussion) => (
                  <DiscussionCard
                    key={discussion.id}
                    discussion={discussion}
                    isActive={activeDiscussion?.id === discussion.id}
                    onClick={() => setActiveDiscussion(discussion)}
                  />
                ))}
            </TabsContent>

            <TabsContent value="popular" className="mt-4 space-y-2">
              {filteredDiscussions
                .sort((a, b) => b.messages.length - a.messages.length)
                .map((discussion) => (
                  <DiscussionCard
                    key={discussion.id}
                    discussion={discussion}
                    isActive={activeDiscussion?.id === discussion.id}
                    onClick={() => setActiveDiscussion(discussion)}
                  />
                ))}
            </TabsContent>
          </Tabs>

          <Button className="w-full">Nouvelle discussion</Button>
        </div>

        <Card>
          {activeDiscussion ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{activeDiscussion.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{activeDiscussion.subject}</span>
                      <span className="text-xs">•</span>
                      <Users className="h-4 w-4" />
                      <span>{activeDiscussion.participants} participants</span>
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{activeDiscussion.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                {activeDiscussion.messages.map((message, index) => (
                  <div key={index} className={`flex gap-4 ${message.sender === "Sophie Martin" ? "justify-end" : ""}`}>
                    {message.sender !== "Sophie Martin" && (
                      <Avatar>
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`space-y-1 max-w-[80%] ${message.sender === "Sophie Martin" ? "items-end" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "Sophie Martin" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    {message.sender === "Sophie Martin" && (
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sophie Martin" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center gap-2">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    className="min-h-[80px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucune discussion sélectionnée</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sélectionnez une discussion dans la liste ou créez-en une nouvelle.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

interface Discussion {
  id: number
  title: string
  subject: string
  participants: number
  lastActivity: string
  status: string
  messages: {
    sender: string
    avatar: string
    content: string
    time: string
  }[]
}

interface DiscussionCardProps {
  discussion: Discussion
  isActive: boolean
  onClick: () => void
}

function DiscussionCard({ discussion, isActive, onClick }: DiscussionCardProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-3 transition-colors ${
        isActive ? "border-primary bg-primary/5" : "hover:bg-muted/50"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <h3 className="font-medium line-clamp-1">{discussion.title}</h3>
        <Badge variant="outline" className="ml-2 shrink-0">
          {discussion.subject}
        </Badge>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{discussion.participants}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{discussion.lastActivity}</span>
        </div>
      </div>
    </div>
  )
}

// Sample data
const discussions: Discussion[] = [
  {
    id: 1,
    title: "Exercices sur les fonctions dérivées",
    subject: "Mathématiques",
    participants: 8,
    lastActivity: "Il y a 2h",
    status: "Actif",
    messages: [
      {
        sender: "Thomas Durand",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Bonjour, j'ai du mal avec l'exercice 3 sur les fonctions dérivées. Quelqu'un pourrait m'aider ?",
        time: "Hier, 18:30",
      },
      {
        sender: "Léa Martin",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Pour l'exercice 3, il faut d'abord factoriser l'expression avant de dériver.",
        time: "Hier, 18:45",
      },
      {
        sender: "Sophie Martin",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "J'ai aussi eu du mal avec cet exercice. Merci pour l'explication Léa !",
        time: "Hier, 19:00",
      },
      {
        sender: "Thomas Durand",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Ah je vois ! Et après la factorisation, on applique la formule de la dérivée d'un produit ?",
        time: "Hier, 19:15",
      },
      {
        sender: "Léa Martin",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Exactement ! N'oublie pas que (u×v)' = u'×v + u×v'",
        time: "Hier, 19:30",
      },
    ],
  },
  {
    id: 2,
    title: "Analyse du poème 'Demain, dès l'aube' de Victor Hugo",
    subject: "Français",
    participants: 5,
    lastActivity: "Il y a 1j",
    status: "Actif",
    messages: [
      {
        sender: "Emma Dubois",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Quelles sont les principales figures de style dans ce poème ?",
        time: "15/02, 14:20",
      },
      {
        sender: "Lucas Bernard",
        avatar: "/placeholder.svg?height=32&width=32",
        content:
          "Il y a beaucoup de métaphores et d'allitérations. Par exemple, 'je marcherai les yeux fixés sur mes pensées' est une métaphore.",
        time: "15/02, 14:35",
      },
    ],
  },
  {
    id: 3,
    title: "Préparation de l'exposé sur la Seconde Guerre mondiale",
    subject: "Histoire",
    participants: 4,
    lastActivity: "Il y a 3j",
    status: "Résolu",
    messages: [
      {
        sender: "Antoine Moreau",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Qui veut faire partie de mon groupe pour l'exposé sur la Seconde Guerre mondiale ?",
        time: "12/02, 10:15",
      },
    ],
  },
  {
    id: 4,
    title: "Compte-rendu de l'expérience sur les réactions chimiques",
    subject: "Physique-Chimie",
    participants: 6,
    lastActivity: "Il y a 5j",
    status: "Actif",
    messages: [
      {
        sender: "Camille Leroy",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Comment doit-on présenter les résultats de l'expérience dans le compte-rendu ?",
        time: "10/02, 16:45",
      },
    ],
  },
  {
    id: 5,
    title: "Vocabulaire pour l'examen d'anglais",
    subject: "Anglais",
    participants: 7,
    lastActivity: "Il y a 1sem",
    status: "Actif",
    messages: [
      {
        sender: "Julien Petit",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Quelqu'un a une liste de vocabulaire pour réviser l'examen d'anglais ?",
        time: "05/02, 18:30",
      },
    ],
  },
]


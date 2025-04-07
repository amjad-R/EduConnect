"use client"

import { useState } from "react"
import { BookOpen, FileText, Search, Video, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RessourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || resource.subject === subjectFilter
    const matchesType = typeFilter === "all" || resource.type === typeFilter

    return matchesSearch && matchesSubject && matchesType
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ressources Pédagogiques</h2>
        <p className="text-muted-foreground">Accédez à une bibliothèque de documents, vidéos et supports de cours.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une ressource..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les matières" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les matières</SelectItem>
              <SelectItem value="Mathématiques">Mathématiques</SelectItem>
              <SelectItem value="Français">Français</SelectItem>
              <SelectItem value="Histoire">Histoire</SelectItem>
              <SelectItem value="Physique-Chimie">Physique-Chimie</SelectItem>
              <SelectItem value="Anglais">Anglais</SelectItem>
              <SelectItem value="SVT">SVT</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="video">Vidéos</SelectItem>
              <SelectItem value="exercise">Exercices</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="video">Vidéos</TabsTrigger>
          <TabsTrigger value="exercise">Exercices</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="document" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter((resource) => resource.type === "document")
              .map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter((resource) => resource.type === "video")
              .map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="exercise" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter((resource) => resource.type === "exercise")
              .map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Resource {
  title: string
  description: string
  subject: string
  type: "document" | "video" | "exercise"
  date: string
  thumbnail: string
  fileSize?: string
  duration?: string
}

interface ResourceCardProps {
  resource: Resource
}

function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "exercise":
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeLabel = () => {
    switch (resource.type) {
      case "document":
        return "Document"
      case "video":
        return "Vidéo"
      case "exercise":
        return "Exercice"
    }
  }

  const getTypeColor = () => {
    switch (resource.type) {
      case "document":
        return "bg-blue-500/10 text-blue-500"
      case "video":
        return "bg-red-500/10 text-red-500"
      case "exercise":
        return "bg-green-500/10 text-green-500"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative">
        <img
          src={resource.thumbnail || "/placeholder.svg"}
          alt={resource.title}
          className="h-full w-full object-cover"
        />
        <div className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium ${getTypeColor()}`}>
          {getTypeLabel()}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{resource.subject}</Badge>
          <span className="text-xs text-muted-foreground">{resource.date}</span>
        </div>
        <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getIcon()}
          <span>
            {resource.type === "document" && resource.fileSize && `Taille: ${resource.fileSize}`}
            {resource.type === "video" && resource.duration && `Durée: ${resource.duration}`}
            {resource.type === "exercise" && "Exercices pratiques"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          <Download className="h-4 w-4" />
          <span>Télécharger</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const resources: Resource[] = [
  {
    title: "Cours complet sur les fonctions dérivées",
    description:
      "Ce document présente toutes les propriétés des fonctions dérivées avec des exemples détaillés et des applications concrètes.",
    subject: "Mathématiques",
    type: "document",
    date: "10/02/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    fileSize: "2.4 MB",
  },
  {
    title: "Vidéo explicative: La Seconde Guerre mondiale",
    description:
      "Cette vidéo présente les causes, le déroulement et les conséquences de la Seconde Guerre mondiale de manière claire et concise.",
    subject: "Histoire",
    type: "video",
    date: "05/02/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "52 min",
  },
  {
    title: "Exercices corrigés sur les réactions d'oxydo-réduction",
    description:
      "Une série d'exercices avec corrections détaillées pour maîtriser les réactions d'oxydo-réduction en chimie.",
    subject: "Physique-Chimie",
    type: "exercise",
    date: "01/02/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Analyse littéraire: Les Misérables de Victor Hugo",
    description:
      "Document d'analyse approfondie de l'œuvre majeure de Victor Hugo, avec étude des personnages, thèmes et contexte historique.",
    subject: "Français",
    type: "document",
    date: "28/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    fileSize: "3.1 MB",
  },
  {
    title: "Vidéo: Conversation en anglais - Niveau avancé",
    description:
      "Cette vidéo présente une conversation authentique entre locuteurs natifs pour améliorer la compréhension orale et enrichir le vocabulaire.",
    subject: "Anglais",
    type: "video",
    date: "25/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "35 min",
  },
  {
    title: "Exercices de révision pour le brevet",
    description: "Compilation d'exercices types pour préparer l'examen du brevet dans toutes les matières principales.",
    subject: "Mathématiques",
    type: "exercise",
    date: "20/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "La biodiversité et les écosystèmes",
    description:
      "Document complet sur les différents écosystèmes, la biodiversité et les enjeux environnementaux actuels.",
    subject: "SVT",
    type: "document",
    date: "15/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    fileSize: "4.2 MB",
  },
  {
    title: "Vidéo: Les figures de style en littérature",
    description:
      "Explication détaillée des principales figures de style avec des exemples tirés de grands classiques de la littérature.",
    subject: "Français",
    type: "video",
    date: "10/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "42 min",
  },
  {
    title: "Exercices pratiques: Circuits électriques",
    description:
      "Série d'exercices pratiques pour comprendre et maîtriser les circuits électriques en série et en parallèle.",
    subject: "Physique-Chimie",
    type: "exercise",
    date: "05/01/2025",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]


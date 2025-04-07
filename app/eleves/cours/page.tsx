"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FileText, Play, Download, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function CoursPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cours et Devoirs</h2>
        <p className="text-muted-foreground">Accédez à vos cours, vidéos et soumettez vos devoirs.</p>
      </div>

      <Tabs defaultValue="cours">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cours">Mes Cours</TabsTrigger>
          <TabsTrigger value="devoirs">Mes Devoirs</TabsTrigger>
        </TabsList>

        <TabsContent value="cours" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-background/80">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.subject}</Badge>
                    <span className="text-xs text-muted-foreground">{course.duration}</span>
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Documents</span>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/eleves/cours/${index}`}>Voir le cours</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="devoirs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={assignment.status === "À rendre" ? "destructive" : "outline"}>
                      {assignment.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{assignment.dueDate}</span>
                  </div>
                  <CardTitle className="line-clamp-1">{assignment.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {assignment.subject} - {assignment.teacher}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {assignment.status === "À rendre" ? (
                    <div className="w-full space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor={`file-${index}`}>Déposer votre devoir</Label>
                        <div className="flex gap-2">
                          <Input id={`file-${index}`} type="file" className="flex-1" onChange={handleFileChange} />
                          <Button size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {selectedFile && (
                        <div className="text-xs text-muted-foreground">Fichier sélectionné: {selectedFile.name}</div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Note:</span>
                        <span className="text-sm">{assignment.grade}/20</span>
                      </div>
                      <Textarea
                        placeholder="Commentaires du professeur"
                        value={assignment.feedback}
                        readOnly
                        className="h-20 resize-none"
                      />
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const courses = [
  {
    title: "Les fonctions dérivées et leurs applications",
    description:
      "Cours complet sur les fonctions dérivées, leurs propriétés et applications dans la résolution de problèmes.",
    subject: "Mathématiques",
    duration: "45 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "La Seconde Guerre mondiale: causes et conséquences",
    description:
      "Analyse historique des événements majeurs de la Seconde Guerre mondiale et de son impact sur le monde contemporain.",
    subject: "Histoire",
    duration: "52 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Les réactions d'oxydo-réduction",
    description: "Étude des réactions chimiques impliquant un transfert d'électrons et leurs applications pratiques.",
    subject: "Physique-Chimie",
    duration: "38 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Shakespeare et le théâtre élisabéthain",
    description:
      "Découverte de l'œuvre de William Shakespeare et du contexte historique et culturel du théâtre élisabéthain.",
    subject: "Anglais",
    duration: "41 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "Victor Hugo: Les Misérables",
    description:
      "Analyse littéraire de l'œuvre majeure de Victor Hugo, son contexte historique et ses thèmes principaux.",
    subject: "Français",
    duration: "49 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    title: "L'écosystème et la biodiversité",
    description:
      "Étude des interactions entre les êtres vivants et leur environnement, et l'importance de la préservation de la biodiversité.",
    subject: "SVT",
    duration: "35 min",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]

const assignments = [
  {
    title: "Exercices sur les fonctions dérivées",
    description: "Résoudre les exercices 1 à 5 du chapitre 4 sur les applications des fonctions dérivées.",
    subject: "Mathématiques",
    teacher: "M. Dupont",
    dueDate: "15 mars 2025",
    status: "À rendre",
    grade: null,
    feedback: "",
  },
  {
    title: "Dissertation: La Seconde Guerre mondiale",
    description:
      "Rédiger une dissertation sur les causes et conséquences de la Seconde Guerre mondiale (minimum 3 pages).",
    subject: "Histoire",
    teacher: "Mme Martin",
    dueDate: "20 mars 2025",
    status: "À rendre",
    grade: null,
    feedback: "",
  },
  {
    title: "Analyse de poème: Les Contemplations",
    description:
      "Analyser le poème 'Demain, dès l'aube' de Victor Hugo en identifiant les figures de style et thèmes principaux.",
    subject: "Français",
    teacher: "M. Bernard",
    dueDate: "10 mars 2025",
    status: "Corrigé",
    grade: "17",
    feedback:
      "Excellente analyse des thèmes et du style. Bonne identification des figures de style. Quelques imprécisions dans l'analyse de la structure.",
  },
  {
    title: "Compte-rendu d'expérience: Réactions chimiques",
    description: "Rédiger un compte-rendu de l'expérience réalisée en classe sur les réactions d'oxydo-réduction.",
    subject: "Physique-Chimie",
    teacher: "Mme Dubois",
    dueDate: "5 mars 2025",
    status: "Corrigé",
    grade: "15",
    feedback:
      "Bon travail dans l'ensemble. La description du protocole est précise, mais l'analyse des résultats pourrait être plus approfondie.",
  },
]


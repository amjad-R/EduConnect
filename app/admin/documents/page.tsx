"use client"

import { useState } from "react"
import { Download, FileText, Filter, FolderPlus, Search, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Types pour les documents
type DocumentType = "pdf" | "doc" | "xls" | "ppt" | "img" | "zip" | "other"
type DocumentCategory = "administrative" | "pedagogical" | "financial" | "hr" | "student" | "communication"
type DocumentAccess = "public" | "staff" | "teachers" | "admin" | "restricted"

interface Document {
  id: string
  name: string
  type: DocumentType
  category: DocumentCategory
  access: DocumentAccess
  size: string
  uploadedBy: string
  uploadDate: string
  description?: string
}

// Données de démonstration
const documents: Document[] = [
  {
    id: "doc-001",
    name: "Règlement intérieur 2023-2024.pdf",
    type: "pdf",
    category: "administrative",
    access: "public",
    size: "1.2 MB",
    uploadedBy: "Admin Système",
    uploadDate: "15/09/2023",
    description: "Règlement intérieur officiel pour l'année scolaire 2023-2024",
  },
  {
    id: "doc-002",
    name: "Calendrier des examens - Trimestre 2.xlsx",
    type: "xls",
    category: "pedagogical",
    access: "teachers",
    size: "845 KB",
    uploadedBy: "Direction Pédagogique",
    uploadDate: "10/01/2024",
  },
  {
    id: "doc-003",
    name: "Procédure d'évacuation.pdf",
    type: "pdf",
    category: "administrative",
    access: "public",
    size: "3.1 MB",
    uploadedBy: "Service Sécurité",
    uploadDate: "05/10/2023",
    description: "Procédure d'évacuation en cas d'incendie ou autre urgence",
  },
  {
    id: "doc-004",
    name: "Budget prévisionnel 2024.xlsx",
    type: "xls",
    category: "financial",
    access: "admin",
    size: "1.7 MB",
    uploadedBy: "Service Comptabilité",
    uploadDate: "12/12/2023",
  },
  {
    id: "doc-005",
    name: "Formulaire de demande de congés.docx",
    type: "doc",
    category: "hr",
    access: "staff",
    size: "520 KB",
    uploadedBy: "Ressources Humaines",
    uploadDate: "08/11/2023",
  },
  {
    id: "doc-006",
    name: "Projet d'établissement 2023-2026.pdf",
    type: "pdf",
    category: "administrative",
    access: "public",
    size: "4.5 MB",
    uploadedBy: "Direction",
    uploadDate: "01/09/2023",
    description: "Projet d'établissement définissant les objectifs pour les trois prochaines années",
  },
  {
    id: "doc-007",
    name: "Liste des manuels scolaires.pdf",
    type: "pdf",
    category: "pedagogical",
    access: "public",
    size: "980 KB",
    uploadedBy: "Direction Pédagogique",
    uploadDate: "30/06/2023",
  },
  {
    id: "doc-008",
    name: "Compte-rendu du conseil d'administration.docx",
    type: "doc",
    category: "administrative",
    access: "restricted",
    size: "1.1 MB",
    uploadedBy: "Secrétariat de Direction",
    uploadDate: "15/12/2023",
  },
  {
    id: "doc-009",
    name: "Protocole sanitaire.pdf",
    type: "pdf",
    category: "administrative",
    access: "public",
    size: "2.3 MB",
    uploadedBy: "Service Santé",
    uploadDate: "05/09/2023",
    description: "Protocole sanitaire en vigueur dans l'établissement",
  },
  {
    id: "doc-010",
    name: "Organigramme du personnel.pptx",
    type: "ppt",
    category: "hr",
    access: "staff",
    size: "1.8 MB",
    uploadedBy: "Ressources Humaines",
    uploadDate: "20/09/2023",
  },
]

// Fonction pour obtenir l'icône en fonction du type de document
function getDocumentIcon(type: DocumentType) {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />
    case "doc":
      return <FileText className="h-5 w-5 text-blue-500" />
    case "xls":
      return <FileText className="h-5 w-5 text-green-500" />
    case "ppt":
      return <FileText className="h-5 w-5 text-orange-500" />
    case "img":
      return <FileText className="h-5 w-5 text-purple-500" />
    case "zip":
      return <FileText className="h-5 w-5 text-gray-500" />
    default:
      return <FileText className="h-5 w-5 text-gray-400" />
  }
}

// Fonction pour obtenir le libellé de la catégorie
function getCategoryLabel(category: DocumentCategory) {
  switch (category) {
    case "administrative":
      return "Administratif"
    case "pedagogical":
      return "Pédagogique"
    case "financial":
      return "Financier"
    case "hr":
      return "Ressources Humaines"
    case "student":
      return "Élèves"
    case "communication":
      return "Communication"
    default:
      return category
  }
}

// Fonction pour obtenir le libellé du niveau d'accès
function getAccessLabel(access: DocumentAccess) {
  switch (access) {
    case "public":
      return "Public"
    case "staff":
      return "Personnel"
    case "teachers":
      return "Enseignants"
    case "admin":
      return "Administrateurs"
    case "restricted":
      return "Restreint"
    default:
      return access
  }
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [accessFilter, setAccessFilter] = useState<string>("all")

  // Filtrer les documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesAccess = accessFilter === "all" || doc.access === accessFilter
    return matchesSearch && matchesCategory && matchesAccess
  })

  const handleDownload = (docId: string) => {
    toast({
      title: "Téléchargement démarré",
      description: "Le document est en cours de téléchargement.",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Documents officiels</h1>
        <p className="text-muted-foreground">Gérez les documents officiels de l'établissement.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="administrative">Administratif</SelectItem>
              <SelectItem value="pedagogical">Pédagogique</SelectItem>
              <SelectItem value="financial">Financier</SelectItem>
              <SelectItem value="hr">Ressources Humaines</SelectItem>
              <SelectItem value="student">Élèves</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>
          <Select value={accessFilter} onValueChange={setAccessFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Niveau d'accès" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="staff">Personnel</SelectItem>
              <SelectItem value="teachers">Enseignants</SelectItem>
              <SelectItem value="admin">Administrateurs</SelectItem>
              <SelectItem value="restricted">Restreint</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            Nouveau dossier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous les documents</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="shared">Partagés</TabsTrigger>
          <TabsTrigger value="important">Importants</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Accès</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {getDocumentIcon(doc.type)}
                          <span className="ml-2">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryLabel(doc.category)}</TableCell>
                      <TableCell>{getAccessLabel(doc.access)}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem>Partager</DropdownMenuItem>
                            <DropdownMenuItem>Renommer</DropdownMenuItem>
                            <DropdownMenuItem>Déplacer</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Affichage de {filteredDocuments.length} documents sur {documents.length}
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Documents récents</CardTitle>
              <CardDescription>Documents ajoutés ou modifiés au cours des 30 derniers jours.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Affichage des documents les plus récents.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared">
          <Card>
            <CardHeader>
              <CardTitle>Documents partagés</CardTitle>
              <CardDescription>Documents partagés avec d'autres utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Affichage des documents partagés.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="important">
          <Card>
            <CardHeader>
              <CardTitle>Documents importants</CardTitle>
              <CardDescription>Documents marqués comme importants.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Affichage des documents importants.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

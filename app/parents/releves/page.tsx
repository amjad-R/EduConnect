"use client"

import { useState } from "react"
import { Search, Download, Filter, Eye, Calendar, FileText, Printer, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function RelevesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)

  // Filter documents based on search query, year filter, and type filter
  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesYearFilter = yearFilter === "all" || document.schoolYear === yearFilter

    const matchesTypeFilter = typeFilter === "all" || document.type === typeFilter

    return matchesSearch && matchesYearFilter && matchesTypeFilter
  })

  const handlePreview = (document: Document) => {
    setPreviewDocument(document)
  }

  const handleDownload = (document: Document) => {
    // In a real app, this would download the document
    console.log(`Downloading ${document.title}`)
  }

  const handlePrint = (document: Document) => {
    // In a real app, this would print the document
    console.log(`Printing ${document.title}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relevés de Notes</h2>
        <p className="text-muted-foreground">Accédez aux bulletins scolaires et autres documents importants.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un document..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Année scolaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les années</SelectItem>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type de document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="bulletin">Bulletins</SelectItem>
              <SelectItem value="report">Rapports</SelectItem>
              <SelectItem value="certificate">Certificats</SelectItem>
              <SelectItem value="other">Autres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grille</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucun document trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Aucun document ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <Card key={document.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{document.title}</CardTitle>
                        <CardDescription>{document.description}</CardDescription>
                      </div>
                      <Badge variant={getDocumentBadgeVariant(document.type)}>
                        {getDocumentTypeLabel(document.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date: {document.date}</span>
                      <span className="text-muted-foreground">Année: {document.schoolYear}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-muted/50 p-2">
                    <Button variant="ghost" size="sm" onClick={() => handlePreview(document)}>
                      <Eye className="h-4 w-4 mr-1" /> Aperçu
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(document)}>
                      <Download className="h-4 w-4 mr-1" /> Télécharger
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Année scolaire</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Aucun document trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{document.title}</p>
                            <p className="text-sm text-muted-foreground">{document.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getDocumentBadgeVariant(document.type)}>
                            {getDocumentTypeLabel(document.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{document.date}</TableCell>
                        <TableCell>{document.schoolYear}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreview(document)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Aperçu</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(document)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Télécharger</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handlePrint(document)}>
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Imprimer</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!previewDocument} onOpenChange={(open) => !open && setPreviewDocument(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewDocument?.title}</DialogTitle>
            <DialogDescription>{previewDocument?.description}</DialogDescription>
          </DialogHeader>
          <div className="bg-muted rounded-md p-4 min-h-[400px] flex flex-col items-center justify-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              Aperçu du document. Dans une application réelle, le contenu du document serait affiché ici.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => previewDocument && handlePrint(previewDocument)}>
              <Printer className="h-4 w-4 mr-2" /> Imprimer
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" /> Partager
              </Button>
              <Button onClick={() => previewDocument && handleDownload(previewDocument)}>
                <Download className="h-4 w-4 mr-2" /> Télécharger
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface Document {
  id: string
  title: string
  description: string
  type: "bulletin" | "report" | "certificate" | "other"
  date: string
  schoolYear: string
  fileSize: string
  url: string
}

// Helper functions
function getDocumentTypeLabel(type: string): string {
  switch (type) {
    case "bulletin":
      return "Bulletin"
    case "report":
      return "Rapport"
    case "certificate":
      return "Certificat"
    case "other":
      return "Autre"
    default:
      return type
  }
}

function getDocumentBadgeVariant(type: string): "default" | "secondary" | "outline" | "destructive" {
  switch (type) {
    case "bulletin":
      return "default"
    case "report":
      return "secondary"
    case "certificate":
      return "outline"
    default:
      return "outline"
  }
}

// Sample data
const documents: Document[] = [
  {
    id: "1",
    title: "Bulletin du 1er trimestre",
    description: "Bulletin scolaire du premier trimestre 2024-2025",
    type: "bulletin",
    date: "15/12/2024",
    schoolYear: "2024-2025",
    fileSize: "1.2 MB",
    url: "#",
  },
  {
    id: "2",
    title: "Bulletin du 2ème trimestre",
    description: "Bulletin scolaire du deuxième trimestre 2024-2025",
    type: "bulletin",
    date: "15/03/2025",
    schoolYear: "2024-2025",
    fileSize: "1.3 MB",
    url: "#",
  },
  {
    id: "3",
    title: "Rapport de comportement",
    description: "Rapport sur le comportement et l'attitude en classe",
    type: "report",
    date: "10/02/2025",
    schoolYear: "2024-2025",
    fileSize: "850 KB",
    url: "#",
  },
  {
    id: "4",
    title: "Certificat de scolarité",
    description: "Certificat attestant l'inscription pour l'année scolaire en cours",
    type: "certificate",
    date: "05/09/2024",
    schoolYear: "2024-2025",
    fileSize: "450 KB",
    url: "#",
  },
  {
    id: "5",
    title: "Bulletin du 3ème trimestre",
    description: "Bulletin scolaire du troisième trimestre 2023-2024",
    type: "bulletin",
    date: "15/06/2024",
    schoolYear: "2023-2024",
    fileSize: "1.2 MB",
    url: "#",
  },
  {
    id: "6",
    title: "Bulletin du 2ème trimestre",
    description: "Bulletin scolaire du deuxième trimestre 2023-2024",
    type: "bulletin",
    date: "15/03/2024",
    schoolYear: "2023-2024",
    fileSize: "1.1 MB",
    url: "#",
  },
  {
    id: "7",
    title: "Bulletin du 1er trimestre",
    description: "Bulletin scolaire du premier trimestre 2023-2024",
    type: "bulletin",
    date: "15/12/2023",
    schoolYear: "2023-2024",
    fileSize: "1.2 MB",
    url: "#",
  },
  {
    id: "8",
    title: "Autorisation de sortie scolaire",
    description: "Formulaire d'autorisation pour la sortie au musée",
    type: "other",
    date: "28/02/2025",
    schoolYear: "2024-2025",
    fileSize: "320 KB",
    url: "#",
  },
]


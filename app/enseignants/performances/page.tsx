"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, BarChart3, ArrowUp, ArrowDown, Minus, FileText } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart,
  Pie,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function PerformancesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("trimester")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showStudentDetails, setShowStudentDetails] = useState(false)

  // Filter students based on search query and class filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = classFilter === "all" || student.class === classFilter

    return matchesSearch && matchesClass
  })

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setShowStudentDetails(true)
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suivi des Performances</h2>
          <p className="text-muted-foreground">
            Analysez les progrès des élèves et identifiez les besoins spécifiques.
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Exporter</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.8/20</div>
            <p className="text-xs text-muted-foreground">+0.3 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <div className="flex items-center">{getTrendIcon(2.5)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves en difficulté</CardTitle>
            <div className="flex items-center">{getTrendIcon(-1)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">-1 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves excellents</CardTitle>
            <div className="flex items-center">{getTrendIcon(3)}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 depuis le dernier trimestre</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un élève..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="students">Élèves</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="3A">3ème A</SelectItem>
                <SelectItem value="3B">3ème B</SelectItem>
                <SelectItem value="4A">4ème A</SelectItem>
                <SelectItem value="4B">4ème B</SelectItem>
                <SelectItem value="4C">4ème C</SelectItem>
              </SelectContent>
            </Select>

            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trimester">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
                <SelectItem value="all">Toute la scolarité</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des moyennes par classe</CardTitle>
                <CardDescription>Progression des moyennes sur les trois trimestres</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={classAverages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="3A" stroke="#3b82f6" name="3ème A" />
                    <Line type="monotone" dataKey="3B" stroke="#10b981" name="3ème B" />
                    <Line type="monotone" dataKey="4A" stroke="#f59e0b" name="4ème A" />
                    <Line type="monotone" dataKey="4B" stroke="#8b5cf6" name="4ème B" />
                    <Line type="monotone" dataKey="4C" stroke="#ec4899" name="4ème C" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
                <CardDescription>Distribution des notes par tranche</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Nombre d'élèves" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Compétences par classe</CardTitle>
                <CardDescription>Niveau de maîtrise des compétences clés</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                  {["3A", "3B", "4A"].map((className) => (
                    <div key={className} className="flex flex-col items-center">
                      <h3 className="text-lg font-medium mb-2">
                        {className === "3A" ? "3ème A" : className === "3B" ? "3ème B" : "4ème A"}
                      </h3>
                      <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={90} data={skillsByClass}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <PolarRadiusAxis domain={[0, 4]} />
                            <Radar
                              name={className}
                              dataKey={className}
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.6}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Moyenne</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Assiduité</TableHead>
                    <TableHead>Comportement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucun élève trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">ID: {student.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="font-medium">{student.average}/20</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(student.progression)}
                            <span
                              className={
                                student.progression > 0
                                  ? "text-green-500"
                                  : student.progression < 0
                                    ? "text-red-500"
                                    : ""
                              }
                            >
                              {student.progression > 0 ? "+" : ""}
                              {student.progression}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="h-2 w-16" />
                            <span>{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.behavior === "Excellent"
                                ? "default"
                                : student.behavior === "Bon"
                                  ? "secondary"
                                  : student.behavior === "Moyen"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {student.behavior}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Voir</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {classPerformance.map((classData) => (
              <Card key={classData.class}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{classData.class}</CardTitle>
                    <Badge variant="outline">{classData.students} élèves</Badge>
                  </div>
                  <CardDescription>Enseignant principal: {classData.teacher}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Moyenne générale</span>
                      <span className="font-medium">{classData.average}/20</span>
                    </div>
                    <Progress value={(classData.average / 20) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Taux de réussite</span>
                      <span className="font-medium">{classData.successRate}%</span>
                    </div>
                    <Progress value={classData.successRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Assiduité</span>
                      <span className="font-medium">{classData.attendance}%</span>
                    </div>
                    <Progress value={classData.attendance} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-2">
                      <div className="text-sm font-medium text-red-600 dark:text-red-400">
                        {classData.lowPerformers}
                      </div>
                      <div className="text-xs text-muted-foreground">En difficulté</div>
                    </div>
                    <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-2">
                      <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {classData.averagePerformers}
                      </div>
                      <div className="text-xs text-muted-foreground">Niveau moyen</div>
                    </div>
                    <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-2">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {classData.highPerformers}
                      </div>
                      <div className="text-xs text-muted-foreground">Excellents</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
                <CardDescription>Distribution des notes par tranche</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des moyennes</CardTitle>
                <CardDescription>Progression sur les trois trimestres</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={averageEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Moyenne générale" />
                    <Line type="monotone" dataKey="best" stroke="#10b981" name="Meilleurs élèves" />
                    <Line type="monotone" dataKey="worst" stroke="#ef4444" name="Élèves en difficulté" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Rapports disponibles</CardTitle>
                <CardDescription>Téléchargez les rapports détaillés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {reports.map((report, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-muted p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-medium">{report.title}</span>
                          </div>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{report.date}</span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 p-2 flex justify-end">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Télécharger
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Profil de l'élève</DialogTitle>
            <DialogDescription>Détails et performances de {selectedStudent?.name}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-muted-foreground">ID: {selectedStudent.id}</p>
                    <p className="text-muted-foreground">Classe: {selectedStudent.class}</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Moyenne générale</p>
                    <p className="text-2xl font-bold">{selectedStudent.average}/20</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Progression</p>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(selectedStudent.progression)}
                      <p className="text-2xl font-bold">
                        {selectedStudent.progression > 0 ? "+" : ""}
                        {selectedStudent.progression}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Assiduité</p>
                    <p className="text-2xl font-bold">{selectedStudent.attendance}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Comportement</p>
                    <Badge
                      variant={
                        selectedStudent.behavior === "Excellent"
                          ? "default"
                          : selectedStudent.behavior === "Bon"
                            ? "secondary"
                            : selectedStudent.behavior === "Moyen"
                              ? "outline"
                              : "destructive"
                      }
                      className="text-base"
                    >
                      {selectedStudent.behavior}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes par matière</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studentGrades}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis domain={[0, 20]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="grade" fill="#3b82f6" name="Note" />
                        <Bar dataKey="classAverage" fill="#10b981" name="Moyenne de la classe" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Évolution des notes</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentEvolution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis domain={[0, 20]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Moyenne" />
                        <Line type="monotone" dataKey="classAverage" stroke="#10b981" name="Moyenne de la classe" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dernières évaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Matière</TableHead>
                        <TableHead>Évaluation</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Moyenne classe</TableHead>
                        <TableHead>Commentaire</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentEvaluations.map((evaluation, index) => (
                        <TableRow key={index}>
                          <TableCell>{evaluation.date}</TableCell>
                          <TableCell>{evaluation.subject}</TableCell>
                          <TableCell>{evaluation.title}</TableCell>
                          <TableCell className="font-medium">{evaluation.grade}/20</TableCell>
                          <TableCell>{evaluation.classAverage}/20</TableCell>
                          <TableCell className="max-w-[200px] truncate">{evaluation.comment}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Contacter les parents</Button>
                <Button variant="outline">Générer un rapport</Button>
                <Button>Ajouter une note</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface Student {
  id: string
  name: string
  class: string
  average: number
  progression: number
  attendance: number
  behavior: string
  avatar: string
}

interface ClassData {
  class: string
  students: number
  teacher: string
  average: number
  successRate: number
  attendance: number
  lowPerformers: number
  averagePerformers: number
  highPerformers: number
}

interface Report {
  title: string
  description: string
  type: string
  date: string
  size: string
}

// Sample data
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const students: Student[] = [
  {
    id: "STU001",
    name: "Sophie Martin",
    class: "3A",
    average: 16.5,
    progression: 0.5,
    attendance: 98,
    behavior: "Excellent",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU002",
    name: "Lucas Dubois",
    class: "3A",
    average: 14.2,
    progression: 0.3,
    attendance: 95,
    behavior: "Bon",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU003",
    name: "Emma Petit",
    class: "3A",
    average: 12.8,
    progression: -0.2,
    attendance: 92,
    behavior: "Moyen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU004",
    name: "Thomas Leroy",
    class: "3A",
    average: 9.5,
    progression: 0.8,
    attendance: 85,
    behavior: "À améliorer",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU005",
    name: "Léa Bernard",
    class: "3B",
    average: 17.2,
    progression: 0.2,
    attendance: 99,
    behavior: "Excellent",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU006",
    name: "Hugo Moreau",
    class: "3B",
    average: 15.5,
    progression: 0.5,
    attendance: 97,
    behavior: "Bon",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU007",
    name: "Chloé Fournier",
    class: "4A",
    average: 16.8,
    progression: 0.3,
    attendance: 98,
    behavior: "Excellent",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU008",
    name: "Nathan Girard",
    class: "4A",
    average: 13.5,
    progression: -0.5,
    attendance: 90,
    behavior: "Moyen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU009",
    name: "Camille Roux",
    class: "4B",
    average: 15.2,
    progression: 0.7,
    attendance: 96,
    behavior: "Bon",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU010",
    name: "Maxime Vincent",
    class: "4B",
    average: 11.8,
    progression: 0.4,
    attendance: 88,
    behavior: "Moyen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const classAverages = [
  { period: "Trimestre 1", "3A": 14.2, "3B": 15.1, "4A": 13.8, "4B": 14.5, "4C": 13.5 },
  { period: "Trimestre 2", "3A": 14.5, "3B": 15.3, "4A": 14.2, "4B": 14.8, "4C": 13.9 },
  { period: "Trimestre 3", "3A": 14.8, "3B": 15.5, "4A": 14.5, "4B": 15.0, "4C": 14.2 },
]

const gradeDistribution = [
  { range: "0-5", count: 2 },
  { range: "6-8", count: 5 },
  { range: "9-11", count: 15 },
  { range: "12-14", count: 35 },
  { range: "15-17", count: 30 },
  { range: "18-20", count: 10 },
]

const skillsByClass = [
  { skill: "Calcul", "3A": 3.2, "3B": 3.5, "4A": 2.8 },
  { skill: "Algèbre", "3A": 3.0, "3B": 3.3, "4A": 2.5 },
  { skill: "Géométrie", "3A": 3.4, "3B": 3.2, "4A": 3.0 },
  { skill: "Statistiques", "3A": 2.8, "3B": 3.0, "4A": 2.6 },
  { skill: "Problèmes", "3A": 3.1, "3B": 3.4, "4A": 2.7 },
]

const classPerformance: ClassData[] = [
  {
    class: "3ème A",
    students: 28,
    teacher: "Mme Dubois",
    average: 14.8,
    successRate: 92,
    attendance: 95,
    lowPerformers: 3,
    averagePerformers: 15,
    highPerformers: 10,
  },
  {
    class: "3ème B",
    students: 27,
    teacher: "M. Martin",
    average: 15.5,
    successRate: 96,
    attendance: 97,
    lowPerformers: 2,
    averagePerformers: 12,
    highPerformers: 13,
  },
  {
    class: "4ème A",
    students: 29,
    teacher: "Mme Leroy",
    average: 14.5,
    successRate: 90,
    attendance: 94,
    lowPerformers: 4,
    averagePerformers: 16,
    highPerformers: 9,
  },
  {
    class: "4ème B",
    students: 26,
    teacher: "M. Bernard",
    average: 15.0,
    successRate: 93,
    attendance: 96,
    lowPerformers: 3,
    averagePerformers: 14,
    highPerformers: 9,
  },
  {
    class: "4ème C",
    students: 25,
    teacher: "Mme Petit",
    average: 14.2,
    successRate: 89,
    attendance: 93,
    lowPerformers: 4,
    averagePerformers: 15,
    highPerformers: 6,
  },
]

const averageEvolution = [
  { period: "Septembre", average: 13.5, best: 16.8, worst: 8.5 },
  { period: "Octobre", average: 13.8, best: 17.0, worst: 9.0 },
  { period: "Novembre", average: 14.0, best: 17.2, worst: 9.5 },
  { period: "Décembre", average: 14.2, best: 17.5, worst: 10.0 },
  { period: "Janvier", average: 14.5, best: 17.8, worst: 10.5 },
  { period: "Février", average: 14.8, best: 18.0, worst: 11.0 },
  { period: "Mars", average: 15.0, best: 18.2, worst: 11.5 },
]

const reports = [
  {
    title: "Rapport trimestriel - 3ème A",
    description: "Rapport détaillé des performances de la classe de 3ème A pour le 2ème trimestre",
    type: "Trimestriel",
    date: "15/03/2025",
    size: "2.4 MB",
  },
  {
    title: "Rapport trimestriel - 3ème B",
    description: "Rapport détaillé des performances de la classe de 3ème B pour le 2ème trimestre",
    type: "Trimestriel",
    date: "15/03/2025",
    size: "2.2 MB",
  },
  {
    title: "Rapport trimestriel - 4ème A",
    description: "Rapport détaillé des performances de la classe de 4ème A pour le 2ème trimestre",
    type: "Trimestriel",
    date: "15/03/2025",
    size: "2.3 MB",
  },
  {
    title: "Analyse comparative",
    description: "Analyse comparative des performances entre les différentes classes",
    type: "Analytique",
    date: "20/03/2025",
    size: "3.1 MB",
  },
  {
    title: "Élèves en difficulté",
    description: "Rapport sur les élèves en difficulté et les mesures d'accompagnement",
    type: "Spécial",
    date: "22/03/2025",
    size: "1.8 MB",
  },
  {
    title: "Préparation Brevet",
    description: "Analyse de la préparation des élèves de 3ème pour le brevet",
    type: "Spécial",
    date: "25/03/2025",
    size: "2.5 MB",
  },
]

const studentGrades = [
  { subject: "Maths", grade: 16.5, classAverage: 14.8 },
  { subject: "Français", grade: 15.0, classAverage: 13.5 },
  { subject: "Histoire", grade: 17.5, classAverage: 14.2 },
  { subject: "Physique", grade: 16.0, classAverage: 13.8 },
  { subject: "Anglais", grade: 18.0, classAverage: 14.5 },
  { subject: "SVT", grade: 15.5, classAverage: 13.9 },
]

const studentEvolution = [
  { period: "Trimestre 1", average: 15.5, classAverage: 14.2 },
  { period: "Trimestre 2", average: 16.0, classAverage: 14.5 },
  { period: "Trimestre 3", average: 16.5, classAverage: 14.8 },
]

const recentEvaluations = [
  {
    date: "05/03/2025",
    subject: "Mathématiques",
    title: "Contrôle sur les fonctions dérivées",
    grade: 17.5,
    classAverage: 14.2,
    comment: "Excellent travail, très bonne maîtrise des concepts.",
  },
  {
    date: "28/02/2025",
    subject: "Histoire",
    title: "Dissertation sur la Seconde Guerre mondiale",
    grade: 18.0,
    classAverage: 14.5,
    comment: "Analyse très pertinente et bien documentée.",
  },
  {
    date: "20/02/2025",
    subject: "Physique",
    title: "TP sur les réactions chimiques",
    grade: 16.0,
    classAverage: 13.8,
    comment: "Bon travail, quelques imprécisions dans les calculs.",
  },
  {
    date: "15/02/2025",
    subject: "Français",
    title: "Commentaire de texte",
    grade: 15.0,
    classAverage: 13.5,
    comment: "Bonne analyse, mais quelques maladresses d'expression.",
  },
  {
    date: "10/02/2025",
    subject: "Anglais",
    title: "Compréhension écrite",
    grade: 18.0,
    classAverage: 14.5,
    comment: "Excellent niveau de compréhension et d'expression.",
  },
]


"use client"

import { useState } from "react"
import { Book, Calendar, FileText, Filter, Search, User, Users, ChevronRight, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data for classes
const classes = [
  {
    id: 1,
    name: "3ème A",
    subject: "Mathématiques",
    students: 28,
    schedule: "Lundi 10h-12h, Jeudi 14h-16h",
    room: "Salle 203",
    nextSession: "Lundi, 10h00",
    averageGrade: 14.2,
    assignments: 3,
    upcomingTest: "Contrôle sur les équations - 15/05",
  },
  {
    id: 2,
    name: "4ème B",
    subject: "Mathématiques",
    students: 26,
    schedule: "Mardi 8h-10h, Vendredi 10h-12h",
    room: "Salle 105",
    nextSession: "Mardi, 8h00",
    averageGrade: 13.5,
    assignments: 2,
    upcomingTest: "Interrogation sur les fractions - 12/05",
  },
  {
    id: 3,
    name: "6ème C",
    subject: "Mathématiques",
    students: 30,
    schedule: "Lundi 14h-16h, Mercredi 10h-12h",
    room: "Salle 108",
    nextSession: "Lundi, 14h00",
    averageGrade: 12.8,
    assignments: 4,
    upcomingTest: "Contrôle sur les nombres décimaux - 18/05",
  },
  {
    id: 4,
    name: "5ème A",
    subject: "Mathématiques",
    students: 27,
    schedule: "Mardi 14h-16h, Jeudi 8h-10h",
    room: "Salle 201",
    nextSession: "Mardi, 14h00",
    averageGrade: 13.9,
    assignments: 2,
    upcomingTest: "Contrôle sur les triangles - 20/05",
  },
  {
    id: 5,
    name: "Terminale S2",
    subject: "Mathématiques",
    students: 24,
    schedule: "Mercredi 14h-16h, Vendredi 14h-16h",
    room: "Salle 305",
    nextSession: "Mercredi, 14h00",
    averageGrade: 15.1,
    assignments: 5,
    upcomingTest: "Bac blanc - 25/05",
  },
]

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState<number | null>(null)

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mes Classes</h2>
        <p className="text-muted-foreground">
          Gérez vos classes, consultez les informations des élèves et suivez leurs progrès.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une classe..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Toutes les classes</DropdownMenuItem>
              <DropdownMenuItem>Collège</DropdownMenuItem>
              <DropdownMenuItem>Lycée</DropdownMenuItem>
              <DropdownMenuItem>Par jour</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8">
            Ajouter une classe
          </Button>
        </div>
      </div>

      {selectedClass === null ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{cls.name}</CardTitle>
                  <Badge variant="secondary">{cls.subject}</Badge>
                </div>
                <CardDescription>
                  {cls.students} élèves • {cls.room}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Prochain cours: {cls.nextSession}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    <span>Moyenne: {cls.averageGrade}/20</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{cls.assignments} devoirs en cours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-muted-foreground" />
                    <span>Prochain contrôle</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="ghost" className="w-full justify-between" onClick={() => setSelectedClass(cls.id)}>
                  <span>Voir les détails</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <ClassDetail classData={classes.find((c) => c.id === selectedClass)!} onBack={() => setSelectedClass(null)} />
      )}
    </div>
  )
}

interface ClassDetailProps {
  classData: (typeof classes)[0]
  onBack: () => void
}

function ClassDetail({ classData, onBack }: ClassDetailProps) {
  // Sample student data
  const students = [
    { id: 1, name: "Emma Dupont", average: 16.5, lastGrade: 18, attendance: "100%", status: "Excellent" },
    { id: 2, name: "Lucas Martin", average: 14.2, lastGrade: 15, attendance: "95%", status: "Bon" },
    { id: 3, name: "Chloé Bernard", average: 12.8, lastGrade: 13, attendance: "90%", status: "Moyen" },
    { id: 4, name: "Thomas Petit", average: 9.5, lastGrade: 8, attendance: "85%", status: "Difficultés" },
    { id: 5, name: "Léa Dubois", average: 15.7, lastGrade: 17, attendance: "98%", status: "Très bon" },
    { id: 6, name: "Hugo Moreau", average: 11.3, lastGrade: 12, attendance: "92%", status: "Moyen" },
    { id: 7, name: "Manon Lambert", average: 13.9, lastGrade: 14, attendance: "96%", status: "Bon" },
    { id: 8, name: "Jules Rousseau", average: 10.2, lastGrade: 11, attendance: "88%", status: "Passable" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <h3 className="text-2xl font-bold">
          {classData.name} - {classData.subject}
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Effectif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{classData.students} élèves</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{classData.averageGrade}/20</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prochain cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{classData.nextSession}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Salle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classData.room}</div>
            <div className="text-xs text-muted-foreground">{classData.schedule}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Élèves</TabsTrigger>
          <TabsTrigger value="assignments">Devoirs</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Liste des élèves</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button size="sm">
                <User className="mr-2 h-4 w-4" />
                Ajouter un élève
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Nom</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Moyenne</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Dernière note</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Assiduité</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Statut</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">{student.name}</td>
                        <td className="p-4 align-middle font-medium">{student.average}/20</td>
                        <td className="p-4 align-middle">{student.lastGrade}/20</td>
                        <td className="p-4 align-middle">{student.attendance}</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={
                              student.status === "Excellent" || student.status === "Très bon"
                                ? "default"
                                : student.status === "Bon"
                                  ? "secondary"
                                  : student.status === "Moyen" || student.status === "Passable"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">
                            Détails
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Devoirs et évaluations</h4>
            <Button>Ajouter un devoir</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Devoirs en cours</CardTitle>
                <CardDescription>Devoirs assignés et à venir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Exercices sur les équations</h5>
                      <p className="text-sm text-muted-foreground">À rendre pour le 10/05</p>
                    </div>
                    <Badge>En cours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Problèmes de géométrie</h5>
                      <p className="text-sm text-muted-foreground">À rendre pour le 15/05</p>
                    </div>
                    <Badge>En cours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Révisions pour le contrôle</h5>
                      <p className="text-sm text-muted-foreground">À rendre pour le 18/05</p>
                    </div>
                    <Badge variant="outline">À venir</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évaluations prévues</CardTitle>
                <CardDescription>Contrôles et interrogations à venir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{classData.upcomingTest.split(" - ")[0]}</h5>
                      <p className="text-sm text-muted-foreground">Date: {classData.upcomingTest.split(" - ")[1]}</p>
                    </div>
                    <Badge variant="secondary">À venir</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Interrogation surprise</h5>
                      <p className="text-sm text-muted-foreground">Date: À déterminer</p>
                    </div>
                    <Badge variant="outline">Planifié</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Planning des cours</h4>
            <Button variant="outline">Exporter le planning</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emploi du temps</CardTitle>
              <CardDescription>{classData.schedule}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b">
                  <div className="border-r p-3 text-center font-medium">Horaire</div>
                  <div className="border-r p-3 text-center font-medium">Lundi</div>
                  <div className="border-r p-3 text-center font-medium">Mardi</div>
                  <div className="border-r p-3 text-center font-medium">Mercredi</div>
                  <div className="border-r p-3 text-center font-medium">Jeudi</div>
                  <div className="p-3 text-center font-medium">Vendredi</div>
                </div>

                {/* Simplified timetable rows */}
                {["8h-10h", "10h-12h", "14h-16h", "16h-18h"].map((time) => (
                  <div key={time} className="grid grid-cols-6 border-b last:border-0">
                    <div className="border-r p-3 text-center">{time}</div>
                    <div
                      className={`border-r p-3 ${time === "10h-12h" && classData.name === "3ème A" ? "bg-primary/10" : ""}`}
                    >
                      {time === "10h-12h" && classData.name === "3ème A" ? (
                        <div className="text-center">
                          <div className="font-medium">{classData.name}</div>
                          <div className="text-xs">{classData.room}</div>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={`border-r p-3 ${time === "8h-10h" && classData.name === "4ème B" ? "bg-primary/10" : ""}`}
                    >
                      {time === "8h-10h" && classData.name === "4ème B" ? (
                        <div className="text-center">
                          <div className="font-medium">{classData.name}</div>
                          <div className="text-xs">{classData.room}</div>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={`border-r p-3 ${time === "10h-12h" && classData.name === "6ème C" ? "bg-primary/10" : ""}`}
                    >
                      {time === "10h-12h" && classData.name === "6ème C" ? (
                        <div className="text-center">
                          <div className="font-medium">{classData.name}</div>
                          <div className="text-xs">{classData.room}</div>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={`border-r p-3 ${time === "14h-16h" && classData.name === "3ème A" ? "bg-primary/10" : ""}`}
                    >
                      {time === "14h-16h" && classData.name === "3ème A" ? (
                        <div className="text-center">
                          <div className="font-medium">{classData.name}</div>
                          <div className="text-xs">{classData.room}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className={`p-3 ${time === "10h-12h" && classData.name === "4ème B" ? "bg-primary/10" : ""}`}>
                      {time === "10h-12h" && classData.name === "4ème B" ? (
                        <div className="text-center">
                          <div className="font-medium">{classData.name}</div>
                          <div className="text-xs">{classData.room}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


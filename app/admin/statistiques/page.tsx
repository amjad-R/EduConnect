"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, Calendar, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("trimester")
  const [classFilter, setClassFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Statistiques et Rapports</h2>
          <p className="text-muted-foreground">Analysez les performances et les tendances de l'établissement.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Exporter</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trimester">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="5years">5 dernières années</SelectItem>
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="college">Collège</SelectItem>
              <SelectItem value="lycee">Lycée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% par rapport à l'an dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.7/20</div>
            <p className="text-xs text-muted-foreground">+0.3 par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'assiduité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">-0.8% par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves inscrits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+56 depuis l'année dernière</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance académique</TabsTrigger>
          <TabsTrigger value="attendance">Assiduité</TabsTrigger>
          <TabsTrigger value="demographics">Démographie</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Moyenne par matière</CardTitle>
                <CardDescription>Comparaison des moyennes par matière</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectAverages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#3b82f6" name="Moyenne" />
                    <Bar dataKey="nationalAverage" fill="#10b981" name="Moyenne nationale" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Évolution des résultats</CardTitle>
                <CardDescription>Tendance des résultats sur la période</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Moyenne générale" />
                    <Line type="monotone" dataKey="topStudents" stroke="#10b981" name="Meilleurs élèves" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Répartition des mentions</CardTitle>
                <CardDescription>Distribution des mentions obtenues</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={mentionsDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mentionsDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    {mentionsDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="text-sm">
                          {item.name}: {item.value} élèves
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Taux d'assiduité par classe</CardTitle>
                <CardDescription>Pourcentage de présence par classe</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceByClass}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#3b82f6" name="Taux d'assiduité (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Évolution de l'assiduité</CardTitle>
                <CardDescription>Tendance de l'assiduité sur la période</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" name="Taux d'assiduité (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Motifs d'absence</CardTitle>
                <CardDescription>Répartition des motifs d'absence</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={absenceReasons}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {absenceReasons.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    {absenceReasons.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="text-sm">
                          {item.name}: {item.value} absences
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Répartition par niveau</CardTitle>
                <CardDescription>Nombre d'élèves par niveau</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentsByGrade}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Nombre d'élèves" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Évolution des effectifs</CardTitle>
                <CardDescription>Tendance des inscriptions sur la période</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={enrollmentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" name="Nombre d'élèves" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Répartition géographique</CardTitle>
                <CardDescription>Origine géographique des élèves</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={geographicDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {geographicDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    {geographicDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="text-sm">
                          {item.name}: {item.value} élèves
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const subjectAverages = [
  { subject: "Maths", average: 14.2, nationalAverage: 13.5 },
  { subject: "Français", average: 13.8, nationalAverage: 13.2 },
  { subject: "Histoire", average: 15.1, nationalAverage: 14.3 },
  { subject: "Physique", average: 14.5, nationalAverage: 13.8 },
  { subject: "Anglais", average: 15.7, nationalAverage: 14.9 },
  { subject: "SVT", average: 14.9, nationalAverage: 14.1 },
]

const performanceTrend = [
  { period: "T1 2024", average: 13.8, topStudents: 16.5 },
  { period: "T2 2024", average: 14.2, topStudents: 17.1 },
  { period: "T3 2024", average: 14.5, topStudents: 17.3 },
  { period: "T1 2025", average: 14.7, topStudents: 17.5 },
]

const mentionsDistribution = [
  { name: "Très Bien", value: 124 },
  { name: "Bien", value: 210 },
  { name: "Assez Bien", value: 315 },
  { name: "Passable", value: 178 },
  { name: "Insuffisant", value: 42 },
]

const attendanceByClass = [
  { class: "6A", rate: 97.2 },
  { class: "6B", rate: 96.8 },
  { class: "5A", rate: 95.9 },
  { class: "5B", rate: 96.3 },
  { class: "4A", rate: 94.8 },
  { class: "4B", rate: 95.2 },
  { class: "3A", rate: 96.5 },
  { class: "3B", rate: 97.1 },
]

const attendanceTrend = [
  { period: "Sept", rate: 98.2 },
  { period: "Oct", rate: 97.5 },
  { period: "Nov", rate: 96.8 },
  { period: "Dec", rate: 95.9 },
  { period: "Jan", rate: 94.7 },
  { period: "Feb", rate: 95.3 },
  { period: "Mar", rate: 96.2 },
]

const absenceReasons = [
  { name: "Maladie", value: 423 },
  { name: "RDV médical", value: 187 },
  { name: "Familial", value: 124 },
  { name: "Non justifié", value: 78 },
  { name: "Autre", value: 42 },
]

const studentsByGrade = [
  { grade: "6ème", count: 210 },
  { grade: "5ème", count: 198 },
  { grade: "4ème", count: 215 },
  { grade: "3ème", count: 205 },
  { grade: "2nde", count: 180 },
  { grade: "1ère", count: 165 },
  { grade: "Term", count: 155 },
]

const enrollmentTrend = [
  { year: "2021", students: 1050 },
  { year: "2022", students: 1120 },
  { year: "2023", students: 1180 },
  { year: "2024", students: 1210 },
  { year: "2025", students: 1248 },
]

const geographicDistribution = [
  { name: "Centre-ville", value: 425 },
  { name: "Nord", value: 318 },
  { name: "Sud", value: 287 },
  { name: "Est", value: 124 },
  { name: "Ouest", value: 94 },
]


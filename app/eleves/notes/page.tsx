"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NotesPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredGrades =
    selectedSubject === "all" ? detailedGrades : detailedGrades.filter((grade) => grade.subject === selectedSubject)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notes et Progrès</h2>
        <p className="text-muted-foreground">Suivez votre évolution et vos performances scolaires.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjectAverages.map((subject, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{subject.name}</CardTitle>
              <CardDescription>Moyenne: {subject.average}/20</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subject.data}>
                    <Line type="monotone" dataKey="value" stroke={subject.color} strokeWidth={2} dot={{ r: 4 }} />
                    <YAxis domain={[0, 20]} hide />
                    <XAxis dataKey="date" hide />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution des notes</CardTitle>
          <CardDescription>Visualisez votre progression dans toutes les matières</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="maths" name="Mathématiques" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="french" name="Français" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="history" name="Histoire" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="physics" name="Physique" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="english" name="Anglais" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Détail des notes</CardTitle>
            <CardDescription>Toutes vos évaluations par matière</CardDescription>
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les matières" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les matières</SelectItem>
              <SelectItem value="Mathématiques">Mathématiques</SelectItem>
              <SelectItem value="Français">Français</SelectItem>
              <SelectItem value="Histoire">Histoire</SelectItem>
              <SelectItem value="Physique">Physique</SelectItem>
              <SelectItem value="Anglais">Anglais</SelectItem>
              <SelectItem value="SVT">SVT</SelectItem>
            </SelectContent>
          </Select>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell>{grade.date}</TableCell>
                  <TableCell>{grade.subject}</TableCell>
                  <TableCell>{grade.title}</TableCell>
                  <TableCell className="font-medium">{grade.grade}/20</TableCell>
                  <TableCell>{grade.classAverage}/20</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data for charts and tables
const subjectAverages = [
  {
    name: "Mathématiques",
    average: 16.2,
    color: "#3b82f6",
    data: [
      { date: "Sept", value: 15 },
      { date: "Oct", value: 16 },
      { date: "Nov", value: 15.5 },
      { date: "Dec", value: 17 },
      { date: "Jan", value: 16 },
      { date: "Feb", value: 17.5 },
    ],
  },
  {
    name: "Français",
    average: 14.5,
    color: "#ef4444",
    data: [
      { date: "Sept", value: 13 },
      { date: "Oct", value: 14 },
      { date: "Nov", value: 14.5 },
      { date: "Dec", value: 15 },
      { date: "Jan", value: 15 },
      { date: "Feb", value: 15.5 },
    ],
  },
  {
    name: "Histoire",
    average: 17.3,
    color: "#f59e0b",
    data: [
      { date: "Sept", value: 16 },
      { date: "Oct", value: 17 },
      { date: "Nov", value: 17.5 },
      { date: "Dec", value: 18 },
      { date: "Jan", value: 17 },
      { date: "Feb", value: 18.5 },
    ],
  },
  {
    name: "Physique",
    average: 15.1,
    color: "#10b981",
    data: [
      { date: "Sept", value: 14 },
      { date: "Oct", value: 15 },
      { date: "Nov", value: 15 },
      { date: "Dec", value: 16 },
      { date: "Jan", value: 15 },
      { date: "Feb", value: 15.5 },
    ],
  },
  {
    name: "Anglais",
    average: 18.2,
    color: "#8b5cf6",
    data: [
      { date: "Sept", value: 17 },
      { date: "Oct", value: 18 },
      { date: "Nov", value: 18 },
      { date: "Dec", value: 19 },
      { date: "Jan", value: 18 },
      { date: "Feb", value: 19 },
    ],
  },
  {
    name: "SVT",
    average: 14.8,
    color: "#14b8a6",
    data: [
      { date: "Sept", value: 14 },
      { date: "Oct", value: 14.5 },
      { date: "Nov", value: 15 },
      { date: "Dec", value: 15 },
      { date: "Jan", value: 15 },
      { date: "Feb", value: 15.5 },
    ],
  },
]

const progressData = [
  { month: "Sept", maths: 15, french: 13, history: 16, physics: 14, english: 17 },
  { month: "Oct", maths: 16, french: 14, history: 17, physics: 15, english: 18 },
  { month: "Nov", maths: 15.5, french: 14.5, history: 17.5, physics: 15, english: 18 },
  { month: "Dec", maths: 17, french: 15, history: 18, physics: 16, english: 19 },
  { month: "Jan", maths: 16, french: 15, history: 17, physics: 15, english: 18 },
  { month: "Feb", maths: 17.5, french: 15.5, history: 18.5, physics: 15.5, english: 19 },
]

const detailedGrades = [
  {
    date: "05/02/2025",
    subject: "Mathématiques",
    title: "Contrôle sur les fonctions dérivées",
    grade: 17.5,
    classAverage: 14.2,
  },
  {
    date: "02/02/2025",
    subject: "Français",
    title: "Dissertation sur Victor Hugo",
    grade: 15.5,
    classAverage: 13.8,
  },
  {
    date: "28/01/2025",
    subject: "Histoire",
    title: "Évaluation sur la Seconde Guerre mondiale",
    grade: 18.5,
    classAverage: 15.1,
  },
  {
    date: "25/01/2025",
    subject: "Physique",
    title: "TP sur les réactions chimiques",
    grade: 15.5,
    classAverage: 14.3,
  },
  {
    date: "20/01/2025",
    subject: "Anglais",
    title: "Compréhension écrite",
    grade: 19,
    classAverage: 15.7,
  },
  {
    date: "15/01/2025",
    subject: "SVT",
    title: "Contrôle sur l'écosystème",
    grade: 15.5,
    classAverage: 14.5,
  },
  {
    date: "10/01/2025",
    subject: "Mathématiques",
    title: "Devoir maison sur les suites",
    grade: 16,
    classAverage: 15.3,
  },
  {
    date: "20/12/2024",
    subject: "Français",
    title: "Commentaire de texte",
    grade: 15,
    classAverage: 13.5,
  },
  {
    date: "15/12/2024",
    subject: "Histoire",
    title: "Exposé sur la Guerre Froide",
    grade: 18,
    classAverage: 15.8,
  },
  {
    date: "10/12/2024",
    subject: "Physique",
    title: "Contrôle sur l'électricité",
    grade: 16,
    classAverage: 14.1,
  },
]


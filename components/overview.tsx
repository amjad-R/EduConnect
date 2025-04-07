"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className }: OverviewProps) {
  const [mounted, setMounted] = useState(false)

  // Sample data for the chart
  const data = [
    { name: "Jan", value: 86 },
    { name: "Feb", value: 89 },
    { name: "Mar", value: 88 },
    { name: "Apr", value: 92 },
    { name: "May", value: 91 },
    { name: "Jun", value: 94 },
    { name: "Jul", value: 97 },
    { name: "Aug", value: 93 },
    { name: "Sep", value: 92 },
    { name: "Oct", value: 90 },
    { name: "Nov", value: 91 },
    { name: "Dec", value: 89 },
  ]

  const attendanceData = [
    { name: "Jan", value: 92 },
    { name: "Feb", value: 94 },
    { name: "Mar", value: 91 },
    { name: "Apr", value: 95 },
    { name: "May", value: 93 },
    { name: "Jun", value: 96 },
    { name: "Jul", value: 98 },
    { name: "Aug", value: 97 },
    { name: "Sep", value: 95 },
    { name: "Oct", value: 94 },
    { name: "Nov", value: 93 },
    { name: "Dec", value: 92 },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>School performance metrics for the current year.</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <Tabs defaultValue="grades">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grades">Average Grades</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          <TabsContent value="grades" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="attendance" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


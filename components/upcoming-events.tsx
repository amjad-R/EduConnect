import { Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>School events for the next two weeks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const events = [
  {
    title: "Parent-Teacher Conference",
    date: "March 15, 2025 • 3:00 PM - 7:00 PM",
    description: "Meet with teachers to discuss student progress.",
  },
  {
    title: "Science Fair",
    date: "March 18, 2025 • All Day",
    description: "Annual science fair in the main gymnasium.",
  },
  {
    title: "Spring Break",
    date: "March 22-30, 2025",
    description: "No classes during spring break.",
  },
]


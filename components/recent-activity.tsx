import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest activities across the school.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.name} />
                <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{activity.name}</p>
                <p className="text-sm text-muted-foreground">{activity.activity}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const activities = [
  {
    name: "Sarah Johnson",
    activity: "Submitted final project for Science class",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Michael Chen",
    activity: "Achieved 100% on Math test",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Ms. Rodriguez",
    activity: "Posted new assignment for English class",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Principal Davis",
    activity: "Announced upcoming school event",
    time: "Yesterday at 2:30 PM",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]


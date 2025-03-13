import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, Calendar, FileText, Home, MessageSquare, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"

interface ElevesLayoutProps {
  children: ReactNode
}

export default function ElevesLayout({ children }: ElevesLayoutProps) {
  return (
    <DashboardShell userType="eleves" sidebar={<ElevesSidebar />}>
      {children}
    </DashboardShell>
  )
}

function ElevesSidebar() {
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Élèves</h2>
      <div className="flex flex-col gap-1">
        <SidebarItem href="/eleves/dashboard" icon={<Home className="h-4 w-4" />}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/eleves/cours" icon={<BookOpen className="h-4 w-4" />}>
          Cours et devoirs
        </SidebarItem>
        <SidebarItem href="/eleves/notes" icon={<BarChart3 className="h-4 w-4" />}>
          Notes et progrès
        </SidebarItem>
        <SidebarItem href="/eleves/ressources" icon={<FileText className="h-4 w-4" />}>
          Ressources pédagogiques
        </SidebarItem>
        <SidebarItem href="/eleves/forum" icon={<MessageSquare className="h-4 w-4" />}>
          Forum de discussion
        </SidebarItem>
        <SidebarItem href="/eleves/calendrier" icon={<Calendar className="h-4 w-4" />}>
          Calendrier
        </SidebarItem>
        <SidebarItem href="/eleves/notifications" icon={<Bell className="h-4 w-4" />}>
          Notifications
        </SidebarItem>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: ReactNode
  children: ReactNode
}

function SidebarItem({ href, icon, children }: SidebarItemProps) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
      <Link href={href}>
        {icon}
        <span>{children}</span>
      </Link>
    </Button>
  )
}


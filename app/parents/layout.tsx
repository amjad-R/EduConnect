import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, Calendar, Home, MessageSquare, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"

interface ParentsLayoutProps {
  children: ReactNode
}

export default function ParentsLayout({ children }: ParentsLayoutProps) {
  return (
    <DashboardShell userType="parents" sidebar={<ParentsSidebar />}>
      {children}
    </DashboardShell>
  )
}

function ParentsSidebar() {
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Parents</h2>
      <div className="flex flex-col gap-1">
        <SidebarItem href="/parents/dashboard" icon={<Home className="h-4 w-4" />}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/parents/performances" icon={<BarChart3 className="h-4 w-4" />}>
          Suivi des performances
        </SidebarItem>
        <SidebarItem href="/parents/communication" icon={<MessageSquare className="h-4 w-4" />}>
          Communication
        </SidebarItem>
        <SidebarItem href="/parents/releves" icon={<FileText className="h-4 w-4" />}>
          Relevés de notes
        </SidebarItem>
        <SidebarItem href="/parents/calendrier" icon={<Calendar className="h-4 w-4" />}>
          Calendrier
        </SidebarItem>
        <SidebarItem href="/parents/enseignants" icon={<Users className="h-4 w-4" />}>
          Équipe pédagogique
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


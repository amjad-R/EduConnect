import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, Calendar, FileText, Home, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"

interface EnseignantsLayoutProps {
  children: ReactNode
}

export default function EnseignantsLayout({ children }: EnseignantsLayoutProps) {
  return (
    <DashboardShell userType="enseignants" sidebar={<EnseignantsSidebar />}>
      {children}
    </DashboardShell>
  )
}

function EnseignantsSidebar() {
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Enseignants</h2>
      <div className="flex flex-col gap-1">
        <SidebarItem href="/enseignants/dashboard" icon={<Home className="h-4 w-4" />}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/enseignants/cours" icon={<BookOpen className="h-4 w-4" />}>
          Gestion des cours
        </SidebarItem>
        <SidebarItem href="/enseignants/devoirs" icon={<FileText className="h-4 w-4" />}>
          Devoirs et notes
        </SidebarItem>
        <SidebarItem href="/enseignants/performances" icon={<BarChart3 className="h-4 w-4" />}>
          Suivi des élèves
        </SidebarItem>
        <SidebarItem href="/enseignants/communication" icon={<MessageSquare className="h-4 w-4" />}>
          Communication
        </SidebarItem>
        <SidebarItem href="/enseignants/examens" icon={<Calendar className="h-4 w-4" />}>
          Examens
        </SidebarItem>
        <SidebarItem href="/enseignants/classes" icon={<Users className="h-4 w-4" />}>
          Mes classes
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


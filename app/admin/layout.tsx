import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, Bell, Calendar, FileText, Home, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <DashboardShell userType="admin" sidebar={<AdminSidebar />}>
      {children}
    </DashboardShell>
  )
}

function AdminSidebar() {
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Administration</h2>
      <div className="flex flex-col gap-1">
        <SidebarItem href="/admin/dashboard" icon={<Home className="h-4 w-4" />}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/admin/utilisateurs" icon={<Users className="h-4 w-4" />}>
          Gestion des utilisateurs
        </SidebarItem>
        <SidebarItem href="/admin/annonces" icon={<Bell className="h-4 w-4" />}>
          Annonces et actualités
        </SidebarItem>
        <SidebarItem href="/admin/calendrier" icon={<Calendar className="h-4 w-4" />}>
          Calendrier scolaire
        </SidebarItem>
        <SidebarItem href="/admin/statistiques" icon={<BarChart3 className="h-4 w-4" />}>
          Statistiques
        </SidebarItem>
        <SidebarItem href="/admin/documents" icon={<FileText className="h-4 w-4" />}>
          Documents officiels
        </SidebarItem>
        <SidebarItem href="/admin/parametres" icon={<Settings className="h-4 w-4" />}>
          Paramètres
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


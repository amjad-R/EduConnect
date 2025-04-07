"use client"

import { type ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, Bell, Calendar, FileText, Home, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check if there's a saved preference in localStorage
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true")
    }

    checkMobile()
    setIsMounted(true)

    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("sidebarCollapsed")
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (!isMounted) return null

  // On mobile, always show full sidebar (not collapsed)
  const isCollapsed = isMobile ? false : sidebarCollapsed

  return (
    <div className={cn("flex w-full flex-col gap-2", isMobile ? "px-4" : "")}>
      {!isCollapsed && <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Administration</h2>}
      <div className="flex flex-col gap-1">
        <SidebarItem href="/admin/dashboard" icon={<Home className="h-4 w-4" />} collapsed={isCollapsed}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/admin/utilisateurs" icon={<Users className="h-4 w-4" />} collapsed={isCollapsed}>
          Gestion des utilisateurs
        </SidebarItem>
        <SidebarItem href="/admin/annonces" icon={<Bell className="h-4 w-4" />} collapsed={isCollapsed}>
          Annonces et actualités
        </SidebarItem>
        <SidebarItem href="/admin/calendrier" icon={<Calendar className="h-4 w-4" />} collapsed={isCollapsed}>
          Calendrier scolaire
        </SidebarItem>
        <SidebarItem href="/admin/statistiques" icon={<BarChart3 className="h-4 w-4" />} collapsed={isCollapsed}>
          Statistiques
        </SidebarItem>
        <SidebarItem href="/admin/documents" icon={<FileText className="h-4 w-4" />} collapsed={isCollapsed}>
          Documents officiels
        </SidebarItem>
        <SidebarItem href="/admin/parametres" icon={<Settings className="h-4 w-4" />} collapsed={isCollapsed}>
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
  collapsed?: boolean
}

function SidebarItem({ href, icon, children, collapsed = false }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full rounded-md mb-1 hover:bg-darkblue-100 hover:text-darkblue-800 dark:hover:bg-darkblue-800 dark:hover:text-darkblue-100",
        collapsed ? "justify-center px-2" : "justify-start gap-2",
      )}
      asChild
    >
      <Link href={href} title={collapsed ? String(children) : undefined}>
        {icon}
        {!collapsed && <span>{children}</span>}
      </Link>
    </Button>
  )
}


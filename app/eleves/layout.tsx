"use client"

import { type ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, FileText, Home, MessageSquare, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

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
      {!isCollapsed && <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Élèves</h2>}
      <div className="flex flex-col gap-1">
        <SidebarItem href="/eleves/dashboard" icon={<Home className="h-4 w-4" />} collapsed={isCollapsed}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/eleves/cours" icon={<BookOpen className="h-4 w-4" />} collapsed={isCollapsed}>
          Cours et devoirs
        </SidebarItem>
        <SidebarItem href="/eleves/notes" icon={<BarChart3 className="h-4 w-4" />} collapsed={isCollapsed}>
          Notes et progrès
        </SidebarItem>
        <SidebarItem href="/eleves/ressources" icon={<FileText className="h-4 w-4" />} collapsed={isCollapsed}>
          Ressources pédagogiques
        </SidebarItem>
        <SidebarItem href="/eleves/forum" icon={<MessageSquare className="h-4 w-4" />} collapsed={isCollapsed}>
          Forum de discussion
        </SidebarItem>
        <SidebarItem href="/eleves/notifications" icon={<Bell className="h-4 w-4" />} collapsed={isCollapsed}>
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


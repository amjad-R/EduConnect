"use client"

import { type ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, Home, MessageSquare, FileText, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

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
      {!isCollapsed && <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Espace Parents</h2>}
      <div className="flex flex-col gap-1">
        <SidebarItem href="/parents/dashboard" icon={<Home className="h-4 w-4" />} collapsed={isCollapsed}>
          Tableau de bord
        </SidebarItem>
        <SidebarItem href="/parents/performances" icon={<BarChart3 className="h-4 w-4" />} collapsed={isCollapsed}>
          Suivi des performances
        </SidebarItem>
        <SidebarItem href="/parents/communication" icon={<MessageSquare className="h-4 w-4" />} collapsed={isCollapsed}>
          Communication
        </SidebarItem>
        <SidebarItem href="/parents/releves" icon={<FileText className="h-4 w-4" />} collapsed={isCollapsed}>
          Relevés de notes
        </SidebarItem>
        <SidebarItem href="/parents/notifications" icon={<Bell className="h-4 w-4" />} collapsed={isCollapsed}>
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


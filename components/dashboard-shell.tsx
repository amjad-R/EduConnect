"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarToggle } from "@/components/sidebar-toggle"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: ReactNode
  sidebar: ReactNode
  userType: string
}

export function DashboardShell({ children, sidebar, userType }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Check if there's a saved preference in localStorage
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true")
    }
    setIsMounted(true)
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    // Save preference to localStorage
    localStorage.setItem("sidebarCollapsed", String(newState))
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileNav userType={userType}>{sidebar}</MobileNav>
            <SidebarToggle collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="hidden text-xl font-bold md:inline-block">École Connect</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav userType={userType} />
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[auto_1fr]">
        <aside
          className={cn(
            "hidden border-r transition-all duration-300 ease-in-out md:block bg-card/50",
            sidebarCollapsed ? "md:w-[70px]" : "md:w-[240px]",
          )}
        >
          <div
            className={cn(
              "sticky top-16 overflow-y-auto py-6 h-[calc(100vh-4rem)]",
              sidebarCollapsed ? "px-2" : "px-4",
            )}
          >
            {sidebar}
          </div>
        </aside>
        <main className="flex-1">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}


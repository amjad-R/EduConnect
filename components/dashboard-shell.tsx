import type { ReactNode } from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"

interface DashboardShellProps {
  children: ReactNode
  sidebar: ReactNode
  userType: string
}

export function DashboardShell({ children, sidebar, userType }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileNav userType={userType}>{sidebar}</MobileNav>
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="hidden text-xl font-bold md:inline-block">EduConnect</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <UserNav userType={userType} />
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r md:block">
          <div className="sticky top-16 overflow-y-auto py-6 pr-2 h-[calc(100vh-4rem)]">{sidebar}</div>
        </aside>
        <main className="flex-1">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}


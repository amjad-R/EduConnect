"use client"

import { type ReactNode, useState, useEffect } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  children: ReactNode
  userType: string
}

export function MobileNav({ children, userType }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-[300px] p-0">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">École Connect</span>
          </Link>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto py-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}


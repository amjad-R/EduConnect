"use client"

import { useState, useEffect } from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarToggleProps {
  collapsed: boolean
  onToggle: () => void
}

export function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden md:flex"
      onClick={onToggle}
      title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    >
      {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
      <span className="sr-only">{collapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
    </Button>
  )
}


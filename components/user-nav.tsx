"use client"
import { useRouter } from "next/navigation"
import { LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserNavProps {
  userType: string
}

export function UserNav({ userType }: UserNavProps) {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  const getUserName = () => {
    switch (userType) {
      case "eleves":
        return "Sophie Martin"
      case "parents":
        return "M. et Mme Martin"
      case "enseignants":
        return "Mme Dubois"
      case "admin":
        return "Admin Principal"
      default:
        return "Utilisateur"
    }
  }

  const getUserRole = () => {
    switch (userType) {
      case "eleves":
        return "Élève - Classe de 3ème A"
      case "parents":
        return "Parents de Sophie Martin"
      case "enseignants":
        return "Professeur de Mathématiques"
      case "admin":
        return "Administrateur Système"
      default:
        return "Rôle non défini"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={getUserName()} />
            <AvatarFallback>{getUserName().charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getUserName()}</p>
            <p className="text-xs leading-none text-muted-foreground">{getUserRole()}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


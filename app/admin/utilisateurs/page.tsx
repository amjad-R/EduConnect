"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Pencil,
  Trash2,
  UserPlus,
  Download,
  Filter,
  MoreHorizontal,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userType, setUserType] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filter users based on search query and user type
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = userType === "all" || user.role === userType

    return matchesSearch && matchesType
  })

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsAddUserOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the user to the database
    setIsAddUserOpen(false)
    setSelectedUser(null)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the user from the database
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <GraduationCap className="h-4 w-4 text-blue-500" />
      case "parent":
        return <Users className="h-4 w-4 text-green-500" />
      case "teacher":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "student":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            Élève
          </Badge>
        )
      case "parent":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            Parent
          </Badge>
        )
      case "teacher":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
          >
            Enseignant
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Utilisateurs</h2>
          <p className="text-muted-foreground">Gérez les élèves, parents et enseignants de l'établissement.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Exporter</span>
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Ajouter un utilisateur</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{selectedUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
                <DialogDescription>
                  {selectedUser
                    ? "Modifiez les informations de l'utilisateur ci-dessous."
                    : "Remplissez les informations pour créer un nouvel utilisateur."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Rôle
                    </Label>
                    <Select defaultValue={selectedUser?.role || "student"}>
                      <SelectTrigger id="role" className="col-span-3">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Élève</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="teacher">Enseignant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom complet
                    </Label>
                    <Input id="name" defaultValue={selectedUser?.name || ""} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" defaultValue={selectedUser?.email || ""} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">
                      Classe
                    </Label>
                    <Select defaultValue={selectedUser?.class || ""}>
                      <SelectTrigger id="class" className="col-span-3">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6A">6ème A</SelectItem>
                        <SelectItem value="6B">6ème B</SelectItem>
                        <SelectItem value="5A">5ème A</SelectItem>
                        <SelectItem value="5B">5ème B</SelectItem>
                        <SelectItem value="4A">4ème A</SelectItem>
                        <SelectItem value="4B">4ème B</SelectItem>
                        <SelectItem value="3A">3ème A</SelectItem>
                        <SelectItem value="3B">3ème B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {selectedUser ? "Enregistrer les modifications" : "Ajouter l'utilisateur"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setUserType("all")}>Tous les utilisateurs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserType("student")}>Élèves uniquement</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserType("parent")}>Parents uniquement</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserType("teacher")}>Enseignants uniquement</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="student">Élèves</TabsTrigger>
            <TabsTrigger value="parent">Parents</TabsTrigger>
            <TabsTrigger value="teacher">Enseignants</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">Créé le {user.createdAt}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      {getRoleBadge(user.role)}
                    </div>
                  </TableCell>
                  <TableCell>{user.class}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface User {
  id: string
  name: string
  email: string
  role: string
  class: string
  status: "active" | "inactive"
  createdAt: string
  avatar: string
}

const users: User[] = [
  {
    id: "STU001",
    name: "Sophie Martin",
    email: "sophie.martin@ecole.fr",
    role: "student",
    class: "3A",
    status: "active",
    createdAt: "15/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU002",
    name: "Lucas Dubois",
    email: "lucas.dubois@ecole.fr",
    role: "student",
    class: "3A",
    status: "active",
    createdAt: "15/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PAR001",
    name: "M. et Mme Martin",
    email: "parents.martin@email.com",
    role: "parent",
    class: "3A",
    status: "active",
    createdAt: "15/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PAR002",
    name: "M. et Mme Dubois",
    email: "parents.dubois@email.com",
    role: "parent",
    class: "3A",
    status: "active",
    createdAt: "15/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TEA001",
    name: "Mme Leroy",
    email: "mme.leroy@ecole.fr",
    role: "teacher",
    class: "3A",
    status: "active",
    createdAt: "01/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TEA002",
    name: "M. Bernard",
    email: "m.bernard@ecole.fr",
    role: "teacher",
    class: "4B",
    status: "active",
    createdAt: "01/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU003",
    name: "Emma Petit",
    email: "emma.petit@ecole.fr",
    role: "student",
    class: "4B",
    status: "inactive",
    createdAt: "15/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TEA003",
    name: "Mme Moreau",
    email: "mme.moreau@ecole.fr",
    role: "teacher",
    class: "6A",
    status: "active",
    createdAt: "01/09/2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]


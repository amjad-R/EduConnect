"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, Users, BookOpen, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("eleves")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would authenticate the user here
    // For demo purposes, we'll just redirect to the appropriate dashboard
    router.push(`/${userType}/dashboard`)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <GraduationCap className="h-6 w-6" />
        <span className="text-lg font-bold">École Connect</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
          <p className="text-sm text-muted-foreground">Entrez vos identifiants pour accéder à votre espace</p>
        </div>

        <Tabs defaultValue="eleves" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="eleves" className="flex flex-col items-center gap-1 py-2">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">Élèves</span>
            </TabsTrigger>
            <TabsTrigger value="parents" className="flex flex-col items-center gap-1 py-2">
              <Users className="h-4 w-4" />
              <span className="text-xs">Parents</span>
            </TabsTrigger>
            <TabsTrigger value="enseignants" className="flex flex-col items-center gap-1 py-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">Enseignants</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex flex-col items-center gap-1 py-2">
              <Building2 className="h-4 w-4" />
              <span className="text-xs">Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eleves">
            <LoginForm
              userType="Élève"
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          </TabsContent>

          <TabsContent value="parents">
            <LoginForm
              userType="Parent"
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          </TabsContent>

          <TabsContent value="enseignants">
            <LoginForm
              userType="Enseignant"
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          </TabsContent>

          <TabsContent value="admin">
            <LoginForm
              userType="Administrateur"
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface LoginFormProps {
  userType: string
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function LoginForm({ userType, email, setEmail, password, setPassword, onSubmit }: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Espace {userType}</CardTitle>
        <CardDescription>Connectez-vous pour accéder à votre espace personnel.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@ecole.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="/reset-password" className="text-xs text-muted-foreground underline underline-offset-4">
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}


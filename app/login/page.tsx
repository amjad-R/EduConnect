"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, Users, BookOpen, Building2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add the import for the CSS module at the top of the file
import styles from "./login.module.css"

// Update the main container to have a better background and spacing
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
    <div className="container relative flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-muted to-background dark:from-muted/50">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-primary">École Connect</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Connexion</h1>
          <p className="text-sm text-muted-foreground">Entrez vos identifiants pour accéder à votre espace</p>
        </div>

        <Tabs defaultValue="eleves" className="w-full" onValueChange={setUserType}>
          <TabsList className={`grid w-full h-22 grid-cols-4 mb-6 ${styles.loginTabs}`}>
            <TabsTrigger
              value="eleves"
              className="flex flex-col items-center gap-2 py-3 px-1 text-foreground data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <GraduationCap className="h-5 w-5 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground" />
              <span className="text-sm font-medium">Élèves</span>
            </TabsTrigger>
            <TabsTrigger
              value="parents"
              className="flex flex-col items-center gap-2 py-3 px-1 text-foreground data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <Users className="h-5 w-5 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground" />
              <span className="text-sm font-medium">Parents</span>
            </TabsTrigger>
            <TabsTrigger
              value="enseignants"
              className="flex flex-col items-center gap-2 py-3 px-1 text-foreground data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="h-5 w-5 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground" />
              <span className="text-sm font-medium">Enseignants</span>
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="flex flex-col items-center gap-2 py-3 px-1 text-foreground data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <Building2 className="h-5 w-5 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground" />
              <span className="text-sm font-medium">Admin</span>
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
    <Card className="border border-muted shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-foreground">Espace {userType}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Connectez-vous pour accéder à votre espace personnel.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@ecole.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground">
                Mot de passe
              </Label>
              <Link
                href="/reset-password"
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
            Se connecter
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
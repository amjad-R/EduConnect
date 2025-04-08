"use client"

import { useState } from "react"
import { Info, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ParametresPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Paramètres enregistrés",
        description: "Les modifications ont été appliquées avec succès.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres du système</h1>
        <p className="text-muted-foreground">Configurez les paramètres généraux de la plateforme éducative.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'établissement</CardTitle>
                <CardDescription>Ces informations seront affichées sur toute la plateforme.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school-name">Nom de l'établissement</Label>
                    <Input id="school-name" defaultValue="Lycée International de Paris" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-code">Code établissement</Label>
                    <Input id="school-code" defaultValue="LIP75001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-address">Adresse</Label>
                  <Textarea id="school-address" defaultValue="123 Avenue de l'Éducation, 75001 Paris" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="school-phone">Téléphone</Label>
                    <Input id="school-phone" defaultValue="+33 1 23 45 67 89" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-email">Email</Label>
                    <Input id="school-email" defaultValue="contact@lycee-international.fr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-website">Site web</Label>
                    <Input id="school-website" defaultValue="www.lycee-international.fr" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Année scolaire</CardTitle>
                <CardDescription>Définissez l'année scolaire en cours et les périodes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school-year">Année scolaire</Label>
                    <Select defaultValue="2023-2024">
                      <SelectTrigger id="school-year">
                        <SelectValue placeholder="Sélectionner une année" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2022-2023">2022-2023</SelectItem>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-term">Période en cours</Label>
                    <Select defaultValue="trimester-2">
                      <SelectTrigger id="current-term">
                        <SelectValue placeholder="Sélectionner une période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trimester-1">1er Trimestre</SelectItem>
                        <SelectItem value="trimester-2">2ème Trimestre</SelectItem>
                        <SelectItem value="trimester-3">3ème Trimestre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fonctionnalités</CardTitle>
                <CardDescription>Activez ou désactivez les fonctionnalités de la plateforme.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="forum-feature" className="flex flex-col space-y-1">
                    <span>Forum de discussion</span>
                    <span className="text-xs text-muted-foreground">
                      Permet aux élèves et enseignants d'échanger sur la plateforme
                    </span>
                  </Label>
                  <Switch id="forum-feature" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="messaging-feature" className="flex flex-col space-y-1">
                    <span>Messagerie interne</span>
                    <span className="text-xs text-muted-foreground">
                      Permet la communication privée entre utilisateurs
                    </span>
                  </Label>
                  <Switch id="messaging-feature" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="resources-feature" className="flex flex-col space-y-1">
                    <span>Ressources pédagogiques</span>
                    <span className="text-xs text-muted-foreground">Permet le partage de documents et ressources</span>
                  </Label>
                  <Switch id="resources-feature" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Thème et apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thème par défaut</Label>
                <RadioGroup defaultValue="system" className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Clair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Sombre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">Système (automatique)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Couleur principale</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Sélectionner une couleur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Bleu</SelectItem>
                    <SelectItem value="green">Vert</SelectItem>
                    <SelectItem value="purple">Violet</SelectItem>
                    <SelectItem value="red">Rouge</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="animations" className="flex flex-col space-y-1">
                  <span>Animations</span>
                  <span className="text-xs text-muted-foreground">Activer les animations de l'interface</span>
                </Label>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurez les notifications envoyées aux utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-grades" className="flex flex-col space-y-1">
                    <span>Notes</span>
                    <span className="text-xs text-muted-foreground">
                      Envoyer un email lors de la publication de nouvelles notes
                    </span>
                  </Label>
                  <Switch id="email-grades" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-absences" className="flex flex-col space-y-1">
                    <span>Absences</span>
                    <span className="text-xs text-muted-foreground">
                      Envoyer un email lors de l'enregistrement d'une absence
                    </span>
                  </Label>
                  <Switch id="email-absences" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-announcements" className="flex flex-col space-y-1">
                    <span>Annonces</span>
                    <span className="text-xs text-muted-foreground">
                      Envoyer un email pour les nouvelles annonces importantes
                    </span>
                  </Label>
                  <Switch id="email-announcements" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Notifications dans l'application</h3>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="app-messages" className="flex flex-col space-y-1">
                    <span>Messages</span>
                    <span className="text-xs text-muted-foreground">
                      Afficher une notification pour les nouveaux messages
                    </span>
                  </Label>
                  <Switch id="app-messages" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="app-assignments" className="flex flex-col space-y-1">
                    <span>Devoirs</span>
                    <span className="text-xs text-muted-foreground">
                      Afficher une notification pour les nouveaux devoirs
                    </span>
                  </Label>
                  <Switch id="app-assignments" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="app-events" className="flex flex-col space-y-1">
                    <span>Événements</span>
                    <span className="text-xs text-muted-foreground">
                      Afficher une notification pour les événements à venir
                    </span>
                  </Label>
                  <Switch id="app-events" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité et confidentialité</CardTitle>
              <CardDescription>Configurez les paramètres de sécurité de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Politique de mot de passe</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Sélectionner une politique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basique (min. 8 caractères)</SelectItem>
                    <SelectItem value="medium">Moyenne (min. 10 caractères, 1 majuscule, 1 chiffre)</SelectItem>
                    <SelectItem value="strong">Forte (min. 12 caractères, majuscules, chiffres, symboles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Expiration de session</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="120">2 heures</SelectItem>
                    <SelectItem value="240">4 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Authentification à deux facteurs</span>
                  <span className="text-xs text-muted-foreground">
                    Exiger l'authentification à deux facteurs pour les comptes administrateurs
                  </span>
                </Label>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="data-encryption" className="flex flex-col space-y-1">
                  <span>Chiffrement des données sensibles</span>
                  <span className="text-xs text-muted-foreground">
                    Activer le chiffrement pour les données personnelles
                  </span>
                </Label>
                <Switch id="data-encryption" defaultChecked />
              </div>

              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Conformité RGPD</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                      <p>
                        La plateforme est configurée pour respecter les exigences du Règlement Général sur la Protection
                        des Données (RGPD).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>Ces paramètres sont destinés aux administrateurs techniques.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-access">Accès API</Label>
                <Select defaultValue="restricted">
                  <SelectTrigger id="api-access">
                    <SelectValue placeholder="Sélectionner un niveau d'accès" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Désactivé</SelectItem>
                    <SelectItem value="restricted">Restreint (authentification requise)</SelectItem>
                    <SelectItem value="full">Complet (avec clés API)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-level">Niveau de journalisation</Label>
                <Select defaultValue="warning">
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Erreur uniquement</SelectItem>
                    <SelectItem value="warning">Avertissements et erreurs</SelectItem>
                    <SelectItem value="info">Informations, avertissements et erreurs</SelectItem>
                    <SelectItem value="debug">Débogage (toutes les informations)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Activer le mode maintenance</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Le mode maintenance rend la plateforme inaccessible aux utilisateurs non-administrateurs.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Fréquence des sauvegardes</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">
          <X className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Mail,
  Phone,
  MapPin,
  Pencil,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { data: session, status } = useSession()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })

  // Load session data
  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || "",
      }))
    }
  }, [session])

  if (status === "loading") {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin size-6 text-primary" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">
          Please login to view your profile.
        </p>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  // First + Last Initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ")
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (
      parts[0][0].toUpperCase() +
      parts[parts.length - 1][0].toUpperCase()
    )
  }

  const initials = getInitials(profile.fullName || "User")

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage and update your account information
        </p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              
              {/* Initial Avatar */}
              <Avatar className="h-24 w-24 bg-primary/10 border">
                <AvatarFallback className="text-2xl font-bold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-2xl">
                  {profile.fullName}
                </CardTitle>
                <CardDescription className="mt-1">
                  {profile.email}
                </CardDescription>
              </div>
            </div>

            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Pencil className="size-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isEditing ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={profile.email} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Address</Label>
                <Input
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    {profile.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {isEditing && (
          <CardFooter className="flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

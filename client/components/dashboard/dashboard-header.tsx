"use client"

import { useSession, signOut } from "next-auth/react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { data: session } = useSession()
  const user = session?.user

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-muted transition"
            >
              {/* Avatar with Online Dot */}
              <div className="relative">
                <Avatar className="h-9 w-9 border bg-muted">
                  <AvatarFallback className="text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Online Status */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
              </div>

              {/* Name + Email */}
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-medium leading-none">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl shadow-md"
          >
            <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Account
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}

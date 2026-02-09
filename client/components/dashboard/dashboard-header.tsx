"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b bg-background px-4">
      <div className="flex flex-1 items-center gap-4">
        {/* This button will toggle the drawer on mobile and collapse it on desktop */}
        <SidebarTrigger />
        
        <div className="hidden md:block font-semibold text-lg">
          SchoolRide
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 flex size-2 rounded-full bg-primary" />
        </Button>
        <Avatar className="size-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
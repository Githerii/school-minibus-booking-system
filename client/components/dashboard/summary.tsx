"use client"

import { useEffect, useState } from "react"
import { CalendarCheck, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SummaryCards() {
  const [stats, setStats] = useState({
    activeBookings: 0,
    nextPickup: "Loading...",
    totalSeats: 0,
    activeRoutes: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      
      // Fetch bookings
      const bookingsRes = await fetch("http://localhost:5000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (bookingsRes.ok) {
        const bookings = await bookingsRes.json()
        const activeBookings = bookings.filter((b: any) => b.status === "booked").length
        const totalSeats = bookings.reduce((sum: number, b: any) => sum + (b.numSeats || 1), 0)
        
        setStats(prev => ({
          ...prev,
          activeBookings,
          totalSeats,
        }))
      }

      // Fetch routes
      const routesRes = await fetch("http://localhost:5000/routes")
      if (routesRes.ok) {
        const routes = await routesRes.json()
        setStats(prev => ({
          ...prev,
          activeRoutes: routes.length,
        }))
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const summaryData = [
    {
      title: "Active Bookings",
      value: stats.activeBookings.toString(),
      description: "Currently scheduled",
      icon: CalendarCheck,
      hoverClass: "bg-emerald-50 border-emerald-200 shadow-lg shadow-emerald-100",
      iconHoverClass: "text-emerald-600",
      textHoverClass: "text-emerald-700",
      accentClass: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Pickup Status",
      value: "On Time",
      description: stats.nextPickup,
      icon: Clock,
      hoverClass: "bg-blue-50 border-blue-200 shadow-lg shadow-blue-100",
      iconHoverClass: "text-blue-600",
      textHoverClass: "text-blue-700",
      accentClass: "bg-blue-50 text-blue-700",
    },
    {
      title: "Total Seats",
      value: stats.totalSeats.toString(),
      description: "Across all bookings",
      icon: Users,
      hoverClass: "bg-violet-50 border-violet-200 shadow-lg shadow-violet-100",
      iconHoverClass: "text-violet-600",
      textHoverClass: "text-violet-700",
      accentClass: "bg-violet-50 text-violet-700",
    },
    {
      title: "Available Routes",
      value: stats.activeRoutes.toString(),
      description: "Active routes",
      icon: MapPin,
      hoverClass: "bg-amber-50 border-amber-200 shadow-lg shadow-amber-100",
      iconHoverClass: "text-amber-600",
      textHoverClass: "text-amber-700",
      accentClass: "bg-amber-50 text-amber-700",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card 
          key={item.title}
          className={`group cursor-pointer transition-all duration-300 ease-in-out border-border/50 dark:bg-gray-800 dark:border-gray-700 ${item.hoverClass} hover:-translate-y-1`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-medium text-muted-foreground transition-colors duration-300 dark:text-gray-400 ${item.textHoverClass}`}>
              {item.title}
            </CardTitle>
            <item.icon className={`size-4 text-muted-foreground transition-colors duration-300 dark:text-gray-400 ${item.iconHoverClass}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors duration-300 dark:text-gray-100 ${item.textHoverClass}`}>
              {item.value}
            </div>
            <p className={`text-xs text-muted-foreground transition-colors duration-300 dark:text-gray-400 ${item.textHoverClass}`}>
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
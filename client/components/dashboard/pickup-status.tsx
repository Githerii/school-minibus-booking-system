"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Booking {
  booking_id: number
  pickup: string
  dropoff: string
  selectedDays: string
  status: string
}

export function PickupStatus() {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingBookings()
  }, [])

  const fetchUpcomingBookings = async () => {
    try {
      const token = localStorage.getItem("access_token")
      const response = await fetch("http://localhost:5000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Get only active bookings, limit to 3
        const active = data.filter((b: Booking) => b.status === "booked").slice(0, 3)
        setUpcomingBookings(active)
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5" />
          Upcoming Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-4">Loading...</div>
        ) : upcomingBookings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">No upcoming bookings</p>
            <p className="text-xs mt-1">Book a ride to see it here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.booking_id} className="border-b pb-3 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Booking #{booking.booking_id}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3" />
                    <span>From: {booking.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3" />
                    <span>To: {booking.dropoff}</span>
                  </div>
                  {booking.selectedDays && (
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3" />
                      <span>{JSON.parse(booking.selectedDays).length} days scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
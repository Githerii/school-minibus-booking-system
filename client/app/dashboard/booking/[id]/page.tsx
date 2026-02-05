"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Bus,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dynamic import for the map component
const BookingMapView = dynamic(() => import("./BookingMapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-100 flex items-center justify-center rounded-lg border">
      <p className="text-slate-500">Loading map...</p>
    </div>
  ),
})

interface Booking {
  booking_id: number
  bus: string
  route: string | null
  pickup: string
  dropoff: string
  numSeats: number
  selectedDays: string | null
  bookingDate: string
  status: string
}

interface RouteData {
  route_id: number
  route_name: string
  start_location: string
  end_location: string
  pickup_spots: string | null
  dropoff_spots: string | null
}

export default function BookingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const [booking, setBooking] = useState<Booking | null>(null)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookingDetails()
  }, [bookingId])

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem("access_token")
      
      // Fetch booking
      const bookingRes = await fetch("http://localhost:5000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (bookingRes.ok) {
        const bookings = await bookingRes.json()
        const currentBooking = bookings.find(
          (b: Booking) => b.booking_id === parseInt(bookingId)
        )
        
        if (currentBooking) {
          setBooking(currentBooking)
          
          // Fetch route data if available
          if (currentBooking.route) {
            const routesRes = await fetch("http://localhost:5000/routes")
            if (routesRes.ok) {
              const routes = await routesRes.json()
              const matchedRoute = routes.find(
                (r: RouteData) => r.route_name === currentBooking.route
              )
              if (matchedRoute) {
                setRouteData(matchedRoute)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch booking details:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysCount = (selectedDays: string | null) => {
    if (!selectedDays) return 0
    try {
      return JSON.parse(selectedDays).length
    } catch {
      return 0
    }
  }

  const getSelectedDates = (selectedDays: string | null) => {
    if (!selectedDays) return []
    try {
      return JSON.parse(selectedDays)
    } catch {
      return []
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading booking details...</p>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">Booking not found</p>
        <Button onClick={() => router.push("/dashboard/booking")}>
          Back to Bookings
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/booking")}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Booking #{booking.booking_id}
          </h1>
          <p className="text-muted-foreground">View your booking details</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Booking Details */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Booking Status</span>
                <Badge
                  className={
                    booking.status === "booked"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted"
                  }
                >
                  <CheckCircle2 className="mr-1 size-3" />
                  {booking.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Bus className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Bus & Route</p>
                    <p className="text-sm text-muted-foreground">{booking.bus}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.route || "Route not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Seats</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.numSeats || 1} seat(s) booked
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Booking Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      {getDaysCount(booking.selectedDays)} day(s) scheduled
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup and Dropoff Card */}
          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Pickup Point</p>
                  <p className="text-sm text-muted-foreground">{booking.pickup}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Dropoff Point</p>
                  <p className="text-sm text-muted-foreground">{booking.dropoff}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Dates */}
          {booking.selectedDays && getDaysCount(booking.selectedDays) > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {getSelectedDates(booking.selectedDays).map((date: string, idx: number) => (
                    <div
                      key={idx}
                      className="text-xs bg-muted rounded px-2 py-1 text-center"
                    >
                      {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>
                Visual representation of your pickup and dropoff locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {routeData ? (
                <BookingMapView
                  routeData={routeData}
                  pickupSpot={booking.pickup}
                  dropoffSpot={booking.dropoff}
                />
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    Route map not available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type BookingStatus = "booked" | "pending" | "completed" | "cancelled"

interface Booking {
  booking_id: number
  bus: string
  route: string
  pickup: string
  dropoff: string
  numSeats: number
  bookingDate: string
  status: BookingStatus
}

const statusStyles: Record<BookingStatus, string> = {
  booked: "bg-green-200 text-green-800",
  pending: "bg-yellow-200 text-yellow-800",
  completed: "bg-slate-200 text-slate-700",
  cancelled: "bg-red-200 text-red-800",
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.slice(0, 5)) // Show only 5 most recent
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-gray-100">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-8 dark:text-gray-400">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 dark:text-gray-400">
            No bookings yet. Book your first ride!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-700">
                <TableHead className="dark:text-gray-300">Booking ID</TableHead>
                <TableHead className="dark:text-gray-300">Bus</TableHead>
                <TableHead className="hidden md:table-cell dark:text-gray-300">Route</TableHead>
                <TableHead className="hidden sm:table-cell dark:text-gray-300">Seats</TableHead>
                <TableHead className="hidden sm:table-cell dark:text-gray-300">Date</TableHead>
                <TableHead className="dark:text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow 
                  key={booking.booking_id}
                  className="cursor-pointer transition-all duration-300 bg-slate-50 shadow-md shadow-slate-100 scale-[1.01] border-transparent dark:bg-gray-700 dark:border-gray-600"
                >
                  <TableCell className="font-medium transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    #{booking.booking_id}
                  </TableCell>
                  <TableCell className="transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    {booking.bus}
                  </TableCell>
                  <TableCell className="hidden md:table-cell transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    {booking.route || "N/A"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    {booking.numSeats || 1}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell transition-colors duration-300 text-blue-600 dark:text-blue-400">
                    {booking.bookingDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${statusStyles[booking.status]} transition-all duration-300 scale-105 shadow-sm`}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
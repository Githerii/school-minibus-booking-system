"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BookingStatus = "booked" | "pending" | "completed" | "cancelled";

interface Booking {
  booking_id: number;
  bus: string;
  route: string | null;
  pickup: string;
  dropoff: string;
  numSeats: number;
  bookingDate: string;
  status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
  booked: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  completed: "bg-muted text-muted-foreground hover:bg-muted",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetchWithAuth("/bookings");

      if (response.ok) {
        const data = await response.json();
        setBookings(data.slice(0, 5));
      } else {
        // not logged in / invalid token
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-muted-foreground py-8">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No bookings yet. Book your first ride!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead className="hidden md:table-cell">Route</TableHead>
                <TableHead className="hidden sm:table-cell">Seats</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.booking_id}>
                  <TableCell className="font-medium">#{booking.booking_id}</TableCell>
                  <TableCell>{booking.bus}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {booking.route || "N/A"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {booking.numSeats || 1}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {booking.bookingDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusStyles[(booking.status || "booked") as BookingStatus]}
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
  );
}

"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
  booking_id: number;
  pickup: string;
  dropoff: string;
  selectedDays: string | null;
  status: string;
}

export function PickupStatus() {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      const response = await fetchWithAuth("/bookings");

      if (response.ok) {
        const data = await response.json();
        const active = data
          .filter((b: Booking) => (b.status || "").toLowerCase() === "booked")
          .slice(0, 3);
        setUpcomingBookings(active);
      } else {
        // If user isn't logged in, backend returns 401/422 and we just show empty UI
        setUpcomingBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setUpcomingBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const daysCount = (selectedDays: string | null) => {
    if (!selectedDays) return 0;
    try {
      return JSON.parse(selectedDays).length;
    } catch {
      return 0;
    }
  };

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
                      <span>{daysCount(booking.selectedDays)} days scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  booking_id: number;
  parent: string;
  bus: string;
  route: string | null;
  pickup: string;
  dropoff: string;
  numSeats: number;
  selectedDays: string | null;
  bookingDate: string;
  status: string;
}

export default function BookingDetailsPage() {
  const router = useRouter();
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const bookingId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchWithAuth("/bookings");
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as any).error || "Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (e: any) {
        setError(e.message || "Failed to load booking");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const booking = useMemo(
    () => bookings.find((b) => b.booking_id === bookingId),
    [bookings, bookingId]
  );

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  if (error)
    return (
      <div className="space-y-3">
        <div className="text-red-600">{error}</div>
        <Button asChild variant="outline" className="bg-transparent">
          <Link href="/dashboard/booking">Back</Link>
        </Button>
      </div>
    );

  if (!booking)
    return (
      <div className="space-y-3">
        <div className="text-muted-foreground">Booking not found.</div>
        <Button asChild variant="outline" className="bg-transparent">
          <Link href="/dashboard/booking">Back</Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Booking #{booking.booking_id}
          </h1>
          <p className="text-muted-foreground">View your booking details</p>
        </div>
        <Button asChild variant="outline" className="bg-transparent">
          <Link href="/dashboard/booking">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">{booking.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bus</span>
            <span className="font-medium">{booking.bus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route</span>
            <span className="font-medium">{booking.route || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pickup</span>
            <span className="font-medium">{booking.pickup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dropoff</span>
            <span className="font-medium">{booking.dropoff}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seats</span>
            <span className="font-medium">{booking.numSeats || 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking Date</span>
            <span className="font-medium">
              {new Date(booking.bookingDate).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

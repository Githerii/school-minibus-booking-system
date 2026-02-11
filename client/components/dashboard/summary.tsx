"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Clock, MapPin, Users } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCards() {
  const [stats, setStats] = useState({
    activeBookings: 0,
    nextPickup: "—",
    totalSeats: 0,
    activeRoutes: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Bookings (auth)
      const bookingsRes = await fetchWithAuth("/bookings");
      if (bookingsRes.ok) {
        const bookings = await bookingsRes.json();
        const activeBookings = bookings.filter((b: any) => (b.status || "").toLowerCase() === "booked").length;
        const totalSeats = bookings.reduce(
          (sum: number, b: any) => sum + (b.numSeats || 1),
          0
        );

        setStats((prev) => ({
          ...prev,
          activeBookings,
          totalSeats,
        }));
      } else {
        // Not logged in / invalid token -> show zeros
        setStats((prev) => ({ ...prev, activeBookings: 0, totalSeats: 0 }));
      }

      // Routes (public)
      const routesRes = await fetch("http://localhost:5000/routes");
      if (routesRes.ok) {
        const routes = await routesRes.json();
        setStats((prev) => ({
          ...prev,
          activeRoutes: routes.length,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const summaryData = [
    {
      title: "Active Bookings",
      value: stats.activeBookings.toString(),
      description: "Currently scheduled",
      icon: CalendarCheck,
    },
    {
      title: "Pickup Status",
      value: "On Time",
      description: stats.nextPickup,
      icon: Clock,
    },
    {
      title: "Total Seats",
      value: stats.totalSeats.toString(),
      description: "Across all bookings",
      icon: Users,
    },
    {
      title: "Available Routes",
      value: stats.activeRoutes.toString(),
      description: "Active routes",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

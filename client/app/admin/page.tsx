"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import StatsCards from "@/components/admin/StatsCards";
import {
  getAdminBuses,
  getAdminDrivers,
  getAdminRoutes,
  getAdminBookings,
} from "@/lib/api";

export default function AdminPage() {
  const [stats, setStats] = useState({
    buses: 0,
    drivers: 0,
    routes: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminBuses(),
      getAdminDrivers(),
      getAdminRoutes(),
      getAdminBookings(),
    ])
      .then(([buses, drivers, routes, bookings]) => {
        setStats({
          buses: buses.length,
          drivers: drivers.length,
          routes: routes.length,
          bookings: bookings.length,
        });
      })
      .catch((error) => {
        console.error("Failed to fetch stats:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <StatsCards stats={stats} />
    </DashboardLayout>
  );
}
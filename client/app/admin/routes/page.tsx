"use client";

import { useEffect, useState } from "react";
import RouteManager from "@/components/admin/RouteManager";
import { getAdminRoutes, AdminRoute } from "@/lib/api";

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<AdminRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await getAdminRoutes();
        setRoutes(data);
      } catch (err) {
        setError("Failed to load routes");
      } finally {
        setLoading(false);
      }
    }

    loadRoutes();
  }, []);

  if (loading) return <p>Loading routes…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <RouteManager routes={routes} />;
}

"use client";

import { useEffect, useState } from "react";
import RouteManager from "@/components/admin/RouteManager";
import { getAdminRoutes, createAdminRoute } from "@/lib/api";

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminRoutes()
      .then(setRoutes)
      .finally(() => setLoading(false));
  }, []);

  async function handleAddRoute(data: {
    name: string;
    startLocation: string;
    endLocation: string;
    status: "active" | "inactive";
  }) {
    // this is an optimistic route
    const tempRoute = {
      id: Date.now(), // temp id
      busCount: 0,
      ...data,
    };

    setRoutes((prev) => [tempRoute, ...prev]);

    try {
      const saved = await createAdminRoute(data);

      // replaces temp route with a real one
      setRoutes((prev) =>
        prev.map((r) => (r.id === tempRoute.id ? saved : r))
      );
    } catch (err) {
      // this is a rollback
      setRoutes((prev) => prev.filter((r) => r.id !== tempRoute.id));
      alert("Failed to create route");
    }
  }

  if (loading) return <p>Loading routes…</p>;

  return (
    <RouteManager
      routes={routes}
      onAddRoute={handleAddRoute}
    />
  );
}

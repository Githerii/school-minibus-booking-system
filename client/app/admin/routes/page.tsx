"use client";

import { useEffect, useState } from "react";
import RouteManager from "@/components/admin/RouteManager";
import {
  getAdminRoutes,
  createAdminRoute,
  updateAdminRoute,
  deleteAdminRoute,
} from "@/lib/api";


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
      id: Date.now(), // this is liek a temporary id
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

  async function handleUpdateRoute(
    id: number,
    data: {
        name: string;
        startLocation: string;
        endLocation: string;
        status: "active" | "inactive";
    }
    ) {
    const previousRoutes = routes;

    setRoutes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );

    try {
        const updated = await updateAdminRoute(id, data);

        setRoutes((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
        );
    } catch (err) {
        setRoutes(previousRoutes);
        alert("Failed to update route");
    }
  }


  async function handleDeleteRoute(id: number) {
    setRoutes((prev) => prev.filter((r) => r.id !== id));

    try {
      await deleteAdminRoute(id);
    } catch (err) {
      alert("Failed to delete route");
    }
  }



  if (loading) return <p>Loading routes…</p>;

  return (
    <RouteManager
      routes={routes}
      onAddRoute={handleAddRoute}
      onUpdateRoute={handleUpdateRoute}
      onDeleteRoute={handleDeleteRoute}
    />
  );
}

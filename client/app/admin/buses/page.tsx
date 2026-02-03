"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import BusManager from "@/components/admin/BusManager";
import {
  getAdminBuses,
  createAdminBus,
  updateAdminBus,
  deleteAdminBus,
  getAdminRoutes,
  getAdminDrivers,
} from "@/lib/api";

export default function AdminBusesPage() {
  const [buses, setBuses] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminBuses(),
      getAdminRoutes(),
      getAdminDrivers(),
    ])
      .then(([b, r, d]) => {
        setBuses(b);
        setRoutes(r);
        setDrivers(d);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAddBus(data: any) {
    const temp = { id: Date.now(), ...data };
    setBuses((prev) => [temp, ...prev]);

    try {
      const saved = await createAdminBus(data);
      setBuses((prev) => prev.map((b) => (b.id === temp.id ? saved : b)));
    } catch {
      setBuses((prev) => prev.filter((b) => b.id !== temp.id));
      alert("Failed to create bus");
    }
  }

  async function handleUpdateBus(id: number, data: any) {
    setBuses((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));

    try {
      await updateAdminBus(id, data);
    } catch {
      alert("Failed to update bus");
    }
  }

  async function handleDeleteBus(id: number) {
    const prev = buses;
    setBuses((b) => b.filter((x) => x.id !== id));

    try {
      await deleteAdminBus(id);
    } catch {
      setBuses(prev);
      alert("Failed to delete bus");
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading buses...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <BusManager
        buses={buses}
        routes={routes}
        drivers={drivers}
        onAddBus={handleAddBus}
        onUpdateBus={handleUpdateBus}
        onDeleteBus={handleDeleteBus}
      />
    </DashboardLayout>
  );
}
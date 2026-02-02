"use client";

import { useEffect, useState } from "react";
import DriverManager from "@/components/admin/DriverManager";
import {
  getAdminDrivers,
  createAdminDriver,
  updateAdminDriver,
  deleteAdminDriver,
} from "@/lib/api";

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDrivers()
      .then(setDrivers)
      .finally(() => setLoading(false));
  }, []);

  async function handleAddDriver(data: { name: string; email: string }) {
    const temp = { id: Date.now(), ...data };
    setDrivers((prev) => [temp, ...prev]);

    try {
      const saved = await createAdminDriver(data);
      setDrivers((prev) => prev.map((d) => (d.id === temp.id ? saved : d)));
    } catch {
      setDrivers((prev) => prev.filter((d) => d.id !== temp.id));
      alert("Failed to create driver");
    }
  }

  async function handleUpdateDriver(id: number, data: any) {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)));

    try {
      await updateAdminDriver(id, data);
    } catch {
      alert("Failed to update driver");
    }
  }

  async function handleDeleteDriver(id: number) {
    const prev = drivers;
    setDrivers((d) => d.filter((x) => x.id !== id));

    try {
      await deleteAdminDriver(id);
    } catch {
      setDrivers(prev);
      alert("Failed to delete driver");
    }
  }

  if (loading) return <p>Loading drivers…</p>;

  return (
    <DriverManager
      drivers={drivers}
      onAddDriver={handleAddDriver}
      onUpdateDriver={handleUpdateDriver}
      onDeleteDriver={handleDeleteDriver}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import BookingManager from "@/components/admin/BookingManager";
import {
  getAdminBookings,
  createAdminBooking,
  updateAdminBooking,
  deleteAdminBooking,
  getAdminBuses,
  getAdminParents,
} from "@/lib/api";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [buses, setBuses] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminBookings(),
      getAdminBuses(),
      getAdminParents(),
    ])
      .then(([bk, bs, pr]) => {
        setBookings(bk);
        setBuses(bs);
        setParents(pr);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAddBooking(data: any) {
    const temp = { id: Date.now(), ...data };
    setBookings((prev) => [temp, ...prev]);

    try {
      const saved = await createAdminBooking(data);
      setBookings((prev) => prev.map((b) => (b.id === temp.id ? saved : b)));
    } catch {
      setBookings((prev) => prev.filter((b) => b.id !== temp.id));
      alert("Failed to create booking");
    }
  }

  async function handleUpdateBooking(id: number, data: any) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );

    try {
      await updateAdminBooking(id, data);
    } catch {
      alert("Failed to update booking");
    }
  }

  async function handleDeleteBooking(id: number) {
    const prev = bookings;
    setBookings((b) => b.filter((x) => x.id !== id));

    try {
      await deleteAdminBooking(id);
    } catch {
      setBookings(prev);
      alert("Failed to delete booking");
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <BookingManager
        bookings={bookings}
        buses={buses}
        parents={parents}
        onAddBooking={handleAddBooking}
        onUpdateBooking={handleUpdateBooking}
        onDeleteBooking={handleDeleteBooking}
      />
    </DashboardLayout>
  );
}
"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, User, Bus, MapPin, Search, Calendar } from "lucide-react";

interface Booking {
  id: number;
  parentId: number;
  busId: number;
  pickup: string;
  dropoff: string;
  parentName?: string;
  busPlate?: string;
}

interface Parent {
  id: number;
  full_name: string;
}

interface BusData {
  id: number;
  plateNumber: string;
}

interface BookingManagerProps {
  bookings: Booking[];
  buses: BusData[];
  parents: Parent[];
  onAddBooking: (data: any) => void;
  onUpdateBooking: (id: number, data: any) => void;
  onDeleteBooking: (id: number) => void;
}

export default function BookingManager({
  bookings,
  buses,
  parents,
  onAddBooking,
  onUpdateBooking,
  onDeleteBooking,
}: BookingManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [form, setForm] = useState({
    parentId: "",
    busId: "",
    pickup: "",
    dropoff: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const parent = booking.parentName ?? "";
    const bus = booking.busPlate ?? "";
    const pickup = booking.pickup ?? "";
    const dropoff = booking.dropoff ?? "";
    const term = searchTerm.toLowerCase();

    return (
      parent.toLowerCase().includes(term) ||
      bus.toLowerCase().includes(term) ||
      pickup.toLowerCase().includes(term) ||
      dropoff.toLowerCase().includes(term)
    );
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const submitData = {
      parentId: Number(form.parentId),
      busId: Number(form.busId),
      pickup: form.pickup,
      dropoff: form.dropoff,
    };

    if (editing) {
      onUpdateBooking(editing.id, submitData);
    } else {
      onAddBooking(submitData);
    }

    setShowModal(false);
    setEditing(null);
    setForm({ parentId: "", busId: "", pickup: "", dropoff: "" });
  }

  function handleEdit(booking: Booking) {
    setEditing(booking);
    setForm({
      parentId: String(booking.parentId),
      busId: String(booking.busId),
      pickup: booking.pickup,
      dropoff: booking.dropoff,
    });
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setEditing(null);
    setForm({ parentId: "", busId: "", pickup: "", dropoff: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Booking
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Bus</th>
                <th>Pickup Point</th>
                <th>Dropoff Point</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {booking.parentName || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bus className="w-4 h-4 text-gray-400" />
                      {booking.busPlate || "Unassigned"}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-green-500" />
                      {booking.pickup}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {booking.dropoff}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                        title="Edit booking"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this booking?")) {
                            onDeleteBooking(booking.id);
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editing ? "Edit Booking" : "Add New Booking"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent
                  </label>
                  <select
                    value={form.parentId}
                    onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select parent</option>
                    {parents.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus
                  </label>
                  <select
                    value={form.busId}
                    onChange={(e) => setForm({ ...form, busId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select bus</option>
                    {buses.map((bus) => (
                      <option key={bus.id} value={bus.id}>
                        {bus.plateNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Point
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., School Main Gate"
                    value={form.pickup}
                    onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dropoff Point
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Downtown Terminal"
                    value={form.dropoff}
                    onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  {editing ? "Update Booking" : "Add Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
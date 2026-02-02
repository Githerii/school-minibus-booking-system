"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Bus, User, MapPin, Users, Search } from "lucide-react";

interface BusData {
  id: number;
  plateNumber: string;
  capacity: number;
  routeId: number;
  driverId: number;
  routeName?: string;
  driverName?: string;
}

interface Route {
  id: number;
  name: string;
}

interface Driver {
  id: number;
  name: string;
}

interface BusManagerProps {
  buses: BusData[];
  routes: Route[];
  drivers: Driver[];
  onAddBus: (data: any) => void;
  onUpdateBus: (id: number, data: any) => void;
  onDeleteBus: (id: number) => void;
}

export default function BusManager({
  buses,
  routes,
  drivers,
  onAddBus,
  onUpdateBus,
  onDeleteBus,
}: BusManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BusData | null>(null);
  const [form, setForm] = useState({
    plateNumber: "",
    capacity: 0,
    routeId: "",
    driverId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuses = buses.filter((bus) => {
    const plate = bus.plateNumber ?? "";
    const route = bus.routeName ?? "";
    const driver = bus.driverName ?? "";
    const term = searchTerm.toLowerCase();

    return (
      plate.toLowerCase().includes(term) ||
      route.toLowerCase().includes(term) ||
      driver.toLowerCase().includes(term)
    );
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const submitData = {
      plateNumber: form.plateNumber,
      capacity: Number(form.capacity),
      routeId: Number(form.routeId),
      driverId: Number(form.driverId),
    };

    if (editing) {
      onUpdateBus(editing.id, submitData);
    } else {
      onAddBus(submitData);
    }

    setShowModal(false);
    setEditing(null);
    setForm({ plateNumber: "", capacity: 0, routeId: "", driverId: "" });
  }

  function handleEdit(bus: BusData) {
    setEditing(bus);
    setForm({
      plateNumber: bus.plateNumber,
      capacity: bus.capacity,
      routeId: String(bus.routeId),
      driverId: String(bus.driverId),
    });
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setEditing(null);
    setForm({ plateNumber: "", capacity: 0, routeId: "", driverId: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bus Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Bus
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Buses Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Plate Number</th>
                <th>Route</th>
                <th>Driver</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus) => (
                <tr key={bus.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Bus className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{bus.plateNumber}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {bus.routeName || "Unassigned"}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      {bus.driverName || "Unassigned"}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="badge badge-info">{bus.capacity} seats</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(bus)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                        title="Edit bus"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete bus ${bus.plateNumber}?`)) {
                            onDeleteBus(bus.id);
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete bus"
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
                {editing ? "Edit Bus" : "Add New Bus"}
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
                    Plate Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ABC-1234"
                    value={form.plateNumber}
                    onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity (Seats)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 40"
                    min="1"
                    value={form.capacity || ""}
                    onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Route
                  </label>
                  <select
                    value={form.routeId}
                    onChange={(e) => setForm({ ...form, routeId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select route</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver
                  </label>
                  <select
                    value={form.driverId}
                    onChange={(e) => setForm({ ...form, driverId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select driver</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
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
                  {editing ? "Update Bus" : "Add Bus"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
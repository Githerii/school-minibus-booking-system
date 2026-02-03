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
    <div className="dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Bus Management</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your fleet of buses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Bus
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-black shadow-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Buses Table */}
      <div className="bg-white dark:bg-black rounded-2xl border border-gray-200/60 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-black border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Plate Number</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                        <Bus className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{bus.plateNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {bus.routeName || "Unassigned"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {bus.driverName || "Unassigned"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        {bus.capacity} seats
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(bus)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-900 rounded-xl transition-all duration-200"
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
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-900 rounded-xl transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editing ? "Edit Bus" : "Add New Bus"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-200 rounded-xl transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ABC-1234"
                    value={form.plateNumber}
                    onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Capacity (Seats)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 40"
                    min="1"
                    value={form.capacity || ""}
                    onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Route
                  </label>
                  <select
                    value={form.routeId}
                    onChange={(e) => setForm({ ...form, routeId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Driver
                  </label>
                  <select
                    value={form.driverId}
                    onChange={(e) => setForm({ ...form, driverId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                  {editing ? "Update Bus" : "Add Bus"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

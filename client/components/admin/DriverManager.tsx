"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, User, Mail, Search } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  email: string;
}

interface DriverManagerProps {
  drivers: Driver[];
  onAddDriver: (data: { name: string; email: string }) => void;
  onUpdateDriver: (id: number, data: { name: string; email: string }) => void;
  onDeleteDriver: (id: number) => void;
}

export default function DriverManager({
  drivers,
  onAddDriver,
  onUpdateDriver,
  onDeleteDriver,
}: DriverManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = drivers.filter((driver) => {
    const name = driver.name ?? "";
    const email = driver.email ?? "";
    const term = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term)
    );
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (editing) {
      onUpdateDriver(editing.id, form);
    } else {
      onAddDriver(form);
    }

    setShowModal(false);
    setEditing(null);
    setForm({ name: "", email: "" });
  }

  function handleEdit(driver: Driver) {
    setEditing(driver);
    setForm({ name: driver.name, email: driver.email });
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setEditing(null);
    setForm({ name: "", email: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Driver Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Driver
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search drivers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Drivers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-900">{driver.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {driver.email}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(driver)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                        title="Edit driver"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete driver ${driver.name}?`)) {
                            onDeleteDriver(driver.id);
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete driver"
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
                {editing ? "Edit Driver" : "Add New Driver"}
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
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter driver name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="driver@example.com"
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
                  {editing ? "Update Driver" : "Add Driver"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
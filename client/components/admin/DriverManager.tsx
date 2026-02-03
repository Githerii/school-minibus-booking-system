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
    <div className="dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Driver
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search drivers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Driver Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{driver.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {driver.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(driver)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
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
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editing ? "Edit Driver" : "Add New Driver"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter driver name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="driver@example.com"
                    required
                  />
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

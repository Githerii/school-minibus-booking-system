'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MapPin, X } from 'lucide-react'

interface Route {
  id: number
  name: string
  startLocation: string
  endLocation: string
  status: 'active' | 'inactive'
  busCount: number
}

export default function RouteManager() {
  const [routes, setRoutes] = useState<Route[]>([
    { id: 1, name: 'Route A - Downtown', startLocation: 'Central Station', endLocation: 'School', status: 'active', busCount: 3 },
    { id: 2, name: 'Route B - Suburbs', startLocation: 'Westside Mall', endLocation: 'School', status: 'active', busCount: 2 },
    { id: 3, name: 'Route C - Eastside', startLocation: 'East Park', endLocation: 'School', status: 'active', busCount: 4 },
    { id: 4, name: 'Route D - North', startLocation: 'Northgate', endLocation: 'School', status: 'inactive', busCount: 0 },
    { id: 5, name: 'Route E - South', startLocation: 'Southville', endLocation: 'School', status: 'active', busCount: 2 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    status: 'active' as const,
  })

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.endLocation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingRoute) {
      setRoutes(routes.map(r =>
        r.id === editingRoute.id
          ? { ...r, ...formData }
          : r
      ))
    } else {
      const newRoute: Route = {
        id: Math.max(...routes.map(r => r.id)) + 1,
        ...formData,
        busCount: 0,
      }
      setRoutes([...routes, newRoute])
    }
    setShowModal(false)
    setEditingRoute(null)
    setFormData({ name: '', startLocation: '', endLocation: '', status: 'active' })
  }

  const handleEdit = (route: Route) => {
    setEditingRoute(route)
    setFormData({
      name: route.name,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      status: route.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(r => r.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Route
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Routes Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Start Location</th>
                <th>End Location</th>
                <th>Buses Assigned</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-900">{route.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-600">{route.startLocation}</td>
                  <td className="text-gray-600">{route.endLocation}</td>
                  <td>
                    <span className="badge badge-info">{route.busCount} buses</span>
                  </td>
                  <td>
                    <span className={`badge ${route.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {route.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(route)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(route.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
                {editingRoute ? 'Edit Route' : 'Add New Route'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingRoute(null)
                  setFormData({ name: '', startLocation: '', endLocation: '', status: 'active' })
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Route Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Location
                  </label>
                  <input
                    type="text"
                    value={formData.startLocation}
                    onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Location
                  </label>
                  <input
                    type="text"
                    value={formData.endLocation}
                    onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingRoute(null)
                    setFormData({ name: '', startLocation: '', endLocation: '', status: 'active' })
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  {editingRoute ? 'Update Route' : 'Add Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


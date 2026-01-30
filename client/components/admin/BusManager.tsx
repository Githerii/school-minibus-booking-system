'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Bus, MapPin, Users, X } from 'lucide-react'

interface Bus {
  id: number
  plateNumber: string
  capacity: number
  route?: string
  driver?: string
  status: 'active' | 'maintenance' | 'inactive'
  gpsCoordinates?: string
}

export default function BusManager() {
  const [buses, setBuses] = useState<Bus[]>([
    { id: 1, plateNumber: 'BUS-001', capacity: 30, route: 'Route A - Downtown', driver: 'Robert Wilson', status: 'active', gpsCoordinates: '40.7128° N, 74.0060° W' },
    { id: 2, plateNumber: 'BUS-002', capacity: 30, route: 'Route B - Suburbs', driver: 'James Taylor', status: 'active', gpsCoordinates: '40.7200° N, 74.0100° W' },
    { id: 3, plateNumber: 'BUS-003', capacity: 25, status: 'maintenance' },
    { id: 4, plateNumber: 'BUS-004', capacity: 30, route: 'Route C - Eastside', driver: 'Michael Brown', status: 'active', gpsCoordinates: '40.7300° N, 73.9950° W' },
    { id: 5, plateNumber: 'BUS-005', capacity: 35, route: 'Route E - South', driver: 'William Davis', status: 'active', gpsCoordinates: '40.7000° N, 74.0200° W' },
    { id: 6, plateNumber: 'BUS-006', capacity: 30, status: 'inactive' },
    { id: 7, plateNumber: 'BUS-007', capacity: 25, status: 'maintenance' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingBus, setEditingBus] = useState<Bus | null>(null)
  const [formData, setFormData] = useState({
    plateNumber: '',
    capacity: 30,
    status: 'active' as const,
  })

  const filteredBuses = buses.filter(bus =>
    bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bus.route && bus.route.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (bus.driver && bus.driver.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBus) {
      setBuses(buses.map(b =>
        b.id === editingBus.id
          ? { ...b, ...formData }
          : b
      ))
    } else {
      const newBus: Bus = {
        id: Math.max(...buses.map(b => b.id)) + 1,
        ...formData,
      }
      setBuses([...buses, newBus])
    }
    setShowModal(false)
    setEditingBus(null)
    setFormData({ plateNumber: '', capacity: 30, status: 'active' })
  }

  const handleEdit = (bus: Bus) => {
    setEditingBus(bus)
    setFormData({
      plateNumber: bus.plateNumber,
      capacity: bus.capacity,
      status: bus.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(b => b.id !== id))
    }
  }

  const getStatusBadge = (status: Bus['status']) => {
    const classes = {
      active: 'badge-success',
      maintenance: 'badge-warning',
      inactive: 'badge-info',
    }
    const labels = {
      active: 'Active',
      maintenance: 'Maintenance',
      inactive: 'Inactive',
    }
    return <span className={`badge ${classes[status]}`}>{labels[status]}</span>
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

      {/* Buses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => (
          <div key={bus.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Bus className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{bus.plateNumber}</h3>
                  <p className="text-sm text-gray-500">Capacity: {bus.capacity} seats</p>
                </div>
              </div>
              {getStatusBadge(bus.status)}
            </div>

            <div className="space-y-3 mb-4">
              {bus.route && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{bus.route}</span>
                </div>
              )}
              {bus.driver && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  {bus.driver}
                </div>
              )}
              {bus.gpsCoordinates && (
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">GPS Location</p>
                  <p className="text-xs font-mono text-gray-700">{bus.gpsCoordinates}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(bus)}
                className="btn btn-secondary flex-1 text-sm py-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bus.id)}
                className="btn btn-danger flex-1 text-sm py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBus ? 'Edit Bus' : 'Add New Bus'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingBus(null)
                  setFormData({ plateNumber: '', capacity: 30, status: 'active' })
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
                    Plate Number
                  </label>
                  <input
                    type="text"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    className="w-full"
                    placeholder="e.g., BUS-001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity (seats)
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Bus['status'] })}
                    className="w-full"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingBus(null)
                    setFormData({ plateNumber: '', capacity: 30, status: 'active' })
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  {editingBus ? 'Update Bus' : 'Add Bus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


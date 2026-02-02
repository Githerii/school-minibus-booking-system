'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Phone, Mail, X } from 'lucide-react'

interface Driver {
  id: number
  name: string
  email: string
  phone: string
  licenseNumber: string
  status: 'active' | 'inactive' | 'on_trip'
  assignedBus?: string
}

export default function DriverManager() {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: 'Robert Wilson', email: 'robert@schooltrans.com', phone: '+1 234-567-8901', licenseNumber: 'DL-123456', status: 'active', assignedBus: 'BUS-001' },
    { id: 2, name: 'James Taylor', email: 'james@schooltrans.com', phone: '+1 234-567-8902', licenseNumber: 'DL-123457', status: 'on_trip', assignedBus: 'BUS-002' },
    { id: 3, name: 'Michael Brown', email: 'michael@schooltrans.com', phone: '+1 234-567-8903', licenseNumber: 'DL-123458', status: 'active', assignedBus: 'BUS-004' },
    { id: 4, name: 'David Lee', email: 'david@schooltrans.com', phone: '+1 234-567-8904', licenseNumber: 'DL-123459', status: 'inactive' },
    { id: 5, name: 'William Davis', email: 'william@schooltrans.com', phone: '+1 234-567-8905', licenseNumber: 'DL-123460', status: 'active', assignedBus: 'BUS-005' },
    { id: 6, name: 'Richard Johnson', email: 'richard@schooltrans.com', phone: '+1 234-567-8906', licenseNumber: 'DL-123461', status: 'inactive' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    status: 'active' as const,
  })

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingDriver) {
      setDrivers(drivers.map(d =>
        d.id === editingDriver.id
          ? { ...d, ...formData }
          : d
      ))
    } else {
      const newDriver: Driver = {
        id: Math.max(...drivers.map(d => d.id)) + 1,
        ...formData,
      }
      setDrivers([...drivers, newDriver])
    }
    setShowModal(false)
    setEditingDriver(null)
    setFormData({ name: '', email: '', phone: '', licenseNumber: '', status: 'active' })
  }

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver)
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      status: driver.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(d => d.id !== id))
    }
  }

  const getStatusBadge = (status: Driver['status']) => {
    const classes = {
      active: 'badge-success',
      inactive: 'badge-warning',
      on_trip: 'badge-info',
    }
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      on_trip: 'On Trip',
    }
    return <span className={`badge ${classes[status]}`}>{labels[status]}</span>
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
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary-600">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-500">{driver.licenseNumber}</p>
                </div>
              </div>
              {getStatusBadge(driver.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {driver.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {driver.phone}
              </div>
            </div>

            {driver.assignedBus && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Currently Assigned</p>
                <p className="text-sm font-medium text-gray-900">{driver.assignedBus}</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(driver)}
                className="btn btn-secondary flex-1 text-sm py-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(driver.id)}
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
                {editingDriver ? 'Edit Driver' : 'Add New Driver'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingDriver(null)
                  setFormData({ name: '', email: '', phone: '', licenseNumber: '', status: 'active' })
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
                    Full Name
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Driver['status'] })}
                    className="w-full"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_trip">On Trip</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingDriver(null)
                    setFormData({ name: '', email: '', phone: '', licenseNumber: '', status: 'active' })
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  {editingDriver ? 'Update Driver' : 'Add Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


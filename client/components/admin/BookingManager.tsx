'use client'

import { useState } from 'react'
import { Search, CalendarCheck, MapPin, User, Bus, Check, X, Eye } from 'lucide-react'

interface Booking {
  id: number
  parentName: string
  parentEmail: string
  childName: string
  route: string
  bus: string
  pickupPoint: string
  dropOffPoint: string
  bookingDate: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export default function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, parentName: 'John Doe', parentEmail: 'john@example.com', childName: 'Johnny Doe', route: 'Route A - Downtown', bus: 'BUS-001', pickupPoint: 'Central Station', dropOffPoint: 'School', bookingDate: '2024-01-15', status: 'confirmed', createdAt: '2 min ago' },
    { id: 2, parentName: 'Sarah Smith', parentEmail: 'sarah@example.com', childName: ' Sammy Smith', route: 'Route B - Suburbs', bus: 'BUS-002', pickupPoint: 'Westside Mall', dropOffPoint: 'School', bookingDate: '2024-01-15', status: 'pending', createdAt: '5 min ago' },
    { id: 3, parentName: 'Mike Johnson', parentEmail: 'mike@example.com', childName: 'Michael Jr.', route: 'Route A - Downtown', bus: 'BUS-001', pickupPoint: 'City Center', dropOffPoint: 'School', bookingDate: '2024-01-15', status: 'confirmed', createdAt: '10 min ago' },
    { id: 4, parentName: 'Emily Brown', parentEmail: 'emily@example.com', childName: 'Emma Brown', route: 'Route C - Eastside', bus: 'BUS-004', pickupPoint: 'East Park', dropOffPoint: 'School', bookingDate: '2024-01-15', status: 'cancelled', createdAt: '15 min ago' },
    { id: 5, parentName: 'David Wilson', parentEmail: 'david@example.com', childName: 'Daniel Wilson', route: 'Route B - Suburbs', bus: 'BUS-002', pickupPoint: 'Northgate', dropOffPoint: 'School', bookingDate: '2024-01-16', status: 'pending', createdAt: '1 hour ago' },
    { id: 6, parentName: 'Lisa Anderson', parentEmail: 'lisa@example.com', childName: 'Lucas Anderson', route: 'Route E - South', bus: 'BUS-005', pickupPoint: 'Southville', dropOffPoint: 'School', bookingDate: '2024-01-16', status: 'confirmed', createdAt: '2 hours ago' },
    { id: 7, parentName: 'James Taylor', parentEmail: 'james@example.com', childName: 'James Jr.', route: 'Route A - Downtown', bus: 'BUS-001', pickupPoint: 'Main Street', dropOffPoint: 'School', bookingDate: '2024-01-14', status: 'completed', createdAt: '1 day ago' },
    { id: 8, parentName: 'Jennifer Martinez', parentEmail: 'jennifer@example.com', childName: 'Jorge Martinez', route: 'Route C - Eastside', bus: 'BUS-004', pickupPoint: 'East Avenue', dropOffPoint: 'School', bookingDate: '2024-01-15', status: 'pending', createdAt: '30 min ago' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: number) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status: 'confirmed' } : b
    ))
  }

  const handleCancel = (id: number) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    ))
  }

  const getStatusBadge = (status: Booking['status']) => {
    const classes = {
      pending: 'badge-warning',
      confirmed: 'badge-success',
      cancelled: 'badge-danger',
      completed: 'badge-info',
    }
    const labels = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      completed: 'Completed',
    }
    return <span className={`badge ${classes[status]}`}>{labels[status]}</span>
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Management</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Parent / Child</th>
                <th>Route / Bus</th>
                <th>Pickup / Drop-off</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-medium text-gray-900">#{booking.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.parentName}</p>
                        <p className="text-xs text-gray-500">{booking.childName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm text-gray-900">{booking.route}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Bus className="w-3 h-3" />
                        {booking.bus}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.pickupPoint}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.dropOffPoint}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm text-gray-600">{booking.bookingDate}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <CalendarCheck className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                  <p className="text-sm text-gray-500">#{selectedBooking.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Status</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Parent Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.parentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.parentEmail}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Child Name</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBooking.childName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Route</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.route}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Bus</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.bus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Pickup Point</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.pickupPoint}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Drop-off Point</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.dropOffPoint}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Booking Date</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Created</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBooking.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-gray-100">
              {selectedBooking.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedBooking.id)
                      setSelectedBooking(null)
                    }}
                    className="btn btn-primary flex-1"
                  >
                    Approve Booking
                  </button>
                  <button
                    onClick={() => {
                      handleCancel(selectedBooking.id)
                      setSelectedBooking(null)
                    }}
                    className="btn btn-danger flex-1"
                  >
                    Cancel Booking
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn btn-secondary flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


'use client'

import { Users, Bus, MapPin, CalendarCheck, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-100 text-green-600',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-100 text-purple-600',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-100 text-orange-600',
    border: 'border-orange-200',
  },
}

function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, color }: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === 'positive' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {changeType === 'negative' && <TrendingDown className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {change}
              </span>
              <span className="text-sm text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: CalendarCheck,
      color: 'blue' as const,
    },
    {
      title: 'Active Buses',
      value: '45',
      change: '+3',
      changeType: 'positive' as const,
      icon: Bus,
      color: 'green' as const,
    },
    {
      title: 'Registered Parents',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'purple' as const,
    },
    {
      title: 'Active Routes',
      value: '28',
      change: '+2',
      changeType: 'positive' as const,
      icon: MapPin,
      color: 'orange' as const,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { parent: 'John Doe', route: 'Route A - Downtown', time: '2 min ago', status: 'confirmed' },
                { parent: 'Sarah Smith', route: 'Route B - Suburbs', time: '5 min ago', status: 'pending' },
                { parent: 'Mike Johnson', route: 'Route A - Downtown', time: '10 min ago', status: 'confirmed' },
                { parent: 'Emily Brown', route: 'Route C - Eastside', time: '15 min ago', status: 'cancelled' },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.parent}</p>
                      <p className="text-xs text-gray-500">{booking.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${
                      booking.status === 'confirmed' ? 'badge-success' :
                      booking.status === 'pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bus Status Overview */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Bus Fleet Status</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { bus: 'BUS-001', driver: 'Robert Wilson', status: 'active', location: 'Route A' },
                { bus: 'BUS-002', driver: 'James Taylor', status: 'active', location: 'Route B' },
                { bus: 'BUS-003', driver: 'Michael Brown', status: 'maintenance', location: 'Garage' },
                { bus: 'BUS-004', driver: 'David Lee', status: 'active', location: 'Route C' },
                { bus: 'BUS-005', driver: 'William Davis', status: 'inactive', location: 'Garage' },
              ].map((bus, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      bus.status === 'active' ? 'bg-green-100' :
                      bus.status === 'maintenance' ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <Bus className={`w-5 h-5 ${
                        bus.status === 'active' ? 'text-green-600' :
                        bus.status === 'maintenance' ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bus.bus}</p>
                      <p className="text-xs text-gray-500">{bus.driver}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${
                      bus.status === 'active' ? 'badge-success' :
                      bus.status === 'maintenance' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {bus.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{bus.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


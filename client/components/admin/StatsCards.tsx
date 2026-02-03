'use client'

import { Users, Bus, MapPin, CalendarCheck, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'purple' | 'orange'
  description?: string
}

const colorClasses = {
  blue: {
    bg: 'from-blue-50 to-blue-100/50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconRing: 'ring-blue-100',
    accent: 'text-blue-600',
    border: 'border-blue-200/50',
  },
  green: {
    bg: 'from-emerald-50 to-emerald-100/50',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    iconRing: 'ring-emerald-100',
    accent: 'text-emerald-600',
    border: 'border-emerald-200/50',
  },
  purple: {
    bg: 'from-purple-50 to-purple-100/50',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconRing: 'ring-purple-100',
    accent: 'text-purple-600',
    border: 'border-purple-200/50',
  },
  orange: {
    bg: 'from-orange-50 to-orange-100/50',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    iconRing: 'ring-orange-100',
    accent: 'text-orange-600',
    border: 'border-orange-200/50',
  },
}

function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, color, description }: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm hover:shadow-xl hover:border-gray-300/60 transition-all duration-300 overflow-hidden">
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            {description && (
              <p className="text-xs text-gray-400">{description}</p>
            )}
          </div>
          <div className={`${colors.iconBg} p-3 rounded-xl shadow-lg ring-4 ${colors.iconRing} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-4xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                changeType === 'positive' ? 'bg-green-100' : 
                changeType === 'negative' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                {changeType === 'positive' && <TrendingUp className="w-3.5 h-3.5 text-green-600" />}
                {changeType === 'negative' && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                <span className={`text-xs font-semibold ${
                  changeType === 'positive' ? 'text-green-700' : 
                  changeType === 'negative' ? 'text-red-700' : 'text-gray-600'
                }`}>
                  {change}
                </span>
              </div>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Buses',
      value: '45',
      change: '+3',
      changeType: 'positive' as const,
      icon: Bus,
      color: 'blue' as const,
      description: 'Active fleet vehicles',
    },
    {
      title: 'Active Drivers',
      value: '38',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users,
      color: 'green' as const,
      description: 'Licensed professionals',
    },
    {
      title: 'Active Routes',
      value: '28',
      change: '+2',
      changeType: 'positive' as const,
      icon: MapPin,
      color: 'purple' as const,
      description: 'Coverage areas',
    },
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: CalendarCheck,
      color: 'orange' as const,
      description: 'This month',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-blue-100">Monitor and manage your school transport system</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <p className="text-sm text-blue-100 mb-1">Today's Date</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {[
                { parent: 'John Doe', route: 'Route A - Downtown', time: '2 min ago', status: 'confirmed' },
                { parent: 'Sarah Smith', route: 'Route B - Suburbs', time: '5 min ago', status: 'pending' },
                { parent: 'Mike Johnson', route: 'Route A - Downtown', time: '10 min ago', status: 'confirmed' },
                { parent: 'Emily Brown', route: 'Route C - Eastside', time: '15 min ago', status: 'cancelled' },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-blue-50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{booking.parent}</p>
                      <p className="text-xs text-gray-500">{booking.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
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

        {/* Bus Fleet Status */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bus Fleet Status</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {[
                { bus: 'BUS-001', driver: 'Robert Wilson', status: 'active', location: 'Route A' },
                { bus: 'BUS-002', driver: 'James Taylor', status: 'active', location: 'Route B' },
                { bus: 'BUS-003', driver: 'Michael Brown', status: 'maintenance', location: 'Garage' },
                { bus: 'BUS-004', driver: 'David Lee', status: 'active', location: 'Route C' },
              ].map((bus, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-blue-50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      bus.status === 'active' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      bus.status === 'maintenance' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{bus.bus}</p>
                      <p className="text-xs text-gray-500">{bus.driver}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      bus.status === 'active' ? 'bg-green-100 text-green-700' :
                      bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
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

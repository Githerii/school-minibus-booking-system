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

interface StatsCardsProps {
  stats: {
    buses: number
    drivers: number
    routes: number
    bookings: number
  }
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

export default function StatsCards({ stats }: StatsCardsProps) {
  const statsData = [
    {
      title: 'Total Buses',
      value: stats.buses,
      icon: Bus,
      color: 'blue' as const,
      description: 'Active fleet vehicles',
    },
    {
      title: 'Active Drivers',
      value: stats.drivers,
      icon: Users,
      color: 'green' as const,
      description: 'Licensed professionals',
    },
    {
      title: 'Active Routes',
      value: stats.routes,
      icon: MapPin,
      color: 'purple' as const,
      description: 'Coverage areas',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings,
      icon: CalendarCheck,
      color: 'orange' as const,
      description: 'All time',
    },
  ]

  return (
    <div className="space-y-8">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}

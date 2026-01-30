'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import StatsCards from '@/components/admin/StatsCards'
import RouteManager from '@/components/admin/RouteManager'
import DriverManager from '@/components/admin/DriverManager'
import BusManager from '@/components/admin/BusManager'
import BookingManager from '@/components/admin/BookingManager'

type TabType = 'overview' | 'routes' | 'drivers' | 'buses' | 'bookings'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StatsCards />
      case 'routes':
        return <RouteManager />
      case 'drivers':
        return <DriverManager />
      case 'buses':
        return <BusManager />
      case 'bookings':
        return <BookingManager />
      default:
        return <StatsCards />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}


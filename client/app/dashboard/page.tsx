import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "@/components/dashboard/summary"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PickupStatus } from "@/components/dashboard/pickup-status"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight dark:text-gray-100">
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span> 
            {" "}Welcome back,{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Super Parent!
            </span>
          </h1>
          <p className="text-lg font-medium bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mt-1 dark:text-gray-300">
            🚍 Here&apos;s your children&apos;s transport schedule at a glance!
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600">
          <Link href="/dashboard/book">
            <Plus className="mr-2 size-4" />
            Book A Ride
          </Link>
        </Button>
      </div>

      <SummaryCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>
        <div>
          <PickupStatus />
        </div>
      </div>
    </div>
  )
}

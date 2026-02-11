import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "@/components/dashboard/summary"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PickupStatus } from "@/components/dashboard/pickup-status"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-600 text-white p-6 rounded-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            {" "}Welcome back,{" "}
            <span>
              Super Parent!
            </span>
          </h1>
          <p className="text-lg font-medium mt-1">
            🚍 Here&apos;s your children&apos;s transport schedule at a glance!
          </p>
        </div>
        <Button asChild className="bg-black text-grey hover:bg-gray-100">
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

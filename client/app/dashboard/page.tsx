import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "@/components/dashboard/summary"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PickupStatus } from "@/components/dashboard/pickup-status"

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-1 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Welcome back!
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Here&apos;s an overview of your children&apos;s transport schedule.
          </p>
        </div>

        {/* CTA */}
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/book">
            <Plus className="mr-2 size-4" />
            Book a Ride
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

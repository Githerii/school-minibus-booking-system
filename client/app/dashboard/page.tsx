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
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your children&apos;s transport schedule.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/book">
            <Plus className="mr-2 size-4" />
            Book New Route
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

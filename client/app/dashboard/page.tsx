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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-wave origin-[70%_70%]">👋</span>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-violet to-primary bg-clip-text text-transparent">
              Hey there, Super Parent! 👨‍👩‍👧‍👦
            </h1>
          </div>
          <p className="text-muted-foreground hidden md:block text-sm font-medium">
            Ready for another awesome school day?
          </p>
        </div>
        <Button asChild>
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

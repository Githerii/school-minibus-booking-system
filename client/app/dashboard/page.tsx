import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "@/components/dashboard/summary"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PickupStatus } from "@/components/dashboard/pickup-status"

export default async function DashboardPage() {
  // ✅ Get the current user session
  const session = await getServerSession(authOptions)

  // 🚫 If no session, redirect to login
  if (!session) redirect("/login")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your children's transport schedule.
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
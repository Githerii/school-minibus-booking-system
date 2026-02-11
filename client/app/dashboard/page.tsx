"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/summary"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { PickupStatus } from "@/components/dashboard/pickup-status"

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((sess) => {
      if (!sess) {
        router.push("/login");
      } else {
        setSession(sess);
      }
    });
  }, [router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 text-white p-6 rounded-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your children's transport schedule.
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
  );
}
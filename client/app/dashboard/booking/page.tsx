"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Bus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchWithAuth } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Booking {
  booking_id: number;
  bus: string;
  route: string | null;
  pickup: string;
  dropoff: string;
  numSeats: number;
  selectedDays: string | null;
  bookingDate: string;
  status: string;
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "booked":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle2 className="mr-1 size-3" />
          Booked
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Clock className="mr-1 size-3" />
          Pending
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-muted text-muted-foreground hover:bg-muted">
          <CheckCircle2 className="mr-1 size-3" />
          Completed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <X className="mr-1 size-3" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function BookingsPage() {
  const router = useRouter();
  const { status } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetchWithAuth("/bookings");

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Failed to fetch bookings:", response.status, err);
      }
    } catch (error: any) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.route &&
        booking.route.toLowerCase().includes(searchQuery.toLowerCase())) ||
      booking.booking_id.toString().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getDaysCount = (selectedDays: string | null) => {
    if (!selectedDays) return 0;
    try {
      return JSON.parse(selectedDays).length;
    } catch {
      return 0;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage all your transport bookings
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading bookings...</p>
            </CardContent>
          </Card>
        ) : filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="size-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
              <p className="text-muted-foreground">
                {bookings.length === 0
                  ? "You haven't made any bookings yet"
                  : "Try adjusting your search or filters"}
              </p>
              {bookings.length === 0 && (
                <Button asChild className="mt-4">
                  <Link href="/dashboard/book">Book Your First Ride</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.booking_id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      Booking #{booking.booking_id}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Bus className="size-3" />
                      {booking.route || "Route not assigned"} - {booking.bus}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(booking.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/booking/${booking.booking_id}`}>
                            <Eye className="mr-2 size-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        {booking.status === "booked" && (
                          <DropdownMenuItem className="text-red-600">
                            <X className="mr-2 size-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 text-sm sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground" />
                    <span>{booking.numSeats || 1} seat(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <span>{getDaysCount(booking.selectedDays)} day(s) scheduled</span>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 border-t pt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-600" />
                    <span className="text-xs">
                      Pickup: <span className="font-medium">{booking.pickup}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-red-600" />
                    <span className="text-xs">
                      Dropoff: <span className="font-medium">{booking.dropoff}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

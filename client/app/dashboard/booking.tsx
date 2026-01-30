"use client"

import { useState } from "react"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const bookings = [
  {
    id: "BK001",
    childName: "Emma Johnson",
    route: "Greenwood Elementary - Route A",
    date: "2026-01-27",
    pickupTime: "7:30 AM",
    dropoffTime: "3:45 PM",
    status: "active",
    pickupLocation: "123 Oak Street",
  },
  {
    id: "BK002",
    childName: "Liam Johnson",
    route: "Greenwood Elementary - Route A",
    date: "2026-01-27",
    pickupTime: "7:30 AM",
    dropoffTime: "3:45 PM",
    status: "active",
    pickupLocation: "123 Oak Street",
  },
  {
    id: "BK003",
    childName: "Emma Johnson",
    route: "After School Program - Route C",
    date: "2026-01-28",
    pickupTime: "3:45 PM",
    dropoffTime: "5:00 PM",
    status: "pending",
    pickupLocation: "Greenwood Elementary",
  },
  {
    id: "BK004",
    childName: "Liam Johnson",
    route: "Weekend Sports - Route D",
    date: "2026-01-25",
    pickupTime: "9:00 AM",
    dropoffTime: "12:00 PM",
    status: "completed",
    pickupLocation: "123 Oak Street",
  },
  {
    id: "BK005",
    childName: "Emma Johnson",
    route: "Field Trip - Museum",
    date: "2026-01-20",
    pickupTime: "8:00 AM",
    dropoffTime: "2:30 PM",
    status: "cancelled",
    pickupLocation: "Greenwood Elementary",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle2 className="mr-1 size-3" />
          Active
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Clock className="mr-1 size-3" />
          Pending
        </Badge>
      )
    case "completed":
      return (
        <Badge className="bg-muted text-muted-foreground hover:bg-muted">
          <CheckCircle2 className="mr-1 size-3" />
          Completed
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <X className="mr-1 size-3" />
          Cancelled
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
                  <SelectItem value="active">Active</SelectItem>
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
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="size-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      {booking.childName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Bus className="size-3" />
                      {booking.route}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" />
                          View Details
                        </DropdownMenuItem>
                        {booking.status === "active" && (
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
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <span>
                      {booking.pickupTime} - {booking.dropoffTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-muted-foreground" />
                    <span className="truncate">{booking.pickupLocation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
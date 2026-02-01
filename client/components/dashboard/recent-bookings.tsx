import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled"

interface Booking {
  id: string
  childName: string
  route: string
  date: string
  time: string
  status: BookingStatus
}

const recentBookings: Booking[] = [
  {
    id: "BK001",
    childName: "Emma Doe",
    route: "Route A - Maple School",
    date: "Jan 27, 2026",
    time: "7:30 AM",
    status: "confirmed",
  },
  {
    id: "BK002",
    childName: "Noah Doe",
    route: "Route A - Maple School",
    date: "Jan 27, 2026",
    time: "7:30 AM",
    status: "confirmed",
  },
  {
    id: "BK003",
    childName: "Emma Doe",
    route: "Route B - Afternoon",
    date: "Jan 27, 2026",
    time: "3:30 PM",
    status: "pending",
  },
  {
    id: "BK004",
    childName: "Noah Doe",
    route: "Route B - Afternoon",
    date: "Jan 27, 2026",
    time: "3:30 PM",
    status: "pending",
  },
  {
    id: "BK005",
    childName: "Emma Doe",
    route: "Route A - Maple School",
    date: "Jan 26, 2026",
    time: "7:30 AM",
    status: "completed",
  },
]

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  completed: "bg-muted text-muted-foreground hover:bg-muted",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
}

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Child</TableHead>
              <TableHead className="hidden md:table-cell">Route</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.childName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {booking.route}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {booking.date}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {booking.time}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[booking.status]}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

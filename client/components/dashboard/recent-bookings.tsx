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
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"

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

const statusConfig: Record<BookingStatus, { 
  bg: string; 
  text: string; 
  border: string;
  icon: React.ElementType;
  label: string;
}> = {
  confirmed: { 
    bg: "bg-emerald-100", 
    text: "text-emerald-700",
    border: "border-emerald-300",
    icon: CheckCircle,
    label: "Confirmed"
  },
  pending: { 
    bg: "bg-amber-100", 
    text: "text-amber-700",
    border: "border-amber-300",
    icon: Clock,
    label: "Pending"
  },
  completed: { 
    bg: "bg-slate-100", 
    text: "text-slate-700",
    border: "border-slate-300",
    icon: CheckCircle,
    label: "Completed"
  },
  cancelled: { 
    bg: "bg-rose-100", 
    text: "text-rose-700",
    border: "border-rose-300",
    icon: XCircle,
    label: "Cancelled"
  },
}

export function RecentBookings() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-school-navy to-school-blue text-white">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="size-5" />
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold">Booking ID</TableHead>
              <TableHead className="font-semibold">Child</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Route</TableHead>
              <TableHead className="hidden sm:table-cell font-semibold">Date</TableHead>
              <TableHead className="hidden sm:table-cell font-semibold">Time</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((booking) => {
              const config = statusConfig[booking.status]
              const StatusIcon = config.icon
              
              return (
                <TableRow 
                  key={booking.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium school-navy">{booking.id}</TableCell>
                  <TableCell>
                    <span className="font-medium text-school-navy">{booking.childName}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-slate-600">
                    {booking.route}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-slate-600">
                    {booking.date}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-slate-600">
                    {booking.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${config.bg} ${config.text} ${config.border} border flex items-center gap-1 w-fit`}
                    >
                      <StatusIcon className="size-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

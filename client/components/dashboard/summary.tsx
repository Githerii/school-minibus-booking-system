import { CalendarCheck, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const summaryData = [
  {
    title: "Active Bookings",
    value: "3",
    description: "Currently scheduled",
    icon: CalendarCheck,
  },
  {
    title: "Pickup Status",
    value: "On Time",
    description: "Next pickup in 45 mins",
    icon: Clock,
  },
  {
    title: "Children Registered",
    value: "2",
    description: "Emma & Noah",
    icon: Users,
  },
  {
    title: "Active Routes",
    value: "2",
    description: "Morning & Afternoon",
    icon: MapPin,
  },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

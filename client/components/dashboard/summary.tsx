import { CalendarCheck, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const summaryData = [
  {
    title: "Active Bookings",
    value: "3",
    description: "Currently scheduled",
    icon: CalendarCheck,
    color: "school-coral",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    title: "Pickup Status",
    value: "On Time",
    description: "Next pickup in 45 mins",
    icon: Clock,
    color: "school-sky",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-200",
  },
  {
    title: "Children Registered",
    value: "2",
    description: "Emma & Noah",
    icon: Users,
    color: "school-violet",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  {
    title: "Active Routes",
    value: "2",
    description: "Morning & Afternoon",
    icon: MapPin,
    color: "school-teal",
    bgLight: "bg-teal-50",
    borderColor: "border-teal-200",
  },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card 
          key={item.title}
          className={`${item.bgLight} ${item.borderColor} border-l-4 hover:shadow-lg transition-all duration-300`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-medium ${item.color}`}>
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${item.bgLight}`}>
              <item.icon className={`size-5 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
            <p className={`text-xs text-muted-foreground mt-1`}>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

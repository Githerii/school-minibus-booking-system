import { Bus, CheckCircle2, Clock, MapPin, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PickupStep {
  label: string
  time: string
  completed: boolean
  current?: boolean
}

const pickupSteps: PickupStep[] = [
  { label: "Driver departed", time: "7:00 AM", completed: true },
  { label: "En route to pickup", time: "7:15 AM", completed: true },
  { label: "Arriving at stop", time: "7:25 AM", completed: false, current: true },
  { label: "Picked up", time: "7:30 AM", completed: false },
  { label: "Arrived at school", time: "7:45 AM", completed: false },
]

export function PickupStatus() {
  const completedSteps = pickupSteps.filter((step) => step.completed).length
  const progress = (completedSteps / pickupSteps.length) * 100

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-school-teal to-school-sky text-white">
        <CardTitle className="flex items-center gap-2">
          <Bus className="size-5" />
          Live Pickup Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-school-navy">Route Progress</span>
            <span className="font-bold text-school-teal">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-school-teal to-school-sky rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-4">
          {pickupSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                    step.completed
                      ? "bg-gradient-to-br from-school-teal to-school-sky text-white shadow-lg"
                      : step.current
                        ? "bg-white border-2 border-school-teal shadow-lg scale-110"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="size-5" />
                  ) : step.current ? (
                    <Navigation className="size-5 text-school-teal" />
                  ) : (
                    <Clock className="size-5" />
                  )}
                </div>
                {index < pickupSteps.length - 1 && (
                  <div
                    className={`h-10 w-1 transition-all duration-300 ${
                      step.completed ? "bg-gradient-to-b from-school-teal to-school-sky" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`text-sm font-medium transition-all duration-300 ${
                    step.current ? "text-school-teal font-bold" : "text-school-navy"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-slate-500">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Driver Info */}
        <div className="rounded-xl bg-gradient-to-br from-school-navy to-school-blue p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Bus className="size-4 text-school-sky" />
            <span className="font-semibold">Driver & Vehicle</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-sky-200 text-xs">Driver</span>
              <p className="font-medium">Michael Thompson</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-sky-200 text-xs">Vehicle</span>
              <p className="font-medium">Minibus #12</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-sky-200 text-xs">License</span>
              <p className="font-medium">ABC-1234</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-sky-200 text-xs">ETA</span>
              <p className="font-medium text-school-sky">5 minutes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

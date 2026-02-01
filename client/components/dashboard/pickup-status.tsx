import { Bus, CheckCircle2, Clock, MapPin } from "lucide-react"
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="size-5" />
          Live Pickup Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Route Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {pickupSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-8 items-center justify-center rounded-full ${
                    step.completed
                      ? "bg-primary text-primary-foreground"
                      : step.current
                        ? "border-2 border-primary bg-background"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="size-4" />
                  ) : step.current ? (
                    <MapPin className="size-4 text-primary" />
                  ) : (
                    <Clock className="size-4" />
                  )}
                </div>
                {index < pickupSteps.length - 1 && (
                  <div
                    className={`h-8 w-0.5 ${
                      step.completed ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`text-sm font-medium ${
                    step.current ? "text-primary" : ""
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Driver:</span>
            <span className="text-muted-foreground">Michael Thompson</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Vehicle:</span>
            <span className="text-muted-foreground">
              Minibus #12 (ABC-1234)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

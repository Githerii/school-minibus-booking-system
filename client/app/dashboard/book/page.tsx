"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Bus,
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface Route {
  route_id: number
  route_name: string
  pickup_spots?: string
  dropoff_spots?: string
}

interface RouteSpot {
  lat: number
  lng: number
  name: string
}

const steps = [
  { id: 1, name: "Number of Seats", icon: Users },
  { id: 2, name: "Choose Route", icon: MapPin },
  { id: 3, name: "Pickup & Dropoff", icon: MapPin },
  { id: 4, name: "Schedule", icon: Calendar },
  { id: 5, name: "Confirm", icon: CheckCircle2 },
]

export default function BookRidePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [numSeats, setNumSeats] = useState("1")
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [pickupSpots, setPickupSpots] = useState<RouteSpot[]>([])
  const [dropoffSpots, setDropoffSpots] = useState<RouteSpot[]>([])
  const [selectedPickup, setSelectedPickup] = useState("")
  const [selectedDropoff, setSelectedDropoff] = useState("")
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:5000/routes")
      if (response.ok) {
        const data = await response.json()
        setRoutes(data)
      }
    } catch (error) {
      console.error("Failed to fetch routes:", error)
    }
  }

  const handleRouteSelect = (routeId: string) => {
    const route = routes.find(r => r.route_id === parseInt(routeId))
    if (route) {
      setSelectedRoute(route)
      
      // Parse pickup and dropoff spots
      if (route.pickup_spots) {
        try {
          setPickupSpots(JSON.parse(route.pickup_spots))
        } catch (e) {
          setPickupSpots([])
        }
      }
      
      if (route.dropoff_spots) {
        try {
          setDropoffSpots(JSON.parse(route.dropoff_spots))
        } catch (e) {
          setDropoffSpots([])
        }
      }
    }
  }

  const handleDateToggle = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("access_token")
      
      // Find a bus assigned to this route
      const busesRes = await fetch("http://localhost:5000/buses")
      const buses = await busesRes.json()
      const routeBus = buses.find((b: any) => b.route_id === selectedRoute?.route_id)
      
      if (!routeBus) {
        alert("No bus assigned to this route. Please contact admin.")
        setIsSubmitting(false)
        return
      }

      const payload = {
        bus_id: routeBus.bus_id,
        pickup_point: selectedPickup,
        drop_off_point: selectedDropoff,
        num_seats: parseInt(numSeats),
        selected_days: JSON.stringify(selectedDates),
        booking_date: new Date().toISOString().split('T')[0],
      }

      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setIsComplete(true)
      } else {
        const error = await response.json()
        alert(error.error || "Failed to create booking")
      }
    } catch (error: any) {
      console.error("Booking error:", error)
      alert("Failed to create booking")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return parseInt(numSeats) > 0
      case 2:
        return selectedRoute !== null
      case 3:
        return selectedPickup !== "" && selectedDropoff !== ""
      case 4:
        return selectedDates.length > 0
      default:
        return true
    }
  }

  // Generate next 30 days for calendar
  const generateDates = () => {
    const dates = []
    for (let i = 1; i <= 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  if (isComplete) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="size-8 text-emerald-600" />
            </div>
            <CardTitle>Booking Confirmed</CardTitle>
            <CardDescription>
              Your transport booking has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-left text-sm">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats:</span>
                  <span className="font-medium">{numSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route:</span>
                  <span className="font-medium">{selectedRoute?.route_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup:</span>
                  <span className="font-medium">{selectedPickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dropoff:</span>
                  <span className="font-medium">{selectedDropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days:</span>
                  <span className="font-medium">{selectedDates.length} selected</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" asChild>
              <Link href="/dashboard/booking">View My Bookings</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="size-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Book a Ride</h1>
          <p className="text-muted-foreground">
            Schedule transport for your family
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  <step.icon className="size-5" />
                </div>
                <span
                  className={`mt-2 text-xs ${
                    currentStep >= step.id
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 flex-1 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-muted-foreground">
            {steps[currentStep - 1].name}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Select how many seats you need"}
            {currentStep === 2 && "Choose a route for pickup and drop-off"}
            {currentStep === 3 && "Select your pickup and dropoff locations"}
            {currentStep === 4 && "Choose the dates you need transport"}
            {currentStep === 5 && "Review and confirm your booking"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Number of Seats */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="numSeats">Number of Seats</Label>
                <Input
                  id="numSeats"
                  type="number"
                  min="1"
                  max="10"
                  value={numSeats}
                  onChange={(e) => setNumSeats(e.target.value)}
                  placeholder="Enter number of seats"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How many seats do you need to book?
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Choose Route */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {routes.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No routes available. Please contact admin.
                </div>
              ) : (
                <RadioGroup
                  value={selectedRoute?.route_id.toString()}
                  onValueChange={handleRouteSelect}
                  className="grid gap-4"
                >
                  {routes.map((route) => (
                    <Label
                      key={route.route_id}
                      htmlFor={route.route_id.toString()}
                      className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                        selectedRoute?.route_id === route.route_id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <RadioGroupItem value={route.route_id.toString()} id={route.route_id.toString()} />
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <Bus className="size-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{route.route_name}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="size-3" />
                          {route.pickup_spots ? `${JSON.parse(route.pickup_spots).length} pickup spots` : 'No pickup spots'}
                        </div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}

          {/* Step 3: Pickup & Dropoff */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <Select value={selectedPickup} onValueChange={setSelectedPickup}>
                  <SelectTrigger id="pickup">
                    <SelectValue placeholder="Select pickup spot" />
                  </SelectTrigger>
                  <SelectContent>
                    {pickupSpots.length === 0 ? (
                      <SelectItem value="none" disabled>No pickup spots available</SelectItem>
                    ) : (
                      pickupSpots.map((spot, idx) => (
                        <SelectItem key={idx} value={spot.name}>
                          {spot.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Select value={selectedDropoff} onValueChange={setSelectedDropoff}>
                  <SelectTrigger id="dropoff">
                    <SelectValue placeholder="Select dropoff spot" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropoffSpots.length === 0 ? (
                      <SelectItem value="none" disabled>No dropoff spots available</SelectItem>
                    ) : (
                      dropoffSpots.map((spot, idx) => (
                        <SelectItem key={idx} value={spot.name}>
                          {spot.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Schedule/Calendar */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <Label>Select Dates (Click to toggle)</Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-96 overflow-y-auto">
                {generateDates().map((date) => (
                  <Label
                    key={date}
                    htmlFor={date}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-colors ${
                      selectedDates.includes(date)
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      id={date}
                      checked={selectedDates.includes(date)}
                      onCheckedChange={() => handleDateToggle(date)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-xs font-medium">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-sm">
                        {new Date(date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedDates.length} date(s) selected
              </p>
            </div>
          )}

          {/* Step 5: Confirm */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-3 font-medium">Booking Summary</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="size-4" />
                      Seats
                    </span>
                    <span className="font-medium">{numSeats}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Bus className="size-4" />
                      Route
                    </span>
                    <span className="font-medium">{selectedRoute?.route_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Pickup
                    </span>
                    <span className="font-medium">{selectedPickup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Dropoff
                    </span>
                    <span className="font-medium">{selectedDropoff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      Selected Dates
                    </span>
                    <span className="font-medium">{selectedDates.length} days</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
            className="bg-transparent"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          {currentStep < 5 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bus,
  Calendar,
  MapPin,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  School,
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

const children = [
  { id: "CH001", name: "Emma Johnson", grade: "3rd Grade", school: "Greenwood Elementary" },
  { id: "CH002", name: "Liam Johnson", grade: "5th Grade", school: "Greenwood Elementary" },
]

const routes = [
  { id: "RT001", name: "Greenwood Elementary - Route A", time: "7:00 AM - 7:45 AM" },
  { id: "RT002", name: "Greenwood Elementary - Route B", time: "7:15 AM - 8:00 AM" },
  { id: "RT003", name: "Lincoln Middle School - Route A", time: "7:30 AM - 8:15 AM" },
]

const steps = [
  { id: 1, name: "Select Child", icon: User },
  { id: 2, name: "Choose Route", icon: MapPin },
  { id: 3, name: "Schedule", icon: Calendar },
  { id: 4, name: "Confirm", icon: CheckCircle2 },
]

export default function BookRidePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedChild, setSelectedChild] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("")
  const [bookingType, setBookingType] = useState("recurring")
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "tuesday", "wednesday", "thursday", "friday"])
  const [pickupAddress, setPickupAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 1500)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedChild !== ""
      case 2:
        return selectedRoute !== ""
      case 3:
        return pickupAddress !== "" && (bookingType === "one-time" || selectedDays.length > 0)
      default:
        return true
    }
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
                  <span className="text-muted-foreground">Child:</span>
                  <span className="font-medium">
                    {children.find((c) => c.id === selectedChild)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route:</span>
                  <span className="font-medium">
                    {routes.find((r) => r.id === selectedRoute)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium capitalize">{bookingType}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" asChild>
              <Link href="/dashboard/bookings">View My Bookings</Link>
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
            Schedule transport for your child
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

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Choose which child needs transport"}
            {currentStep === 2 && "Select a route for pickup and drop-off"}
            {currentStep === 3 && "Set your pickup location and schedule"}
            {currentStep === 4 && "Review and confirm your booking"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Child */}
          {currentStep === 1 && (
            <RadioGroup
              value={selectedChild}
              onValueChange={setSelectedChild}
              className="grid gap-4"
            >
              {children.map((child) => (
                <Label
                  key={child.id}
                  htmlFor={child.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                    selectedChild === child.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={child.id} id={child.id} />
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <User className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{child.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {child.grade} - {child.school}
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* Step 2: Choose Route */}
          {currentStep === 2 && (
            <RadioGroup
              value={selectedRoute}
              onValueChange={setSelectedRoute}
              className="grid gap-4"
            >
              {routes.map((route) => (
                <Label
                  key={route.id}
                  htmlFor={route.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                    selectedRoute === route.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={route.id} id={route.id} />
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Bus className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{route.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="size-3" />
                      {route.time}
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pickup-address">Pickup Address</Label>
                <Input
                  id="pickup-address"
                  placeholder="Enter your pickup address"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Booking Type</Label>
                <Select value={bookingType} onValueChange={setBookingType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recurring">Recurring (Weekly)</SelectItem>
                    <SelectItem value="one-time">One-time Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {bookingType === "recurring" && (
                <div className="space-y-2">
                  <Label>Select Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                      (day) => (
                        <Label
                          key={day}
                          htmlFor={day}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                            selectedDays.includes(day)
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <Checkbox
                            id={day}
                            checked={selectedDays.includes(day)}
                            onCheckedChange={() => handleDayToggle(day)}
                          />
                          <span className="capitalize">{day.slice(0, 3)}</span>
                        </Label>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-3 font-medium">Booking Summary</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <User className="size-4" />
                      Child
                    </span>
                    <span className="font-medium">
                      {children.find((c) => c.id === selectedChild)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <School className="size-4" />
                      School
                    </span>
                    <span className="font-medium">
                      {children.find((c) => c.id === selectedChild)?.school}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Bus className="size-4" />
                      Route
                    </span>
                    <span className="font-medium">
                      {routes.find((r) => r.id === selectedRoute)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Pickup
                    </span>
                    <span className="font-medium">{pickupAddress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      Schedule
                    </span>
                    <span className="font-medium capitalize">
                      {bookingType === "recurring"
                        ? selectedDays.map((d) => d.slice(0, 3)).join(", ")
                        : "One-time"}
                    </span>
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
          {currentStep < 4 ? (
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
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MapPin,
  Clock,
  Users,
  Search,
  ArrowRight,
  School,
  ZoomIn,
  ZoomOut,
  Locate,
  Layers,
  Bus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const routes = [
  {
    id: "RT001",
    name: "Route A - Morning Express",
    pickup: "Oak Street Station",
    school: "Greenwood Elementary School",
    time: "7:00 AM",
    capacity: 24,
    available: 6,
    status: "available",
    color: "#10b981",
  },
  {
    id: "RT002",
    name: "Route B - Maple District",
    pickup: "Maple Avenue Stop",
    school: "Greenwood Elementary School",
    time: "7:15 AM",
    capacity: 24,
    available: 2,
    status: "limited",
    color: "#f59e0b",
  },
  {
    id: "RT003",
    name: "Route C - Downtown Loop",
    pickup: "Central Bus Terminal",
    school: "Lincoln Middle School",
    time: "7:30 AM",
    capacity: 30,
    available: 10,
    status: "available",
    color: "#3b82f6",
  },
  {
    id: "RT004",
    name: "Route D - Highland Express",
    pickup: "Highland Park Station",
    school: "Lincoln Middle School",
    time: "7:45 AM",
    capacity: 18,
    available: 0,
    status: "full",
    color: "#ef4444",
  },
  {
    id: "RT005",
    name: "Route E - Riverside",
    pickup: "River District Hub",
    school: "Riverside Academy",
    time: "8:00 AM",
    capacity: 20,
    available: 8,
    status: "available",
    color: "#8b5cf6",
  },
]

function getStatusBadge(status: string, available: number) {
  switch (status) {
    case "available":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          {available} seats
        </Badge>
      )
    case "limited":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          {available} left
        </Badge>
      )
    case "full":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Full</Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function MapPlaceholder({
  selectedRoute,
  onRouteSelect,
}: {
  selectedRoute: string | null
  onRouteSelect: (id: string) => void
}) {
  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg border bg-secondary/30 lg:min-h-[500px]">
      {/* Map Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Roads */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main roads */}
        <path
          d="M0,200 Q100,180 200,200 T400,200"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-muted-foreground/20"
        />
        <path
          d="M200,0 Q180,100 200,200 T200,400"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-muted-foreground/20"
        />
        <path
          d="M50,50 Q150,100 200,200 T350,350"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-muted-foreground/15"
        />
        <path
          d="M350,50 Q250,100 200,200 T50,350"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-muted-foreground/15"
        />
      </svg>

      {/* Route Lines and Markers */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {routes.map((route, index) => {
          const startX = 60 + index * 50
          const startY = 80 + index * 40
          const endX = 280 + (index % 3) * 30
          const endY = 280 + (index % 2) * 40
          const isSelected = selectedRoute === route.id

          return (
            <g key={route.id}>
              {/* Route Path */}
              <path
                d={`M${startX},${startY} Q${(startX + endX) / 2},${startY + 50} ${endX},${endY}`}
                stroke={route.color}
                strokeWidth={isSelected ? 4 : 2}
                strokeDasharray={isSelected ? "none" : "8,4"}
                fill="none"
                opacity={isSelected ? 1 : 0.5}
                className="transition-all duration-300"
              />

              {/* Pickup Point */}
              <g
                className="cursor-pointer"
                onClick={() => onRouteSelect(route.id)}
              >
                <circle
                  cx={startX}
                  cy={startY}
                  r={isSelected ? 12 : 8}
                  fill={route.color}
                  opacity={isSelected ? 1 : 0.7}
                  className="transition-all duration-300"
                />
                <circle cx={startX} cy={startY} r={4} fill="white" />
              </g>

              {/* School Point */}
              <g
                className="cursor-pointer"
                onClick={() => onRouteSelect(route.id)}
              >
                <rect
                  x={endX - (isSelected ? 10 : 7)}
                  y={endY - (isSelected ? 10 : 7)}
                  width={isSelected ? 20 : 14}
                  height={isSelected ? 20 : 14}
                  rx={3}
                  fill={route.color}
                  opacity={isSelected ? 1 : 0.7}
                  className="transition-all duration-300"
                />
                <rect
                  x={endX - 3}
                  y={endY - 3}
                  width={6}
                  height={6}
                  rx={1}
                  fill="white"
                />
              </g>
            </g>
          )
        })}
      </svg>

      {/* Map Controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1">
        <Button
          size="icon"
          variant="secondary"
          className="size-8 bg-card shadow-sm"
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="size-8 bg-card shadow-sm"
        >
          <ZoomOut className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="size-8 bg-card shadow-sm"
        >
          <Locate className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="size-8 bg-card shadow-sm"
        >
          <Layers className="size-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 rounded-md bg-card/95 p-3 text-xs shadow-sm backdrop-blur-sm">
        <div className="mb-2 font-medium">Route Legend</div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Pickup Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-sm bg-emerald-500" />
            <span className="text-muted-foreground">School</span>
          </div>
        </div>
      </div>

      {/* Selected Route Info Overlay */}
      {selectedRoute && (
        <div className="absolute left-3 top-3 max-w-[200px] rounded-md bg-card/95 p-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Bus className="size-4 text-primary" />
            <span className="text-sm font-medium">
              {routes.find((r) => r.id === selectedRoute)?.name}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Click a route card to view details
          </p>
        </div>
      )}
    </div>
  )
}

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.pickup.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Route Selection
        </h1>
        <p className="text-muted-foreground">
          Find and book available bus routes for your children
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by route, school, or pickup location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Main Layout - Map on top (mobile), side-by-side (desktop) */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Map Section */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-6 lg:h-fit">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="size-4" />
                Interactive Route Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <MapPlaceholder
                selectedRoute={selectedRoute}
                onRouteSelect={setSelectedRoute}
              />
            </CardContent>
          </Card>
        </div>

        {/* Routes List Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {filteredRoutes.length} routes available
              </span>
            </div>

            {filteredRoutes.map((route) => (
              <Card
                key={route.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRoute === route.id
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-sm"
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${route.color}20` }}
                      >
                        <Bus
                          className="size-5"
                          style={{ color: route.color }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{route.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {route.id}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(route.status, route.available)}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-emerald-600" />
                      <div>
                        <span className="text-muted-foreground">Pickup: </span>
                        <span className="font-medium">{route.pickup}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <School className="size-4 text-blue-600" />
                      <div>
                        <span className="text-muted-foreground">
                          Drop-off:{" "}
                        </span>
                        <span className="font-medium">{route.school}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <span className="font-medium">{route.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-muted-foreground" />
                        <span>
                          {route.available}/{route.capacity} seats
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    disabled={route.status === "full"}
                    asChild={route.status !== "full"}
                  >
                    {route.status === "full" ? (
                      <span>No Seats Available</span>
                    ) : (
                      <Link href={`/dashboard/book?route=${route.id}`}>
                        Book Seat
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredRoutes.length === 0 && (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <Bus className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No routes found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
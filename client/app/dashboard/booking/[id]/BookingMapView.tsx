"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Marker icons
const startIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const endIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "hue-rotate-90",
})

const pickupIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
})

const dropoffIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  className: "hue-rotate-90",
})

interface RouteSpot {
  lat: number
  lng: number
  name: string
}

interface RouteData {
  route_id: number
  route_name: string
  start_location: string
  end_location: string
  pickup_spots: string | null
  dropoff_spots: string | null
}

interface BookingMapViewProps {
  routeData: RouteData
  pickupSpot: string
  dropoffSpot: string
}

// Component to fit bounds
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map, bounds])
  return null
}

export default function BookingMapView({ routeData, pickupSpot, dropoffSpot }: BookingMapViewProps) {
  const parseLocation = (location: string) => {
    try {
      const parsed = JSON.parse(location)
      return [parsed.lat, parsed.lng] as [number, number]
    } catch {
      const [lat, lng] = location.split(",").map(Number)
      return [lat, lng] as [number, number]
    }
  }

  const parseSpots = (spotsJson: string | null): RouteSpot[] => {
    if (!spotsJson) return []
    try {
      return JSON.parse(spotsJson)
    } catch {
      return []
    }
  }

  const startLocation = parseLocation(routeData.start_location)
  const endLocation = parseLocation(routeData.end_location)
  const pickupSpots = parseSpots(routeData.pickup_spots)
  const dropoffSpots = parseSpots(routeData.dropoff_spots)

  // Find the actual pickup and dropoff spots by name
  const actualPickupSpot = pickupSpots.find(spot => spot.name === pickupSpot)
  const actualDropoffSpot = dropoffSpots.find(spot => spot.name === dropoffSpot)

  // Calculate bounds to include all markers
  const allPoints = [
    startLocation,
    endLocation,
    ...(actualPickupSpot ? [[actualPickupSpot.lat, actualPickupSpot.lng] as [number, number]] : []),
    ...(actualDropoffSpot ? [[actualDropoffSpot.lat, actualDropoffSpot.lng] as [number, number]] : []),
  ]

  const bounds = L.latLngBounds(allPoints)

  // Route line coordinates
  const routeLineCoords = [startLocation, endLocation]

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={startLocation}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds bounds={bounds} />
        
        {/* Route line */}
        <Polyline
          positions={routeLineCoords}
          pathOptions={{ color: '#2563eb', weight: 4, opacity: 0.7 }}
        />
        
        {/* Route start and end markers */}
        <Marker position={startLocation} icon={startIcon}>
          <Popup>
            <strong>Route Start</strong>
            <br />
            {routeData.route_name}
          </Popup>
        </Marker>

        <Marker position={endLocation} icon={endIcon}>
          <Popup>
            <strong>Route End</strong>
            <br />
            {routeData.route_name}
          </Popup>
        </Marker>

        {/* User's pickup spot */}
        {actualPickupSpot && (
          <Marker position={[actualPickupSpot.lat, actualPickupSpot.lng]} icon={pickupIcon}>
            <Popup>
              <strong>Your Pickup</strong>
              <br />
              {actualPickupSpot.name}
            </Popup>
          </Marker>
        )}

        {/* User's dropoff spot */}
        {actualDropoffSpot && (
          <Marker position={[actualDropoffSpot.lat, actualDropoffSpot.lng]} icon={dropoffIcon}>
            <Popup>
              <strong>Your Dropoff</strong>
              <br />
              {actualDropoffSpot.name}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
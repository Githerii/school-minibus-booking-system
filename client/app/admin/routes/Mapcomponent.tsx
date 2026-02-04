"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Loader2, School, Home, Search as SearchIcon, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// --- ICON FIX FOR NEXT.JS ---
const homeIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const schoolIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "hue-rotate-90", // Visual distinction for school
});

/* --- 1. ROAD ROUTING ENGINE --- */
/* --- 1. ROAD ROUTING ENGINE --- */
function RoutingEngine({ pickup, dropoff, setDistance }: any) {
  const map = useMap();
  const routingControlRef = useRef<any>(null);

  useEffect(() => {
    // Only run if the map instance is alive and we have both points
    if (!map || !pickup || !dropoff) return;

    let isMounted = true;

    const addRouting = async () => {
      // @ts-ignore
      await import("leaflet-routing-machine");
      
      if (!isMounted || !map) return;

      // 1. COMPLETELY WIPE PREVIOUS CONTROL BEFORE STARTING
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (e) {
          console.debug("Cleanup handled");
        }
      }

      // 2. INITIALIZE WITH "GHOST" SETTINGS TO PREVENT UI CLUTTER
      const control = (L as any).Routing.control({
        waypoints: [
          L.latLng(pickup[0], pickup[1]),
          L.latLng(dropoff[0], dropoff[1])
        ],
        router: (L as any).Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`
        }),
        // --- HIDE ALL ROUTE INFO & MARKERS ---
        show: false, 
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        createMarker: () => null, // Prevents LRM from creating markers
        // -------------------------------------
        lineOptions: { 
          styles: [{ color: "#2563eb", weight: 6, opacity: 0.8 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        }
      })
      .on("routesfound", (e: any) => {
        if (isMounted) {
          const dist = e.routes[0].summary.totalDistance / 1000;
          setDistance(dist.toFixed(2) + " km");
        }
      })
      .addTo(map);

      routingControlRef.current = control;
    };

    addRouting();

    // 3. THE "GOLDEN" CLEANUP
    return () => {
      isMounted = false;
      if (routingControlRef.current && map) {
        try {
          // Check if the map container still exists in DOM to avoid removeLayer error
          const container = map.getContainer();
          if (container && routingControlRef.current) {
            map.removeControl(routingControlRef.current);
          }
        } catch (error) {
          // Silent catch for the Leaflet-Routing-Machine race condition
          console.debug("Routing machine disposed safely.");
        } finally {
          routingControlRef.current = null;
        }
      }
    };
  }, [map, pickup, dropoff, setDistance]);

  return null;
}

/* --- 2. MAP CLICK HANDLER --- */
function MapClickHandler({ onClick }: { onClick: (coords: [number, number]) => void }) {
  const map = useMap();
  useEffect(() => {
    map.on("click", (e) => { onClick([e.latlng.lat, e.latlng.lng]); });
  }, [map, onClick]);
  return null;
}

/* --- 3. MAIN COMPONENT --- */
export default function MapComponent({ pickup, dropoff, setDistance, onMapClick, mode, onClear }: any) {
  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (addressQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [addressQuery]);

  const selectLocation = (lat: string, lon: string) => {
    const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
    onMapClick(coords);
    setAddressQuery(""); 
    setSuggestions([]);
    if (mapRef.current) mapRef.current.flyTo(coords, 15);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 flex flex-col gap-2">
        <div className="relative flex flex-col gap-1 bg-white p-2 rounded-lg shadow-xl border-2 border-blue-100">
          <div className="flex items-center gap-2">
            <div className="pl-2">
              {mode === 'pickup' ? <Home className="w-4 h-4 text-blue-500" /> : <School className="w-4 h-4 text-green-500" />}
            </div>
            <input
              type="text"
              placeholder={`Search ${mode === 'pickup' ? 'Home' : 'School'}...`}
              className="flex-1 px-2 py-1 text-sm outline-none"
              value={addressQuery}
              onChange={(e) => setAddressQuery(e.target.value)}
            />
            {isSearching && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
            {addressQuery && (
              <button onClick={() => setAddressQuery("")}>
                <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto z-[1001]">
              {suggestions.map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => selectLocation(item.lat, item.lon)}
                  className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer border-b last:border-none flex items-start gap-2"
                >
                  <SearchIcon className="w-3 h-3 mt-1 text-slate-400" />
                  <span className="truncate">{item.display_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {(pickup || dropoff) && (
          <button 
            onClick={onClear}
            className="bg-white/90 backdrop-blur-sm text-red-600 text-xs font-bold py-2 px-4 rounded-full shadow-lg border border-red-100 flex items-center justify-center gap-2 hover:bg-red-50 transition-all self-center"
          >
            <X className="w-3 h-3" /> Clear Map & Route
          </button>
        )}
      </div>

      <MapContainer 
        center={[-1.286389, 36.817223]} 
        zoom={13} 
        className="h-full w-full"
        ref={(map) => { if (map) mapRef.current = map; }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onClick={onMapClick} />
        
        {/* CUSTOM MARKERS USING THE ICON FIX */}
        {pickup && <Marker position={pickup} icon={homeIcon}><Popup>Home (Pickup)</Popup></Marker>}
        {dropoff && <Marker position={dropoff} icon={schoolIcon}><Popup>School (Drop-off)</Popup></Marker>}
        
        {pickup && dropoff && <RoutingEngine pickup={pickup} dropoff={dropoff} setDistance={setDistance} />}
      </MapContainer>
    </div>
  );
}
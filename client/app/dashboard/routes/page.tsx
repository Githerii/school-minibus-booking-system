"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Home, School, Save, MapPin, Navigation, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// dynamic import to ensure Leaflet only runs on the client side
const MapComponent = dynamic(() => import("./Mapcomponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-slate-100 flex flex-col items-center justify-center rounded-2xl border">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
      <p className="text-slate-500 text-sm">Loading Interactive Map...</p>
    </div>
  ),
});

export default function RoutesPage() {
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [dropoff, setDropoff] = useState<[number, number] | null>(null);
  const [mode, setMode] = useState<"pickup" | "dropoff">("pickup");
  const [distance, setDistance] = useState<string>("");

  // Handler to reset all map data
  const handleClearMap = () => {
    setPickup(null);
    setDropoff(null);
    setDistance("");
    setMode("pickup");
  };

  const handleSaveRoute = () => {
    if (!pickup || !dropoff) return;
    const routeData = { pickup, dropoff, distance };
    console.log("Saving route:", routeData);
    alert(`Route Saved! Total distance: ${distance}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Route Booking</h1>
          <p className="text-slate-500 text-sm">Find your home and school to calculate the precise travel route.</p>
        </div>
        <div className="flex gap-2">
           <Button 
            variant="outline"
            onClick={handleClearMap}
            className="text-red-500 border-red-200 hover:bg-red-50"
            disabled={!pickup && !dropoff}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button 
            disabled={!pickup || !dropoff}
            onClick={handleSaveRoute}
            className="bg-green-600 hover:bg-green-700 h-10 px-8 font-bold shadow-md"
          >
            <Save className="mr-2 h-4 w-4" /> Save Route
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="space-y-2">
            <Button 
              variant={mode === "pickup" ? "default" : "outline"} 
              className={`w-full justify-start h-12 ${mode === 'pickup' ? 'ring-2 ring-blue-100' : ''}`}
              onClick={() => setMode("pickup")}
            >
              <Home className={`mr-2 h-4 w-4 ${mode === 'pickup' ? 'text-white' : 'text-blue-500'}`} />
              Set Pickup (Home)
            </Button>
            <Button 
              variant={mode === "dropoff" ? "default" : "outline"} 
              className={`w-full justify-start h-12 ${mode === 'dropoff' ? 'ring-2 ring-green-100' : ''}`}
              onClick={() => setMode("dropoff")}
            >
              <School className={`mr-2 h-4 w-4 ${mode === 'dropoff' ? 'text-white' : 'text-green-500'}`} />
              Set Drop-off (School)
            </Button>
          </div>

          {/* Coordinate Display Card */}
          <div className="p-4 bg-white rounded-lg border space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-500 w-5 h-5 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Home Location</p>
                <p className="text-xs font-mono truncate text-slate-700">
                  {pickup ? `${pickup[0].toFixed(5)}, ${pickup[1].toFixed(5)}` : "Not selected"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t">
              <Navigation className="text-green-500 w-5 h-5 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">School Location</p>
                <p className="text-xs font-mono truncate text-slate-700">
                  {dropoff ? `${dropoff[0].toFixed(5)}, ${dropoff[1].toFixed(5)}` : "Not selected"}
                </p>
              </div>
            </div>
          </div>

          {/* Distance Result */}
          {distance && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">Total Road Distance</p>
              <p className="text-3xl font-black text-blue-900">{distance}</p>
            </div>
          )}

          <div className="flex gap-2 p-3 bg-slate-50 border rounded-lg">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-tight">
              Calculations are based on vehicle-accessible roads suitable for school minibuses.
            </p>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3 h-[650px] rounded-2xl overflow-hidden border-2 shadow-inner bg-slate-50 relative">
          <MapComponent 
            pickup={pickup} 
            dropoff={dropoff} 
            setDistance={setDistance}
            mode={mode}
            onClear={handleClearMap}
            onMapClick={(coords: [number, number]) => {
              if (mode === "pickup") {
                setPickup(coords);
                // Smart Switch: If user just set pickup, move to dropoff automatically
                setMode("dropoff");
              } else {
                setDropoff(coords);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
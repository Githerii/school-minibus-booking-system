"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Save, Trash2, Plus, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface RouteSpot {
  lat: number;
  lng: number;
  name: string;
}

interface Route {
  id: number;
  name: string;
  startLocation: string;
  endLocation: string;
  pickupSpots?: string;
  dropoffSpots?: string;
  status: string;
  busCount: number;
}

export default function RoutesPage() {
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);
  const [pickupSpots, setPickupSpots] = useState<RouteSpot[]>([]);
  const [dropoffSpots, setDropoffSpots] = useState<RouteSpot[]>([]);
  const [mode, setMode] = useState<"start" | "end" | "pickup" | "dropoff">("start");
  const [spotName, setSpotName] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [editingRoute, setEditingRoute] = useState<number | null>(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/routes", {
        credentials: "include", // Send cookies with request
      });
      if (response.ok) {
        const data = await response.json();
        setRoutes(data);
      } else if (response.status === 401) {
        alert("Not authenticated. Please login again.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  };

  const handleMapClick = (coords: [number, number]) => {
    if (mode === "start") {
      setStartPoint(coords);
    } else if (mode === "end") {
      setEndPoint(coords);
    } else if (mode === "pickup" && spotName.trim()) {
      setPickupSpots([...pickupSpots, { lat: coords[0], lng: coords[1], name: spotName }]);
      setSpotName("");
    } else if (mode === "dropoff" && spotName.trim()) {
      setDropoffSpots([...dropoffSpots, { lat: coords[0], lng: coords[1], name: spotName }]);
      setSpotName("");
    }
  };

  const handleRemovePickupSpot = (index: number) => {
    setPickupSpots(pickupSpots.filter((_, i) => i !== index));
  };

  const handleRemoveDropoffSpot = (index: number) => {
    setDropoffSpots(dropoffSpots.filter((_, i) => i !== index));
  };

  const handleSaveRoute = async () => {
    if (!routeName || !startPoint || !endPoint) {
      alert("Please fill in route name and select both start and end points");
      return;
    }

    const payload = {
      name: routeName,
      startLocation: JSON.stringify({ lat: startPoint[0], lng: startPoint[1] }),
      endLocation: JSON.stringify({ lat: endPoint[0], lng: endPoint[1] }),
      pickupSpots: pickupSpots.length > 0 ? JSON.stringify(pickupSpots) : null,
      dropoffSpots: dropoffSpots.length > 0 ? JSON.stringify(dropoffSpots) : null,
      status: "active",
    };

    try {
      const url = editingRoute
        ? `http://localhost:5000/admin/routes/${editingRoute}`
        : "http://localhost:5000/admin/routes";
      
      const response = await fetch(url, {
        method: editingRoute ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editingRoute ? "Route updated successfully!" : "Route saved successfully!");
        handleClearForm();
        fetchRoutes();
      } else if (response.status === 401) {
        alert("Not authenticated. Please login again.");
        window.location.href = "/login";
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save route");
      }
    } catch (err: any) {
      console.error("Save route error:", err.message);
      alert(err.message);
    }
  };

  const handleClearForm = () => {
    setRouteName("");
    setStartPoint(null);
    setEndPoint(null);
    setPickupSpots([]);
    setDropoffSpots([]);
    setSpotName("");
    setMode("start");
    setEditingRoute(null);
  };

  const handleDeleteRoute = async (id: number) => {
    if (!confirm("Are you sure you want to delete this route?")) return;

    try {
      const response = await fetch(`http://localhost:5000/admin/routes/${id}`, {
        method: "DELETE",
        credentials: "include", // Send cookies with request
      });

      if (response.ok) {
        alert("Route deleted successfully!");
        fetchRoutes();
      } else if (response.status === 401) {
        alert("Not authenticated. Please login again.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Failed to delete route:", error);
    }
  };

  const handleEditRoute = (route: Route) => {
    setRouteName(route.name);
    
    try {
      const start = JSON.parse(route.startLocation);
      const end = JSON.parse(route.endLocation);
      setStartPoint([start.lat, start.lng]);
      setEndPoint([end.lat, end.lng]);
    } catch (e) {
      // If parsing fails, try comma-separated format
      const [startLat, startLng] = route.startLocation.split(",").map(Number);
      const [endLat, endLng] = route.endLocation.split(",").map(Number);
      setStartPoint([startLat, startLng]);
      setEndPoint([endLat, endLng]);
    }

    if (route.pickupSpots) {
      try {
        setPickupSpots(JSON.parse(route.pickupSpots));
      } catch (e) {
        setPickupSpots([]);
      }
    }

    if (route.dropoffSpots) {
      try {
        setDropoffSpots(JSON.parse(route.dropoffSpots));
      } catch (e) {
        setDropoffSpots([]);
      }
    }

    setEditingRoute(route.id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Route Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleClearForm}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
          <Button 
            onClick={handleSaveRoute}
            disabled={!routeName || !startPoint || !endPoint}
            className="bg-green-600 hover:bg-green-700 h-10 px-8 font-bold shadow-md"
          >
            <Save className="mr-2 h-4 w-4" /> {editingRoute ? "Update Route" : "Save Route"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Route Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input
                  id="routeName"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  placeholder="e.g., Kiambu Road"
                />
              </div>

              <div className="space-y-2">
                <Label>Map Mode</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={mode === "start" ? "default" : "outline"}
                    onClick={() => setMode("start")}
                  >
                    Start
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "end" ? "default" : "outline"}
                    onClick={() => setMode("end")}
                  >
                    End
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "pickup" ? "default" : "outline"}
                    onClick={() => setMode("pickup")}
                  >
                    Pickup
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "dropoff" ? "default" : "outline"}
                    onClick={() => setMode("dropoff")}
                  >
                    Dropoff
                  </Button>
                </div>
              </div>

              {(mode === "pickup" || mode === "dropoff") && (
                <div>
                  <Label htmlFor="spotName">Spot Name</Label>
                  <Input
                    id="spotName"
                    value={spotName}
                    onChange={(e) => setSpotName(e.target.value)}
                    placeholder="e.g., Shopping Mall"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a name, then click on map
                  </p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                <div className="text-xs">
                  <span className="font-semibold">Start: </span>
                  {startPoint ? `${startPoint[0].toFixed(5)}, ${startPoint[1].toFixed(5)}` : "Not set"}
                </div>
                <div className="text-xs">
                  <span className="font-semibold">End: </span>
                  {endPoint ? `${endPoint[0].toFixed(5)}, ${endPoint[1].toFixed(5)}` : "Not set"}
                </div>
              </div>

              {pickupSpots.length > 0 && (
                <div>
                  <Label className="text-xs">Pickup Spots ({pickupSpots.length})</Label>
                  <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
                    {pickupSpots.map((spot, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-blue-50 p-2 rounded text-xs">
                        <span className="truncate">{spot.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemovePickupSpot(idx)}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dropoffSpots.length > 0 && (
                <div>
                  <Label className="text-xs">Dropoff Spots ({dropoffSpots.length})</Label>
                  <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
                    {dropoffSpots.map((spot, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-green-50 p-2 rounded text-xs">
                        <span className="truncate">{spot.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveDropoffSpot(idx)}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="h-[500px] rounded-2xl overflow-hidden border-2 shadow-inner bg-slate-50">
            <MapComponent 
              pickup={startPoint}
              dropoff={endPoint}
              mode={mode}
              pickupSpots={pickupSpots}
              dropoffSpots={dropoffSpots}
              onMapClick={handleMapClick}
              setDistance={() => {}}
              onClear={handleClearForm}
            />
          </div>

          {/* Routes Table */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Routes</CardTitle>
              <CardDescription>Manage all bus routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Pickup Spots</TableHead>
                    <TableHead>Dropoff Spots</TableHead>
                    <TableHead>Buses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No routes created yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>
                          {route.pickupSpots ? JSON.parse(route.pickupSpots).length : 0}
                        </TableCell>
                        <TableCell>
                          {route.dropoffSpots ? JSON.parse(route.dropoffSpots).length : 0}
                        </TableCell>
                        <TableCell>{route.busCount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            route.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {route.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditRoute(route)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteRoute(route.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
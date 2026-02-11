import { getSession } from "next-auth/react";

export const API_BASE_URL = "http://localhost:5000";

/**
 * Fetch wrapper that attaches the NextAuth access token (Flask JWT)
 * to Authorization: Bearer <token>
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getSession();
  const token = (session as any)?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

/* =========================
   Admin Dashboard Endpoints
   ========================= */

export interface AdminRoute {
  id: number;
  name: string;
  startLocation: string;
  endLocation: string;
  status: "active" | "inactive";
  busCount: number;
}

export async function getAdminRoutes(): Promise<AdminRoute[]> {
  const res = await fetchWithAuth("/admin/routes");
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export async function createAdminRoute(payload: {
  name: string;
  startLocation: string;
  endLocation: string;
  status: "active" | "inactive";
}) {
  const res = await fetchWithAuth("/admin/routes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error || "Failed to create route");
  }

  return res.json();
}

export async function updateAdminRoute(
  id: number,
  payload: {
    name: string;
    startLocation: string;
    endLocation: string;
    status: "active" | "inactive";
  }
) {
  const res = await fetchWithAuth(`/admin/routes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update route");
  return res.json();
}

export async function deleteAdminRoute(id: number) {
  const res = await fetchWithAuth(`/admin/routes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete route");
}

export interface AdminDriver {
  id: number;
  name: string;
  email: string;
}

export async function getAdminDrivers(): Promise<AdminDriver[]> {
  const res = await fetchWithAuth("/admin/drivers");
  if (!res.ok) throw new Error("Failed to fetch drivers");
  return res.json();
}

export async function createAdminDriver(payload: {
  name: string;
  email: string;
}) {
  const res = await fetchWithAuth("/admin/drivers", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create driver");
  return res.json();
}

export async function updateAdminDriver(
  id: number,
  payload: { name: string; email: string }
) {
  const res = await fetchWithAuth(`/admin/drivers/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update driver");
  return res.json();
}

export async function deleteAdminDriver(id: number) {
  const res = await fetchWithAuth(`/admin/drivers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete driver");
}

export interface AdminBus {
  id: number;
  plateNumber: string;
  capacity: number;
  routeId: number;
  routeName: string;
  driverId: number;
  driverName: string;
}

export async function getAdminBuses(): Promise<AdminBus[]> {
  const res = await fetchWithAuth("/admin/buses");
  if (!res.ok) throw new Error("Failed to fetch buses");
  return res.json();
}

export async function createAdminBus(payload: {
  plateNumber: string;
  capacity: number;
  routeId: number;
  driverId: number;
}) {
  const res = await fetchWithAuth("/admin/buses", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create bus");
  return res.json();
}

export async function updateAdminBus(
  id: number,
  payload: {
    plateNumber: string;
    capacity: number;
    routeId: number;
    driverId: number;
  }
) {
  const res = await fetchWithAuth(`/admin/buses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update bus");
  return res.json();
}

export async function deleteAdminBus(id: number) {
  const res = await fetchWithAuth(`/admin/buses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete bus");
}

export interface AdminBooking {
  id: number;
  parentId: number;
  parentName: string;
  busId: number;
  busPlate: string;
  pickup: string;
  dropoff: string;
  bookingDate: string;
  status: string;
}

export async function getAdminBookings(): Promise<AdminBooking[]> {
  const res = await fetchWithAuth("/admin/bookings");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function createAdminBooking(payload: {
  parentId: number;
  busId: number;
  pickup: string;
  dropoff: string;
}) {
  const res = await fetchWithAuth("/admin/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function updateAdminBooking(
  id: number,
  payload: {
    parentId: number;
    busId: number;
    pickup: string;
    dropoff: string;
  }
) {
  const res = await fetchWithAuth(`/admin/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function deleteAdminBooking(id: number) {
  const res = await fetchWithAuth(`/admin/bookings/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete booking");
}

export interface AdminParent {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

export async function getAdminParents(): Promise<AdminParent[]> {
  const res = await fetchWithAuth("/admin/parents");
  if (!res.ok) throw new Error("Failed to fetch parents");
  return res.json();
}

/* =========================
   Parent Dashboard Endpoints
   ========================= */

export interface ParentBooking {
  booking_id: number;
  parent: string;
  bus: string;
  pickup: string;
  dropoff: string;
}

export async function getParentBookings(): Promise<ParentBooking[]> {
  const res = await fetchWithAuth("/bookings");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function createParentBooking(payload: {
  parent_id: number;
  bus_id: number;
  pickup_point: string;
  dropoff_point: string;
}) {
  const res = await fetchWithAuth("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function updateParentBooking(
  id: number,
  payload: {
    pickup_point: string;
    dropoff_point: string;
    bus_id: number;
  }
) {
  const res = await fetchWithAuth(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function deleteParentBooking(id: number) {
  const res = await fetchWithAuth(`/bookings/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete booking");
}

export interface ParentRoute {
  route_id: number;
  route_name: string;
}

export async function getParentRoutes(): Promise<ParentRoute[]> {
  const res = await fetchWithAuth("/routes");
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export interface ParentBus {
  bus_id: number;
  plate_number: string;
  route: string;
  driver: string;
}

export async function getParentBuses(): Promise<ParentBus[]> {
  const res = await fetchWithAuth("/buses");
  if (!res.ok) throw new Error("Failed to fetch buses");
  return res.json();
}

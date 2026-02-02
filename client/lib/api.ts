export const API_BASE_URL = "http://localhost:5000"

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })
}

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

  if (!res.ok) {
    throw new Error("Failed to fetch routes");
  }

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
    const err = await res.json();
    throw new Error(err.error || "Failed to create route");
  }

  return res.json(); // returns the route that has been created
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update route");
  }

  return res.json();
}

export async function deleteAdminRoute(id: number) {
  const res = await fetchWithAuth(`/admin/routes/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete route");
  }
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
}

export async function deleteAdminDriver(id: number) {
  const res = await fetchWithAuth(`/admin/drivers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete driver");
}
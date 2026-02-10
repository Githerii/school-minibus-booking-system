"use client";

import { API_BASE_URL } from "./api";

export async function logout() {
  try {
    // Call the logout endpoint to clear the HTTP-only cookie
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include", // Important: sends cookies with the request
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Redirect to login page regardless of API call success
    window.location.href = "/login";
  }
}
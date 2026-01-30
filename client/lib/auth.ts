"use client"

// Simple in-memory user store for demo purposes
// In production, this would be replaced with a real database (Supabase, etc.)

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  createdAt: Date
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
}

// In-memory store (persisted to localStorage for demo)
const USERS_KEY = "schoolride_users"
const CURRENT_USER_KEY = "schoolride_current_user"

// Get users from localStorage
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(USERS_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Register a new user
export function registerUser(
  fullName: string,
  email: string,
  password: string
): { success: boolean; error?: string; user?: AuthUser } {
  const users = getUsers()
  
  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    return { success: false, error: "An account with this email already exists" }
  }
  
  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    fullName,
    email: email.toLowerCase(),
    password, // In production, this would be hashed
    createdAt: new Date()
  }
  
  users.push(newUser)
  saveUsers(users)
  
  // Auto login after registration
  const authUser: AuthUser = {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email
  }
  setCurrentUser(authUser)
  
  return { success: true, user: authUser }
}

// Login user
export function loginUser(
  email: string,
  password: string
): { success: boolean; error?: string; user?: AuthUser } {
  const users = getUsers()
  
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  
  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }
  
  const authUser: AuthUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email
  }
  setCurrentUser(authUser)
  
  return { success: true, user: authUser }
}

// Get current logged in user
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// Set current user
export function setCurrentUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Logout user
export function logoutUser(): void {
  setCurrentUser(null)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
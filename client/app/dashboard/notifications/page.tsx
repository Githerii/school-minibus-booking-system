"use client"

import { Bell, BellOff } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotificationsPage() {
  const notifications: any[] = []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with your booking alerts and system messages
        </p>
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <BellOff className="size-10 text-muted-foreground" />
            </div>
            <h3 className="mt-6 text-lg font-medium">No new notifications</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
              When you receive booking confirmations, updates, or important alerts, they'll appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        
        <div className="grid gap-4">
          {notifications.map((notification, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{notification.title}</CardTitle>
                <CardDescription>{notification.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

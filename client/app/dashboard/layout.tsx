import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import "leaflet/dist/leaflet.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      {/* Root container */}
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content area */}
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          {/* Header (fixed height) */}
          <DashboardHeader />

          {/* Scrollable page */}
          <main className="flex-1 overflow-y-auto bg-muted/40 px-4 py-4 md:px-6 md:py-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import {
  LayoutDashboard,
  MapPin,
  Users,
  Bus,
  CalendarCheck,
  LogOut,
} from "lucide-react";

const menuItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/routes", label: "Routes", icon: MapPin },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/buses", label: "Buses", icon: Bus },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">SchoolTransport</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-primary-600" : "text-gray-400"
                    }`}
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}

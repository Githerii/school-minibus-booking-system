"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/clientAuth";
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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">SchoolTransport</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Admin Dashboard</p>
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
              (pathname.startsWith(item.href + "/") && item.href !== "/admin");

            return (
              <li key={item.href}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm dark:bg-gray-800 dark:text-blue-400 dark:shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                    } transition-colors duration-300`}
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <button
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to logout?");
            if (confirmed) {
              logout();
              router.push("/login");
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 dark:text-gray-500 dark:group-hover:text-red-400 transition-colors duration-300" />
          Logout
        </button>
      </div>
    </aside>
  );
}
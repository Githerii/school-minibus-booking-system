import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Import the Providers wrapper we created
import Providers from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SchoolRide - Safe & Reliable School Transport",
  description:
    "Book safe and affordable school minibus transport for your children.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Wrap the entire app with Providers for NextAuth */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
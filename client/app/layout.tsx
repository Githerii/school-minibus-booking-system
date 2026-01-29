import React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font"
import "./globals.css"

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
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

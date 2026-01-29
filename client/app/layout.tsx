import React from "react"
import type { Metadata } from 'next'
import { Geist } from 'next/font'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SchoolRide - Safe & Reliable School Transport',
  description: 'Book safe and affordable school minibus transport for your children. View routes, track pickups, and manage drop-offs with ease.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
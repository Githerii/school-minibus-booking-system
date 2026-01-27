"use client";

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Menu, Bus, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="size-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">SchoolRide</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Kenya</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="flex flex-col gap-4 p-4">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
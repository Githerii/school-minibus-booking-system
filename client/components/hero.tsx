import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Clock, MapPin, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24 lg:py-32">

      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="kenyan-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#kenyan-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
            <Star className="size-4 fill-current" />
            Serving schools across Kenya
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Reliable. Affordable School Transport in Kenya
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            From Nairobi to Mombasa, Kisumu to Nakuru - we connect Kenyan families with trusted school transport. Book matatu-style minibuses, track journeys, and get your children to school safely every day.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="default" className="min-w-[160px] text-base font-semibold" asChild>
              <Link href="/register">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="ghost" className="min-w-[160px] border-primary-foreground/30 bg-transparent text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/login">Login to Dashboard</Link>
            </Button>
          </div>


          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Clock className="size-5" />
              </div>
              <span className="text-sm font-medium">On-time guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Shield className="size-5" />
              </div>
              <span className="text-sm font-medium">NTSA certified drivers</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <MapPin className="size-5" />
              </div>
              <span className="text-sm font-medium">GPS tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

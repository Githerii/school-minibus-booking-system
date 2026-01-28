import { Calendar, Map, Bell, Users, Shield, Clock, Phone, CreditCard } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book seats for your watoto in seconds. Daily, weekly, or term-based plans available for all Kenyan schools.",
  },
  {
    icon: Map,
    title: "View Routes on Map",
    description: "See all available routes from your estate to school. Coverage across Nairobi, Kiambu, Machakos, and beyond.",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Get SMS and app notifications when your child boards, reaches school, and returns home safely.",
  },
  {
    icon: Users,
    title: "Vetted Drivers",
    description: "All drivers are NTSA certified, background-checked, and trained in child safety. Your peace of mind guaranteed.",
  },
  {
    icon: Shield,
    title: "Comprehensive Insurance",
    description: "Every journey is fully insured. GPS tracking and emergency protocols keep your children protected.",
  },
  {
    icon: Clock,
    title: "Punctuality Promise",
    description: "We understand Kenyan traffic! Our routes are optimized to get kids to school on time, every time.",
  },
  {
    icon: Phone,
    title: "M-Pesa Payments",
    description: "Pay conveniently via M-Pesa, bank transfer, or card. Flexible payment plans for every family budget.",
  },
  {
    icon: CreditCard,
    title: "Affordable Rates",
    description: "Quality school transport that won't break the bank. From KES 3,000/month for daily routes.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t bg-card py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            Huduma Bora - Quality Service
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Why Kenyan Parents Trust Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From Westlands to Eastlands, Karen to Kitengela - we have built the most reliable school transport network in Kenya.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="group border bg-background transition-all hover:border-accent hover:shadow-lg rounded-lg p-6">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-accent/20">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { UserPlus, MapPinned, Bus, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Jisajili - Register",
      description: "Create your free account in 2 minutes. Add your children's details and their school - we support all primary and secondary schools in Kenya.",
    },
    {
      number: "02",
      icon: MapPinned,
      title: "Chagua Route - Select Route",
      description: "Browse routes near your home in Nairobi, Mombasa, Kisumu or any major town. See pickup points, timing, and fare before you commit.",
    },
    {
      number: "03",
      icon: Bus,
      title: "Book & Pay",
      description: "Reserve seats and pay easily via M-Pesa or card. Get instant confirmation and meet your driver's details.",
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Track & Relax",
      description: "Watch your child's journey in real-time. Receive notifications at every step - boarding, arrival, and return home.",
    },
  ]

  return (
    <section id="how-it-works" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Jinsi Inavyofanya Kazi
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Getting Started is Easy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            In just 4 simple steps, your children will be travelling safely to school. Hakuna wasiwasi!
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-px w-full bg-border lg:block" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex size-24 items-center justify-center rounded-2xl bg-card shadow-lg">
                  <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {step.number}
                  </div>
                  <step.icon className="size-10 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

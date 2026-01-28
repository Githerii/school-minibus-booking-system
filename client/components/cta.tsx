import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-accent py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 size-64 translate-x-1/2 translate-y-[-50%] rounded-full bg-accent-foreground/5" />
      <div className="absolute bottom-0 left-0 size-96 translate-x-[-50%] translate-y-1/2 rounded-full bg-accent-foreground/5" />
      
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="max-w-xl text-balance text-3xl font-bold tracking-tight text-accent-foreground md:text-4xl">
              Uko Tayari? Ready to give your child the safest ride to school?
            </h2>
            <p className="mt-4 max-w-xl text-accent-foreground/80">
              Join over 5,000 Kenyan families who have made the switch to stress-free school transport. First month at 50% off for new parents!
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" variant="default" className="font-semibold" asChild>
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="ghost" className="border-accent-foreground/30 bg-transparent font-semibold text-accent-foreground hover:bg-accent-foreground/10" asChild>
                <Link href="tel:+254700123456">Call Us: 0700 123 456</Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-2xl bg-card p-8 shadow-xl">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Have questions? Our team is here to help Monday to Saturday.
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone / WhatsApp</div>
                  <div className="font-medium">+254 700 123 456</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">support@schoolride.co.ke</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Office</div>
                  <div className="font-medium">Westlands, Nairobi, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

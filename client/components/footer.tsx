import Link from "next/link"
import { Bus } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-foreground py-12 text-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-background">
                <Bus className="size-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">SchoolRide</span>
                <span className="text-[10px] uppercase tracking-widest text-background/60">Kenya</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-background/70">
              Usafiri salama kwa watoto wako. Safe, reliable school transport across Kenya.
            </p>
            <div className="mt-4 text-sm text-background/70">
              <div>NTSA Licensed Operator</div>
              <div>Reg: KE-NTSA-2024-XXXXX</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/70">
              <li><Link href="#features" className="hover:text-background transition-colors">Daily Routes</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">School Partnerships</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Corporate Transport</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Become a Driver</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold">Coverage</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Nairobi</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Mombasa</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Kisumu</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Nakuru</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-8 md:flex-row">
          <p className="text-sm text-background/70">
            2026 SchoolRide Kenya. All rights reserved. Karibu sana!
          </p>
          <div className="flex gap-6 text-sm text-background/70">
            <Link href="#" className="hover:text-background transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-background transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-background transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-background transition-colors">WhatsApp</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"   // new server-side authOptions path
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default async function Home() {
  // ✅ Get the current session
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        
        {/* Example: show message if user is logged in */}
        {session ? (
          <p className="mt-6 text-center text-green-600">
            Logged in as: {session.user?.email}
          </p>
        ) : (
          <p className="mt-6 text-center text-blue-600">
            You are not logged in.
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}
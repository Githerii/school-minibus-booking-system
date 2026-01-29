import "./globals.css";
import { Header } from "../components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta";
import { Footer} from "@/components/footer";
import { Features } from "@/components/features";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
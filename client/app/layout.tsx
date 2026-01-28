import "./globals.css";
import { Header } from "../components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <main>{children}</main>
      </body>
    </html>
  );
}
import "./globals.css";
import { Header } from "../components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works"
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
        <main>{children}</main>
      </body>
    </html>
  );
}
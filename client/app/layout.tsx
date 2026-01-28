import "./globals.css";
import { Header } from "../components/header";
import { Hero } from "@/components/hero";
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
        <main>{children}</main>
      </body>
    </html>
  );
}
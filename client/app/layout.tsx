import "./globals.css";
import { Header } from "../components/header";
import { Hero } from "@/components/hero";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
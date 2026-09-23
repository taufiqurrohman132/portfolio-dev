import type { Metadata, Viewport } from "next";
import { Cedarville_Cursive, Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { Stars } from "@/components/main/stars";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// Self-hosted lewat next/font: tanpa @import Google Fonts yang render-blocking
const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cedarville",
});

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden antialiased",
          inter.className,
          cedarville.variable
        )}
      >
        <Stars />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

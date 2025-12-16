import type { Metadata } from "next";
import { Montserrat as FontSans, Outfit } from "next/font/google";
import "./globals.css";
import "@/styles/util.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Toaster } from "sonner";
import ScrollToTopButton, { ScrollHack } from "@/components/ui/scrollbutton";
import { GoogleTagManagerScript, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import { PageTracker } from "@/components/PageTracker";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "TechMosaic",
  description: "Fueling Your Business Growth through Personalized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          outfit.variable
        )}
      >
        <GoogleTagManagerScript />
        <GoogleTagManagerNoscript />
        <Providers>
          <PageTracker />
          <Toaster closeButton position="top-right" richColors />
          <ScrollToTopButton />
          <ScrollHack />
          {children}
        </Providers>
      </body>
    </html>
  );
}

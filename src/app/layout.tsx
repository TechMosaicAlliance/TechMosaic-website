import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import "@/styles/util.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Toaster } from "sonner";
import ScrollToTopButton, { ScrollHack } from "@/components/ui/scrollbutton";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster closeButton position="top-right" richColors />
          <ScrollToTopButton />
          <ScrollHack />
          {children}
        </Providers>
      </body>
    </html>
  );
}

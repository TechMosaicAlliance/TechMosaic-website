import Footer from "@/website/shared/Footer";
import { NavbarVariant } from "@/website/shared/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavbarVariant />
      {children}
      <Footer type="contact" />
    </section>
  );
}

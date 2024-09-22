import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WebLayout({
  children,
  showNav = true,
}: Readonly<{
  children: React.ReactNode;
  showNav?: boolean;
}>) {
  return (
    <section>
      {showNav ? <Navbar /> : ""}
      {children}
      <Footer type="contact" />
    </section>
  );
}

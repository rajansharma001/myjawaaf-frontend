// src/app/(dashboard)/layout.tsx
"use client";

import Footer from "../../../components/Footer";
import FooterCredit from "../../../components/FooterCredit";
import Header from "../../../components/Header";
import { AuthProvider } from "../../../context/authContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <div className="  w-full bottom-0">
        <Footer />
        <FooterCredit />
      </div>
    </AuthProvider>
  );
}

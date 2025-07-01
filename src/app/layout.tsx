import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Tutor",
  description: "A learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">{children}</body>
    </html>
  );
}

"use client";
import { AuthProvider, useAuth } from "../../../context/authContext";
import { useState } from "react";
import Header from "../../../components/dashboard/Header";
import SideBar from "../../../components/dashboard/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex">
        {/* Optional Sidebar */}

        <SideBar />
        <div className="w-full flex flex-col gap-3 p-6">
          {/* header */}
          <Header />

          {/* Main content */}
          <main className="flex-1 lg:p-6 md:p-4 p-2 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "./authContext";

export const useProtectedRoute = (
  allowedRoles: string[] = [],
  redirectIfLoggedIn: boolean = false
) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // ✅ wait till user info loads

    if (redirectIfLoggedIn && user) {
      if (user.role === "admin") {
        redirect("/admin/dashboard");
      } else if (user.role === "student") {
        redirect("/student/dashboard");
      }
    }

    if (!redirectIfLoggedIn) {
      if (!user) {
        redirect("/signin");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        redirect("/unauthorized");
      }
    }
  }, [user, loading]);
};

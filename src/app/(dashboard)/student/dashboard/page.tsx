"use client";
import React from "react";
import { useProtectedRoute } from "../../../../../context/useProtected";

const StudentDashboard = () => {
  useProtectedRoute(["student"]);
  return <div>StudentDashboard</div>;
};

export default StudentDashboard;

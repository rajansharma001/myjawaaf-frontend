"use client";
import { useProtectedRoute } from "../../../../../context/useProtected";
import Header from "../../../../../components/dashboard/Header";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useAuth } from "../../../../../context/authContext";
import { IoLogOutOutline } from "react-icons/io5";

const AdminDashboard = () => {
  useProtectedRoute(["admin"]);

  return <div className="">dasbarrdd</div>;
};

export default AdminDashboard;

"use client";
import React, { useEffect, useState } from "react";
import { CiLock, CiMonitor } from "react-icons/ci";
import {
  CourseProps,
  enrollProps,
} from "../../../../../components/dashboard/styles/inputField";
import { useAuth } from "../../../../../context/authContext";
import { useProtectedRoute } from "../../../../../context/useProtected";
import Link from "next/link";

const Dashboard = () => {
  useProtectedRoute(["student"]);
  const { user } = useAuth();
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);
  const [courses, setCourses] = useState<CourseProps[]>([]);

  const getEnrolls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/enrollments`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setEnrolls(result.getEnrollById);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/course`, {
        method: "GET",
      });

      const result = await res.json();
      setCourses(result.getCourse);
    } catch (error) {
      console.log(error);
    }
  };

  const userEnroll = Array.isArray(enrolls)
    ? enrolls.filter((e) => e.userId.toString() === user && user._id.toString())
    : [];

  useEffect(() => {
    getEnrolls();
    getCourse();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between gap-3">
        <Link
          className="w-full p-6 shadow-2xl bg-primary-500 text-gray-200 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="/student/dashboard/enrolled"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiMonitor size={40} />
            </div>
            <div>
              <h1>
                {userEnroll &&
                  userEnroll.filter((c) => c.hasAccess === true).length}
              </h1>
              <h1>Enrolled Course</h1>
            </div>
          </div>
        </Link>
        <Link
          className="w-full p-6 shadow-2xl bg-primary-500 text-gray-200 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="/student/dashboard/pending"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiLock size={40} />
            </div>
            <div>
              <h1>
                {userEnroll &&
                  userEnroll.filter((c) => c.hasAccess === false).length}
              </h1>

              <h1>Pending Course</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

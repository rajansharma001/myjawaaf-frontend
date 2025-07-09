"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../context/useProtected";
import Image from "next/image";
import { useAuth } from "../../../../../context/authContext";
import Link from "next/link";
import { BiHome, BiLogOut } from "react-icons/bi";
import { CiMonitor } from "react-icons/ci";
import { CgLock } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";
import { UserProps } from "../../../../../components/dashboard/styles/inputField";

const StudentDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useProtectedRoute(["student"]);
  const { user, logoutUser } = useAuth();
  const [userDetails, setUserDetails] = useState<UserProps>();

  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userid`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      setUserDetails(result.getUserById);
      console.log("result : ", result.getUserById);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-30 bg-primary-500"></div>
      <div className="w-[80%] flex flex-col gap-10">
        <div className=" -mt-8 flex justify-start items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${userDetails?.profileImg}`}
            alt=""
            height={200}
            width={200}
            className="rounded-full w-25 h-25 object-cover border-gray-200 border-2 "
          />
          <h1 className="text-[18px] font-semibold capitalize">
            {user && user.fullname}
          </h1>
        </div>
        {/* dashboard */}

        <div className="w-full flex justify-center py-10 gap-3">
          <div className="w-4/12 flex flex-col gap-2 border-1 border-gray-300 rounded-sm p-6  shadow-2xl shadow-inherit  text-[13px] capitalize font-semibold text-gray-500">
            <Link
              href="/student/dashboard"
              className={`flex gap-2 items-center bg-primary-500 p-2 text-gray-100 hover:bg-orange-400 transition-all duration-300 ease-in-out hover:-translate-y-1  `}
            >
              <BiHome className={``} /> <span className={``}>Dashboard</span>
            </Link>
            <Link
              href="/student/dashboard/enrolled"
              className={`flex gap-2 items-center bg-primary-500 p-2 text-gray-100 hover:bg-orange-400 transition-all duration-300 ease-in-out hover:-translate-y-1  `}
            >
              <CiMonitor className={``} />
              <span className={``}>Enrolled Course</span>
            </Link>
            <Link
              href="/student/dashboard/pending"
              className={`flex gap-2 items-center bg-primary-500 p-2 text-gray-100 hover:bg-orange-400 transition-all duration-300 ease-in-out hover:-translate-y-1  `}
            >
              <CgLock className={``} />
              <span className={``}>Verification Pending Course</span>
            </Link>
            <Link
              href="/student/dashboard/profile"
              className={`flex gap-2 items-center bg-primary-500 p-2 text-gray-100 hover:bg-orange-400 transition-all duration-300 ease-in-out hover:-translate-y-1  `}
            >
              <GrUserSettings className={``} />
              <span className={``}>Profile</span>
            </Link>

            <button
              className={`flex gap-2 cursor-pointer items-center bg-primary-500 p-2 text-gray-100 hover:bg-orange-400 transition-all duration-300 ease-in-out hover:-translate-y-1  `}
              onClick={logoutUser}
            >
              <BiLogOut className={``} />
              Logout
            </button>
          </div>
          <div className="w-8/12 border-1 border-gray-300 rounded-sm p-6  shadow-2xl shadow-inherit  text-[13px] capitalize font-semibold text-gray-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;

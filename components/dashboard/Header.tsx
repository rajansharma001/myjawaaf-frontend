"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiBell } from "react-icons/pi";
import { useAuth } from "../../context/authContext";
import { UserProps } from "./styles/inputField";
import Link from "next/link";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const handleLogout = async () => {
    await logoutUser();
  };

  const [profileMenu, setProfileMenu] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProps>();

  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userid`, {
        credentials: "include",
      });
      const result = await res.json();
      setUserDetails(result.getUserById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <header className="lg:p-4 md:p-4 p-2 w-full bg-gray-100 flex justify-between">
      <div className="w-6/12 flex items-center">
        <p className="text-[14px] uppercase text-gray-600 ">
          Hello<strong> {user?.fullname}</strong>
        </p>
      </div>

      <div className="w-6/12 lg:gap-6 md:gap-4 gap-2 flex items-center justify-end">
        <div className="relative flex flex-col gap-6 ">
          <Image
            src={`${
              userDetails?.profileImg
                ? userDetails?.profileImg
                : "/defaultuser.jpeg"
            }`}
            alt="userImg"
            width={40}
            height={40}
            className="rounded-full object-cover border border-gray-400 cursor-pointer w-10 h-10"
            onClick={() => setProfileMenu(!profileMenu)}
          />
          {/* profile click menu */}

          {profileMenu && (
            <div className="absolute inset-0 -ml-40 h-30 z-10 w-[13vw] items-start justify-between p-4 rounded-xl bg-gray-800 flex flex-col text-gray-200 text-[13px]  transition-all transform translate-y-13 duration-300 ease-in">
              <div>{user?.email}</div>
              <Link href="/admin/dashboard" className="cursor-pointer">
                Dashboard
              </Link>
              <Link href="/admin/dashboard/profile" className="cursor-pointer">
                Profile
              </Link>
              <button className="cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

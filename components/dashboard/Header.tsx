import Image from "next/image";
import React, { useState } from "react";
import { PiBell } from "react-icons/pi";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const handleLogout = async () => {
    await logoutUser();
  };

  const [profileMenu, setProfileMenu] = useState(false);
  return (
    <header className="p-4 w-full bg-gray-100 flex justify-between">
      <div className="w-6/12 flex items-center">
        <p className="text-[14px] uppercase text-gray-600 ">
          Hello<strong> {user?.fullname}</strong>
        </p>
      </div>

      <div className="w-6/12 gap-6 flex items-center justify-end">
        <div className="w-full flex justify-end items-center">
          <input
            type="search"
            placeholder="Search..."
            className="p-3 focus:outline-none border-1 border-gray-300 text-[13px] w-[70%] text-gray-600 bg-white"
          />
        </div>
        <div className="relative flex">
          <PiBell size={24} />
          <span className="h-3 w-3 bg-amber-300 rounded-full shadow-2xl shadow-amber-400 animate-bounce absolute inset-0 ml-3"></span>
        </div>
        <div className="relative flex flex-col gap-6 ">
          <Image
            src="/defaultuser.jpeg"
            alt="userImg"
            width={50}
            height={50}
            className=" rounded-full border-2 border-gray-400 cursor-pointer "
            onClick={() => setProfileMenu(!profileMenu)}
          />
          {/* profile click menu */}

          {profileMenu && (
            <div className="absolute inset-0 -ml-40 h-30 z-10 w-[13vw] items-start justify-between p-4 rounded-xl bg-gray-800 flex flex-col text-gray-200 text-[13px]  transition-all transform translate-y-13 duration-300 ease-in">
              <div>{user?.email}</div>
              <div>Profile</div>
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

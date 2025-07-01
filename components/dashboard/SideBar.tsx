import Link from "next/link";
import { HiHome } from "react-icons/hi";

import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Menu from "./Menu";
const SideBar = () => {
  const [sideOpen, setSideOpen] = useState(true);

  const { logoutUser } = useAuth();
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <aside
      className={`${
        sideOpen ? "w-64" : "w-20"
      }  bg-gray-900 text-white flex flex-col items-center   relative p-6 transition-all transform duration-300 ease-in`}
    >
      <button
        className="absolute  top-5 cursor-pointer "
        onClick={() => setSideOpen(!sideOpen)}
      >
        {sideOpen ? (
          <FaArrowCircleLeft size={25} />
        ) : (
          <FaArrowCircleRight size={25} />
        )}
      </button>
      <div className="w-full mt-10">
        <Menu />
      </div>
      {/* bottom signout */}

      <div className="w-full flex items-center justify-center absolute bottom-0 mt-10">
        <button
          onClick={handleLogout}
          className="-mt-20 text-[13px] text-gray-300 capitalize cursor-pointer font-semibold "
        >
          {sideOpen ? (
            <p className="flex items-center justify-center gap-2">
              <IoLogOutOutline size={20} /> logout
            </p>
          ) : (
            <IoLogOutOutline size={20} />
          )}
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-[12px] text-gray-300 capitalize font-semibold">
        <Link href="/#" className="flex gap-2 items-center  justify-center">
          {sideOpen ? (
            <HiHome size={15} className="hidden" />
          ) : (
            <div>
              <HiHome size={15} />
              <p>Home</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;

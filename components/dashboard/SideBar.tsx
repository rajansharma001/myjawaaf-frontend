import Link from "next/link";
import { HiHome } from "react-icons/hi";

import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Menu from "./Menu";
const SideBar = () => {
  const [sideOpen, setSideOpen] = useState(false);

  const { logoutUser } = useAuth();
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <aside
      className={`${
        sideOpen ? "w-64" : "w-20"
      }  bg-gray-900 text-white flex flex-col   relative p-6 transition-all transform duration-300 ease-in`}
    >
      <button
        className="w-full cursor-pointer absolute flex items-center justify-center left-0  top-5 :"
        onClick={() => setSideOpen(!sideOpen)}
      >
        {sideOpen ? (
          <FaArrowCircleLeft size={25} />
        ) : (
          <FaArrowCircleRight size={25} />
        )}
      </button>

      {sideOpen ? (
        <Menu style="" />
      ) : (
        <Menu iconStyle="text-xl " style="hidden" />
      )}

      {/* bottom signout */}

      <div className="w-full flex items-center justify-center absolute bottom-0 ">
        <button
          onClick={handleLogout}
          className="-mt-20 -ml-8  text-[13px] w-full text-gray-300 flex items-center justify-center capitalize cursor-pointer font-semibold "
        >
          {sideOpen ? (
            <p className="flex  gap-2">
              <IoLogOutOutline size={20} /> logout
            </p>
          ) : (
            <IoLogOutOutline size={20} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

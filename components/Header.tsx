"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { PiBell, PiGraduationCap, PiHeart } from "react-icons/pi";
import { useAuth } from "../context/authContext";
import Image from "next/image";
import { CategoryProps } from "./dashboard/styles/inputField";

const Header = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    redirect("/");
  };

  const [cats, setCats] = useState<CategoryProps[]>([]);

  const category = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      method: "GET",
    });
    const result = await res.json();
    setCats(result.getCat);
  };

  useEffect(() => {
    category();
  }, []);

  return (
    <div className="flex justify-between items-center w-full h-[60px] px-6 py-10 border-b-2 border-gray-200">
      <div className="flex justify-start items-center w-[60%] gap-2 px-5  ">
        <div className="flex flex-2/12 items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <PiGraduationCap className="text-primary-500 text-2xl font-bold" />
            <h1 className="text-heading font-semibold  text-xl ">E-Tutor</h1>
          </Link>
        </div>
        <div className="flex flex-4/12">
          <select
            id="select-cat"
            name="select-cat"
            className="w-full text-[12px] p-2 text-gray-500 border-1 border-gray-300 focus:outline-none"
          >
            <option className="" value="Web Dev">
              Browse Category
            </option>
            {cats &&
              cats.map((cat) => (
                <option
                  key={cat._id}
                  className="p-6 hover:bg-primary-500"
                  value={cat._id}
                >
                  {cat.title}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-6/12 ">
          <div className=" flex items-center gap-2  w-full border-1 border-gray-300">
            <CiSearch className="text-xl text-gray-500 text-center " />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search your fav topic"
              className="py-2 focus:outline-none w-full text-[12px] text-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-[40%] gap-5  ">
        <PiBell
          size={20}
          className="hover:text-primary-500 cursor-pointer transition-all transform ease-in duration-300"
        />
        <PiHeart
          size={20}
          className="hover:text-primary-500 cursor-pointer transition-all transform ease-in duration-300"
        />
        <IoCartOutline
          size={20}
          className="hover:text-primary-500 cursor-pointer transition-all transform ease-in duration-300"
        />

        {!user ? (
          <div className=" flex gap-4">
            <Link href="/signin">
              <button className="py-1.5 px-3 bg-primary-500 text-[12px] hover:bg-primary-300 hover:text-primary-500 cursor-pointer text-white capitalize font-semibold transition-all transform ease-in duration-300">
                Sign in
              </button>
            </Link>
            <Link href="/signup">
              <button className="py-1.5 px-3 bg-primary-300 text-[12px] hover:bg-primary-500 hover:text-white cursor-pointer text-primary-500 capitalize font-semibold transition-all transform ease-in duration-300">
                Create an Account
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Image
              alt="userImg"
              src="/defaultuser.jpeg"
              height={40}
              width={50}
              className="rounded-full border-2 border-gray-300"
            />
            <button
              onClick={handleLogout}
              className="py-1.5 px-3 bg-primary-300 text-[12px] hover:bg-primary-500 hover:text-white cursor-pointer text-primary-500 capitalize font-semibold transition-all transform ease-in duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

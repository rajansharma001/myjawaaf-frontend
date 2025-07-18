"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiGraduationCap } from "react-icons/pi";
import { useAuth } from "../context/authContext";
import Image from "next/image";
import { UserProps } from "./dashboard/styles/inputField";
import FormButton from "./FormButton";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // const [cats, setCats] = useState<CategoryProps[]>([]);
  const [profileMenu, setProfileMenu] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProps>();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (search.trim()) query.append("search", search.trim());
    if (filterCategory) query.append("category", filterCategory);
    router.push(`/search?${query.toString()}`);
  };

  // const getCategories = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
  //   const result = await res.json();
  //   setCats(result.getCat);
  // };

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
    // getCategories();
    getUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full min-h-[60px] px-4 py-4 md:px-6 md:py-6 border-b-2 border-gray-200 gap-4 md:gap-0">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row justify-start items-center w-full md:w-[60%] gap-3 md:gap-5 px-0 md:px-5">
        <Link href="/" className="flex items-center gap-2">
          <PiGraduationCap className="text-primary-500 text-2xl font-bold" />
          <h1 className="text-heading font-semibold text-md">E-Tutor</h1>
        </Link>

        <form
          action=""
          onSubmit={handleSearch}
          className="w-full lg:w-[50%] md:w-[250px] flex gap-2 items-center"
        >
          {/* Category Dropdown */}
          {/* <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full md:w-auto p-1.5 text-[13px] text-gray-500 border border-gray-300 focus:outline-none"
          >
            <option value="">All Categories</option>
            {cats.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select> */}

          {/* Search Input */}
          <div className="flex items-center gap-2 w-full border border-gray-300 px-2">
            <CiSearch className="text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search your fav topic"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-1.5 text-[13px] text-gray-500 border-none focus:outline-none"
            />
          </div>
          <FormButton title="search" />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex justify-end items-center w-full md:w-[40%] gap-4">
        {!user ? (
          <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
            <Link href="/signin">
              <button className="py-1.5 px-3 cursor-pointer bg-primary-500 text-[12px] hover:bg-primary-300 hover:text-primary-500 text-white  capitalize font-semibold transition duration-300">
                Sign in
              </button>
            </Link>
            <Link href="/signup">
              <button className="py-1.5 px-3 cursor-pointer bg-primary-300 text-[12px] hover:bg-primary-500 hover:text-white text-primary-500  capitalize font-semibold transition duration-300">
                Create an Account
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 relative">
            <h1 className="text-[13px] font-semibold text-gray-500 capitalize">
              Hi, <strong>{userDetails?.fullname}</strong>
            </h1>
            {userDetails?.profileImg && (
              <Image
                src={`${userDetails.profileImg}`}
                alt="userImg"
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-400 cursor-pointer w-10 h-10"
                onClick={() => setProfileMenu(!profileMenu)}
              />
            )}
            {profileMenu && (
              <div className="absolute z-10 w-40 top-full left-1/2 -translate-x-1/2 mt-2 p-4 rounded-xl bg-gray-800 flex flex-col text-gray-200 text-[13px] transition-all duration-300 ease-in shadow-lg">
                <div>{user?.email}</div>
                <Link href="/student/dashboard" className="cursor-pointer">
                  Dashboard
                </Link>
                <Link
                  href="/student/dashboard/profile"
                  className="cursor-pointer"
                >
                  Profile
                </Link>
                <button
                  className="cursor-pointer"
                  onClick={async () => {
                    await logoutUser();
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

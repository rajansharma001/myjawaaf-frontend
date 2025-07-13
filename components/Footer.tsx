"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { PiGraduationCap } from "react-icons/pi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryProps } from "./dashboard/styles/inputField";

const Footer = () => {
  const [cats, setCats] = useState<CategoryProps[]>([]);

  const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
    const result = await res.json();
    setCats(result.getCat);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="bg-black py-10 w-full flex flex-col items-center justify-center border-t-2 border-gray-400">
      <div className="w-[90%] flex flex-col md:flex-row flex-wrap justify-between items-start gap-8 text-gray-400">
        {/* Brand Section */}
        <div className="w-full md:w-[45%] lg:w-[30%] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <PiGraduationCap className="text-primary-500 text-3xl font-bold" />
            <h1 className="text-gray-300 font-semibold text-2xl">E-Tutor</h1>
          </div>
          <p className="text-[12px] text-gray-400 max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nam
            autem. Corporis nesciunt in vel?
          </p>
          <div className="flex gap-3">
            <FaFacebookF
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition duration-200"
            />
            <FaInstagram
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition duration-200"
            />
            <FaYoutube
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition duration-200"
            />
            <FaLinkedinIn
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition duration-200"
            />
          </div>
        </div>

        {/* Top Category */}
        <div className="w-full md:w-[45%] lg:w-[20%] flex flex-col gap-3">
          <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
            Top Category
          </h1>
          <div className="flex flex-col gap-2">
            {cats &&
              cats.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/search?category=${cat._id}`}
                  className="text-[12px] hover:text-primary-200 transition duration-200"
                >
                  {cat.title}
                </Link>
              ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-[45%] lg:w-[20%] flex flex-col gap-3">
          <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
            Quick Links
          </h1>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Become Teacher
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Career
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="w-full md:w-[45%] lg:w-[20%] flex flex-col gap-3">
          <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
            Support
          </h1>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 transition duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

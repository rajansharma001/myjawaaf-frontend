"use client";
import React, { useEffect, useState } from "react";
import { FaAppleAlt } from "react-icons/fa";

const CourseCategoryCard = () => {
  const [cat, setCat] = useState();
  const category = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`);
    const result = await res.json();
    console.log("API WORKING?: ", result);
    setCat(result);
  };
  useEffect(() => {
    category();
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-16">
      <div>
        <h1 className="text-2xl py-3 text-heading capitalize font-semibold">
          Browse top category
        </h1>
      </div>
      <div className="w-[80%] flex justify-center items-center gap-4">
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] flex justify-center items-center gap-4">
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
        <div className="w-3/12 px-2 py-5 flex  justify-center gap-4 bg-purple-200 hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer">
          <div className="p-3 bg-white text-purple-500">
            <FaAppleAlt size={25} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[14px] text-heading font-semibold">
              Web Development
            </div>
            <div className="text-[12px] text-gray-600 font-semibold">
              Courses 350
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCategoryCard;

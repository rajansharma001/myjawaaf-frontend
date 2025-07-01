import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className="w-full flex flex-col ml-8 mt-8 gap-3">
      <Link
        href="/admin/dashboard"
        className=" text-[13px] text-gray-200 capitalize font-semibold"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard/course"
        className=" text-[13px] text-gray-200 capitalize font-semibold"
      >
        Create new Course
      </Link>
      <Link
        href="/admin/dashboard/courses"
        className=" text-[13px] text-gray-200 capitalize font-semibold"
      >
        All Courses
      </Link>
      <Link
        href="/admin/dashboard/category"
        className=" text-[13px] text-gray-200 capitalize font-semibold"
      >
        Manage Category
      </Link>
    </div>
  );
};

export default Menu;

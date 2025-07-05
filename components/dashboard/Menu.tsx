"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  BiAddToQueue,
  BiHome,
  BiListCheck,
  BiVideo,
  BiVideoPlus,
} from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { SiCratedb } from "react-icons/si";

interface Props {
  style?: string;
  iconStyle?: string;
}
const Menu = ({ style, iconStyle }: Props) => {
  return (
    <div className="w-full flex flex-col mt-16 gap-6 justify-start capitalize text-[13px]">
      <Link href="/admin/dashboard" className={`flex gap-2 items-center `}>
        <BiHome className={`${iconStyle}`} />{" "}
        <span className={`${style}`}>Dashboard</span>
      </Link>
      <Link
        href="/admin/dashboard/course"
        className={`flex gap-2 items-center `}
      >
        <SiCratedb className={`${iconStyle}`} />
        <span className={`${style}`}>Create new Course</span>
      </Link>
      <Link
        href="/admin/dashboard/courses"
        className={`flex gap-2 items-center `}
      >
        <BiListCheck className={`${iconStyle}`} />
        <span className={`${style}`}>All Courses</span>
      </Link>
      <Link
        href="/admin/dashboard/category"
        className={`flex gap-2 items-center `}
      >
        <MdManageSearch className={`${iconStyle}`} />
        <span className={`${style}`}> Manage Category</span>
      </Link>
      <Link
        href="/admin/dashboard/lesson"
        className={`flex gap-2 items-center `}
      >
        <BiVideo className={`${iconStyle}`} />
        <span className={`${style}`}>create new lesson</span>
      </Link>

      <Link
        href="/admin/dashboard/lessons"
        className={`flex gap-2 items-center `}
      >
        <BiVideoPlus className={`${iconStyle}`} />
        <span className={`${style}`}>All lessons</span>
      </Link>
      <Link
        href="/admin/dashboard/enroll"
        className={`flex gap-2 items-center `}
      >
        <BiAddToQueue className={`${iconStyle}`} />
        <span className={`${style}`}>Enroll</span>
      </Link>
    </div>
  );
};

export default Menu;

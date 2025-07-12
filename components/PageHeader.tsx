"use client";
import React from "react";

interface Props {
  title?: string;
  path: string;
}
const PageHeader = ({ title, path }: Props) => {
  return (
    <div className=" w-full flex justify-start lg:justify-center  items-center px-2 lg:px-6 md:px-6 py-3 lg:py-16 md:py-10   bg-primary-500 text-white font-bold text-[12px] lg:text-lg md:text-lg capitalize">
      <div className="w-full lg:w-[80%] md:w-[90%]  flex flex-col  ">
        {title}
        <h1 className="text-[12px] text-left "> {"Home" + path}</h1>
      </div>
    </div>
  );
};

export default PageHeader;

"use client";
import React from "react";

interface Props {
  title?: string;
  path: string;
}
const PageHeader = ({ title, path }: Props) => {
  return (
    <div className="py-10 px-50 bg-primary-500 text-white font-bold text-lg uppercase">
      {title}
      <h1 className="text-[12px] "> {"Home" + path}</h1>
    </div>
  );
};

export default PageHeader;

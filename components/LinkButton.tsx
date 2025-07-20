import Link from "next/link";
import React from "react";
import { URL, Url } from "url";

interface Props {
  title: string;
  link: string;
  style?: string;
}
const LinkButton = ({ title, link, style }: Props) => {
  return (
    <div className="w-full">
      <Link
        href={link}
        className={`${style} py-2 px-3  bg-primary-500 flex items-center justify-center text-[12px] hover:bg-primary-300 hover:text-primary-500 cursor-pointer text-white capitalize font-semibold transition-all transform ease-in duration-300`}
      >
        {title}
      </Link>
    </div>
  );
};

export default LinkButton;

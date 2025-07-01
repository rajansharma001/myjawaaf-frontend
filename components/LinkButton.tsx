import Link from "next/link";
import React from "react";
import { URL, Url } from "url";

interface Props {
  title: string;
  link: string;
}
const LinkButton = ({ title, link }: Props) => {
  return (
    <div>
      <Link
        href={link}
        className="py-1.5 px-3 bg-primary-500 flex w-fit items-center justify-center text-[12px] hover:bg-primary-300 hover:text-primary-500 cursor-pointer text-white capitalize font-semibold transition-all transform ease-in duration-300"
      >
        {title}
      </Link>
    </div>
  );
};

export default LinkButton;

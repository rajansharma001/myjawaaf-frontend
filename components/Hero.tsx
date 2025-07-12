import React from "react";
import Image from "next/image";
import LinkButton from "./LinkButton";

const Hero = () => {
  return (
    <div className="w-full  flex flex-col lg:flex-row md:flex-row justify-between bg-gray-100 overflow-hidden">
      <div className="w-full lg:w-[50%]  md:w-[50%] px-15 lg:ml-30 md:ml-30 gap-2.5 flex flex-col justify-center items-center lg:items-start md:items-start py-6">
        <h1 className="text-xl lg:text-4xl md:text-2xl font-bold capitalize text-heading text-center lg:text-left md:text-left">
          Learn with expert anytime any where
        </h1>
        <p className="text-sm lg:text-md lg:text:md capitalize text-justify lg:text-left md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          blanditiis inventore sapiente quas tempora! Ab!
        </p>
        <div className="w-full flex ">
          <LinkButton link={"/signup" as const} title={"Create Account"} />
        </div>
      </div>
      <div className="w-[50%] hidden lg:flex md:flex justify-center ">
        <Image
          src="/heroImg.jpg"
          alt="heroImage"
          className=" -skew-x-6 overflow-hidden"
          width={800}
          height={100}
        />
      </div>
    </div>
  );
};

export default Hero;

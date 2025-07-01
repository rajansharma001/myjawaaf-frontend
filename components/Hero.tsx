import React from "react";
import Image from "next/image";
import LinkButton from "./LinkButton";

const Hero = () => {
  return (
    <div className="w-full  flex justify-between bg-gray-100 overflow-hidden">
      <div className="w-[50%] px-40 gap-2.5 flex flex-col justify-center">
        <h1 className="text-4xl font-bold capitalize text-heading">
          Learn with expert anytime any where
        </h1>
        <p className="text-md capitalize">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          blanditiis inventore sapiente quas tempora! Ab!
        </p>
        <LinkButton link={"/signup" as const} title={"Create Account"} />
      </div>
      <div className="w-[50%] flex justify-center">
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

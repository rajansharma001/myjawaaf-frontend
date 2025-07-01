import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import LinkButton from "./LinkButton";

const CourseCard = () => {
  return (
    <div className="w-full py-16 gap-4 bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-heading text-2xl capitalize font-semibold py-3">
        Best Selling Courses
      </h1>
      <div className="w-[80%] flex gap-4">
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
      </div>
      <div className="w-[80%] flex gap-4">
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
        <div className="bg-white w-1/5 flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300">
          <Image src="/heroImg.jpg" width={400} height={100} alt="courseImg" />
          <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
            <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
              Web Development
            </span>
            <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
              $57.58
            </span>
          </div>
          <h1 className="text-[13px] px-2 font-semibold text-heading">
            FullStack Bootcamp - Ultimate Course for beginers
          </h1>
          <div className="w-full border-b-1 border-gray-200"></div>
          <div className="w-full p-1 flex justify-between items-center text-[12px]">
            <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
              <FaStar /> 5
            </div>
            <div className="px-3  text-gray-600 font-semibold rounded-sm">
              578 Students
            </div>
          </div>
          <div className="w-full border-b-1 border-gray-200"></div>

          <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
            <LinkButton link="/#" title="Preview" />
            <LinkButton link="/#" title="Purchase" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

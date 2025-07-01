import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { PiGraduationCap } from "react-icons/pi";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black  py-10  w-full flex flex-col items-center justify-center  border-t-2 border-gray-400">
      <div className="flex justify-between items-center mb-3  w-[80%] text-gray">
        <div className="w-4/12 gap-3 flex flex-col justify-center  ">
          <div className="flex w-full items-center gap-2">
            <PiGraduationCap className="text-primary-500 text-3xl font-bold" />
            <h1 className="text-gray-300 font-semibold  text-2xl ">E-Tutor</h1>
          </div>
          <p className="text-[12px] text-gray w-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nam
            autem. Corporis nesciunt in vel?
          </p>
          <div className="flex gap-3 items-start ">
            <FaFacebookF
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition ease-in duration-200"
            />
            <FaInstagram
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition ease-in duration-200"
            />
            <FaYoutube
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition ease-in duration-200"
            />
            <FaLinkedinIn
              size={30}
              className="bg-primary-500 hover:bg-primary-300 hover:text-primary-500 text-white p-2 cursor-pointer transition ease-in duration-200"
            />
          </div>
        </div>
        <div className="w-3/12 flex flex-col justify-center items-start gap-3  text-gray-400">
          <div>
            <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
              Top Category
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-[12px]  text-gray cursor-pointer hover:text-primary-200 transition-all duration-200 ease-in"
            >
              Web Development
            </Link>
            <Link
              href="#"
              className="text-[12px] text-gray cursor-pointer hover:text-primary-200 transition-all duration-200 ease-in"
            >
              Mobile Development
            </Link>
            <Link
              href="#"
              className="text-[12px] text-gray cursor-pointer hover:text-primary-200 transition-all duration-200 ease-in"
            >
              Blockchain Development
            </Link>
            <Link
              href="#"
              className="text-[12px] text-gray cursor-pointer hover:text-primary-200 transition-all duration-200 ease-in"
            >
              Fullstack Development
            </Link>
          </div>
        </div>
        <div className="w-3/12 flex flex-col justify-center items-start gap-3  text-gray-400">
          <div>
            <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
              Quick Links
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200  text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Become Teacher
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Career
            </Link>
          </div>
        </div>
        <div className="w-2/12 flex flex-col justify-center items-start gap-3  text-gray-400">
          <div>
            <h1 className="text-[16px] text-gray-300 capitalize font-semibold">
              Support
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200  text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-[12px] hover:text-primary-200 text-gray cursor-pointer transition-all duration-200 ease-in"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

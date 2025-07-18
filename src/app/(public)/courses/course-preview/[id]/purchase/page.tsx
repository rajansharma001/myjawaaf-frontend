"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../../context/useProtected";
import { useAuth } from "../../../../../../../context/authContext";
import {
  CourseProps,
  enrollProps,
  input,
  lable,
} from "../../../../../../../components/dashboard/styles/inputField";
import { RiUserStarLine } from "react-icons/ri";
import { BiChart } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaLanguage,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import Image from "next/image";
import FormButton from "../../../../../../../components/FormButton";
import { CiSettings } from "react-icons/ci";
import LinkButton from "../../../../../../../components/LinkButton";

const Purchase = () => {
  useProtectedRoute(["student", "admin"]);
  const { user } = useAuth();

  const currentUser = user && user;
  const [course, setCourse] = useState<CourseProps>();
  const params = useParams();
  const courseId = params.id;
  const [courseIdForSubmit, setCourseIdForSubmit] = useState("");
  const [enroll, setEnroll] = useState<enrollProps[]>([]);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    courseId: courseId,
    receipt: "",
  });

  const getCourse = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`,
        { method: "GET" }
      );
      const result = await res.json();
      setCourse(result.getCourseById);
      setCourseIdForSubmit(result.getCourseById._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target;

    setFormData((prev) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      }
      return { ...prev, [name]: value };
    });
  };

  const form = new FormData();
  form.append("userId", user && user._id);
  form.append("courseId", courseIdForSubmit);
  form.append("receipt", formData.receipt);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/enroll/enroll-course`,
        { method: "POST", credentials: "include", body: form }
      );
      const result = await res.json();
      if (!res.ok) {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      } else {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEnrolls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enrollments`,
        { method: "GET", credentials: "include" }
      );
      const result = await res.json();
      setEnroll(result.getEnrollById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
    getEnrolls();
  }, []);
  return (
    <div className="w-full flex flex-col md:flex-row lg:flex-row  justify-center items-center">
      <div className="w-full lg:w-[80%] md:w-[90%] flex flex-col-reverse  lg:flex-row md:flex-row  justify-center gap-6 lg:p-6 md:p-3 p-2">
        <div className="w-full  lg:w-[50%] ">
          <div className="w-full shadow-lg shadow-gray-500 border-2 border-gray-300 p-3">
            <h1 className="text-gray-600 font-semibold text-[13px]">
              Personal Details
            </h1>
            <div className="w-full">
              <label className={`${lable}`} htmlFor="fullname">
                Name
              </label>
              <p className={`${input}`}>{currentUser?.fullname}</p>
            </div>
            <div className="w-full">
              <label className={`${lable}`} htmlFor="phone">
                Phone
              </label>
              <p className={`${input}`}>{currentUser?.phone}</p>
            </div>
            <div className="w-full">
              <label className={`${lable}`} htmlFor="email">
                Email
              </label>
              <p className={`${input}`}>{currentUser?.email}</p>
            </div>
          </div>
          <div className="w-full sticky top-10 h-fit mt-8 flex flex-col gap-2 shadow-lg shadow-gray-500 border-2 border-gray-300">
            <div className="p-4 flex justify-between items-center text-[13px]">
              {course?.isFree ? (
                <div className="w-full flex justify-between items-center gap-3 ">
                  <div className=" px-2 text-[13px] text-primary-500 bg-primary-200">
                    Free
                  </div>
                  <div className="line-through">${course?.price}</div>
                </div>
              ) : (
                <div className="w-full flex justify-between items-center">
                  <div>${course?.price}</div>
                  <div className=" px-2 text-[13px] text-primary-500 bg-primary-200">
                    {course?.discount}%
                  </div>
                </div>
              )}
            </div>
            <div className="w-full border-b-gray-300 border-b-2"></div>
            <div className="w-full flex flex-col">
              <img
                src={course?.thumbnail}
                alt={course?.title}
                className="w-full"
                height={720}
                width={400}
              />

              <div className="w-full px-6">{course?.title}</div>
            </div>
            <div className="w-full border-b-gray-300 border-b-2"></div>
            <div className="w-full flex justify-center items-center">
              <div className="w-full p-4 flex flex-col gap-3">
                <div className="w-full flex justify-between text-[13px] text-gray-600">
                  <div className="flex gap-2 justify-center items-center">
                    <RiUserStarLine size={18} /> Enrolled Students
                  </div>
                  <div>{course?.studentCount || "0"} Students</div>
                </div>
                <div className="w-full flex justify-between text-[13px] text-gray-600">
                  <div className="flex gap-2 justify-center items-center">
                    <BiChart size={18} /> Course Level
                  </div>
                  <div>{course?.level}</div>
                </div>
                <div className="w-full flex justify-between text-[13px] text-gray-600">
                  <div className="flex gap-2 justify-center items-center">
                    <FaLanguage size={18} /> Language
                  </div>
                  <div>{course?.language}</div>
                </div>
              </div>
            </div>

            <div className="w-full border-b-gray-300 border-b-2"></div>
            <div className="flex   flex-col gap-2 items-start p-4 justify-start">
              <h1 className="text-[13px] capitalize font-semibold text-gray-600">
                Share this course:
              </h1>
              <div className="flex gap-2">
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
          </div>
        </div>
        {enroll && enroll?.some((e: enrollProps) => e.courseId === courseId) ? (
          <div className="w-[50%]">
            <div className="w-full flex flex-col gap-6 ">
              <div className="shadow-lg shadow-gray-500 border-2 border-gray-300 p-6 gap-3 flex flex-col">
                {enroll && enroll?.some((e) => e.hasAccess !== false) ? (
                  <div className="w-full">
                    <h1 className="  text-gray-600 font-semibold text-[13px] text-center">
                      You are already enrolled this course. Please proceed to
                      learning.
                    </h1>
                    <LinkButton
                      link={`/courses/course-preview/${courseId}/learn`}
                      title={"Continue Learning"}
                    />
                  </div>
                ) : (
                  <h1 className="text-[13px] text-gray-500">
                    You are already enrolled this course. Please wait for your
                    payment verification. <br /> OR contact support.
                  </h1>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full  lg:w-[50%">
            <div className="w-full flex flex-col gap-6 ">
              <div className="shadow-lg shadow-gray-500 border-2 border-gray-300 p-3">
                <h1 className="text-gray-600 font-semibold text-[13px] text-center">
                  Bank Account Details
                </h1>
                <div className="w-full border-b-gray-300 py-2 mb-2 border-b-2"></div>

                <div className="w-full gap-2 flex justify-around text-[13px] text-gray-500 font-semibold">
                  <div className="w-[3/12]">
                    <Image
                      src="/randomqr.png"
                      alt=""
                      height={200}
                      width={200}
                      className="w-[100px]"
                    />
                  </div>
                  <div className="w-[9/12] flex flex-col">
                    <span>Bank Name: Children Bank Of Moon</span>
                    <span>Account Number: 07459563268745</span>{" "}
                    <span>Swift Code: SWF453</span>{" "}
                    <span>
                      Branch: Moon landing point, 45 st. (Nearby Earth)
                    </span>
                  </div>
                </div>
              </div>
              <div className="shadow-lg shadow-gray-500 border-2 border-gray-300 p-3">
                <h1 className="text-gray-600 font-semibold text-[13px] text-center">
                  Upload Receipt
                </h1>
                <div className="w-full border-b-gray-300 py-2 mb-2 border-b-2"></div>
                {hasMsg && (
                  <div className=" w-full flex flex-col justify-center items-center bg-white p-6 border-1 border-gray-300 mb-5">
                    <p className="text-[12px] font-semibold capitalize text-red-400">
                      {msg}
                    </p>
                  </div>
                )}
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <CiSettings className="animate-spin" />
                    loading
                  </div>
                ) : (
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className=" flex flex-col gap-3"
                  >
                    <input
                      type="file"
                      name="receipt"
                      accept="image/*"
                      required
                      onChange={handleChange}
                      className={`${input}`}
                    />
                    <input
                      type="text"
                      name="courseId"
                      onChange={handleChange}
                      value={courseIdForSubmit}
                      className={`${input}`}
                      hidden
                    />

                    <FormButton title="Submit" />
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;

"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  button,
  CourseProps,
  enrollProps,
  LessonProps,
  UserProps,
} from "../../../../../../components/dashboard/styles/inputField";
import { BiChart, BiVideo } from "react-icons/bi";
import PageHeader from "../../../../../../components/PageHeader";
import { CgLock } from "react-icons/cg";
import { RiUserStarLine } from "react-icons/ri";
import {
  FaFacebookF,
  FaInstagram,
  FaLanguage,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import LinkButton from "../../../../../../components/LinkButton";

const PreviewCourse = () => {
  const path = usePathname();
  const [overView, setOverView] = useState(true);
  const [curriculum, setCurriculum] = useState(false);
  const [instructor, setInstructor] = useState(false);
  const [review, setReview] = useState(false);
  const [course, setCourse] = useState<CourseProps>();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [lessons, setLessons] = useState<LessonProps[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [preview, setPreview] = useState(false);
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);

  const params = useParams();
  const courseId = params.id;

  const getUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
      });
      const result = await res.json();
      setUsers(result.getUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getEnrolls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments`,
        { method: "GET", credentials: "include" }
      );
      const result = await res.json();
      setEnrolls(result.getEnrollById);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourse = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`,
        { method: "GET" }
      );
      const result = await res.json();
      setCourse(result.getCourseById);
    } catch (error) {
      console.log(error);
    }
  };

  const getLesson = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lesson/${courseId}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setLessons(result.getLesson);
    } catch (error) {
      console.log(error);
    }
  };
  const previewVideoUrl = lessons.find((l) => l.isPreview)?.videoUrl;

  useEffect(() => {
    getCourse();
    getUsers();
    getLesson();
    getEnrolls();
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10 relative flex-col ">
      <div className="w-full p-0 ">
        <PageHeader path={path} title={course?.title} />
      </div>
      <div className="w-[80%] flex justify-center  sticky gap-12">
        <div className="w-8/12 flex flex-col py-4 px-6 gap-3">
          <h1 className="text-[24px] text-gray-700 capitalize font-semibold">
            {course?.title}
          </h1>
          <p className="text-[13px] text-gray-500 font-medium capitalize">
            {course?.description.split(" ").slice(0, 20).join(" ") + "..."}
          </p>
          <div className="w-full flex justify-between mt-5">
            <div className="flex justify-center items-center gap-2">
              <Image
                alt="instructor_img"
                src="/defaultUser.jpeg"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 capitalize">
                  Created By
                </span>
                <span className="text-[13px] text-gray-600 capitalize font-semibold">
                  {users &&
                    users.find((u) => u._id === course?.createdBy)?.fullname}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center text-[13px] text-gray-600 capitalize font-semibold">
              ⭐⭐⭐⭐⭐ 4.8
            </div>
          </div>
          <div className="w-full">
            {!preview ? (
              <video
                controls
                className="w-full"
                src={`http://localhost:4000/uploads/${previewVideoUrl}`}
              ></video>
            ) : (
              <video
                controls
                className="w-full"
                src={`http://localhost:4000/uploads/${previewUrl}`}
              ></video>
            )}
          </div>

          <div className="w-full flex justify-between p-2 px-6 border-b-1 border-gray-200">
            <button
              onClick={() => {
                setOverView(true);
                setCurriculum(false);
                setInstructor(false);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-left text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Overview
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(true);
                setInstructor(false);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-center text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Course Content
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(false);
                setInstructor(true);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-center text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Instructor
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(false);
                setInstructor(false);
                setReview(true);
              }}
              className="text-[14px] w-3/12 text-right text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Review
            </button>
          </div>
          {overView && (
            <div className="w-full py-4">
              <h1 className="text-md  py-3 capitalize text-gray-600 font-semibold">
                Description
              </h1>
              <p className="text-[13px] text-gray-500 capitalize text-justify">
                {course?.description}
              </p>
            </div>
          )}
          {curriculum && (
            <div className="py-4 w-full flex flex-col">
              <h1 className="text-md py-3 capitalize text-gray-600 font-semibold">
                Course Content
              </h1>

              <div
                className={` px-2 transition-all transform duration-300 ease-in-out`}
              >
                {lessons &&
                  lessons.map((lesson) => (
                    <div
                      key={lesson._id}
                      className="w-full hover:shadow-2xl hover:bg-primary-500 hover:text-white flex justify-between items-center p-2 mt-1 border-1 border-gray-300 text-[13px] capitalize font-medium text-gray-500 gap-2 cursor-pointer transition-all duration-300 ease-in-out"
                    >
                      <Link href="/#">{lesson.title}</Link>
                      <div className=" flex gap-2 items-center">
                        {lesson.isPreview ? (
                          <div
                            onClick={() => {
                              setPreview(true);
                              setPreviewUrl(lesson.videoUrl);
                            }}
                            className="flex gap-2 justify-center items-center"
                          >
                            Preview <BiVideo />
                          </div>
                        ) : (
                          <CgLock />
                        )}
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {instructor && (
            <div className="w-full flex justify-between mt-5">
              <div className="flex justify-center items-center gap-2">
                <Image
                  alt="instructor_img"
                  src="/defaultUser.jpeg"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] text-gray-500 capitalize">
                    Created By
                  </span>
                  <span className="text-[13px] text-gray-600 capitalize font-semibold">
                    {users &&
                      users.find((u) => u._id === course?.createdBy)?.fullname}
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center text-[13px] text-gray-600 capitalize font-semibold">
                ⭐⭐⭐⭐⭐ 4.8
              </div>
            </div>
          )}
          {review && <div>review</div>}
        </div>
        <div className="w-4/12 sticky top-10 h-fit mt-8 flex flex-col gap-2 shadow-lg shadow-gray-500 border-2 border-gray-300">
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
          <div className="w-full p-4 flex flex-col gap-3">
            <div className="w-full flex justify-between text-[13px] text-gray-600">
              <div className="flex gap-2 justify-center items-center">
                <RiUserStarLine size={18} /> Enrolled Students
              </div>
              <div>{course?.studentCount}</div>
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

          {enrolls &&
          enrolls.find((e) => e.courseId === course?._id)?.userId ? (
            <div className="w-full p-2">
              <LinkButton link="/#" title={"Continue Learning"} />
            </div>
          ) : (
            <div className="w-full flex justify-between items-center p-2">
              {course?.isFree ? (
                <LinkButton
                  title="Get Now"
                  link={`/courses/course-preview/${course?._id}/purchase`}
                />
              ) : (
                <LinkButton
                  title="Purchase Now"
                  link={`/courses/course-preview/${course?._id}/purchase`}
                />
              )}
            </div>
          )}
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
    </div>
  );
};

export default PreviewCourse;

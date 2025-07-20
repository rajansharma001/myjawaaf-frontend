"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import LinkButton from "./LinkButton";
import {
  CategoryProps,
  CourseProps,
  enrollProps,
} from "./dashboard/styles/inputField";
import { useAuth } from "../context/authContext";

const CourseCard = () => {
  const { user } = useAuth();
  console.log(user);
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);

  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const getCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setCategories(result.getCat);
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
      setEnrolls(result.getEnrollById);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourse = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course`, {
        method: "GET",
      });
      const result = await res.json();
      setCourses(result.getCourse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
    getCategory();
    getEnrolls();
  }, []);
  return (
    <div className="w-full py-16 gap-4 bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl py-3 text-heading capitalize font-semibold">
        Browse top Courses
      </h1>
      <div className="w-[80%] grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-2xl flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300"
            >
              <Image
                src={`${course.thumbnail || "/signup.jpg"}`}
                width={720}
                height={420}
                alt="courseImg"
                className="max-h-35 aspect-square object-cover "
              />
              <div className="w-full px-2 flex justify-between items-center text-[12px] shadow-2xl shadow-amber-400">
                <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
                  {categories &&
                    categories.find((c) => c._id === course.categoryId)?.title}
                </span>
                <span className="px-3 py-1  text-primary-500 font-semibold rounded-sm">
                  {course.isFree ? (
                    <span>Free</span>
                  ) : (
                    <span>${course.price}</span>
                  )}
                </span>
              </div>
              <h1 className="text-[13px] px-2 font-semibold text-heading">
                {course.title}
              </h1>
              <div className="w-full border-b-1 border-gray-200"></div>
              <div className="w-full p-1 flex justify-between items-center text-[12px]">
                <div className=" px-3 flex items-center justify-center  text-primary-500 font-semibold rounded-sm">
                  <FaStar /> 5
                </div>
                <div className="px-3  text-gray-600 font-semibold rounded-sm">
                  {course.studentCount ? course.studentCount : "0"} Enrollments
                </div>
              </div>
              <div className="w-full border-b-1 border-gray-200"></div>

              <div className="w-full px-3 mb-2 flex justify-between items-center capitalize text-[12px]">
                {enrolls &&
                enrolls.find((e) => e.courseId === course._id && e.hasAccess)
                  ?.userId ? (
                  <div className="w-full">
                    <LinkButton
                      link={`/courses/course-preview/${course._id}/learn`}
                      title={"Continue Learning"}
                    />
                  </div>
                ) : (
                  <div className="w-full gap-2 flex justify-between items-center">
                    <LinkButton
                      link={`/courses/course-preview/${course._id}`}
                      title="Preview"
                    />
                    <LinkButton
                      link={`/courses/course-preview/${course._id}/purchase`}
                      title={course.isFree ? "get now" : "Purchase"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <h1 className="text-[13px] w-full text-center text-gray-600 font-bold">
              coruse not found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import {
  CategoryProps,
  CourseProps,
  enrollProps,
} from "../../../../../../components/dashboard/styles/inputField";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../../../../../../context/authContext";

const EnrolledPending = () => {
  useProtectedRoute(["admin", "student"]);
  const { user } = useAuth();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);
  const [courses, setCourses] = useState<CourseProps[]>([]);

  const getEnrolls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enrollments`,
        {
          method: "GET",
          credentials: "include",
        }
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
  const userEnroll = Array.isArray(enrolls)
    ? enrolls.filter((e) => e.userId.toString() === user && user._id.toString())
    : [];

  const userCourse =
    Array.isArray(courses) &&
    courses.filter((c) =>
      userEnroll.some((e) => e.courseId === c._id && e.hasAccess === false)
    );

  useEffect(() => {
    getCategory();
    getEnrolls();
    getCourse();
  }, []);
  return (
    <div className="w-full py-5 gap-4 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full px-6">
        <h1 className="text-[13px] text-left capitalize font-semibold">
          Verification Pending Courses
        </h1>
      </div>
      <div className="w-full lg:w-[80%] md:w-[90%] grid lg:grid-cols-2  md:grid-cols-2 grid-cols-1   lg:gap-8 md:gap-4 gap-2">
        {userCourse &&
          userCourse.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-2xl flex flex-col gap-2 hover:shadow-sm hover:shadow-primary-500 transition-all hover:-translate-y-2 ease-in-out duration-300"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${course.thumbnail}`}
                width={720}
                height={420}
                alt="courseImg"
                className="max-h-35 aspect-square "
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnrolledPending;

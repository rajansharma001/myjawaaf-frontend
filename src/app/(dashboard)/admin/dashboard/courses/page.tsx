"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import { CourseProps } from "../../../../../../components/dashboard/styles/inputField";
import { useAuth } from "../../../../../../context/authContext";
import Image from "next/image";

const AllCourses = () => {
  useProtectedRoute(["admin"]);
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseProps[] | null>([]);
  const [cat, setCat] = useState([]);

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/course/get-course`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setCourses(result.getCourse);
  };

  const getCat = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/category/get-category`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setCat(result.fetchCategory);
  };

  useEffect(() => {
    getCourse();
    getCat();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="min-w-fit border border-gray-300 rounded-md">
          <div className="flex bg-gray-100 font-semibold text-[12px] text-gray-700">
            <div className="w-40 h-8 flex items-center justify-center border-r border-gray-300">
              Title
            </div>
            <div className="w-40 h-8 flex items-center justify-center border-r border-gray-300">
              Slug
            </div>

            <div className="w-30 h-8 flex items-center justify-center border-r border-gray-300">
              Thumbnail
            </div>
            <div className="w-30 h-8 flex items-center justify-center border-r border-gray-300">
              Category ID
            </div>
            <div className="w-20 h-8 flex items-center justify-center border-r border-gray-300">
              Is Free
            </div>
            <div className="w-25 h-8 flex items-center justify-center border-r border-gray-300">
              Price
            </div>
            <div className="w-20 h-8 flex items-center justify-center border-r border-gray-300">
              Discount
            </div>
            <div className="w-25 h-8 flex items-center justify-center border-r border-gray-300">
              Level
            </div>
            <div className="w-20 h-8 flex items-center justify-center border-r border-gray-300">
              Language
            </div>
            <div className="w-25 h-8 flex items-center justify-center border-r border-gray-300">
              Published
            </div>

            <div className="w-20 h-8 flex items-center justify-center">
              Created By
            </div>
          </div>

          <div className="overflow-y-scroll h-150 ">
            {courses?.map((course) => (
              <div
                key={course._id}
                className=" flex text-[12px] text-gray-800 border-t bg-white border-gray-200  "
              >
                <div className="w-40 h-16 flex items-center justify-center border-r border-gray-100 ">
                  {course.title}
                </div>
                <div className="w-40 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.slug}
                </div>
                <div className="w-30 h-16 flex items-center justify-center border-r border-gray-100">
                  <Image
                    src={`/defaultuser.jpeg`}
                    alt="thumbnail"
                    height={50}
                    width={50}
                  />
                </div>
                <div className="w-30 h-16 flex items-center justify-center border-r border-gray-100">
                  {cat.find((c: any) => c._id === course.categoryId)?.title ||
                    "unknown"}
                </div>
                <div className="w-20 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.isFree ? "Free" : "Paid"}
                </div>
                <div className="w-25 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.price}
                </div>
                <div className="w-20 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.discount}
                </div>
                <div className="w-25 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.level}
                </div>
                <div className="w-20 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.language}
                </div>
                <div className="w-25 h-16 flex items-center justify-center border-r border-gray-100">
                  {course.isPublished ? "Published" : "Unpublished"}
                </div>

                <div className="w-20 h-16 flex items-center justify-center ">
                  {course.createdBy === user._id && user.fullname}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;

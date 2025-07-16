"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FaStar } from "react-icons/fa";
import {
  CategoryProps,
  CourseProps,
  enrollProps,
} from "../../../../components/dashboard/styles/inputField";
import LinkButton from "../../../../components/LinkButton";

const SearchContent = () => {
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const fetchFilteredCourses = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/courses?search=${search}&category=${category}`,
        { method: "GET" }
      );
      const result = await res.json();
      setCourses(result);
    } catch (error) {
      console.log("Error fetching filtered courses:", error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/category`,
        { method: "GET" }
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
        `${process.env.NEXT_PUBLIC_API_URL}api/enrollments`,
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

  useEffect(() => {
    fetchFilteredCourses();
    getCategory();
    getEnrolls();
  }, []);

  return (
    <div className="w-full py-16 bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mb-8 text-gray-700">
        Showing results for:{" "}
        <span className="text-primary-500">{search || "All Courses"}</span>
      </h1>
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md flex flex-col gap-2 hover:shadow-primary-300 transition-transform hover:-translate-y-2"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${course.thumbnail}`}
                width={720}
                height={420}
                alt="courseImg"
                className="aspect-video object-cover rounded-t"
              />
              <div className="w-full px-2 py-2 flex justify-between items-center text-[12px]">
                <span className="p-1 px-2 text-[10px] flex items-center justify-center bg-primary-300 text-primary-500 font-semibold rounded-sm">
                  {typeof course.categoryId === "string"
                    ? "unknown"
                    : course.categoryId?.title}
                </span>
                <span className="text-sm font-semibold text-primary-500">
                  {course.isFree ? "Free" : `$${course.price}`}
                </span>
              </div>
              <h2 className="text-sm px-2 font-semibold">{course.title}</h2>
              <div className="w-full border-b border-gray-200" />
              <div className="w-full px-3 py-1 flex justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1 text-primary-500">
                  <FaStar /> 5
                </div>
                <div>{course.studentCount || 0} Enrollments</div>
              </div>
              <div className="w-full border-b border-gray-200" />
              <div className="w-full px-3 pb-3 flex justify-between items-center text-xs">
                {enrolls &&
                enrolls.find((e) => e.courseId === course._id)?.userId ? (
                  <LinkButton
                    link={`/courses/course-preview/${course._id}/learn`}
                    title="Continue Learning"
                  />
                ) : (
                  <div className="w-full flex gap-2 justify-between">
                    <LinkButton
                      link={`/courses/course-preview/${course._id}`}
                      title="Preview"
                    />
                    <LinkButton
                      link={`/courses/course-preview/${course._id}/purchase`}
                      title={course.isFree ? "Get Now" : "Purchase"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm col-span-full">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;

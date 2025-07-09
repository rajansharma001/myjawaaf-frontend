"use client";
import React, { useEffect, useState } from "react";
import { CategoryProps, CourseProps } from "./dashboard/styles/inputField";

const CourseCategoryCard = () => {
  const [cats, setCats] = useState<CategoryProps[]>([]);
  const [course, setCourse] = useState<CourseProps[]>([]);

  const category = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: "GET",
    });
    const result = await res.json();
    setCats(result.getCat);
  };

  const getCourse = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course`, {
        method: "GET",
      });
      const result = await res.json();
      setCourse(result.getCourse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    category();
    getCourse();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-16">
      <div>
        <h1 className="text-2xl py-3 text-heading capitalize font-semibold">
          Browse top category
        </h1>
      </div>
      <div className="w-[80%] flex justify-center items-center gap-4">
        {cats &&
          cats.map((cat) => (
            <div
              key={cat._id}
              className="w-2/12 px-2 py-5 flex  justify-center gap-4 bg-primary-500 text-white hover:shadow-sm hover:shadow-purple-500 transition-all hover:-translate-y-2 duration-300 ease-out cursor-pointer"
            >
              <div className="flex flex-col justify-center">
                <div className="text-[12px] font-semibold capitalize">
                  {cat.title}
                </div>
                <div className="text-[10px] text-gray-200 font-semibold">
                  {course &&
                    course.filter((c) => c.categoryId === cat._id).length}{" "}
                  Courses
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseCategoryCard;

"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import {
  button,
  CourseProps,
} from "../../../../../../components/dashboard/styles/inputField";
import { useAuth } from "../../../../../../context/authContext";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import UpdateCourse from "../../../../../../components/dashboard/UpdateCourse";

interface CatProps {
  title: string;
  _id: string;
}
const AllCourses = () => {
  useProtectedRoute(["admin"]);
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseProps[] | null>();
  const [cat, setCat] = useState([]);

  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [updatePop, setUpdatePop] = useState(false);
  const [courseId, setCourseId] = useState("");

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

  const handleDelete = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/course/delete-course/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg("Course deleted successfully.");
        getCourse();
      }
    } catch (error) {
      console.log(error);
    }
  };
  setTimeout(() => {
    setHasMsg(false);
  }, 3000);

  const updateTable = () => {
    getCourse();
  };

  useEffect(() => {
    getCourse();
    getCat();
    updateTable();
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full">
        {hasMsg && (
          <div className=" w-full flex flex-col justify-center items-center bg-white p-6 border-1 border-gray-300 mb-5">
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <CiSettings className="animate-spin" />
            loading
          </div>
        )}
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
              Action
            </div>
          </div>

          <div className="overflow-y-scroll h-150 ">
            {courses?.map((course) => (
              <div
                key={course._id}
                className=" flex text-[12px] text-gray-800 border-t bg-white border-gray-200"
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
                  {cat.find((c: CatProps) => c._id === course.categoryId)
                    ?.title || "unknown"}
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

                <div className="w-20 h-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setUpdatePop(true);
                      setCourseId(course._id as string);
                    }}
                    className={`${button}`}
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className={`${button}`}
                  >
                    <FiDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* update pop */}

      {updatePop && (
        <div className="w-full shadow-md shadow-gray-400  absolute inset-0 top-0 backdrop-blur-2xl p-6">
          <div className="w-full flex justify-end">
            <button
              onClick={() => setUpdatePop(false)}
              className={`${button} `}
            >
              close
            </button>
          </div>
          <UpdateCourse courseId={courseId} updateTable={updateTable} />
        </div>
      )}
    </div>
  );
};

export default AllCourses;

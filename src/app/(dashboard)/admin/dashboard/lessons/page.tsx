"use client";
import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import {
  button,
  CourseProps,
  LessonProps,
} from "../../../../../../components/dashboard/styles/inputField";
import UpdateLesson from "../../../../../../components/dashboard/UpdateLesson";

const Lessons = () => {
  useProtectedRoute(["admin"]);

  const [loading, setLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [lesson, setLesson] = useState<LessonProps[] | null>([]);
  const [updatePop, setUpdatePop] = useState(false);
  const [lessonId, setlessonId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState<CourseProps[] | null>([]);

  const getLesson = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/lesson/get-lesson`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setLesson(result.getLesson);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourse = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/course/get-course`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setCourse(result.getCourse);
      console.log("course fetcing or not: ", result.getCourse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (lessonId: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/lesson/delete-lesson/${lessonId}`,
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
        setMsg(result.msg);
        getLesson();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTable = () => {
    getLesson();
  };
  useEffect(() => {
    getLesson();
    getCourse();
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

            <div className="w-40 h-8 flex items-center justify-center border-r border-gray-300">
              VideoUrl
            </div>
            <div className="w-50 h-8 flex items-center justify-center border-r border-gray-300">
              Course
            </div>
            <div className="w-20 h-8 flex items-center justify-center border-r border-gray-300">
              Is Preview
            </div>
            <div className="w-35 h-8 flex items-center justify-center border-r border-gray-300">
              duration
            </div>
            <div className="w-50 h-8 flex items-center justify-center border-r border-gray-300">
              description
            </div>

            <div className="w-20 h-8 flex items-center justify-center">
              Action
            </div>
          </div>

          <div className="overflow-y-scroll h-150 ">
            {lesson?.map((lesson) => (
              <div
                key={lesson._id}
                className=" flex text-[12px] text-gray-800 border-t bg-white border-gray-200"
              >
                <div className="w-40 h-16 flex items-center justify-center border-r border-gray-100 ">
                  {lesson.title}
                </div>
                <div className="w-40 h-16 flex items-center justify-center border-r border-gray-100">
                  {lesson.slug}
                </div>
                <div className="w-40 h-16 flex items-center justify-center border-r border-gray-100">
                  <Image
                    src={`/defaultuser.jpeg`}
                    alt="videoUrl"
                    height={50}
                    width={50}
                  />
                </div>
                <div className="w-50 h-16 flex items-center justify-center border-r border-gray-100">
                  {course?.find((c: CourseProps) => c._id === lesson.courseId)
                    ?.title || "unkown"}
                </div>
                <div className="w-20 h-16 flex items-center justify-center border-r border-gray-100">
                  {lesson.isPreview ? "Yes" : "No"}
                </div>
                <div className="w-35 h-16 flex items-center justify-center border-r border-gray-100">
                  {lesson.duration}
                </div>
                <div className="w-50 h-16 flex items-center justify-center border-r border-gray-100">
                  {lesson.description}
                </div>

                <div className="w-20 h-16 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setUpdatePop(true);
                      setlessonId(lesson._id as string);
                    }}
                    className={`${button}`}
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(lesson._id as string)}
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
          <UpdateLesson lessonId={lessonId} updateTable={updateTable} />
        </div>
      )}
    </div>
  );
};

export default Lessons;

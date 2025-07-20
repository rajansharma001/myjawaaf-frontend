"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import {
  button,
  CourseProps,
  LessonProps,
} from "../../../../../../components/dashboard/styles/inputField";
import { useAuth } from "../../../../../../context/authContext";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import UpdateCourse from "../../../../../../components/dashboard/UpdateCourse";
import PopUpMsg from "../../../../../../components/dashboard/DeletePopUpMsg";

interface CatProps {
  title: string;
  _id: string;
}
const AllCourses = () => {
  useProtectedRoute(["admin"]);
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseProps[] | null>();
  const [cat, setCat] = useState<CatProps[]>([]);

  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessonPop, setLessonPop] = useState(false);
  const [updatePop, setUpdatePop] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [lesson, setLesson] = useState<LessonProps[]>([]);
  const [deletePop, setDeletePop] = useState(false);
  const [deleteFuncId, setDeleteFuncId] = useState("");

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/get-course`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/category/get-category`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setCat(result.fetchCategory);
  };

  const getLesson = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/lesson/get-course-lesson/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setLesson(result.getLessonByCourseId);
  };
  const handleDelete = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/delete-course/${id}`,
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
      setDeletePop(false);
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

  const deletePopRemove = () => {
    setDeletePop(false);
  };

  return (
    <div className="w-full relative">
      {deletePop && (
        <PopUpMsg
          deleteFunc={() => handleDelete(deleteFuncId)}
          cancelState={deletePopRemove}
        />
      )}

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
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px] border border-gray-300 rounded-md overflow-scroll h-150">
            <div className="flex w-full bg-gray-100 font-semibold text-[12px] text-gray-700">
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                lesson
              </div>
              <div className="w-2/12 h-8 flex items-center justify-center border-r border-gray-300">
                Title
              </div>

              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Thumbnail
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Category ID
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Is Free
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Price
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Discount
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Level
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Language
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                Published
              </div>
              <div className="w-1/12 h-8 flex items-center justify-center">
                Action
              </div>
            </div>

            <div>
              {courses?.map((course) => (
                <div
                  key={course._id}
                  className=" flex text-[12px] text-gray-800 border-t bg-white border-gray-200"
                >
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100 ">
                    <button
                      className={`${button}`}
                      onClick={() => {
                        getLesson(course._id as string);
                        setLessonPop(true);
                      }}
                    >
                      View Lesson
                    </button>
                  </div>
                  <div className="w-2/12 h-16 flex items-center justify-center border-r border-gray-100 ">
                    {course.title}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    <Image
                      src={`${
                        course?.thumbnail ? course?.thumbnail : "/signin.webp"
                      }`}
                      alt="thumbnail"
                      height={50}
                      width={50}
                      className=" object-cover h-16 w-full p-2"
                    />
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {cat.find((c: CatProps) => c._id === course.categoryId)
                      ?.title || "unknown"}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.isFree ? "Free" : "Paid"}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.price}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.discount}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.level}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.language}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center border-r border-gray-100">
                    {course.isPublished ? "Published" : "Unpublished"}
                  </div>
                  <div className="w-1/12 h-16 flex items-center justify-center gap-2">
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
                      onClick={() => {
                        setDeleteFuncId(course?._id as string);
                        setDeletePop(true);
                      }}
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
      </div>

      {/* update pop */}

      {updatePop && (
        <div className="w-full shadow-md shadow-gray-400  absolute inset-0 top-0 ">
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

      {/* lesson pop */}
      <div>
        {lessonPop && (
          <div className="w-full absolute inset-0 top-0 backdrop-blur-2xl overflow-x-auto h-150">
            <div className="flex justify-end items-end p-2">
              <button
                onClick={() => setLessonPop(false)}
                className={`${button}`}
              >
                close
              </button>
            </div>

            <div className="min-w-[1000px] border border-gray-300 rounded-md mx-auto">
              <div className="flex w-full bg-gray-100 font-semibold text-[12px] text-gray-700">
                <div className="w-2/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Title
                </div>
                <div className="w-2/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Slug
                </div>
                <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                  VideoUrl
                </div>
                <div className="w-3/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Course
                </div>
                <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Is Preview
                </div>
                <div className="w-1/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Duration
                </div>
                <div className="w-2/12 h-8 flex items-center justify-center border-r border-gray-300">
                  Description
                </div>
              </div>

              <div className="overflow-y-scroll h-150">
                {lesson?.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="flex w-full text-[12px] text-gray-800 border-t bg-white border-gray-200"
                  >
                    <div className="w-2/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      {lesson.title}
                    </div>
                    <div className="w-2/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      {lesson.slug}
                    </div>
                    <div className="w-1/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      <video
                        className="h-15 w-[80%]"
                        controls
                        src={`${lesson.videoUrl}`}
                      />
                    </div>
                    <div className="w-3/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      {courses?.find(
                        (c: CourseProps) => c._id === lesson.courseId
                      )?.title || "unknown"}
                    </div>
                    <div className="w-1/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      {lesson.isPreview ? "Yes" : "No"}
                    </div>
                    <div className="w-1/12 h-16 flex items-center justify-start p-2 border-r border-gray-100">
                      {lesson.duration}
                    </div>
                    <div className="w-2/12 h-16 flex items-center  overflow-hidden justify-start p-2 border-r border-gray-100">
                      {lesson.description.slice(0, 55)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;

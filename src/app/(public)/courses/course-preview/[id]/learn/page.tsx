"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../../context/useProtected";
import { useParams } from "next/navigation";
import {
  CourseProps,
  LessonProps,
} from "../../../../../../../components/dashboard/styles/inputField";
import { BiVideo } from "react-icons/bi";

const Learn = () => {
  useProtectedRoute(["admin", "student"]);
  const params = useParams();
  const courseId = params.id;
  const [course, setCourse] = useState<CourseProps>();
  const [lessons, setLessons] = useState<LessonProps[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");

  const getCourse = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/lesson/${courseId}`,
        { method: "GET" }
      );
      const result = await res.json();
      setLessons(result.getLesson);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
    getLesson();
  }, []);

  useEffect(() => {
    if (lessons.length > 0 && !previewUrl) {
      setPreviewUrl(lessons[0].videoUrl);
      setLessonTitle(lessons[0].title);
      setLessonDescription(lessons[0].description);
    }
  }, [lessons]);
  return (
    <div className="w-full flex flex-col justify-center items-center p-0">
      <div className="w-full flex lg:justify-center justify-start  py-3 bg-primary-500">
        <div className="lg:w-[80%] md:w-[90%] w-full px-2  bg-primary-500 text-gray-100 text-[14px] font-semibold">
          <h1>{course?.title}</h1>
        </div>
      </div>
      <div className="w-full lg:w-[80%] md:w-full md:px-6 flex flex-col justify-center">
        <div className="w-full flex flex-col lg:flex-row md:flex-row py-6">
          <div className="w-full lg:w-8/12 md:w-full border-2 border-gray-200 shadow-2xl">
            <video
              controls
              className="w-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${previewUrl}`}
            ></video>

            <div className="w-full flex flex-col p-2 gap-2">
              <h1 className="text-[12px] lg:text-[16px] md:text-[14px] font-semibold capitalize text-gray-500">
                Lesson Details
              </h1>
              <div className="w-fulltext-[12px] lg:text-[14px] md:text-[13px] font-semibold capitalize text-gray-500">
                Title: {lessonTitle}
              </div>
              <div className="w-full text-[12px] font-semibold capitalize text-gray-500">
                Description: {lessonDescription}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 md:w-4/12 lg:p-3 md:p-2 shadow-2xl border-2 border-gray-200">
            <div
              className={` px-2 transition-all transform duration-300 ease-in-out`}
            >
              <h1 className="text-[12px] lg:text-[13px] md:text-[13px] font-semibold text-gray-500">
                Course Content
              </h1>
              {lessons &&
                lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    onClick={() => {
                      setPreviewUrl(lesson.videoUrl);
                      setLessonTitle(lesson.title);
                      setLessonDescription(lesson.description);
                    }}
                    className="w-full hover:shadow-2xl hover:bg-primary-500 hover:text-white flex justify-between items-center p-2 mt-1 border-1 border-gray-300 text-[12px] lg:text-[13px] md:text-[13px] capitalize font-medium text-gray-500 gap-2 cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    <div className=" w-full flex gap-2 items-center justify-between">
                      <div className="flex gap-2 justify-center items-center">
                        <BiVideo />
                        <h1>{lesson.title}</h1>
                      </div>
                      <div>{lesson.duration}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;

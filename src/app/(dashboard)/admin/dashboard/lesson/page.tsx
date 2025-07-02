"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import {
  CourseProps,
  input,
  lable,
  LessonProps,
} from "../../../../../../components/dashboard/styles/inputField";
import FormButton from "../../../../../../components/FormButton";
import { CiSettings } from "react-icons/ci";

const Lesson = () => {
  useProtectedRoute(["admin"]);

  const [loading, setLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");

  const [course, setCourse] = useState<CourseProps[] | null>([]);
  const [formData, setFormData] = useState<LessonProps>({
    title: "",
    slug: "",
    videoUrl: "",
    duration: "",
    isPreview: false,
    description: "",
    courseId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      return { ...prev, [name]: value };
    });
  };

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/course/get-course`,
      { method: "GET", credentials: "include" }
    );
    const result = await res.json();
    setCourse(result.getCourse);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/lesson/create-lesson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
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
        setFormData({
          title: "",
          slug: "",
          videoUrl: "",
          duration: "",
          isPreview: false,
          description: "",
          courseId: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    setHasMsg(false);
  }, 3000);

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="w-full p-6 flex flex-col">
      <div className="w-full">
        {hasMsg && (
          <div className=" w-full flex flex-col justify-center items-center bg-white p-6 border-1 border-gray-300 mb-5">
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <CiSettings className="animate-spin" />
            loading
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-2">
              <div className="w-3/12">
                <label htmlFor="courseId" className={`${lable}`}>
                  Course
                </label>
                <select
                  name="courseId"
                  id=""
                  className={`${input}`}
                  onChange={handleChange}
                  value={formData.courseId}
                >
                  {course?.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-3/12">
                <label htmlFor="title" className={`${lable}`}>
                  Lesson Topic
                </label>
                <input
                  type="text"
                  name="title"
                  className={`${input}`}
                  onChange={handleChange}
                  value={formData.title}
                  placeholder="Lesson topic"
                />
              </div>
              <div className="w-3/12">
                <label htmlFor="title" className={`${lable}`}>
                  Lesson Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  className={`${input}`}
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Lesson slug"
                />
              </div>
              <div className="w-3/12">
                <label htmlFor="videoUrl" className={`${lable}`}>
                  videoUrl
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  className={`${input}`}
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="videoUrl"
                />
              </div>
              <div className="w-3/12">
                <label htmlFor="duration" className={`${lable}`}>
                  duration
                </label>
                <input
                  type="text"
                  name="duration"
                  className={`${input}`}
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Lesson duration"
                />
              </div>
            </div>
            <div className="w-full flex gap-2">
              <div className="w-10/12">
                <label htmlFor="description" className={`${lable}`}>
                  Lesson description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${input}`}
                  id=""
                ></textarea>
              </div>
              <div className="w-1/12 flex flex-col gap-0 justify-center items-center">
                <label htmlFor="isPreview" className={`${lable} text-center`}>
                  isPreview
                </label>
                <input
                  type="checkbox"
                  name="isPreview"
                  checked={formData.isPreview}
                  onChange={handleChange}
                  className={`${input} p-3`}
                />
              </div>
              <div className="w-1/12 flex gap-0 justify-center items-center">
                <FormButton title="submit" />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Lesson;

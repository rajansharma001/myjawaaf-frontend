import React, { useEffect, useState } from "react";
import { CourseProps, input, lable, LessonProps } from "./styles/inputField";
import { CiSettings } from "react-icons/ci";
import FormButton from "../FormButton";
import { useProtectedRoute } from "../../context/useProtected";

interface Props {
  lessonId: string;
  updateTable: () => void;
}
const UpdateLesson = ({ lessonId, updateTable }: Props) => {
  useProtectedRoute(["admin"]);

  const [loading, setLoading] = useState(false);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [course, setCourse] = useState<CourseProps[] | null>([]);
  const [formData, setFormData] = useState({
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
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      } else if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      }
      const file = e.target.files?.[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, videoUrl: file }));
      }
      return { ...prev, [name]: value };
    });
  };

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/course/get-course`,
      { method: "GET", credentials: "include" }
    );
    const result = await res.json();
    setCourse(result.getCourse);
  };

  const getLesson = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/lesson/get-lesson/${lessonId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      console.log(result.getLessonById);
      setFormData({
        title: result.getLessonById.title || "",
        slug: result.getLessonById.slug || "",
        videoUrl: result.getLessonById.videoUrl || "",
        duration: result.getLessonById.duration || "",
        isPreview: result.getLessonById.isPreview || false,
        description: result.getLessonById.description || "",
        courseId: result.getLessonById.courseId || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const form = new FormData();
    form.append("title", formData.title),
      form.append("slug", formData.slug),
      form.append("videoUrl", formData.videoUrl),
      form.append("isPreview", String(formData.isPreview)),
      form.append("duration", formData.duration),
      form.append("description", formData.description),
      form.append("courseId", formData.courseId),
      e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/lesson/update-lesson/${lessonId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
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
        updateTable();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
    getLesson();
  }, []);
  //   console.log("getLessonDetailsByID :", formData);
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
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover"
                  />
                )}
                <input
                  type="file"
                  name="videoUrl"
                  className={`${input}`}
                  accept="video/*"
                  onChange={handleChange}
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

export default UpdateLesson;

"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  CourseProps,
  input,
  lable,
  languages,
  levels,
} from "./styles/inputField";
import { useProtectedRoute } from "../../context/useProtected";
import { useAuth } from "../../context/authContext";
import { CiSettings } from "react-icons/ci";
import FormButton from "../FormButton";

interface Props {
  courseId: string;
  updateTable: () => void;
}
const UpdateCourse = ({ courseId, updateTable }: Props) => {
  console.log("Id for fetch: ", courseId);

  useProtectedRoute(["admin"]);
  const { user } = useAuth();
  const [course, setCourses] = useState<CourseProps | null>();
  const [cat, setCat] = useState([]);

  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    categoryId: "",
    isFree: false,
    price: "",
    discount: "",
    level: "",
    language: "",
    isPublished: false,
  });

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/get-course/${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    console.log("final check", result.getCourseById?.title);
    setFormData({
      title: result.getCourseById?.title || "",
      slug: result.getCourseById?.slug || "",
      description: result.getCourseById?.description || "",
      thumbnail: result.getCourseById?.thumbnail || "",
      categoryId: result.getCourseById?.categoryId || "",
      isFree: result.getCourseById?.isFree || false,
      price: result.getCourseById?.price || "",
      discount: result.getCourseById?.discount || "",
      level: result.getCourseById?.level || "",
      language: result.getCourseById?.language || "",
      isPublished: result.getCourseById?.isPublished || false,
    });
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked }; // boolean
      }
      return { ...prev, [name]: value }; // string/number
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/update-course/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
        setFormData({
          title: "",
          slug: "",
          description: "",
          thumbnail: "",
          categoryId: "",
          isFree: false,
          price: "",
          discount: "",
          level: "",
          language: "",
          isPublished: false,
        });
        updateTable();
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
    getCat();
  }, []);

  return (
    <div>
      <div className=" w-full p-6">
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
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5 items-center justify-center"
          >
            <div className="flex w-full gap-3">
              <div className="w-4/12">
                <label className={`${lable}`} htmlFor="title">
                  Title
                </label>
                <input
                  className={`${input}`}
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Course title"
                />
              </div>
              <div className="w-4/12">
                <label className={`${lable}`} htmlFor="slug">
                  Slug
                </label>
                <input
                  className={`${input}`}
                  value={formData.slug}
                  onChange={handleChange}
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="course slug"
                />
              </div>
              <div className="w-4/12">
                <label className={`${lable}`} htmlFor="thumbnail">
                  Thumbnail URL
                </label>
                <input
                  className={`${input}`}
                  value={formData.thumbnail}
                  onChange={handleChange}
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="course thumbnail"
                />
              </div>
            </div>

            <div className="flex w-full gap-3">
              <div className="w-4/12">
                {" "}
                <label className={`${lable}`} htmlFor="language">
                  Language
                </label>
                <select
                  name="language"
                  id=""
                  className={`${input}`}
                  value={formData.language}
                  onChange={handleChange}
                >
                  {languages.map((lang, index) => (
                    <option key={index} value={lang} className={``}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-4/12">
                {" "}
                <label className={`${lable}`} htmlFor="categoryId">
                  Category
                </label>
                <select
                  name="categoryId"
                  id=""
                  className={`${input}`}
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  {cat.map((cat: any) => (
                    <option key={cat._id} value={cat._id} className={``}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-2/12 flex justify-center items-center ">
                <label className={`${lable}`} htmlFor="isFree">
                  Is Free
                </label>
                <input
                  className={`${input}`}
                  checked={formData.isFree}
                  onChange={handleChange}
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                />
              </div>
              <div className="w-2/12 flex justify-center items-center ">
                <label className={`${lable}`} htmlFor="isPublished">
                  Is Published
                </label>
                <input
                  className={`${input}`}
                  checked={formData.isPublished}
                  onChange={handleChange}
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                />
              </div>
            </div>

            <div className="flex w-full gap-3">
              <div className="w-4/12">
                <label className={`${lable}`} htmlFor="price">
                  Price
                </label>
                <input
                  className={`${input}`}
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Course price"
                />
              </div>
              <div className="w-4/12">
                {" "}
                <label className={`${lable}`} htmlFor="discount">
                  Discount (%)
                </label>
                <input
                  className={`${input}`}
                  value={formData.discount}
                  onChange={handleChange}
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="dicount price"
                />
              </div>
              <div className="w-4/12">
                <label className={`${lable}`} htmlFor="level">
                  Level
                </label>
                <select
                  name="level"
                  id=""
                  className={`${input}`}
                  value={formData.level}
                  onChange={handleChange}
                >
                  {levels.map((level, index) => (
                    <option key={index} value={level} className={``}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="w-10/12">
                <label className={`${lable}`} htmlFor="description">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  id="description"
                  name="description"
                  className={`${input}`}
                  placeholder="Course description"
                ></textarea>
              </div>

              <div className="w-2/12 flex justify-center items-center">
                <FormButton title="Submit" />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateCourse;

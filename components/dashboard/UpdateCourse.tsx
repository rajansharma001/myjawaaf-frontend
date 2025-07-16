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
    const { name, type, value, checked, files } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked }; // boolean
      } else if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else return { ...prev, [name]: value }; // string/number
    });
  };

  const form = new FormData();
  form.append("title", formData.title);
  form.append("slug", formData.slug);
  form.append("description", formData.description);
  form.append("thumbnail", formData.thumbnail); // 👈 File object
  form.append("categoryId", formData.categoryId as string);
  form.append("isFree", String(formData.isFree));
  form.append("price", formData.price);
  form.append("discount", formData.discount);
  form.append("level", formData.level);
  form.append("language", formData.language);
  form.append("isPublished", String(formData.isPublished));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/update-course/${courseId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
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
    <div className="w-full backdrop-blur-3xl bg-white p-2 rounded-2xl shadow-2xl">
      <div className="w-full lg:p-4 md:p-4 p-2">
        {hasMsg && (
          <div className="w-full flex flex-col justify-center items-center bg-white p-6 border border-gray-300 mb-5">
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
            <div className="flex flex-wrap w-full gap-2">
              <div className="w-full lg:w-4/12 md:w-4/12">
                <label className={`${lable}`} htmlFor="title">
                  Title
                </label>
                <input
                  className={`${input} min-w-0 w-full`}
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Course title"
                />
              </div>
              <div className="w-full lg:w-4/12 md:w-4/12">
                <label className={`${lable}`} htmlFor="slug">
                  Slug
                </label>
                <input
                  className={`${input} min-w-0 w-full`}
                  value={formData.slug}
                  onChange={handleChange}
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="Course slug"
                />
              </div>
              <div className="w-full lg:w-3/12 md:w-3/12">
                <label className={`${lable}`} htmlFor="thumbnail">
                  Thumbnail URL
                </label>
                <input
                  className={`${input}`}
                  type="file"
                  onChange={handleChange}
                  name="thumbnail"
                />
                {/* <input
                  className={`${input} min-w-0 w-full`}
                  value={formData.thumbnail}
                  onChange={handleChange}
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Course thumbnail"
                /> */}
              </div>
            </div>

            <div className="flex flex-wrap w-full gap-2">
              <div className="w-full lg:w-3/12 md:w-3/12">
                <label className={`${lable}`} htmlFor="language">
                  Language
                </label>
                <select
                  name="language"
                  className={`${input} min-w-0 w-full`}
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="">Select Language</option>
                  {languages.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full lg:w-3/12 md:w-3/12">
                <label className={`${lable}`} htmlFor="categoryId">
                  Category
                </label>
                <select
                  name="categoryId"
                  className={`${input} min-w-0 w-full`}
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {cat &&
                    cat.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full lg:w-2/12 md:w-2/12 flex flex-col justify-center items-center">
                <label className={`${lable} text-center`} htmlFor="isFree">
                  Is Free
                </label>
                <input
                  className={`${input} min-w-0 w-auto`}
                  checked={formData.isFree}
                  onChange={handleChange}
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                />
              </div>
              <div className="w-full lg:w-2/12 md:w-2/12 flex flex-col justify-center items-center">
                <label className={`${lable} text-center`} htmlFor="isPublished">
                  Is Published
                </label>
                <input
                  className={`${input} min-w-0 w-auto`}
                  checked={formData.isPublished}
                  onChange={handleChange}
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                />
              </div>
            </div>

            <div className="flex flex-wrap w-full gap-4">
              <div className="w-full lg:w-4/12 md:w-4/12">
                <label className={`${lable}`} htmlFor="price">
                  Price
                </label>
                <input
                  className={`${input} min-w-0 w-full`}
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Course price"
                />
              </div>
              <div className="w-full lg:w-4/12 md:w-4/12">
                <label className={`${lable}`} htmlFor="discount">
                  Discount (%)
                </label>
                <input
                  className={`${input} min-w-0 w-full`}
                  value={formData.discount}
                  onChange={handleChange}
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="Discount percentage"
                />
              </div>
              <div className="w-full lg:w-3/12 md:w-4/12">
                <label className={`${lable}`} htmlFor="level">
                  Level
                </label>
                <select
                  name="level"
                  className={`${input} min-w-0 w-full`}
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  {levels.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap w-full gap-4">
              <div className="w-full md:w-12/12">
                <label className={`${lable}`} htmlFor="description">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  id="description"
                  name="description"
                  className={`${input} min-w-0 w-full`}
                  placeholder="Course description"
                ></textarea>
              </div>
              <div className="w-full md:w-2/12 flex justify-center items-center">
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

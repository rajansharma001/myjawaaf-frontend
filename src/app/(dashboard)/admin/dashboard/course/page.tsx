"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import FormButton from "../../../../../../components/FormButton";
import {
  CourseProps,
  input,
  lable,
  languages,
  levels,
} from "../../../../../../components/dashboard/styles/inputField";
import { useAuth } from "../../../../../../context/authContext";
import { CiSettings } from "react-icons/ci";

const Course = () => {
  useProtectedRoute(["admin"]);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const [formData, setFormData] = useState<CourseProps>({
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
  useEffect(() => {
    getCat();
  }, []);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/course/create-course`,
        {
          method: "POST",
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
      }
    } catch (error) {
      setMsg(`${error}`);
    }
  };

  console.log(formData);
  setTimeout(() => {
    setHasMsg(false);
  }, 3000);
  return (
    <div className=" w-full lg:p-6 md:p-4 p-2">
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
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 items-center justify-center"
        >
          <div className="flex flex-col lg:flex-row md:flex-row w-full gap-3">
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
            <div className="lg:w-4/12 md:w-4/12 w-full ">
              <label className={`${lable}`} htmlFor="thumbnail">
                Thumbnail URL
              </label>

              <input
                className={`${input}`}
                type="file"
                onChange={handleChange}
                name="thumbnail"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row w-full gap-3">
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
                <option value="">Select Language</option>

                {languages.map((lang, index) => (
                  <option key={index} value={lang} className={``}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:w-4/12 md:w-4/12 w-full ">
              {" "}
              <label className={`${lable}`} htmlFor="categoryId">
                Category
              </label>
              <select
                name="categoryId"
                id=""
                className={`${input}`}
                value={formData.categoryId as string}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {cat &&
                  cat.map((cat: any) => (
                    <option key={cat._id} value={cat._id} className={``}>
                      {cat.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className=" lg:w-2/12 md:w-2/12 w-full  flex justify-center items-center ">
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
            <div className="lg:w-2/12 md:w-2/12 w-full flex justify-center items-center ">
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

          <div className="flex flex-col lg:flex-row md:flex-row w-full gap-3">
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
            <div className="lg:w-4/12 md:w-4/12 w-full ">
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
          <div className="flex flex-col lg:flex-row md:flex-row w-full gap-3">
            <div className="lg:w-10/12 md:w-10/12 w-full">
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

            <div className="lg:w-2/12 md:w-1/12 w-full flex justify-center items-center">
              <FormButton title="Submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Course;

import React, { FormEvent, useState } from "react";
import { input, lable } from "./styles/inputField";
import { CiSettings } from "react-icons/ci";
import FormButton from "../FormButton";

const CategoryForm = () => {
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/category/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const result = await res.json();

      if (!res.ok) {
        setLoading(false);
        setHasMsg(true);
        setMsg(`Please check all required form field.`);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(`Category created successfully.`);
        setFormData({
          title: "",
          slug: "",
          description: "",
        });
      }
    } catch (error) {
      console.log("server error");
      setMsg(`something went wrong: ${error}`);
    }

    setTimeout(() => {
      setHasMsg(false);
    }, 3000);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {hasMsg && (
          <div className=" w-[60%] flex flex-col justify-center items-center bg-white p-6 border-1 border-gray-300 mb-5">
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <CiSettings className="animate-spin" />
          loading
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="w-full flex flex-col gap-5 items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <div className="w-[60%]">
              <label className={`${lable}`} htmlFor="title">
                Title
              </label>
              <input
                className={`${input}`}
                onChange={handleChange}
                value={formData.title}
                type="text"
                id="title"
                placeholder="category title"
                name="title"
              />
            </div>
            <div className="w-[60%]">
              <label className={`${lable}`} htmlFor="slug">
                Slug
              </label>
              <input
                className={`${input}`}
                onChange={handleChange}
                value={formData.slug}
                type="text"
                id="slug"
                name="slug"
                placeholder="category slug"
              />
            </div>
            <div className="w-[60%]">
              <label className={`${lable}`} htmlFor="description">
                Description
              </label>
              <textarea
                rows={2}
                onChange={handleChange}
                value={formData.description}
                id="description"
                name="description"
                className={`${input}`}
                placeholder="category description"
              ></textarea>
            </div>
            <div className="w-2/12 flex justify-center items-center">
              <FormButton title="Submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryForm;

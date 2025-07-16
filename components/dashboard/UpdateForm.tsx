import React, { FormEvent, useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import FormButton from "../FormButton";
import { button, input, lable } from "./styles/inputField";

interface Props {
  id: string;
}
const UpdateForm = ({ id }: Props) => {
  console.log("id coming: ", id);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [catId, setCatId] = useState("");
  const [popup, setPopup] = useState(false);

  const [category, setCategory] = useState();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });

  const getCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/category/get-category/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setCategory(result.fetchCat);

      setFormData({
        title: result.fetchCat?.title || "",
        slug: result.fetchCat?.slug || "",
        description: result.fetchCat?.description || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/category/update-category/${id}`,
        {
          method: "PATCH",
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
        setMsg(`Please check all required form field.${result.msg}`);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(`Category Updated successfully.`);
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
    <div className="w-full px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center">
        {hasMsg && (
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center bg-white p-4 sm:p-6 border border-gray-300 mb-5">
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
          onSubmit={handleUpdate}
          className="w-full flex flex-col gap-5 items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
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

            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
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

            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
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

            <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[20%] flex justify-center items-center">
              <FormButton title="Submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;

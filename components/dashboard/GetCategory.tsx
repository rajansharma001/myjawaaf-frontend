import React, { FormEvent, useEffect, useState } from "react";
import { button, input, lable } from "./styles/inputField";
import { FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import UpdateForm from "./UpdateForm";

interface Props {
  _id: string;
  title: string;
  slug: string;
  description: string;
}
const GetCategory = () => {
  const [category, setCategory] = useState<Props[]>([]);
  const [catId, setCatId] = useState("");
  const [popUpdateOpen, setPopUpdateOpen] = useState(false);
  const getCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/category/get-category`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setCategory(result.fetchCategory);
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/category/delete-category/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await res.json();
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handlePop = () => {
    setPopUpdateOpen(!popUpdateOpen);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-5xl border border-gray-300 rounded overflow-hidden shadow-sm text-[13px] ">
        {/* Table Header */}
        <div className="flex bg-white text-gray-700 font-semibold text-center">
          <div className="w-1/12 p-2 border-r border-gray-300">S.No.</div>
          <div className="w-3/12 p-2 border-r border-gray-300">Title</div>
          <div className="w-2/12 p-2 border-r border-gray-300">Slug</div>
          <div className="w-4/12 p-2">Description</div>
          <div className="w-2/12 p-2">Action</div>
        </div>

        {/* Table Rows */}
        <div className="overflow-y-scroll h-60 text-center overflow-hidden">
          {Array.isArray(category) && category.length > 0 ? (
            category.map((cat, index) => (
              <div
                key={cat._id}
                className="flex border-t  border-gray-200 hover:bg-gray-50 transition "
              >
                <div className="w-1/12 p-2 border-r border-gray-200  text-gray-600">
                  {index + 1}
                </div>
                <div className="w-3/12 p-2 border-r border-gray-200  text-gray-800">
                  {cat.title}
                </div>
                <div className="w-2/12 p-2 border-r border-gray-200  text-gray-800">
                  {cat.slug}
                </div>

                <div className="w-4/12 p-2 text-gray-700">
                  {cat.description}
                </div>
                <div className="w-2/12 p-2 text-gray-700 flex gap-3 justify-center items-center">
                  <button
                    onClick={() => {
                      deleteCategory(cat._id);
                    }}
                    className={`${button}`}
                  >
                    <FiDelete />
                  </button>
                  <button
                    onClick={() => {
                      setCatId(cat._id);
                      setPopUpdateOpen(true);
                    }}
                    className={`${button}`}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500">
              No categories found.
            </div>
          )}
        </div>
      </div>

      {popUpdateOpen && (
        <div className="absolute w-full inset-0 top-0 z-10 shadow-sm p-3 bg-gray-100">
          <div className="w-full flex items-center justify-end">
            <button
              className={`${button} `}
              onClick={() => setPopUpdateOpen(false)}
            >
              Close{" "}
            </button>
          </div>

          <UpdateForm id={catId} />
        </div>
      )}
    </div>
  );
};

export default GetCategory;

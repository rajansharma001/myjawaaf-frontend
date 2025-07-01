"use client";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import CategoryForm from "../../../../../../components/dashboard/CategoryForm";
import GetCategory from "../../../../../../components/dashboard/GetCategory";

const Category = () => {
  useProtectedRoute(["admin"]);

  return (
    <div className=" w-full p-4 relative">
      <CategoryForm />
      <GetCategory />
    </div>
  );
};

export default Category;

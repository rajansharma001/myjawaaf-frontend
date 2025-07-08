"use client";
import React from "react";
import PageHeader from "../../../../components/PageHeader";
import { usePathname } from "next/navigation";
import CourseCard from "../../../../components/CourseCard";

const Courses = () => {
  const currentPath = usePathname();

  return (
    <div className="w-full">
      <div className="w-full">
        <PageHeader path={currentPath} title="Courses" />
      </div>

      <div className="w-full">
        <CourseCard />
      </div>
    </div>
  );
};

export default Courses;

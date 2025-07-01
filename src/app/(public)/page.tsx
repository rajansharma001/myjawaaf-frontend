import React from "react";
import Hero from "../../../components/Hero";
import CourseCategoryCard from "../../../components/CourseCategoryCard";
import CourseCard from "../../../components/CourseCard";

const Home = () => {
  return (
    <div className=" w-full flex flex-col">
      <Hero />
      <CourseCategoryCard />
      <CourseCard />
    </div>
  );
};

export default Home;

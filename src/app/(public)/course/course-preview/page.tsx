"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const PreviewCourse = () => {
  const [overView, setOverView] = useState(true);
  const [curriculum, setCurriculum] = useState(false);
  const [instructor, setInstructor] = useState(false);
  const [review, setReview] = useState(false);
  const [lessonTab, setLessonTab] = useState(false);
  return (
    <div className="w-full flex justify-center py-10 relative">
      <div className="w-[80%] flex justify-center sticky gap-12">
        <div className="w-8/12 flex flex-col py-4 px-6 gap-3">
          <h1 className="text-[24px] text-gray-700 capitalize font-semibold">
            Complete Website Responsive Design: from Figma to Webflow to Website
            Design
          </h1>
          <p className="text-[15px] text-gray-500 font-medium capitalize">
            3 in 1 Course: Learn to design websites with Figma, build with
            Webflow, and make a living freelancing.
          </p>
          <div className="w-full flex justify-between mt-5">
            <div className="flex justify-center items-center gap-2">
              <Image
                alt="instructor_img"
                src="/defaultUser.jpeg"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 capitalize">
                  Created By
                </span>
                <span className="text-[13px] text-gray-600 capitalize font-semibold">
                  Rajan Sharma
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center text-[13px] text-gray-600 capitalize font-semibold">
              ⭐⭐⭐⭐⭐ 4.8
            </div>
          </div>
          <div className="w-full">
            <iframe
              className="w-full h-[400px]"
              src="https://www.youtube.com/embed/l-KjjfRX5Uw?si=WwqSwMFJm0hSeghq"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <div className="w-full flex justify-between p-2 px-6 border-b-1 border-gray-200">
            <button
              onClick={() => {
                setOverView(true);
                setCurriculum(false);
                setInstructor(false);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-left text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Overview
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(true);
                setInstructor(false);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-center text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Curriculum
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(false);
                setInstructor(true);
                setReview(false);
              }}
              className="text-[14px] w-3/12 text-center text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Instructor
            </button>
            <button
              onClick={() => {
                setOverView(false);
                setCurriculum(false);
                setInstructor(false);
                setReview(true);
              }}
              className="text-[14px] w-3/12 text-right text-gray-600 capitalize cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            >
              Review
            </button>
          </div>
          {overView && (
            <div className="w-full py-4">
              <h1 className="text-md  py-3 capitalize text-gray-600 font-semibold">
                Description
              </h1>
              <p className="text-[13px] text-gray-500 capitalize text-justify">
                It gives you a huge self-satisfaction when you look at your work
                and say, "I made this!". I love that feeling after I'm done
                working on something. When I lean back in my chair, look at the
                final result with a smile, and have this little "spark joy"
                moment. It's especially satisfying when I know I just made
                $5,000. I do! And that's why I got into this field. Not for the
                love of Web Design, which I do now. But for the LIFESTYLE! There
                are many ways one can achieve this lifestyle. This is my way.
                This is how I achieved a lifestyle I've been fantasizing about
                for five years. And I'm going to teach you the same. Often
                people think Web Design is complicated. <br /> <br />
                That it needs some creative talent or knack for computers. Sure,
                a lot of people make it very complicated. People make the
                simplest things complicated. Like most subjects taught in the
                universities. But I don't like complicated. I like easy. I like
                life hacks. I like to take the shortest and simplest route to my
                destination. I haven't gone to an art school or have a computer
                science degree. I'm an outsider to this field who hacked himself
                into it, somehow ending up being a sought-after professional.
                That's how I'm going to teach you Web Design. <br /> <br /> So
                you're not demotivated on your way with needless complexity. So
                you enjoy the process because it's simple and fun. So you can
                become a Freelance Web Designer in no time. For example, this is
                a Design course but I don't teach you Photoshop. Because
                Photoshop is needlessly complicated for Web Design. But people
                still teach it to web designers. I don't. I teach Figma - a
                simple tool that is taking over the design world. You will be
                designing a complete website within a week while others are
                still learning how to create basic layouts in Photoshop. <br />{" "}
                <br /> Second, this is a Development course. But I don't teach
                you how to code. Because for Web Design coding is needlessly
                complicated and takes too long to learn. Instead, I teach
                Webflow - a tool that is taking over the web design world. You
                will be building complex websites within two weeks while others
                are still learning the basics of HTML & CSS. Third, this is a
                Freelancing course. But I don't just teach you how to write
                great proposals. <br /> <br /> I give you a winning proposal
                template. When you're done with the course, you will have a
                stunning portfolio website with portfolio pieces already in it.
                Buy this course now and take it whenever the time is right for
                you.
              </p>
            </div>
          )}
          {curriculum && (
            <div className="py-4 w-full flex flex-col">
              <h1 className="text-md py-3 capitalize text-gray-600 font-semibold">
                Curriculum
              </h1>
              <div
                onClick={() => setLessonTab(!lessonTab)}
                className={` ${
                  lessonTab ? "opacity-100 scale-101" : "opacity-100 scale-100"
                } w-full flex justify-start items-center p-2 border-1 border-gray-300 text-[13px] capitalize font-semibold text-gray-500 gap-2 cursor-pointer transition-all duration-300 ease-in-out`}
              >
                {lessonTab ? (
                  <MdKeyboardArrowDown size={20} />
                ) : (
                  <MdKeyboardArrowUp size={20} />
                )}
                lesson 1: Introduction
              </div>
              {lessonTab && (
                <div
                  className={` px-2 transition-all duration-300 ease-in-out`}
                >
                  <div className="w-full flex justify-between items-center p-2 mt-1 border-1 border-gray-300 text-[13px] capitalize font-medium text-gray-500 gap-2 cursor-pointer transition-all duration-300 ease-in-out">
                    <Link href="/#">tab open</Link>
                    <span>10:50 min</span>
                  </div>
                </div>
              )}
            </div>
          )}
          {instructor && <div>instructor</div>}
          {review && <div>review</div>}
        </div>
        <div className="w-4/12  p-4 shadow-lg shadow-gray-500 border-2 border-gray-300">
          card
        </div>
      </div>
    </div>
  );
};

export default PreviewCourse;

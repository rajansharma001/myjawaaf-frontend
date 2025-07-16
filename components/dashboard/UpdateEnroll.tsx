"use client";
import React, { useEffect, useState } from "react";
import {
  button,
  CourseProps,
  input,
  lable,
  UserProps,
} from "./styles/inputField";
import { CiSettings } from "react-icons/ci";
import { useProtectedRoute } from "../../context/useProtected";
import FormButton from "../FormButton";
import Image from "next/image";

interface Props {
  handleUpdateStateChange: () => void;
  enrollId: string;
  handleUpdateTable: () => void;
}
const UpdateEnroll = ({
  handleUpdateStateChange,
  enrollId,
  handleUpdateTable,
}: Props) => {
  useProtectedRoute(["admin"]);

  const [courses, setCourse] = useState<CourseProps[]>([]);
  const [users, setUser] = useState<UserProps[]>([]);
  const [courseById, setCourseById] = useState<CourseProps>();

  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
    isFree: false,
    price: "",
    hasAccess: false,
    receipt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { type, name, value, checked, files } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      } else if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else return { ...prev, [name]: value };
    });
  };

  const getCourse = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/course/get-course`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setCourse(result.getCourse);
  };

  const getUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/get-user`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setUser(result.getUser);
  };
  const getEnroll = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/enroll/get-enrolled/${enrollId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setFormData({
      userId: result.getEnrolled.userId || "",
      courseId: result.getEnrolled.courseId || "",
      isFree: result.getEnrolled.isFree || false,
      hasAccess: result.getEnrolled.hasAccess || false,
      price: result.getEnrolled.price || "",
      receipt: result.getEnrolled.receipt || "",
    });
  };
  useEffect(() => {
    if (courseById) {
      setFormData((prev) => ({
        ...prev,
        isFree: courseById.isFree,
        price: courseById.price,
      }));
    }
  }, [courseById]);
  useEffect(() => {
    getCourse();
    getUser();
    getEnroll();

    if (formData.courseId) {
      const found = courses.find((c) => c._id === formData.courseId);
      if (found) setCourseById(found);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("userId", formData.userId);
    form.append("courseId", formData.courseId);
    form.append("isFree", String(formData.isFree));
    form.append("price", formData.price);
    form.append("hasAccess", String(formData.hasAccess));
    form.append("receipt", formData.receipt);
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/enroll/update-enrolled/${enrollId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
        }
      );
      const result = await res.json();

      if (!res.ok) {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
      }
      getEnroll();
      handleUpdateTable();
    } catch (error) {
      setMsg(`something went wrong: ${error}`);
    }
  };

  setTimeout(() => {
    setHasMsg(false);
  }, 3000);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col p-6">
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
            loading{" "}
          </div>
        ) : (
          <div className="w-full ">
            <div className="w-full flex justify-end ">
              <button className={`${button}`} onClick={handleUpdateStateChange}>
                close
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="userId" className={`${lable}`}>
                  Select a user
                </label>

                <select
                  name="userId"
                  id=""
                  className={`${input}`}
                  onChange={handleChange}
                  value={formData.userId}
                >
                  <option value="">Select a user</option>

                  {users &&
                    users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullname}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex w-full gap-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="courseId" className={`${lable}`}>
                    Select a course
                  </label>
                  <select
                    name="courseId"
                    id=""
                    className={`${input}`}
                    onChange={handleChange}
                    value={formData.courseId}
                  >
                    <option value="">Select a course</option>
                    {courses &&
                      courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                  </select>
                </div>

                {courseById && (
                  <div className=" flex gap-2">
                    <div className="flex flex-col w-full">
                      <label htmlFor="isFree" className={`${lable}`}>
                        IsFree
                      </label>
                      <input
                        type="text"
                        value={formData.isFree ? "Free" : "Paid"}
                        className={`${input}`}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="price" className={`${lable}`}>
                        Price
                      </label>

                      <input
                        type="text"
                        name="price"
                        onChange={handleChange}
                        value={formData.price}
                        className={`${input} `}
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="price" className={`${lable}`}>
                  Has Access
                </label>

                <input
                  type="checkbox"
                  name="hasAccess"
                  onChange={handleChange}
                  checked={formData.hasAccess}
                  className={`${input} `}
                  readOnly
                />
              </div>
              <div className="flex flex-col w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${formData.receipt}`}
                  alt=""
                  width={150}
                  height={150}
                />
                <label htmlFor="receipt" className={`${lable}`}>
                  Upload Receipt
                </label>
                <input
                  type="file"
                  name="receipt"
                  onChange={handleChange}
                  className={`${input}`}
                />
              </div>
              <FormButton title="submit" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateEnroll;

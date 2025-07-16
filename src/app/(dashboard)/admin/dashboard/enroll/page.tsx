"use client";
import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import {
  button,
  CourseProps,
  enrollProps,
  input,
  lable,
  UserProps,
} from "../../../../../../components/dashboard/styles/inputField";
import FormButton from "../../../../../../components/FormButton";
import { CiSettings } from "react-icons/ci";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import UpdateEnroll from "../../../../../../components/dashboard/UpdateEnroll";

const Enroll = () => {
  useProtectedRoute(["admin"]);

  const [courses, setCourse] = useState<CourseProps[]>([]);
  const [users, setUser] = useState<UserProps[]>([]);
  const [courseById, setCourseById] = useState<CourseProps>();
  const [popReceipt, setPopReceipt] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [updateEnrollment, setUpdateEnrollment] = useState(false);
  const [enrollId, setEnrollId] = useState("");

  console.log("enrolled id for deleting: ", enrollId);

  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);
  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",

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

  useEffect(() => {
    getCourse();
    getUser();

    if (formData.courseId) {
      const found = courses.find((c) => c._id === formData.courseId);
      if (found) setCourseById(found);
    }
  }, []);

  useEffect(() => {
    if (courseById) {
      setFormData((prev) => ({
        ...prev,
        isFree: courseById.isFree,
        price: courseById.price,
      }));
    }
  }, [courseById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("userId", formData.userId);
    form.append("courseId", formData.courseId);
    form.append("receipt", formData.receipt);
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/enroll/enroll-course`,
        {
          method: "POST",
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
    } catch (error) {
      setMsg(`something went wrong: ${error}`);
    }
  };

  const getEnroll = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/enroll/get-enrolled`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    setEnrolls(result.getEnrolled);
  };
  useEffect(() => {
    getEnroll();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/enroll/delete-enrolled/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      console.log("delete msg: ", result.msg);
      if (!res.ok) {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      } else {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
        getEnroll();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStateChange = () => {
    setUpdateEnrollment(!updateEnrollment);
  };
  const handleUpdateTable = () => {
    getEnroll();
  };

  setTimeout(() => {
    setHasMsg(false);
  }, 3000);
  return (
    <div className="w-full relative">
      <div className="w-full flex flex-col p-4 sm:p-6">
        {hasMsg && (
          <div className="w-full flex flex-col justify-center items-center bg-white p-4 sm:p-6 border border-gray-300 mb-5">
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
          <div className="w-full">
            <div className="w-full flex justify-end mb-3">
              <button
                className={`${button} w-fit`}
                onClick={() => setIsEnrollOpen(!isEnrollOpen)}
              >
                {!isEnrollOpen ? "Add new enrolment" : "close"}
              </button>
            </div>

            {isEnrollOpen && (
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="userId" className={`${lable}`}>
                    Select a user
                  </label>
                  <select
                    name="userId"
                    className={`${input}`}
                    onChange={handleChange}
                    value={formData.userId}
                  >
                    <option value="">Select a user</option>
                    {users?.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full sm:w-[49%]">
                  <label htmlFor="courseId" className={`${lable}`}>
                    Select a course
                  </label>
                  <select
                    name="courseId"
                    className={`${input}`}
                    onChange={handleChange}
                    value={formData.courseId}
                  >
                    <option value="">Select a course</option>
                    {courses?.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {courseById && (
                  <>
                    <div className="flex flex-col w-full sm:w-[24%]">
                      <label htmlFor="isFree" className={`${lable}`}>
                        IsFree
                      </label>
                      <input
                        type="text"
                        value={courseById.isFree ? "Free" : "Paid"}
                        className={`${input}`}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-[24%]">
                      <label htmlFor="price" className={`${lable}`}>
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={courseById.price}
                        className={`${input}`}
                        readOnly
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col w-full">
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

                <div className="w-full flex justify-start">
                  <FormButton title="submit" />
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Receipt popup */}
      {popReceipt && (
        <div className="absolute w-full inset-0 z-50 flex max-h-screen justify-center items-center bg-white/60 backdrop-blur-sm">
          <button
            className={`${button} absolute top-3 right-3`}
            onClick={() => setPopReceipt(false)}
          >
            close
          </button>
          <Image
            src={receiptUrl}
            height={260}
            width={260}
            alt="receipt"
            className="w-[80%] sm:w-[40%] md:w-[20%]"
          />
        </div>
      )}

      {/* Table */}
      <div className="w-full p-4 sm:p-6 text-[13px] capitalize">
        <div className="w-full overflow-x-auto">
          <table className="border-collapse border w-full border-gray-400 text-center">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">S.No.</th>
                <th className="border border-gray-300 p-2">Payment ID</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">User</th>
                <th className="border border-gray-300 p-2">Receipt</th>
                <th className="border border-gray-300 p-2">Has Access</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {enrolls?.map((enroll, index) => (
                <tr key={enroll._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {enroll.paymentId}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {enroll.amountPaid}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {courses.find((c) => c._id === enroll.courseId)?.title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {users.find((u) => u._id === enroll.userId)?.fullname}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${enroll.receipt}`}
                        alt={enroll.courseId}
                        width={80}
                        height={80}
                        className="cursor-pointer h-12 object-cover"
                        onClick={() => {
                          setPopReceipt(true);
                          setReceiptUrl(
                            `${process.env.NEXT_PUBLIC_API_URL}/${enroll.receipt}`
                          );
                        }}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {enroll.hasAccess ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex gap-2 justify-center">
                      <button
                        className={`${button}`}
                        onClick={() => {
                          setUpdateEnrollment(true);
                          setEnrollId(enroll._id as string);
                        }}
                      >
                        <BiEdit />
                      </button>
                      <button
                        className={`${button}`}
                        onClick={() => handleDelete(enroll._id as string)}
                      >
                        <FiDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update enroll popup */}
      {updateEnrollment && (
        <div className="absolute top-0 inset-0 shadow-2xl backdrop-blur-3xl z-50">
          <UpdateEnroll
            handleUpdateStateChange={handleUpdateStateChange}
            enrollId={enrollId}
            handleUpdateTable={handleUpdateTable}
          />
        </div>
      )}
    </div>
  );
};

export default Enroll;

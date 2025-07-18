"use client";
import Link from "next/link";
import { useProtectedRoute } from "../../../../../context/useProtected";
import { CiLock, CiMonitor } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/authContext";
import {
  button,
  CourseProps,
  enrollProps,
  LessonProps,
  UserProps,
} from "../../../../../components/dashboard/styles/inputField";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

const AdminDashboard = () => {
  useProtectedRoute(["admin"]);

  const { user } = useAuth();
  const [enrolls, setEnrolls] = useState<enrollProps[]>([]);
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [lessons, setLessons] = useState<LessonProps[]>([]);

  const [popReceipt, setPopReceipt] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");

  const getEnrolls = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enrolls`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setEnrolls(result.getEnrolls);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course`, {
        method: "GET",
      });

      const result = await res.json();
      setCourses(result.getCourse);
    } catch (error) {
      console.log(error);
    }
  };

  const getLessons = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lessons`,
        {
          method: "GET",
        }
      );

      const result = await res.json();
      setLessons(result.getLessons);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "GET",
      });

      const result = await res.json();
      setUsers(result.getUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolls();
    getCourse();
    getUsers();
    getLessons();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap lg:flex-nowrap md:flex-wrap justify-between gap-3">
        <Link
          className="w-full p-6 shadow-2xl text-[12px] bg-primary-500 text-gray-100 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="/admin/dashboard/enroll"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiMonitor size={40} />
            </div>
            <div>
              <h1>{enrolls && enrolls.length}</h1>
              <h1>Enrolled Courses</h1>
            </div>
          </div>
        </Link>
        <Link
          className="w-full p-6 shadow-2xl text-[12px] bg-primary-500 text-gray-100 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="/admin/dashboard/courses"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiLock size={40} />
            </div>
            <div>
              <h1>{courses && courses.length}</h1>

              <h1>Total Course</h1>
            </div>
          </div>
        </Link>
        <Link
          className="w-full p-6 shadow-2xl text-[12px] bg-primary-500 text-gray-100 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="/admin/dashboard/lessons"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiLock size={40} />
            </div>
            <div>
              <h1>{lessons && lessons.length}</h1>

              <h1>Total Lessons</h1>
            </div>
          </div>
        </Link>
        <Link
          className="w-full p-6 shadow-2xl text-[12px] bg-primary-500 text-gray-100 font-semibold shadow-gray rounded-lg flex items-center gap-3 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:bg-orange-400"
          href="#"
        >
          <div className="w-full flex gap-2 justify-start items-center">
            <div>
              <CiLock size={40} />
            </div>
            <div>
              <h1>{users && users.length}</h1>

              <h1>Total Users</h1>
            </div>
          </div>
        </Link>
      </div>
      {/* users table */}

      <div className="w-full">
        <div className="py-4 text-[14px] font-semibold text-gray-600">
          Recent Enrollments
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
        <div className="w-full p-4 sm:px-6 text-[13px] capitalize">
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
                          src={`${enroll.receipt}`}
                          alt={enroll.courseId}
                          width={80}
                          height={80}
                          className="cursor-pointer h-12 object-cover"
                          onClick={() => {
                            setPopReceipt(true);
                            setReceiptUrl(`${enroll.receipt}`);
                          }}
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      {enroll.hasAccess ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

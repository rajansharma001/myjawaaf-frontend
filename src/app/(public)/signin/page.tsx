"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import FormButton from "../../../../components/FormButton";
import { redirect } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { useProtectedRoute } from "../../../../context/useProtected";
interface FormProps {
  password: string;
  email: string;
}

const Signin = () => {
  const { user, loading, fetchUser } = useAuth();

  useProtectedRoute([], true);

  const [hasError, setHasError] = useState("");
  const [msg, setMsg] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<FormProps>({
    password: "",
    email: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );
    const result = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      setIsSubmitOk(false);
      setHasError(`Please verify these details first.`);
      setMsg(result.msg);
    } else {
      setIsLoading(false);
      await fetchUser();
    }
  };
  useEffect(() => {
    if (loading) return; // Wait until user is fetched

    if (user) {
      if (user.role === "admin") {
        redirect("/admin/dashboard");
      } else if (user.role === "student") {
        redirect("/student/dashboard");
      } else {
        redirect("/"); // fallback route
      }
    }
  }, [user, loading]);

  return (
    <div className="w-full flex flex-col md:flex-row lg:flex-row max-h-[90vh] p-2">
      <div className="w-full hidden lg:flex md:flex lg:w-[50%] md:w-[50%] p-0 m-0 ">
        <Image
          src="/signin.webp"
          width={800}
          height={200}
          alt="signupImg"
          className="max-h-[90vh] bg-[#b8b0ff]"
        />
      </div>
      <div className="w-full lg:w-[50%] md:w-[50%] py-10 lg:py-0  md:py-0 flex flex-col justify-center items-center shadow-2xl shadow-gray-300 ">
        {hasError && (
          <div className=" w-[70%] flex flex-col justify-center items-center p-6 border-1 border-gray-300 mb-5">
            <p className="text-gray-500 capitalize text-[12px]">{hasError}</p>
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-center">
          {isloading ? (
            <div className="flex flex-col justify-center items-center">
              <BiLoader size={30} className=" animate-spin " />
              <p className="text-[13px] text-gray-500 capitalize">
                Please wait...
              </p>
            </div>
          ) : (
            <div className=" w-full flex justify-center items-center">
              {isSubmitOk ? (
                <div className="p-5 border-1 border-gray-300">
                  <p className="text-[12px]  text-gray-500 ">
                    Verify your email. Verification link has been sent to
                    <strong className="text-primary-500 "> {email}</strong>
                  </p>
                </div>
              ) : (
                <div className="w-[70%]  ">
                  <h1 className="text-xl text-center font-semibold text-gray-600 capitalize">
                    Sign in to your account
                  </h1>
                  <form
                    action="POST"
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center gap-3 text-[12px] text-gray-500 "
                  >
                    <div className="flex flex-col w-full ">
                      <label className="capitalize" htmlFor="email">
                        email
                      </label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="example@yourmail.com"
                        className="p-2 w-full border-1 border-gray-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col w-full ">
                      <label className="capitalize" htmlFor="password">
                        password
                      </label>
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*************"
                        className="p-2 w-full border-1 border-gray-200 focus:outline-none"
                      />
                    </div>
                    <div className="w-full flex justify-between flex-row-reverse">
                      <FormButton title="Signin" />
                      <div className="flex items-center justify-center text[13px] text-gray-500 font-semibold gap-2">
                        <input
                          type="checkbox"
                          name="terms&condition"
                          id="terms&condition"
                        />
                        <span className="flex gap-2">
                          I Agree with your all{" "}
                          <p className="text-primary-500 cursor-pointer">
                            terms & conditions
                          </p>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";
import FormButton from "../../../../components/FormButton";

interface FormProps {
  fullname: string;
  password: string;
  phone: string;
  email: string;
}
const Signup = () => {
  const [hasError, setHasError] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<FormProps>({
    fullname: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setLoading(false);
        setIsSubmitOk(false);
        setHasError(`Please verify your form before signup: `);
        setMsg(result.msg);
      } else {
        setFormData({
          fullname: "",
          password: "",
          email: "",
          phone: "",
        });
        setEmail(formData.email);
        setIsSubmitOk(true);
        setLoading(false);
      }
    } catch (msg) {
      setHasError(`Please verify your form before signup`);
    }
  };
  return (
    <div className="w-full flex max-h-[90vh]">
      <div className="w-[50%] p-0 m-0 ">
        <Image
          src="/signup.jpg"
          width={800}
          height={200}
          alt="signupImg"
          className="max-h-[90vh]"
        />
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        {hasError && (
          <div className=" w-[70%] flex flex-col justify-center items-center p-6 border-1 border-gray-300 mb-5">
            <p className="text-gray-500 capitalize text-[12px]">{hasError}</p>
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-center">
          {loading ? (
            <div>
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
                    Create your account
                  </h1>
                  <form
                    action="POST"
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center gap-3 text-[12px] text-gray-500 "
                  >
                    <div className="flex flex-col w-full   ">
                      <label className="capitalize" htmlFor="fullname">
                        FullName
                      </label>
                      <input
                        value={formData.fullname}
                        onChange={handleChange}
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Your name"
                        className="p-2 w-full border-1 border-gray-200 focus:outline-none"
                      />
                    </div>
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
                      <label className="capitalize" htmlFor="phone">
                        phone
                      </label>
                      <input
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+974 98541000"
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
                        type="text"
                        name="password"
                        id="password"
                        placeholder="*************"
                        className="p-2 w-full border-1 border-gray-200 focus:outline-none"
                      />
                    </div>
                    <div className="w-full flex justify-between flex-row-reverse">
                      <FormButton title="Signup" />
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

export default Signup;

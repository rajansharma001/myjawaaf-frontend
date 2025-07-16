"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  input,
  lable,
  UserProps,
} from "../../../../../../components/dashboard/styles/inputField";
import FormButton from "../../../../../../components/FormButton";
import { useProtectedRoute } from "../../../../../../context/useProtected";
import { useAuth } from "../../../../../../context/authContext";
import { CiSettings } from "react-icons/ci";

const Profile = () => {
  useProtectedRoute(["student", "admin"]);

  const [hasMsg, setHasMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProps>();
  const [formData, setFormData] = useState<UserProps>({
    fullname: "",
    phone: "",
    bio: "",
    country: "",
    profileImg: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { type, name, value, files } = e.target;
    setFormData((prev) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const form = new FormData();
  form.append("fullname", formData.fullname);
  form.append("phone", formData.phone);
  form.append("bio", formData.bio);
  form.append("country", formData.country);
  form.append("profileImg", formData.profileImg);

  const handleImageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/update-profile-img`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/update-profile`,
        { method: "PATCH", credentials: "include", body: form }
      );
      const result = await res.json();
      if (!res.ok) {
        setHasMsg(true);
        setMsg(result.msg);
        setLoading(false);
      } else {
        setLoading(false);
        setHasMsg(true);
        setMsg(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/userid`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      setUserDetails(result.getUserById);

      setFormData({
        fullname: result.getUserById?.fullname || "",
        bio: result.getUserById?.bio || "",
        country: result.getUserById?.country || "",
        phone: result.getUserById?.phone || "",
        profileImg: result.getUserById?.profileImg || "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  setTimeout(() => {
    setHasMsg(false);
  }, 3000);
  console.log("userdetails", formData);
  return (
    <div className="w-full">
      <div className="w-full lg:p-6 md:p-4 p-2">
        {hasMsg && (
          <div className=" w-full flex flex-col justify-center items-center bg-white p-6 border-1 border-gray-300 mb-5">
            <p className="text-[12px] font-semibold capitalize text-red-400">
              {msg}
            </p>
          </div>
        )}
        <h1 className="text-[13px] capitalize font-semibold text-gray-500">
          Profile
        </h1>
        <div className="w-full flex  gap-2 justify-start items-center">
          <Image
            alt=""
            src={`${process.env.NEXT_PUBLIC_API_URL}/${
              userDetails && userDetails?.profileImg
            }`}
            height={200}
            width={200}
            className="object-cover w-22 h-22 rounded-full border-gray-200 border-2 "
          />
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <CiSettings className="animate-spin" />
              loading
            </div>
          ) : (
            <form
              action=""
              onSubmit={handleImageSubmit}
              className="flex flex-col gap-2"
            >
              <input
                type="file"
                name="profileImg"
                accept="image/*"
                onChange={handleChange}
                className={`${input}`}
              />
              <FormButton title="update profile image" />
            </form>
          )}
        </div>

        <div className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <CiSettings className="animate-spin" />
              loading
            </div>
          ) : (
            <form action="" onSubmit={handleProfileUpdate}>
              <div className="w-full flex flex-col lg:flex-row md:flex-row flex-wrap gap-4">
                {/* Full Name */}
                <div className="w-full  lg:w-4/12 md:w-4/12">
                  <label className={`${lable}`} htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    className={`${input}`}
                    value={formData.fullname}
                    onChange={handleChange}
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div className="w-full  lg:w-4/12 md:w-4/12">
                  <label className={`${lable}`} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className={`${input}`}
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Bio */}
                <div className="w-full  lg:w-4/12 md:w-4/12">
                  <label className={`${lable}`} htmlFor="bio">
                    Bio
                  </label>
                  <input
                    className={`${input}`}
                    value={formData.bio}
                    onChange={handleChange}
                    type="text"
                    id="bio"
                    name="bio"
                    placeholder="Enter your short bio"
                  />
                </div>

                {/* Country */}
                <div className="w-full  lg:w-4/12 md:w-4/12">
                  <label className={`${lable}`} htmlFor="country">
                    Country
                  </label>
                  <input
                    className={`${input}`}
                    value={formData.country}
                    onChange={handleChange}
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                  />
                </div>
                <FormButton title="update" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

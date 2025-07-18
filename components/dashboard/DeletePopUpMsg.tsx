"use client";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import LinkButton from "../LinkButton";
import FormButton from "../FormButton";
interface Props {
  deleteFunc: () => void;
  cancelState: () => void;
}
const DeletePopUpMsg = ({ deleteFunc, cancelState }: Props) => {
  return (
    <div className="absolute inset-0 top-[-50%] w-full bg-white    flex justify-center items-center">
      <div className="w-full lg:w-[30%] md:w-[30%] p-4 rounded-sm bg-white  shadow-2xl shadow-amber-700">
        <div className="w-full flex flex-col  items-center justify-center gap-6 p-6 bg-white">
          <RiDeleteBinLine size={50} className="text-red-500" />
          <div className="w-full flex flex-col items-center justify-center text-gray-600 gap-2">
            <h1 className="text-2xl font-semibold capitalize">Are you sure?</h1>
            <h1 className="text-[12px] font-semibold capitalize">
              You want to delete this record?
            </h1>
          </div>
          <div className="w-full flex justify-between gap-6">
            <FormButton onClick={deleteFunc} title="Yes, Delete it!" />
            <FormButton onClick={cancelState} title="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUpMsg;

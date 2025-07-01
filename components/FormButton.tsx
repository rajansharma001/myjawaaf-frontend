import React from "react";

interface Props {
  title: string;
  onClick?: React.MouseEventHandler;
}
const FormButton = ({ title, onClick }: Props) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="py-1.5 px-3 bg-primary-500 flex w-fit items-center justify-center text-[12px] hover:bg-primary-300 hover:text-primary-500 cursor-pointer text-white capitalize font-semibold transition-all transform ease-in duration-300"
      >
        {title}
      </button>
    </div>
  );
};

export default FormButton;

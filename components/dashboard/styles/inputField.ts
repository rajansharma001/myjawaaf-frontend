export const input =
  "w-full text-[13px] text-gray-600 capitalize focus:outline-none border-1 border-gray-300 p-2 bg-white";
export const lable = "w-full text-[13px] text-gray-600 capitalize";

export const button =
  "py-1.5 px-3 bg-primary-500 flex w-fit items-center justify-center text-[12px] hover:bg-primary-300 hover:text-primary-500 cursor-pointer text-white capitalize font-semibold transition-all transform ease-in duration-300";

export const levels = ["Beginner", "Intermediate", "Advanced"];
export const languages = ["English", "Nepali", "Hindi", "Arabic"];

export interface CourseProps {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  isFree: boolean;
  price: string;
  discount: string;
  level: string;
  language: string;
  isPublished: boolean;
  createdBy: string;
}

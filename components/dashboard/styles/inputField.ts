export const input =
  "w-full text-[13px] text-gray-600  focus:outline-none border-1 border-gray-300 p-2 bg-white";
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
  categoryId: string | CategoryProps;
  isFree: boolean;
  price: string;
  discount: string;
  level: string;
  language: string;
  isPublished: boolean;
  studentCount?: number;
  createdBy?: string;
  hasAccess?: boolean;
}

export interface LessonProps {
  _id?: string;
  title: string;
  slug: string;
  videoUrl: string;
  duration: string;
  isPreview: boolean;
  description: string;
  courseId: string;
}

export interface LessonProps {
  _id?: string;
  title: string;
  slug: string;
  videoUrl: string;
  duration: string;
  isPreview: boolean;
  description: string;
  courseId: string;
}

export interface UserProps {
  _id?: string;
  fullname: string;
  email?: string;
  password?: string;
  phone: string;
  progress?: string;
  role?: string;
  isVerified?: boolean;
  profileImg: string;
  bio: string;
  country: string;
  notification?: string;
}

export interface enrollProps {
  _id?: string;
  userId: string;
  courseId: string;
  isFree: boolean;
  amountPaid: string;
  receipt: string;
  paymentId: string;
  hasAccess: boolean;
}

export interface CategoryProps {
  _id?: string;
  title: string;
  slug: string;
  description: string;
}

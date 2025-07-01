import Link from "next/link";

const FooterCredit = () => {
  return (
    <div className="w-full bg-gray-300 p-3 text-[12px] capitalize font-semibold text-center">
      ©E-Tutor All Rights Reserved. | Developed by{" "}
      <a
        href="https://rajansharma.info.np"
        target="_blank"
        className="italic text-primary-500 hover:text-black font-bold transition-all ease-in-out duration-300"
      >
        Rajan Sharma
      </a>
    </div>
  );
};

export default FooterCredit;

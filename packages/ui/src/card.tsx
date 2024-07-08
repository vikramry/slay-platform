import React, { ReactNode } from "react";
interface cardprops {
  children?: React.ReactNode;
  classNames?: string;
}
const Card = ({ children, classNames }: cardprops) => {
  return (
    <div
      className={`${classNames} dark:bg-gray-700 border-[1px] border-[#E5E5E5] dark:border-[#6b7280]  dark:text-white w-full h-full rounded-lg flex flex-col justify-center items-center p-5`}
    >
      {children}
    </div>
  );
};

export default Card;

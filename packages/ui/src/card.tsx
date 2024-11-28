import React, { ReactNode } from "react";
interface cardprops {
  children?: React.ReactNode;
  classNames?: string;
  rows: number;
}
const Card = ({ children, classNames, rows }: cardprops) => {
  return (
    <div
      style={{
        maxHeight: `${rows * 250}px`
      }}
      className={`${classNames} overflow-y-auto dark:bg-gray-700  dark:text-white w-full h-full rounded-lg `}
    >
      {children}
    </div>
  );
};

export default Card;

import React from "react";
import Card from "./card";

const LayoutCardTemplate = [
  {
    title: "Card1",
    cols: 2,
    rows: 2,
  },
  {
    title: "Card2",
    cols: 1,
    rows: 1,
  },
  {
    title: "Card3",
    cols: 1,
    rows: 1,
  },
  {
    title: "Card3",
    cols: 3,
    rows: 1,
  },
];

const DynamicLayout = () => {
  return (
    <div className="h-auto w-[100vw - 100px] grid grid-cols-3 gap-2 bg-black p-2">
      {LayoutCardTemplate.map((item: any) => (
        <Card
          classNames={`col-span-${item.cols} row-span-${item.rows} bg-white min-h-96`}
        ></Card>
      ))}
    </div>
  );
};

export default DynamicLayout;

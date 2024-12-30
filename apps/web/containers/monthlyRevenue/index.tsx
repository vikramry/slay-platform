import React from "react";

const MonthlyRevenue = () => {
  const content = [
    {
      title: "Customer",
      value: "1,542",
      details: {    value: "+ 10%", 
                    text: "Increase", 
                    color: "#03BE3B"
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#FFF0E1",
    },
    {
      title: "Month Revenue",
      value: "₹24,325",
      details: { 
                    value: "246", 
                    text: "Orders", 
                    color: "#318DE3" 
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#C8F7D6",
    },
    {
      title: "Today Visitor",
      value: "156",
      details: {    value: "+ 12", 
                    text: "in Today", 
                    color: "#8158E5" 
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#D9EDFF",
    },
    {
      title: "Today Sale",
      value: "26",
      details: {    value: "+ 5", 
                    text: "in Today", 
                    color: "#FF8100" 
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#F2EDFF",
    },
    {
      title: "Total Sale",
      value: "16",
      details: {    value: "+ 24", 
                    text: "in Today", 
                    color: "#318DE3" 
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#F2EDFF",
    },
    {
      title: "Today Visitor",
      value: "156",
      details: { 
                    value: "+ 12", 
                    text: "in Today", 
                    color: "#8158E5" 
                },
      icon: "https://cdn1.iconfinder.com/data/icons/network-and-communication-2-6/128/61-512.png",
      iconBg: "#D9EDFF",
    },
  ];

  return (
    <div className="grid gap-5 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
      {content.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 flex flex-col gap-2.5 items-start justify-start rounded-lg p-4"
        >
          <div
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center`}
            style={{ backgroundColor: item.iconBg }}
          >
            <img src={item.icon} alt="Images" className="w-5 h-5" />
          </div>

          <div className="text-[15px] font-normal leading-[20.49px]">
            {item.title}
          </div>

          <div className="text-[25px] font-semibold leading-[34.15px]">
            {item.value}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[15px] font-semibold leading-[20.49px]"
              style={{ color: item.details.color }}
            >
              {item.details.value}
            </span>
            <div className="text-[15px] font-normal leading-[20.49px]">
              {item.details.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyRevenue;

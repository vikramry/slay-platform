"use client"
import { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { ModeToggleButton } from './toggleSwitch';
import Link from 'next/link';
import { TbSettingsCog } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi2';
import { TiTabsOutline } from 'react-icons/ti';
import { FaUser } from "react-icons/fa";
import Image from "next/image"; // Import Image for optimization.
// import MercuryLogo from "../public/assets/MercuryLogo.png";

const data = [
  {
    title: "Models",
    link: "/",
    icon: <TbSettingsCog />
  },
  {
    title: "Components",
    link: "/components",
    icon: <TbSettingsCog />

  },
  {
    title: "Users",
    link: "/users",
    icon: <HiOutlineUsers />

  },
  {
    title: "Tabs",
    link: "#",
    icon: <TiTabsOutline />
  },
]
export function Header({ handleLogout }: { handleLogout: Function }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setdropdown] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex flex-row h-[50px] bg-white justify-between items-center p-[15px] border-b-[1px] border-gray dark:border-gray-700 dark:bg-gray-700'>
      <Link href="/dashboard">
        <div className="flex items-center">
          <Image 
            src="/assets/MercuryLogo.png" // Use relative path from 'public/'
            alt="Mercury Logo" 
            width={50} 
            height={50} 
            priority 
          />
        </div>
      </Link>
      <div className='flex flex-row gap-2 justify-between items-center'>
        <div>
          <ModeToggleButton />
        </div>
        <div className='rounded-full w-[35px] h-[35px] border-gray border-[1px] mr-5 dark:border-gray md:block hidden' onClick={() => setdropdown(!dropdown)}>
          <div className='flex justify-center items-center mt-2'><FaUser /></div>
          </div>
        {dropdown &&
          <div className="drop-down z-10 w-40 overflow-hidden bg-white dark:bg-black rounded-md shadow absolute top-12 right-3">
            <ul>
              <li className="p-2 text-sm font-medium flex items-center space-x-2 hover:bg-gray-100 dark:text:white dark:hover:bg-black cursor-pointer" onClick={() => {
                handleLogout()
                setdropdown(false)
              }}>
                <span> Logout </span>
              </li>
              <Link href="/dashboard/setup/models">
                <li className="p-2 text-sm font-medium flex items-center space-x-2 hover:bg-gray-100 dark:text:white dark:hover:bg-black cursor-pointer" onClick={() => { setdropdown(false) }}>
                  <span> SetUp </span>
                </li>
              </Link>
              <li className="p-2 text-sm font-medium flex items-center space-x-2 hover:bg-gray-100 dark:text:white dark:hover:bg-black cursor-pointer" onClick={() => { setdropdown(false) }}>
                <span> Reset Password </span>
              </li>

            </ul>
          </div>}
        <div className='dark:text-white text-black md:hidden block'>
          <RxHamburgerMenu size={30} onClick={toggleMenu} />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-gray-200 w-64 p-4 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="flex flex-col gap-2 ">{data?.map((item) => {
          return (
            <Link href={item?.link}>
              <div className={`p-2 bg-red border-[2px] dark:border-[1px] border-gray dark:border-gray rounded-lg w-[180px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex flex-row gap-2 text-center align-middle  ease-in-out duration-300`}>
                <div className="flex flex-col justify-center"> {item.icon}</div>
                <h4>{item?.title}</h4>
              </div>
            </Link>
          )
        })}</div>
      </div>

    </div>
  )
}


"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export interface SideBarProps {
  title: string; link: string;
}

const data: Record<string, SideBarProps[]> = {
  "default": [
    {
      title: "Models",
      link: "dashboard"
    },
    {
      title: "Components",
      link: "dashboard/components"

    },
    {
      title: "Users",
      link: "users"

    },
    {
      title: "Tabs",
      link: "#"
    },
  ],
  "model": [
    {
      title: "Fields",
      link: "model"
    },
    {
      title: "Permissions",
      link: "permissions"

    },
    {
      title: "Functions",
      link: "functions"

    },
    {
      title: "Layouts",
      link: "layouts"
    },
  ]
}
export function SideBar() {
  return (
    <div className="md:block hidden">

      <div className="flex flex-col gap-2 ">{data[usePathname().includes("model")? "model": "default"]?.map((item: SideBarProps) => {
        return (
          <Link href={`/${item?.link}`}>
            <div className={`p-2 rounded-lg w-[180px] hover:bg-gray-100 hover:text-black dark:hover:bg-gray-100 dark:hover:bg-opacity-25 dark:hover:text-white dark:text-white  flex flex-row gap-2 text-center text-sm align-middle font-medium ${usePathname().includes(item?.link) && "bg-[black] dark:bg-gray-200  text-white dark:text-black dark:bg-opacity-25"} ease-in-out duration-300`}>
              {/* <div className="flex flex-col justify-center"> {item.icon}</div>  */}
              <h4>{item?.title}</h4>
            </div>
          </Link>
        )
      })}</div>
    </div>
  )
}

// className="md:block hidden"
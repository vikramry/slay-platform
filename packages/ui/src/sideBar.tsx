

"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
export interface SideBarProps {
  title: string;
  link: string;
}

export function SideBar() {
  const router = usePathname();
  const data: Record<string, SideBarProps[]> = {
    default: [
      {
        title: "Models",
        link: "dashboard/model",
      },
      {
        title: "Profiles",
        link: "dashboard/profiles",
      },
      {
        title: "Components",
        link: "dashboard/components",
      },
      {
        title: "Users",
        link: "dashboard/users",
      },
      {
        title: "Tabs",
        link: "dashboard/tabs",
      },
    ],
    model: [
      {
        title: "Fields",
        link: `dashboard/model/${useParams()?.id}`,
      },
      {
        title: "Options",
        link: `dashboard/model/${useParams()?.id}/options`,
      },
      {
        title: "Permissions",
        link: `dashboard/model/${useParams()?.id}/permissions`,
      },
      {
        title: "Functions",
        link: `dashboard/model/${useParams()?.id}/functions`,
      },
      {
        title: "Layouts",
        link: `dashboard/model/${useParams()?.id}/layouts`,
      },
    ],
    layout: [
      {
        title: "Structures",
        link: `dashboard/model/${useParams()?.id}/layouts/${useParams()?.layoutId}/structures`,
      },
    ]
  };
  const key = /\/layouts\/.+/.test(usePathname()) && !usePathname().includes("layouts/add") ? "layout" :
    /\/model\/.+/.test(usePathname()) &&
      !usePathname().includes("model/createModel")
      ? "model"
      : "default"
  const sidebarData =
    data[key];
  return (
    <div className={`  ${router === "/dashboard" || router.includes('/dashboard/o/') ? "hidden" : "md:block hidden"}`}>
      <div className="flex flex-col gap-2 ">
        {key != "default" &&
          <Link className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
           href={`${key === "model" ? "/dashboard/model" : `/dashboard/model/${useParams().id}/layouts`}`}>
           <ChevronLeft />{key}</Link>
        }
        {sidebarData?.map((item: SideBarProps) => {
          const link = `/${item?.link}`;
          const regex = new RegExp(`^${link}(\/|$)`);

          let isActive = regex.test(usePathname());
          if (item.title === "Fields")
            isActive = [`${useParams()?.id}/options`, `${useParams()?.id}/permissions`, `${useParams()?.id}/layouts`].some((item) =>
              usePathname().includes(item)
            )
              ? false
              : true;
          return (
            <Link href={`/${item?.link}`} key={item?.link}>
              <div
                className={`p-2 rounded-lg w-[180px] hover:bg-gray-100 hover:text-black dark:hover:bg-gray-100 dark:hover:bg-opacity-25 dark:hover:text-white dark:text-white  flex flex-row gap-2 text-center text-sm align-middle font-medium ${isActive ? "bg-[black] dark:bg-gray-200  text-white dark:text-black dark:bg-opacity-25" : ""} ease-in-out duration-300`}
              >
                <h4>{item?.title}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

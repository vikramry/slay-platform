// "use client"
// import Link from "next/link"
// import { usePathname } from 'next/navigation'

// export interface SideBarProps {
//   title: string; link: string;
// }

// const data: Record<string, SideBarProps[]> = {
//   "default": [
//     {
//       title: "Models",
//       link: "dashboard"
//     },
//     {
//       title: "Components",
//       link: "dashboard/components"

//     },
//     {
//       title: "Users",
//       link: "dashboard/users"

//     },
//     {
//       title: "Tabs",
//       link: "dashboard/tabs"
//     },
//   ],
//   "model": [
//     {
//       title: "Fields",
//       link: "dashboard/model"
//     },
//     {
//         title: "Options",
//         link: "options"
//       },
//     {
//       title: "Permissions",
//       link: "permissions"

//     },
//     {
//       title: "Functions",
//       link: "functions"

//     },
//     {
//       title: "Layouts",
//       link: "layouts"
//     },
//   ]
// }
// export function SideBar() {
//   return (
//     <div className="md:block hidden">

//       <div className="flex flex-col gap-2 ">{data[usePathname().includes("model")? "model": "default"]?.map((item: SideBarProps) => {
//         return (
//           <Link href={`/${item?.link}`}>
//             <div className={`p-2 rounded-lg w-[180px] hover:bg-gray-100 hover:text-black dark:hover:bg-gray-100 dark:hover:bg-opacity-25 dark:hover:text-white dark:text-white  flex flex-row gap-2 text-center text-sm align-middle font-medium ${usePathname().includes(item?.link) && "bg-[black] dark:bg-gray-200  text-white dark:text-black dark:bg-opacity-25"} ease-in-out duration-300`}>
//               {/* <div className="flex flex-col justify-center"> {item.icon}</div>  */}
//               <h4>{item?.title}</h4>
//             </div>
//           </Link>
//         )
//       })}</div>
//     </div>
//   )
// }

// // className="md:block hidden"

"use client"
import Link from "next/link";
import { usePathname, useParams } from 'next/navigation';

export interface SideBarProps {
  title: string; link: string;
}


export function SideBar() {
  const data: Record<string, SideBarProps[]> = {
    "default": [
      {
        title: "Models",
        link: "dashboard/model"
      },
      {
        title: "Components",
        link: "dashboard/components"
      },
      {
        title: "Users",
        link: "dashboard/users"
      },
      {
        title: "Tabs",
        link: "dashboard/tabs"
      },
    ],
    "model": [
      {
        title: "Fields",
        link: `dashboard/model/${useParams()?.id}`
      },
      {
        title: "Options",
        link: `dashboard/model/${useParams()?.id}/options`
      },
      {
        title: "Permissions",
        link: `dashboard/model/${useParams()?.id}/permissions`
      },
      {
        title: "Functions",
        link: `dashboard/model/${useParams()?.id}/functions`
      },
      {
        title: "Layouts",
        link: `dashboard/model/${useParams()?.id}/layouts`
      },
    ]
  };
  const sidebarData = data[/\/model\/.+/.test(usePathname()) && !usePathname().includes("model/createModel") ? "model" : "default"]
  return (
    <div className="md:block hidden">
      <div className="flex flex-col gap-2 ">
        {sidebarData?.map((item: SideBarProps) => {
          const link = `/${item?.link}`;
          const regex = new RegExp(`^${link}(\/|$)`);

          let isActive = regex.test(usePathname());
          if(item.title === "Fields") 
            isActive = usePathname().includes(`model/${useParams().id}/options`) ? false : true;
          return (
            <Link href={`/${item?.link}`} key={item?.link}>
              <div className={`p-2 rounded-lg w-[180px] hover:bg-gray-100 hover:text-black dark:hover:bg-gray-100 dark:hover:bg-opacity-25 dark:hover:text-white dark:text-white  flex flex-row gap-2 text-center text-sm align-middle font-medium ${isActive ? "bg-[black] dark:bg-gray-200  text-white dark:text-black dark:bg-opacity-25" : ""} ease-in-out duration-300`}>
                <h4>{item?.title}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

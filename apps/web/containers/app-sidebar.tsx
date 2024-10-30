"use client";
import { useRouter, useParams } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { LIST_TABS } from "@/app/queries";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export interface LIST_TABSTYPES {
  label: string;
  id: string;
  model: {
    id: string;
    label: string;
    name: string;
  };
}

export function AppSidebar() {
  const router = useRouter();
  const { modelName } = useParams();
  const [ListTabs, ListTabsResponse] = useLazyQuery(serverFetch);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/dashboard" || pathName.includes("/dashboard/o/")) {
      ListTabs(
        LIST_TABS,
        {
          limit: 100,
          sort: {
            order: "asc",
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (ListTabsResponse?.data) {
      console.log(ListTabsResponse?.data, "tabsdata");
      // setModelId(ListTabsResponse?.data?.listTabs?.docs[0].model?.id)
    } else if (ListTabsResponse?.error) {
      console.log(ListTabsResponse?.error);
    }
  }, [
    ListTabsResponse?.data,
    ListTabsResponse?.error,
    ListTabsResponse?.loading,
  ]);
  return (
    <div className={`${
      pathName === "/dashboard" || pathName.includes("/dashboard/o/")
        ? "block"
        : "hidden"
    }`}>
      <Sidebar
        variant="floating"
        className="hide-scrollbar h-[84vh] my-auto ml-2 pt-2"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {ListTabsResponse?.loading ? (
                  <div className="flex flex-col gap-4 mt-2">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div
                        key={index}
                        className="h-[20px] flex flex-col w-[95%] bg-gray-200 rounded-[12px] dark:bg-gray-700"
                      ></div>
                    ))}
                  </div>
                ) : (
                  ListTabsResponse?.data?.listTabs?.docs?.map((tab: any) => (
                    <SidebarMenuItem key={tab.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/dashboard/o/${tab.model.name}/list`}>
                          <span className={`${
                          modelName == tab?.model?.name
                            ? "text-black dark:text-white font-bold"
                            : "text-[#7B7B7D] font-[500px]"
                        } text-[14px] sm:text-[16px] hover:text-black hover:font-bold cursor-pointer dark:hover:text-white ease-in-out duration-300`}>{tab.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default AppSidebar;

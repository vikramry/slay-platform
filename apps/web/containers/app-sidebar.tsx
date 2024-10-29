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
import { useState } from "react"; // Still useful for loading state handling

export interface LIST_TABSTYPES {
  label: string;
  id: string;
  model: {
    id: string;
    label: string;
    name: string;
  };
}

export function AppSidebar({
  setACTIVETab,
  aCTIVETab,
  tabsData = [],
  loading,
}: {
  setACTIVETab?: (tab: string) => void;
  aCTIVETab?: string;
  tabsData?: LIST_TABSTYPES[];
  loading: boolean;
}) {
  const router = useRouter();
  const { modelName } = useParams();

  return (
    <div className="w-full h-full block">
      <Sidebar
        variant="floating"
        className="h-[78vh] mt-[3.7rem] ml-2"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {loading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div
                        key={index}
                        className="h-[25px] flex flex-col w-[100%] bg-gray-200 rounded-[12px] dark:bg-gray-700"
                      ></div>
                    ))}
                  </>
                ) : (
                  tabsData.map((tab) => (
                    <SidebarMenuItem key={tab.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/dashboard/o/${tab.model.name}/list`}>
                          <span
                            className={`${
                              modelName === tab.model.name
                                ? "text-black dark:text-white font-bold"
                                : "text-[#7B7B7D] font-medium"
                            }`}
                          >
                            {tab.label}
                          </span>
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

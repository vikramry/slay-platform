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
// Import the icons only if needed
import { X, Menu } from "lucide-react"; // Not needed anymore if you don't use these

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
    <div className="">
      <Sidebar
        style={{
          height: '76vh',
          borderRadius: '12px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          top: '66px',
          left: '17px',
        }}
        className="hide-scrollbar"
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
                          <span>{tab.label}</span>
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

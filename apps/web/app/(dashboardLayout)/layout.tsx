"use client";

import AppSidebar from "@/containers/app-sidebar";
import Footer from "@/containers/footer";
import { Toaster, SidebarProvider } from "@repo/ui";
import { Header } from "@repo/ui/header";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { SideBar } from "@repo/ui/sideBar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { GET_USER_BY_ID } from "@/app/queries";
import { useLazyQuery } from "../hook";
import { serverFetch } from "../action";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);
  const [fetchUser, { data, loading, error }] = useLazyQuery(serverFetch);

  useEffect(() => {
    const token = getCookie("session") || "";
    if (!token) {
      router.replace("/");
    }
    let payload: any = "";
    try {
      payload = jwtDecode(token);
    } catch (error) {
      router.replace("/");
    }

    fetchUser(
      GET_USER_BY_ID,
      {
        where: {
          id: {
            is: payload?.user?.id,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      if (!data?.getUser?.profile?.name  && data?.getUser?.profile?.name == "Anonymous") {
        router.replace("/");
      }
    }
    if (error) {
      router.replace("/");
    }
  }, [data, error]);

  const isDashboard =
    pathname === "/dashboard" || pathname.includes("/dashboard/o/");

  return (
    <SidebarProvider>
      <div className="flex flex-col w-full">
        <Toaster />
        <Header
          handleLogout={() => {
            deleteCookie("session");
            window.location.reload();
          }}
        />
        <div
          className={` m-2 rounded-lg overflow-hidden ${
            isDashboard ? "h-[calc(100vh-100px)]" : "h-[calc(100vh-100px)]"
          } `}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 p-3 w-full h-full gap-12">
            <div className="md:col-span-2 dark:border-gray-700">
              <SideBar />
              <AppSidebar />
            </div>

            <div
              className={`overflow-y-auto px-2 ${
                isDashboard ? "h-[calc(100vh-110px)]" : "h-[calc(100vh-110px)]"
              } col-span-10`}
            >
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}

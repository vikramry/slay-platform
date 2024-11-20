"use client";

import AppSidebar from "@/containers/app-sidebar";
import Footer from "@/containers/footer";
import { Toaster, SidebarProvider } from "@repo/ui";
import { Header } from "@repo/ui/header";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { SideBar } from "@repo/ui/sideBar";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { GET_USER_BY_ID } from "@/app/queries";
import { useLazyQuery } from "../hook";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);
  const [fetchUser,] = useLazyQuery(); 

  useEffect(() => {
    async function fetchData() {
      const token = getCookie("session") || "";

      if (!token) {
        router.push("/"); 
        return;
      }

      const payload: any = jwtDecode(token);

      try {
        const response = await fetchUser(process.env.PLATFORM_BACKEND_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            profile: "SystemAdmin",
          },
          body: JSON.stringify({
            query: GET_USER_BY_ID,
            variables: {
              where: {
                id: {
                  is: payload?.user?.id,
                },
              },
            },
          }),
          cache: "no-store",
        });

        const data = await response.json();

        if (data?.data?.getUser?.profile?.name !== "SystemAdmin") {
          router.push("/"); 
        } else {
          setProfile(data?.data?.getUser?.profile); 
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/"); 
      }
    }

    fetchData();
  }, [fetchUser, router]);

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
          className={`border m-2 rounded-lg overflow-hidden ${
            isDashboard ? "h-[calc(100vh-100px)]" : "h-[calc(100vh-100px)]"
          } dark:border-gray-700`}
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

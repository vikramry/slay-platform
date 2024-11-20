"use client";
import AppSidebar from "@/containers/app-sidebar";
import Footer from "@/containers/footer";
import TabsContainer from "@/containers/TabsContainer";
import { Toaster, SidebarProvider, SidebarTrigger } from "@repo/ui";
import { Header } from "@repo/ui/header";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { SideBar } from "@repo/ui/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  const isDashboard =
    router === "/dashboard" || router.includes("/dashboard/o/");

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
            <div className="md:col-span-2 dark:border-gray-700 ">
              {/* <TabsContainer /> */}
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

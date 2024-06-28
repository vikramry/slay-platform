"use client"
import TabsContainer from "@/containers/TabsContainer";
import { Header } from "@repo/ui/header";
import { SideBar } from "@repo/ui/sideBar";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <TabsContainer />
        <div className="border-[1px] m-[10px] rounded-lg h-[calc(100vh-90px)] dark:border-gray-700 ">
          <div className="flex flex-row gap-3 p-[10px] w-full">
            <SideBar />
            <div className={`md:w-[${router === "/dashboard" ? "calc(100vw-215px)" : "calc(100vw-265px)"}] w-[calc(100vw-50px)] h-[calc(100vh-110px)] overflow-y-auto dark:border-gray-700 ${router !== "/dashboard" && "border-l-[1px]"} px-2`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { SideBar } from "@repo/ui/sideBar";
import { NavBar } from "@repo/ui/navBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="border-[1px] ml-[20px] mr-[20px] mb-[20px] rounded-lg h-[calc(100vh-160px)] dark:border-gray-500">
        <div className="flex flex-row gap-3 p-[10px] w-full">
          <SideBar />
          <div className="w-[calc(100vw-265px)] h-[calc(100vh-180px)] overflow-y-auto border-[1px] rounded-lg dark:border-gray-500 p-[10px]">
          {children}
          </div>
        </div>
      </div>
    </>
  );
}

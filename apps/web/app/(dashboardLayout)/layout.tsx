import { SideBar } from "@repo/ui/sideBar";
import { NavBar } from "@repo/ui/navBar";
import { Header } from "@repo/ui/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <NavBar />
        <div className="border-[1px] ml-[20px] mr-[20px] mb-[20px] rounded-lg h-[calc(100vh-160px)] dark:border-gray-500">
          <div className="flex flex-row gap-3 p-[10px] w-full">
            <SideBar />
            <div className="w-[calc(100vw-265px)] h-[calc(100vh-180px)] overflow-y-auto border-[1px] rounded-lg dark:border-gray-500 p-[10px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

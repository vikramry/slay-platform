import { SideBar } from "@repo/ui/sideBar";
import "@repo/ui/styles";
import { NavBar } from "@repo/ui/navBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="border-[1px] ml-[20px] mr-[20px] mb-[20px] rounded-lg h-[calc(100vh-200px)] dark:border-gray-500">
        <div className="flex flex-row gap-3 p-[10px] w-full">
          <SideBar />
          {children}
        </div>
      </div>
    </>
  );
}

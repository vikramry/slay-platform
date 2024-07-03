
import { useRouter,useParams,usePathname } from "next/navigation";
export interface LIST_TABSTYPES {
  label: string;
  id: string;
  model: {
    id: string;
    label: string;
    name: string;
  };
}

export function NavBar({
  setACTIVETab,
  aCTIVETab,
  tabsData,
  loading,
}: {
  setACTIVETab?: any;
  aCTIVETab?: string;
  tabsData?: LIST_TABSTYPES[];
  loading: boolean;
}) {
  const router = useRouter();
  const { modelName } = useParams();
  const pathName = usePathname();

  console.log(modelName,"mdelName")
    return (
    <div className={`flex flex-row h-[70px]  items-center  ${pathName === "/dashboard" || pathName.includes('/dashboard/o/') ? "block" : "hidden"}`}>
      {/* <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div> */}
      <div className="rounded-full w-[calc(100vw-20px)] h-[36px] border-gray border-[1px] dark:border-gray-500 flex flex-row justify-center items-center align-middle overflow-x-auto px-4">
        <div className="md:block hidden">
          <div className="flex flex-row justify-center gap-8 ">
            {loading ? (
              <h4
                className={`text-gray-500 text-[14px] hover:text-black dark:hover:text-white font-semibold ease-in-out duration-300`}
              >
                Loading...
              </h4>
            ) : (
              <>
                {tabsData?.map((item) => {
                  return (
                    // <Link href={"#"} key={item.label}>
                    <h4
                      className={`${modelName == item?.model?.name ? "text-black dark:text-white font-bold" : "text-[#7B7B7D] font-[500px]"} text-[16px] hover:text-black hover:font-bold cursor-pointer dark:hover:text-white  ease-in-out duration-300`}
                      onClick={() => router.push(`/dashboard/o/${item.model.name}/list`)}
                    >
                      {item?.label}
                    </h4>
                    // </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter, useParams, usePathname } from "next/navigation";

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

  console.log(modelName, "modelName");
  return (
    <div
      className={`flex flex-row h-[70px] items-center ${
        pathName === "/dashboard" || pathName.includes("/dashboard/o/")
          ? "block"
          : "hidden"
      }`}
    >
      <div className="rounded-full w-[calc(100vw-20px)] h-[36px] border-gray border-[1px] dark:border-gray-500 flex flex-row justify-center items-center align-middle overflow-x-auto px-4">
        <div className="md:block hidden">
          <div className="flex flex-row justify-center gap-8 ">
            {loading ? (
              // Skeleton Loader
              <>
                {[1, 2, 3, 4, 5].map((_, index) => (

                  <div   key={index} className="h-[16px] w-[100px]  bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                ))}
              </>
            ) : (
              <>
                {tabsData?.map((item) => {
                  return (
                    <h4
                      key={item.label}
                      className={`${
                        modelName == item?.model?.name
                          ? "text-black dark:text-white font-bold"
                          : "text-[#7B7B7D] font-[500px]"
                      } text-[16px] hover:text-black hover:font-bold cursor-pointer dark:hover:text-white ease-in-out duration-300`}
                      onClick={() =>
                        router.push(`/dashboard/o/${item.model.name}/list`)
                      }
                    >
                      {item?.label}
                    </h4>
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

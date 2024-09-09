import { useRouter, useParams } from "next/navigation";

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

  return (
    <div className="flex flex-row h-[70px] items-center">
      <div className="w-full h-[36px] border-gray border-[1px] dark:border-gray-500 px-2 sm:px-4 rounded-full">
        <div className="block h-full">
          <div className="flex justify-center items-center h-full gap-2">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="h-[16px] w-[100px] bg-gray-200 rounded-full dark:bg-gray-700"
                  ></div>
                ))}
              </>
            ) : (
              <div className="w-full flex items-center gap-3 sm:gap-5 overflow-x-auto">
                <div className="flex justify-center items-center gap-8 whitespace-nowrap">
                  {tabsData?.map((item) => {
                    return (
                      <h4
                        key={item.label}
                        className={`${
                          modelName == item?.model?.name
                            ? "text-black dark:text-white font-bold"
                            : "text-[#7B7B7D] font-[500px]"
                        } text-[14px] sm:text-[16px] hover:text-black hover:font-bold cursor-pointer dark:hover:text-white ease-in-out duration-300`}
                        onClick={() =>
                          router.push(`/dashboard/o/${item.model.name}/list`)
                        }
                      >
                        {item?.label}
                      </h4>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

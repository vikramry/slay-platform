
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
  return (
    <div className="flex flex-row h-[70px]  items-center p-[20px] ">
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[calc(100vw-195px)] h-[50px] border-gray border-[1px] dark:border-gray-500 flex flex-row justify-start items-center align-middle overflow-x-auto px-4">
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
                      className={`${aCTIVETab == item?.model?.id ? "text-black" : "text-gray-500"} text-[14px] hover:text-black cursor-pointer dark:hover:text-white font-semibold ease-in-out duration-300`}
                      onClick={() => setACTIVETab(item?.model?.id)}
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

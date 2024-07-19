"use client";
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { LIST_TABS } from '@/app/queries';
import { NavBar } from '@repo/ui/navBar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const TabsContainer = () => {
    const [ListTabs, ListTabsResponse] = useLazyQuery(serverFetch);
    const pathName = usePathname();

    useEffect(() => {
        if (
            pathName === "/dashboard" || pathName.includes("/dashboard/o/")
        ) {
            ListTabs(
                LIST_TABS, {
                "sort": {
                    "order": "asc"
                }
            }, {
                cache: 'no-store'
            }
            )
        }
    }, [])

    useEffect(() => {
        if (ListTabsResponse?.data) {
            console.log(ListTabsResponse?.data, "tabsdata")
            // setModelId(ListTabsResponse?.data?.listTabs?.docs[0].model?.id)
        }
        else if (ListTabsResponse?.error) {
            console.log(ListTabsResponse?.error)
        }

    }, [ListTabsResponse?.data, ListTabsResponse?.error, ListTabsResponse?.loading])

    return (
        <div className={`${pathName === "/dashboard" || pathName.includes("/dashboard/o/")
            ? "block"
            : "hidden"
            }`}>
            <NavBar tabsData={ListTabsResponse?.data?.listTabs?.docs} loading={ListTabsResponse?.loading} />

        </div>
    )
}

export default TabsContainer
"use client";
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { LIST_ALL_LAYOUTS_LABELS, listtabs } from '@/app/queries';
import { NavBar } from '@repo/ui/navBar';
import React, { useEffect } from 'react'

const TabsContainer = () => {
    const [ListTabs, ListTabsResponse] = useLazyQuery(serverFetch);

    useEffect(() => {
        ListTabs(
            listtabs, {}, {
            cache: 'no-store'
        }
        )
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
        <div className=''>
            <NavBar tabsData={ListTabsResponse?.data?.listTabs?.docs} loading={ListTabsResponse?.loading} />

        </div>
    )
}

export default TabsContainer
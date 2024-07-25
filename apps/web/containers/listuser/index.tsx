"use client"
import { userColumns } from '@/app/(dashboardLayout)/dashboard/columns'
import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { listcomponents, listusers } from '@/app/queries'
import { usersSampleData } from '@/tempData'
import { DataTable } from '@repo/ui'
import React, { useEffect, useState } from 'react'

const ListUsers = () => {
    const [listusersdata, { data, loading, error }] = useLazyQuery(serverFetch)
    const [usersData, setUsersData] = useState([])
    useEffect(() => {
        listusersdata(
            listusers, {}, {
            cache: "no-store",
        }
        )
    }, [])
    useEffect(() => {
        if (data) {
            setUsersData(data?.listUsers?.docs)
        } if (error) {
            console.log(error, 'checkerror')
        }
    }, [data, loading, error])

    return (
        <div>
            <DataTable columns={userColumns} data={usersData} loading={loading} filterBy={"email"} text="Create user" url="/dashboard/users/createUser" />

        </div>
    )
}

export default ListUsers
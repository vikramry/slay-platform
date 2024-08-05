
import { modelColumns } from '@/app/(dashboardLayout)/dashboard/columns';
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook'
import { getlistmodels } from '@/app/queries';
import React, { useEffect, useState } from 'react'
import { DataTable } from '@repo/ui'

const ListModels = () => {
  const [modellist, { data, loading, error }] = useLazyQuery(serverFetch);
  const [modelData, setModelData] = useState([])

  useEffect(() => {
    modellist(
      getlistmodels,
      {
        "offset": 0,
        "limit": 100
      }, {
      cache: "no-store",
    }
    )

  }, [])

  useEffect(() => {
    if (data) {
      console.log(data, 'checkdata')
      setModelData(data?.listModels?.docs)
    }
    else if (error) {
      console.log(error, 'checkerror')
    }
  }, [data, loading, error])


  return (
    <div>
      <DataTable columns={modelColumns} loading={loading} data={modelData} filterBy="name" text="Create Model" url="models/createModel" />
    </div>
  )
}

export default ListModels
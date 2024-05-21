import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { getlistmodeloptions } from '@/app/queries'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { DataTable } from '@repo/ui'
import { modelOptionsColumns } from '@/app/(dashboardLayout)/dashboard/columns'

const ListModeloptions = () => {
  const [modeloptionlists, { data, loading, error }] = useLazyQuery(serverFetch)
  const { id } = useParams();
  useEffect(() => {
    modeloptionlists(

      getlistmodeloptions, {

      "where": {
        "model": {
          "is": id
        }
      }

    }, {
      cache: "no-store",
    }
    )
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data, 'checkdata')
    } if (error) {
      console.log(error, 'checkerror')
    }
  }, [data, loading, error])
  return (
    <DataTable columns={modelOptionsColumns} loading={loading} filterBy="keyName" data={data?.listModelOptions?.docs || []} url="options/createModelOptions" text="Create model options" />

  )
}

export default ListModeloptions
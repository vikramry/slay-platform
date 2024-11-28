import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { GET_ORDER_CUSTOMER_DATA } from '@/app/queries';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

function CustomerDetailsCard() {
  const [getOrder, {data, loading, error}] = useLazyQuery(serverFetch);
  const {recordId}=useParams()
  useEffect(()=>{
    getOrder(
      GET_ORDER_CUSTOMER_DATA,
      {
        where: {
          id: {
            is: recordId
          }
        }
      },
      {
        cache: "no-store"
      }
    )
  }, [])


  return (
    <div className="max-w-sm p-4 rounded-lg shadow-md bg-white border-t-black border-t-4">
      <div className="flex flex-row justify-center mb-4">
        <h1 className="text-xl font-bold">Customer Details</h1>
      </div>
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-lg text-gray-500">Name</h2>
          <h2 className="text-lg text-black font-semibold">{`${data?.getOrder?.firstName} ${data?.getOrder?.lastName}`}</h2>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div>
          <p className="text-gray-500">Email</p>
          <h2 className="text-lg text-black font-semibold">{data?.getOrder?.email}</h2>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="text-gray-500">Mobile</p>
          <h2 className="text-lg text-black font-semibold">{data?.getOrder?.mobile}</h2>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsCard;

import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook'; // Assuming useMutation is similar to useLazyQuery
import { GET_ORDER, UPDATE_ORDER } from '@/app/queries';
import { Button, toast } from '@repo/ui';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

function Updateshippment() {
  const {recordId}=useParams()
  const router = useRouter(); 
  const [updateMessage, setUpdateMessage] = useState('');
  const [shipmentStatus, setShipmentStatus] = useState(''); 
  const [fetchOrder, { data, loading, error }] = useLazyQuery(serverFetch);
  const [updateOrder, updateOrderResponce] = useLazyQuery(serverFetch);

  // Fetch order details
  useEffect(() => {
    fetchOrder(
      GET_ORDER,
      {
        where: {
          id: {
            is: recordId,
          },
        },
      },
      {
        cache: 'no-store',
      }
    );
  }, [recordId]);

  useEffect(() => {
    if (updateOrderResponce.data) {
      toast({
        title: 'Successfully Updated',
      });
      router.push('/dashboard/o/Order/list'); 
    }
    if (updateOrderResponce.error) {
      toast({
        title: 'Error while updating',
        description: updateOrderResponce.error.message,
        variant: 'destructive',
      });
    }
  }, [updateOrderResponce.data, updateOrderResponce.error, router]);

  useEffect(() => {
    if (error) {
      console.error('Error while fetching:', error);
    }
    if (data) {
      const order = data?.getOrder;
      setShipmentStatus(order?.shipmentStatus || '');
      setUpdateMessage(order?.update || '');
    }
  }, [data, error,loading]);
  if(loading){
    return(
        <h4 className="text-black dark:text-white flex flex-row justify-center">loading....</h4>
    )
}

  // Handle input changes
  const handleUpdateMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateMessage(event.target.value);
  };

  const handleShipmentStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShipmentStatus(event.target.value);
  };

  // Submit the update
  const handleSubmit = () => {
    updateOrder(
      UPDATE_ORDER,
      {
        input: {
          shipmentStatus,
          id: recordId,
          update: updateMessage,
        },
      },
      {
        cache: 'no-store',
      }
    );
  };

  
  return (
    <div>
      {/* <h3>Update Shipment</h3> */}
      <div className="w-screen h-[80%] overflow-auto">
        <div>
          <h4>Update Shipment</h4>
          <div>
            <textarea
              id="message"
              rows={1}
              value={updateMessage}
              onChange={handleUpdateMessageChange}
              className="block p-2.5 w-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter update message..."
            />
          </div>
          <h4>Update Shipment Status</h4>
          <div>
            <select
              id="shipment-status"
              value={shipmentStatus}
              onChange={handleShipmentStatusChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a Status...</option>
              <option value="IN_TRANSIT">IN TRANSIT</option>
              <option value="PACKAGING">PACKAGING</option>
              <option value="DISPATCH">DISPATCH</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 rounded-lg"
              variant="default"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateshippment;

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook"; // Assuming useMutation is similar to useLazyQuery
import {
  GET_ORDER,
  LIST_SHIPMENT_STATUS,
  SHIPMENT_TRACKING,
  UPDATE_ORDER,
} from "@/app/queries";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Button,
  toast,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import _ from "lodash";
function Updateshippment() {
  const { recordId } = useParams();
  const router = useRouter();
  const [updateMessage, setUpdateMessage] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [fetchOrder, { data, loading, error }] = useLazyQuery(serverFetch);
  const [AddShipment, AddShipmentResponce] = useLazyQuery(serverFetch);

  // Fetch order details
  useEffect(() => {
    fetchOrder(
      LIST_SHIPMENT_STATUS,
      {
        where: {
          order: {
            is: recordId,
          },
        },
        sort: {
          createdOn: "asc",
        },
      },
      {
        cache: "no-store",
      }
    );
  }, [recordId]);

  useEffect(() => {
    if (AddShipmentResponce?.data) {
      toast({
        title: "Successfully Updated",
      });
      router.refresh();
    }
    if (AddShipmentResponce?.error) {
      toast({
        title: "Error while updating",
        description: AddShipmentResponce?.error.message,
        variant: "destructive",
      });
    }
  }, [
    AddShipmentResponce?.data,
    AddShipmentResponce?.error,
    AddShipmentResponce?.loading,
  ]);

  useEffect(() => {
    if (error) {
      console.error("Error while fetching:", error);
    }
    if (data) {
      // const order = data?.getOrder;
      // setShipmentStatus(order?.shipmentStatus || '');
      // setUpdateMessage(order?.update || '');
    }
  }, [data, error, loading]);
  if (loading) {
    return (
      <h4 className="text-black dark:text-white flex flex-row justify-center">
        loading....
      </h4>
    );
  }

  // Handle input changes
  const handleUpdateMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateMessage(event.target.value);
  };

  const handleShipmentStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShipmentStatus(event.target.value);
  };

  // Submit the update
  const handleSubmit = () => {
    AddShipment(
      SHIPMENT_TRACKING,
      {
        input: {
          order: recordId,
          status: shipmentStatus,
          update: updateMessage,
        },
      },
      {
        cache: "no-store",
      }
    );
  };

  return (
    <div className="h-full flex flex-col justify-center items-center align-middle !m-10">
      {/* <h3>Update Shipment</h3> */}
      <div className=" w-[100%] flex flex-col gap-2 justify-center h-full">
        <div className="flex flex-row justify-end">
          <Dialog>
            <DialogTrigger>
              <Button className="ml-3" variant="default">
                {" "}
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className=" overflow-auto flex flex-row justify-center">
              <DialogHeader>
                <DialogTitle className="mb-2
                ">Update shipment status </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-3">
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
                        <option value="PACKAGING">PACKAGING</option>
                        <option value="IN_TRANSIT">IN TRANSIT</option>
                        <option value="DISPATCH">DISPATCH</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </div>
                    <div className="flex flex-row justify-center">
                      <Button
                        onClick={handleSubmit}
                        className="mt-4 px-4 py-2 rounded-lg"
                        variant="default"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <TableDemo trackings={data?.listShipmenttrackings?.docs}/>
        </div>
        
      </div>
    </div>
  );
}

export default Updateshippment;

 function TableDemo({trackings}: {trackings: any[]}) {
  function dateFun(createdOn:string){
    const date = new Date(createdOn);
console.log(date,"date")
    // Format the date using toLocaleString with custom options
    const formattedDate = date.toLocaleString('en-US', {
      month: 'long', // Full month name
      day: 'numeric', // Numeric day
      year: 'numeric', // Full year
      hour: 'numeric', // Numeric hour
      minute: 'numeric', // Numeric minute
      hour12: true, // 12-hour clock (AM/PM)
    });
    // console.log(formattedDate,typeof(formattedDate),"formattedDate")
    return formattedDate
  }
  return (
    <Table>
      <TableCaption>A list of your Shipment Trackings.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead className="min-w-[200px] font-bold">Date</TableHead>
          <TableHead className="min-w-[200px] font-bold">Status</TableHead>
          <TableHead className="min-w-[200px] font-bold">Update</TableHead>
        </TableRow>
      </TableHeader>
      {trackings?.length>0 && 
      <TableBody>
        {trackings?.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{dateFun(invoice.createdOn)}</TableCell>
            <TableCell>{_.startCase(invoice.status)}</TableCell>
            <TableCell>{invoice.update}</TableCell>
          </TableRow>
        ))}
      </TableBody>}
    </Table>
  )
}

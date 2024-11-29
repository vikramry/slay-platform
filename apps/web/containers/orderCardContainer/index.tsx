import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { GET_ORDER, SHIPMENT_TRACKING } from "@/app/queries";
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
import DownloadInvoiceContainer from "../downloadInvoiceContainer";


const OrderCard: React.FC<any> = ({ order }) => {
  const { invoice, shipmentStatus, trackings, date, orderId } = order;
  const [AddShipment, AddShipmentResponce] = useLazyQuery(serverFetch);
  const [updateMessage, setUpdateMessage] = useState("");
  const [shipmentStatuss, setShipmentStatus] = useState("");
  const router=useRouter()

  const progress = (() => {
    // ((trackings.length ) ) * 25;
    switch (shipmentStatus) {
      case "PACKAGING":
        return 10;
      case "IN_TRANSIT":
        return 45;
      case "DISPATCH":
        return 75;
      case "DELIVERED":
        return 100;
      default:
        return 10;
    }
  })();
  const {recordId} =useParams()
  useEffect(() => {
    if (AddShipmentResponce?.data) {
      toast({
        title: "Successfully Updated",
      });
      router.refresh()
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
  const handleSubmit = () => {
    AddShipment(
      SHIPMENT_TRACKING,
      {
        input: {
          order: recordId,
          status: shipmentStatuss,
          update: updateMessage,
        },
      },
      {
        cache: "no-store",
      }
    );
  };
  return (
    <div className="max-w-full w-full bg-white shadow-lg rounded-lg border border-gray-200 p-6 space-y-4 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            Order ID:{" "}
            <span className="font-medium text-gray-900">{orderId}</span>
          </p>
          <p className="text-sm text-gray-500">
            Placed On:{" "}
            <span className="font-medium text-gray-900">
              {new Date(date).toDateString()}
            </span>
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      <div className="space-y-6">
        {invoice.invoiceLines.map((product:any, index:number) => (
          <>
            <div
              key={index}
              className="flex items-center space-x-4 justify-between "
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {product?.productItem?.name}
                </h2>
                <p className="text-sm text-gray-500">{product?.productItem?.description}</p>
                {product?.variants?.[0] &&<p className="text-sm text-gray-500">({product?.variants?.[0]?.name})</p>}
                <p className="text-sm text-gray-500">
                  Quantity: {product?.quantity}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-4">
                  ₹ {product.amount}{" "}
                  <span className="text-xs text-gray-500">
                    per unit: ₹ {product.pricePerUnit}
                  </span>
                </p>
              </div>
            </div>
            <hr className="border-t border-gray-300 my-2" />
          </>
        ))}

        {/* <div>
          <p className="text-sm text-gray-600">
            Tracking Status: <span className="font-medium">{trackings[0]?.update}</span>
          </p>
          <button className="inline-block text-sm font-medium text-black bg-transparent border border-gray-500 px-4 py-2 mt-2 rounded-md">
            {shipmentStatus}
          </button>
        </div> */}

        {/* <div className="mt-4">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>PLACED</span>
              <span>SHIPPED</span>
              <span>DELIVERED</span>
            </div>
            <div className="relative w-full h-1 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
                style={{ width: `${order.tracking.progress}% `}}
              ></div>

             
              {[25, 50, 75, 100].map((percentage, index) => {
                return (
                  <div
                    key={index}
                    className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      order.tracking.progress >= percentage
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    } border-2 border-white rounded-full`}
                    style={{ left: ${percentage}% }}
                  ></div>
                );
              })}
            </div> */}

        <div>
          {/* Tracking Progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>PACKAGING</span>
              <span>IN TRANSIT</span>
              <span>DISPATCH</span>
              <span>DELIVERED</span>
            </div>
            <div className="relative w-full h-1 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>

              {[0, 34, 66, 100].map((percentage, index) => (
                <div
                  key={index}
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    progress >= percentage ? "bg-green-500" : "bg-gray-300"
                  } border-2 border-white rounded-full`}
                  style={{ left: `${percentage}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <p>Shipping Address:</p>
            <p>{`${invoice.shippingAddress.name}, ${invoice.shippingAddress.addressLine1}, ${invoice.shippingAddress.city}, ${invoice.shippingAddress.state}, ${invoice.shippingAddress.country} - ${invoice.shippingAddress.zipCode}`}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <p>Billing Address:</p>
            <p>{`${invoice.billingAddress.name}, ${invoice.billingAddress.addressLine1}, ${invoice.billingAddress.city}, ${invoice.billingAddress.state}, ${invoice.billingAddress.country} - ${invoice.billingAddress.zipCode}`}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total Amount: ₹ {invoice.totalAmount}
          </p>
          <p className="text-sm text-gray-500">
            Payment Status: {invoice.status}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Dialog>
            <DialogTrigger>
            <Button variant="outline" className="text-black font-medium  ">Update Tracking</Button>

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
                        value={shipmentStatuss}
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
          <DownloadInvoiceContainer recordId={recordId} />
        </div>
      </div>
    </div>
  );
};

const OrdersCardContainer = () => {
    const {recordId}=useParams()
    const [getOrder,getOrderResponse]=useLazyQuery(serverFetch)
  useEffect(() => {
    getOrder(GET_ORDER,{
      where: {
        id: {
          is: recordId,
        },
      },
    },{
      cache: "no-store"
    })
  }, [recordId])
  useEffect(() => {
    if(getOrderResponse?.data){
  console.log(getOrderResponse?.data,"getOrderResponse")
  }
  else if(getOrderResponse?.error){
    console.log(getOrderResponse?.error,"getOrderResponse")
  
  }
  }, [getOrderResponse?.data,getOrderResponse?.error,getOrderResponse?.loading])


  return (
    <div className="space-y-4">
        {getOrderResponse?.data?.getOrder &&
      <OrderCard order={getOrderResponse?.data?.getOrder} />}
      
    </div>
  );
};

export default OrdersCardContainer;

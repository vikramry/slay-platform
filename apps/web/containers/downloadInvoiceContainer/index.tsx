"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { GET_ORDER } from "@/app/queries";
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
} from "@repo/ui";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import generatePDF from "react-to-pdf";
import CustomerPdfComponent from "../orderpdfdownload";
function DownloadInvoiceContainer({ recordId }: { recordId: any }) {
  const router = useRouter();
  const targetRef = useRef();
  const [customerName, setCustomerName] = useState("");
  const [getCustomer, { data, loading, error }] = useLazyQuery(serverFetch);
  const [customerData, setCustomerData] = useState<any>({});

  //   console.log(id,"searchId")
  useEffect(() => {
    getCustomer(
      GET_ORDER,
      {
        where: {
          id: {
            is: recordId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, [recordId]);

  useEffect(() => {
    if (error) {
      console.log(error, "order data");
    }
    if (data) {
      setCustomerData(data?.getOrder);
      console.log(data, "order data");
      setCustomerName(data?.getOrder?.invoice?.customer?.firstName);
    }
  }, [data, loading, error]);
  if (loading) {
    return (
      <h4 className="text-[black] dark:text-white flex flex-row justify-center">
        loading....
      </h4>
    );
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="ml-3" variant="outline"> Download Invoice</Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>
            <div>
              <div className="flex justify-end mr-10 pb-5 gap-4">
                <Button
                  type="button"
                  onClick={() =>
                    generatePDF(targetRef, {
                      method: "save",
                      filename: `Slay Coffee ${customerName}.pdf`,
                    })
                  }
                >
                  <span className=" flex justify-center items-center gap-2">
                    <HiOutlineDocumentDownload className="text-gray h-4 w-4" />
                    Download
                  </span>
                </Button>
              </div>
              <div>
                {customerData?.id && (
                  <CustomerPdfComponent
                    reference={targetRef}
                    OrderData={customerData}
                    loading={loading}
                  />
                )}
              </div>
            </div>{" "}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DownloadInvoiceContainer;

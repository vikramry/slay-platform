import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { GET_INVOICE } from '@/app/queries';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import CustomerPdfComponent from './CustomerPdfComponent';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import generatePDF from "react-to-pdf";
import { Button } from '@repo/ui';

function InvoiceContainer() {
    const router = useRouter();
    const targetRef = useRef();
    const [customerName, setCustomerName] = useState("");
    const [getCustomer, { data, loading, error }] = useLazyQuery(serverFetch);
    const [customerData, setCustomerData] = useState<any>({});
    const {recordId} =useParams()
  //   console.log(id,"searchId")
    useEffect(() => {
      getCustomer(GET_INVOICE, {
        where: {
          id: {
            is: recordId,
          },
        },
      },{
        cache: "no-store"
      });
    }, []);
  
    useEffect(() => {
      if (error) {
      }
      if (data) {
        setCustomerData(data?.getInvoice);
        // console.log(data);
        setCustomerName(data?.getInvoice?.customer?.firstName);
      }
    }, [data, loading, error]);
  if(loading){
      return(
          <h4 className="text-[white] flex flex-row justify-center">loading....</h4>
      )
  }
    return (
      <div className='w-full px-10 py-10'>
        <div className="flex justify-end mr-10 pb-5 gap-4">
        {/* <div className='text-black h-[30px] '
            onClick={() => router.push("/")}
          >
            <span className=" flex justify-center  gap-2  flex-row items-center text-center">
              <RiArrowGoBackFill className="text-gray h-4 w-4" />
              Back
            </span>
          </div> */}
  
          <Button
          varient="default"
            type="button"
            className=""
            onClick={() =>
              generatePDF(targetRef, {
                method: "save",
                filename: `Slay Coffee.pdf`,
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
          
          {customerData?.id && 
          <CustomerPdfComponent
            reference={targetRef}
            OrderData={customerData}
            loading={loading}
          />}
        </div>
      </div>
    );
}

export default InvoiceContainer
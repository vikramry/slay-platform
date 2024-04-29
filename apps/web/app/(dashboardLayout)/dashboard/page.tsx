"use client"
import React, { useState } from "react";
import DynamicLayout from "../../dynamicLayout";
import { DialogBox } from "@repo/ui/dialogBox";
import { DeletePopupComp } from "@repo/ui/deletePopupComp"
// import { Button } from "@repo/ui/button";
import { Button, DataTable } from '@repo/ui';
import { Payment, columns } from "./columns"
const page = () => {
  const [state, setState] = useState(false)

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ]


  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp InputText="delete" setState={setState}/>
        </DialogBox> */}

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;

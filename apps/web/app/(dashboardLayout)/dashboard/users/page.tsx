"use client"
import React from "react";
import { DataTable } from '@repo/ui';
import {  usersSampleData } from "../../../../tempData";
import {  userColumns } from "../columns";
import ListUsers from "@/containers/listuser";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp InputText="delete" setState={setState}/>
        </DialogBox> */}
<ListUsers/>

    </div>
  );
};

export default page;

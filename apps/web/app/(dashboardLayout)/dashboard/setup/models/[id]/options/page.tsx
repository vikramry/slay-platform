"use client"
import React from "react";
import { DataTable } from '@repo/ui';
// import { ModelOptionsData } from "../../../../../../tempData";
// import { modelOptionsColumns } from "../../../columns";
import ListModeloptions from "@/containers/listModeloptions";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp inputText="delete" setState={setState}/>
        </DialogBox> */}
      <ListModeloptions />
    </div>
  );
};

export default page;
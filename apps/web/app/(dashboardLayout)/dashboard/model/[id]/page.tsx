"use client"
import React from "react";
import { DataTable } from '@repo/ui';
import { modelFieldColumns } from "../../columns";
import { ModelFieldData } from "../../../../../tempData";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp inputText="delete" setState={setState}/>
        </DialogBox> */}

      <DataTable columns={modelFieldColumns} data={ModelFieldData} />
    </div>
  );
};

export default page;

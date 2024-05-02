"use client"
import React from "react";
import { DataTable } from '@repo/ui';
import { ModelOptionsData } from "../../../../../../tempData";
import { modelOptionsColumns } from "../../../columns";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp InputText="delete" setState={setState}/>
        </DialogBox> */}

      <DataTable columns={modelOptionsColumns} data={ModelOptionsData} />
    </div>
  );
};

export default page;
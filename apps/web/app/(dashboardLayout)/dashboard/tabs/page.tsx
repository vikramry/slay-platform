"use client"
import React from "react";
import { DataTable } from '@repo/ui';
import { TabSampleData } from "../../../../tempData";
import { tabsColumns } from "../columns";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp inputText="delete" setState={setState}/>
        </DialogBox> */}

      <DataTable columns={tabsColumns} data={TabSampleData} url="/dashboard/tabs/createTab" text="Create tab"/>
    </div>
  );
};

export default page;

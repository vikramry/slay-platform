"use client"
import React from "react";
import { DataTable } from '@repo/ui';
import { TabSampleData } from "../../../../tempData";
import { tabsColumns } from "../columns";
import ListTabs from "@/containers/listtab";
const page = () => {
  return (
    <div >
      {/* <DynamicLayout /> */}
      {/* <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp inputText="delete" setState={setState}/>
        </DialogBox> */}
<ListTabs/>
    </div>
  );
};

export default page;

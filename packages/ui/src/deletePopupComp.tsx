import { useEffect, useState } from "react";
import { Button } from "./button";
import { InputField } from "./inputFields";

export function DeletePopupComp({InputText}:{InputText:string}) {
    const[confirmDeleteText,setConfirmDeleteText]=useState("")
    const [confirmDelete,setConfirmDelete]=useState(true)
    console.log(confirmDeleteText,"text")
    useEffect(()=>{
        if(confirmDeleteText ===InputText){
            setConfirmDelete(false)
        }else{
            setConfirmDelete(true)

        }
    },[confirmDeleteText])
    console.log(confirmDelete)
  return (
    <div className="flex flex-col gap-6">
        <h4 className="text-sm dark:text-[#817994]">Please confirm the deletion of Your Model Name.</h4>
        <InputField type="text"  placeholder="Enter code for delete" onChange={(e)=>setConfirmDeleteText(e.target.value)}/>
        <div className=" w-[200px] flex flex-row gap-5">
            <Button buttonText="Confirm delete" variant="primary" size="sm" classnames=" h-[50px] " disabled={true} onClick={()=>console.log("enter")}/>
            <Button buttonText="Cancel" variant="primary" size="sm" classnames=" h-[50px]"/>

        </div>
    </div>
  )
}


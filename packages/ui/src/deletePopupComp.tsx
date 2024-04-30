import { useEffect, useState } from "react";
import { Button } from "./button";
import { InputField } from "./inputFields";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./components";

export function DeletePopupComp({ InputText, onclick, ...rest }: {
    InputText: string, onclick?: () => void
}) {
    const [confirmDeleteText, setConfirmDeleteText] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(true)
    console.log(confirmDeleteText, "text")
    useEffect(() => {
        if (confirmDeleteText === InputText) {
            setConfirmDelete(false)
        } else {
            setConfirmDelete(true)

        }
    }, [confirmDeleteText])
    console.log(confirmDelete)
    return (

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to drop model "{InputText}"?</AlertDialogTitle>
                <AlertDialogDescription>
                    <InputField type="text" label={`Type "${InputText}" to confirm your action`} placeholder="Enter Model Name for delete" onChange={(e) => setConfirmDeleteText(e.target.value)} classNames="border-[1.5px]  dark:border-[#18181b]/80  dark:text-[red]" />
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onclick} disabled={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        // <div className="flex flex-col gap-6 fixed top-0 left-0 h-screen w-screen">
        //     <h4 className="text-sm text-gray-600 dark:text-gray-500 font-medium">Please confirm the deletion of Your Model Name.</h4>
        //     <InputField type="text"  placeholder="Enter Model Name for delete" onChange={(e)=>setConfirmDeleteText(e.target.value)} classNames="border-[1.5px]  dark:border-[#18181b]/80  dark:text-[red]"/>
        //     <div className=" flex flex-row gap-5 justify-end">
        //         <div className="w-[150px] flex flex-row gap-2 justify-end">

        //         <Button buttonText="Cancel" variant="secondary" size="md" classnames=" font-medium text-black dark:hover:bg-[#18181b]/80 dark:hover:opacity-800 " onClick={()=>setState(false)}/>
        //         <Button buttonText="Delete" variant="primary" size="md" classnames="font-medium" disabled={confirmDelete} onClick={onclick}/>
        //             </div>

        //     </div>
        // </div>
    )
}


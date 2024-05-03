import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import { InputField } from "./inputFields";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./components";

export function DeletePopupComp({ inputText, type, onclick, ...rest }: {
    inputText: string, type: "MODEL" | "MODELFIELD" | "FIELDOPTION" | "MODELOPTION" | "COMPONENT" | "TAB" | "USER", onclick?: () => void
}) {
    const typeMap: Record<string, string> = {
        "MODEL": "model",
        "MODELFIELD": "model field",
        "FIELDOPTION": "field option",
        "MODELOPTION": "model option",
        "COMPONENT": "component",
        "TAB": "tab",
        "USER": "user",
    }
    const [confirmDeleteText, setConfirmDeleteText] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(true)
    console.log(confirmDeleteText, "text")
    useEffect(() => {
        if (confirmDeleteText === inputText) {
            setConfirmDelete(false)
        } else {
            setConfirmDelete(true)

        }
    }, [confirmDeleteText])
    console.log(confirmDelete)
    return (

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to drop {typeMap[type]} "{inputText}"?</AlertDialogTitle>
                <AlertDialogDescription>
                    <InputField type="text" label={`Type "${inputText}" to confirm your action`} placeholder={`Enter ${typeMap[type]} name for delete`} onChange={(e) => setConfirmDeleteText(e.target.value)} classNames="border-[1.5px]  dark:border-[#18181b]/80  dark:text-[red]" />
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-transparent shadow-none border-none hover:bg-transparent"><CustomButton buttonText="Delete" variant="primary" size="md" classnames="font-medium" disabled={confirmDelete} onClick={onclick} /></AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        // <div className="flex flex-col gap-6 fixed top-0 left-0 h-screen w-screen">
        //     <h4 className="text-sm text-gray-600 dark:text-gray-500 font-medium">Please confirm the deletion of Your Model Name.</h4>
        //     <InputField type="text"  placeholder="Enter Model Name for delete" onChange={(e)=>setConfirmDeleteText(e.target.value)} classNames="border-[1.5px]  dark:border-[#18181b]/80  dark:text-[red]"/>
        //     <div className=" flex flex-row gap-5 justify-end">
        //         <div className="w-[150px] flex flex-row gap-2 justify-end">

        //         <CustomButton buttonText="Cancel" variant="secondary" size="md" classnames=" font-medium text-black dark:hover:bg-[#18181b]/80 dark:hover:opacity-800 " onClick={()=>setState(false)}/>
        //         <CustomButton buttonText="Delete" variant="primary" size="md" classnames="font-medium" disabled={confirmDelete} onClick={onclick}/>
        //             </div>

        //     </div>
        // </div>
    )
}


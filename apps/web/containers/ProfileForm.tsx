import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useToast,
    Toaster
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CREATE_PROFILE, GET_PROFILE, UPDATE_PROFILE } from '@/app/queries';
import { useParams } from 'next/navigation';

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    label: z.string({
        required_error: "Label is required"
    })
});

const ProfileForm = ({ edit = false }: { edit?: boolean }) => {
    const [createProfile, { data, error, loading }] = useLazyQuery(serverFetch);
    const [getProfile, getProfileResponse] = useLazyQuery(serverFetch);
    const [updateProfile, updateProfileResponse] = useLazyQuery(serverFetch);
    const { profileId } = useParams();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    useEffect(()=>{
        if(edit){
            getProfile(
                GET_PROFILE,
                {
                    where: {
                        id: {
                            is: profileId
                        }
                    }
                },
                {
                    cache: "no-store"
                }
            )
        }
    }, [])

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        if (edit) {
            updateProfile(UPDATE_PROFILE,
                {
                    "input": {
                        "id": profileId,
                        "label": values?.label,
                        "name": values?.name,
                        "updatedBy": null,
                        "createdBy": null,
                    }
                },
                {
                    cache: "no-store"
                }
            )
        }
        else
            createProfile(
                CREATE_PROFILE,
                {
                    "input": {
                        "label": values.label,
                        "name": values.name,
                        "createdBy": null,
                        "updatedBy": null
                    }
                },
                {
                    cache: "no-store",
                }
            );
    }
    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Profile name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="Profile label" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        variant="default"
                        className="flex justify-center items-center w-fit"
                    >
                        Submit
                    </Button>
                </div>{" "}
            </form>
        </Form>
    )
}

export default ProfileForm
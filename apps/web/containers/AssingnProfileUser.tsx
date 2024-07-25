import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { GET_USER_BY_ID, LIST_ALL_PROFILES } from '@/app/queries';
import { ProfileType } from '@/types';
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Button, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, useToast } from '@repo/ui';
import React, { useEffect, useState } from 'react'
import { UPDATE_USER } from '../app/queries';

const AssingnProfileUser = ({ userId }: { userId: string }) => {
    const [getUser, { data, loading, error }] = useLazyQuery(serverFetch);
    const [getAllProfies, getAllProfiesResponse] = useLazyQuery(serverFetch);
    const [updateUserProfile, updateUserProfileResponse] = useLazyQuery(serverFetch);
    const [profileValue, setProfileValue] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        getAllProfies(LIST_ALL_PROFILES, { limit: 100 }, {
            cache: "no-store"
        }
        );
        getUser(
            GET_USER_BY_ID,
            {
                where: {
                    id: {
                        is: userId,
                    }
                }
            },
            {
                cache: "no-store"
            }
        )
    }, [])

    useEffect(() => {
        if (data) {
            if (data.getUser?.profile?.id) {
                setProfileValue(data.getUser.profile.id);
            }
        }
    }, [data, error, loading])
    useEffect(() => {
        if (getAllProfiesResponse.data) {

        }
    }, [getAllProfiesResponse.data, getAllProfiesResponse.error, getAllProfiesResponse.loading])
    const handleSubmit = (e: any) => {
        e.preventDefault();
        updateUserProfile(
            UPDATE_USER,
            {
                id: userId,
                profile: profileValue
            }
        )
    }


    useEffect(() => {
        if (updateUserProfileResponse.data) {
            toast({
                title: "Profile Assinged to User",
            });
            window.location.reload();
        }
    }, [updateUserProfileResponse.data, updateUserProfileResponse.error, updateUserProfileResponse.loading])
    return (

        <form onSubmit={handleSubmit} className='flex w-full flex-col justify-center items-center'>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Assign Profile to User</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Select onValueChange={(e: string) => setProfileValue(e)} value={profileValue} disabled={loading || getAllProfiesResponse.loading}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a profile" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Profiles</SelectLabel>
                                    {
                                        getAllProfiesResponse.data?.listProfiles?.docs.map((profile: ProfileType) => {
                                            <SelectItem value={profile.id}>{profile.label}</SelectItem>
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" disabled={loading || getAllProfiesResponse.loading}>Save</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </form>
    )
}

export default AssingnProfileUser
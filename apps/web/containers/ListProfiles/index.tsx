"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { LIST_ALL_PROFILES } from "@/app/queries";
import React, { useEffect } from "react";
import { DataTable, Toaster, useToast } from "@repo/ui";
import { profileColumns } from "@/app/(dashboardLayout)/dashboard/columns";

const ListProfile = () => {
  const [getProfiles, { data, loading, error }] = useLazyQuery(serverFetch);
  const { toast } = useToast();
  useEffect(() => {
    getProfiles(
      LIST_ALL_PROFILES,
      {
        limit: 50,
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error]);
  return (
    <div>
      <Toaster />
      <DataTable
        columns={profileColumns}
        data={data?.listProfiles?.docs || []}
        text="Create Profile"
        url="/dashboard/setup/profiles/add"
        filterBy={"name"}
        loading={loading}
      />
    </div>
  );
};

export default ListProfile;

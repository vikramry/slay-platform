import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Toaster,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { GET_FILE, UPDATE_FILE, UPLOAD_FILE } from "@/app/queries";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
  file: z
    .object({
      raw: z.any().optional(),
      base64: z.string().optional(),
    })
    .optional(),
});

function FileRecordContainer({ edit = false }: { edit?: boolean }) {
  // const [file, setFile] = useState<File | null>(null)
  const router = useRouter();
  const recordId = useParams()?.recordId;
  const [base64URL, setBase64URL] = useState<string>("");
  const [uploadFile, { data, loading, error }] = useLazyQuery(serverFetch);
  const [updateFile, updateFileResponse] = useLazyQuery(serverFetch);
  const [getFile, getFileResponse] = useLazyQuery(serverFetch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Function to convert file to base64
  const getBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      let reader = new FileReader();

      // Convert the file to base64
      reader.readAsDataURL(file);

      // on reader load
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;
    });
  };

  // Handle file input change
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      try {
        // Convert the file to base64
        const base64 = await getBase64(selectedFile);

        // Set the file and base64 in the form values using form.setValue
        form.setValue("file", {
          raw: selectedFile,
          base64: base64 as string,
        });

        console.log("Base64 File:", base64);
      } catch (error) {
        console.log("Error converting file:", error);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    let where;
    if (edit == true && values?.file) {
      where = {
        description: values?.description,
        fileName: values?.name,
        fileId: recordId,
        base64File: values?.file?.base64,
      };
    } else if (edit == true && !values?.file) {
      where = {
        description: values?.description,
        fileName: values?.name,
        fileId: recordId,
      };
    }
    if (edit == true) {
      updateFile(UPDATE_FILE, where, {
        cache: "no-store",
      });
    } else {
      uploadFile(
        UPLOAD_FILE,
        {
          base64File: values.file?.base64,
          fileName: values?.name,
          description: values?.description,
        },
        {
          cache: "no-store",
        }
      );
    }
    // if (values.file) {
    //     console.log("File with base64:", values.file?.base64)
    // }

    // Handle other form data submission logic here
  }

  useEffect(() => {
    if (edit) {
      getFile(
        GET_FILE,
        {
          where: {
            id: {
              is: recordId,
            },
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, []);
  useEffect(() => {
    if (getFileResponse?.data) {
      console.log(getFileResponse?.data, "getfile data");
      form.setValue("description", getFileResponse?.data?.getFile?.description);
      form.setValue("name", getFileResponse?.data?.getFile?.name);
    } else if (getFileResponse?.error) {
      console.log(getFileResponse?.error, "file error");
    }
    console.log(getFileResponse, "getFileResponse");
  }, [getFileResponse?.data, getFileResponse?.loading, getFileResponse?.error]);
  useEffect(() => {
    if (data) {
      console.log(data, "file data");
      router.back();
    } else if (error) {
      console.log(error, "file error");
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (updateFileResponse?.data) {
      console.log(updateFileResponse?.data, "update file data");
      router.back();
    } else if (updateFileResponse?.error) {
      console.log(updateFileResponse?.error, "file error");
    }
  }, [
    updateFileResponse?.data,
    updateFileResponse?.loading,
    updateFileResponse?.error,
  ]);
  return (
    <div>
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
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="File"
                      type="file"
                      onChange={handleFileInputChange} // Custom handler for file input
                    />
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
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FileRecordContainer;

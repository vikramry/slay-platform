"use client";
import { Label } from "@repo/ui";
import React, { useEffect, useState } from "react";
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
  Toaster,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { LuX } from "react-icons/lu";
const productData = [
  {
    name: "product1",
    qty: 1,
    price: 199,
    TotalAmount: 199,
    type: "ck-bbl",
    name: "product1",
    qty: 1,
    price: 199,
    TotalAmount: 199,
    type: "ck-bbl",
  },
  {
    name: "product2",
    qty: 1,
    price: 199,
    TotalAmount: 199,
    type: "ck-bbl",
  },
  {
    name: "product3",
    qty: 1,
    price: 199,
    TotalAmount: 199,
    type: "ck-bbl",
  },
];
import {
  LIST_ADDRESSES,
  LIST_ALL_CUSTOMERS,
  GET_COLLECTION,
  LIST_COLLECTION,
} from "@/app/queries";
import _ from "lodash";
import Image from "next/image";

const productSchema = z.object({
  productItemId: z.string().optional(),
  productItemName: z.string().optional(),
  productItemImage: z.string().optional(),
  quantity: z.coerce.number(),
  pricePerUnit: z.coerce.number(),
  variants: z.array(z.string()).optional(),
  totalAmount: z.coerce.number(),
});

const formSchema = z.object({
  customer: z.string({
    required_error: "Customer is required",
  }),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
  isBillingSameAsShipping: z.boolean(),
  products: z.array(productSchema),
  totalAmount: z.coerce.number(),
});

const CreateOrderContainer = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBillingSameAsShipping: false,
      totalAmount: 0,
    },
  });
  const [listCustomers, { data, loading, error }] = useLazyQuery(serverFetch);
  const [listAddresses, listAddressesResponse] = useLazyQuery(serverFetch);
  const [listColections, listColectionsResponse] = useLazyQuery(serverFetch);
  const [listProductItems, listProductItemsResponse] =
    useLazyQuery(serverFetch);

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
  const [selectedVarentId, setSelectedVarentId] = useState<string[]>([]);

  const [selectedProductItemId, setSelectedProductItemId] = useState();
  useEffect(() => {
    listCustomers(
      LIST_ALL_CUSTOMERS,
      {
        limit: 1000,
      },
      {
        cache: "no-store",
      }
    );
    listColections(
      LIST_COLLECTION,
      {
        limit: 1000,
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    form.setValue("billingAddress", "");
    form.setValue("shippingAddress", "");

    if (!_.isEmpty(data)) {
      listAddresses(
        LIST_ADDRESSES,
        {
          limit: 100,
          where: {
            customer: {
              is: form.watch("customer"),
            },
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, [form.watch("customer")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    if (listColectionsResponse?.data) {
      console.log(
        listColectionsResponse?.data?.listCollections?.docs,
        "collections"
      );
    } else if (listColectionsResponse?.error) {
      console.log(listColectionsResponse?.error, "error");
    }
  }, [
    listColectionsResponse?.data,
    listColectionsResponse?.loading,
    listColectionsResponse?.error,
  ]);

  useEffect(() => {
    if (selectedCollectionId) {
      listProductItems(
        GET_COLLECTION,
        {
          where: {
            id: {
              is: selectedCollectionId,
            },
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, [selectedCollectionId]);
  useEffect(() => {}, [
    listProductItemsResponse?.data,
    listProductItemsResponse?.error,
    listProductItemsResponse?.loading,
  ]);
  useEffect(() => {
    console.log(selectedProductItemId, "selectedProductItemId");
  }, [selectedProductItemId]);

  return (
    <div className="justify-center items-center w-full">
      <Label className="text-lg">Custom Customer Order</Label>
      <div className="mt-4">
        <Form {...form}>
          <Toaster />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a Customer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Customers</SelectLabel>
                            {data?.listCustomers?.docs.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>
                                {`${item?.firstName} ${item?.lastName}`}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: any) => {
                          form.setValue("shippingAddress", value);
                          if (form.watch("isBillingSameAsShipping")) {
                            form.setValue("billingAddress", value);
                          }
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select Shipping Address" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Addresses</SelectLabel>
                            {listAddressesResponse?.data?.listAddresss?.docs.map(
                              (item: any) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id}
                                  className="break-words  whitespace-normal"
                                  title={`${item.name}, ${item?.addressLine1}, ${item?.city}, ${item?.state}, ${item.zipCode}`}
                                >
                                  {`${item.name}, ${item?.addressLine1.slice(0, 10)}, ${item?.city}, ${item?.state}, ${item.zipCode}`}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="isBillingSameAsShipping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(value: any) => {
                            if (value) {
                              form.setValue(
                                "billingAddress",
                                form.watch("shippingAddress")
                              );
                            }
                            form.setValue("isBillingSameAsShipping", value);
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none break-words">
                        <FormLabel>
                          Is Billing Address Same As Shipping Address
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address</FormLabel>
                      <FormControl>
                        <Select
                          disabled={form.watch("isBillingSameAsShipping")}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select Billing Address" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Addresses</SelectLabel>
                              {listAddressesResponse?.data?.listAddresss?.docs.map(
                                (item: any) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id}
                                    className="break-words whitespace-normal"
                                    title={`${item.name}, ${item?.addressLine1}, ${item?.city}, ${item?.state}, ${item.zipCode}`}
                                  >
                                    {`${item.name}, ${item?.addressLine1.slice(0, 10)}, ${item?.city}, ${item?.state}, ${item.zipCode}`}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="justify-center items-center w-full grid grid-cols-12 col-span-12">
                <div className="col-span-8">
                  <div className="bg-white p-5 rounded-lg shadow-md col-span-8 flex flex-col gap-3">
                    <h4>Products</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex justify-end w-[100%]">
                          <Button variant="outline" className="w-[150px]">
                            Add product
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className=" min-w-fit">
                        <DialogHeader>
                          <DialogTitle>Add product</DialogTitle>
                          {/* <DialogDescription>
                  Select the timeline and export the data into an Excel.
                </DialogDescription> */}
                        </DialogHeader>
                        <div className="grid gap-5">
                          <div className="flex flex-col gap-2">
                            <Label>Select collection</Label>

                            <Select
                              onValueChange={(value) => {
                                setSelectedCollectionId(value);
                              }}
                            >
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select collection" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Select collection</SelectLabel>
                                  {listColectionsResponse?.data?.listCollections
                                    ?.docs?.length > 0 && (
                                    <>
                                      {listColectionsResponse?.data?.listCollections?.docs.map(
                                        (singleCollection: any) => {
                                          return (
                                            <SelectItem
                                              value={singleCollection?.id}
                                            >
                                              {singleCollection?.name}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                    </>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedCollectionId &&
                            listProductItemsResponse?.data && (
                              <div className="flex flex-col gap-2">
                                <Label>Select product</Label>

                                <Select
                                  onValueChange={(value) => {
                                    const product =
                                      listProductItemsResponse?.data?.getCollection?.productItems?.find(
                                        (item: any) => item?.id == value
                                      );
                                    setSelectedProductItemId(product);
                                    setSelectedVarentId([]);
                                  }}
                                >
                                  <SelectTrigger className="">
                                    <SelectValue placeholder="Select product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Select Product</SelectLabel>
                                      {listProductItemsResponse?.data
                                        ?.getCollection?.productItems?.length >
                                        0 && (
                                        <>
                                          {listProductItemsResponse?.data?.getCollection?.productItems.map(
                                            (singleProduct: any) => {
                                              return (
                                                <SelectItem
                                                  value={singleProduct?.id}
                                                >
                                                  {singleProduct?.name}
                                                </SelectItem>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          {selectedProductItemId?.product?.variantGroups && (
                            <div>
                              {selectedProductItemId?.product?.variantGroups?.map(
                                (singlevarentGroup: any, index: number) => {
                                  return (
                                    <div className="flex flex-col gap-2">
                                      <Label>
                                        Select {singlevarentGroup?.label}
                                      </Label>

                                      <Select
                                        onValueChange={(value) => {
                                          // const product =listProductItemsResponse?.data?.getCollection?.productItems?.find((item:any)=>item?.id == value)
                                          // setSelectedProductItemId(product);
                                          const variants = selectedVarentId;
                                          variants[index] = value;
                                          setSelectedVarentId(variants);
                                        }}
                                      >
                                        <SelectTrigger className="">
                                          <SelectValue
                                            placeholder={`Select ${singlevarentGroup?.label}`}
                                          />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectLabel>
                                              Select {singlevarentGroup?.label}
                                            </SelectLabel>
                                            {singlevarentGroup?.variants
                                              ?.length > 0 && (
                                              <>
                                                {singlevarentGroup?.variants.map(
                                                  (singleItem: any) => {
                                                    return (
                                                      <SelectItem
                                                        value={singleItem?.id}
                                                      >
                                                        {singleItem?.name}
                                                      </SelectItem>
                                                    );
                                                  }
                                                )}
                                              </>
                                            )}
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            onClick={() => {
                              const price =
                                listProductItemsResponse?.data?.getCollection?.priceBook?.priceBookItems.find(
                                  (productPrice: any) => {
                                    console.log(productPrice);

                                    return (
                                      productPrice?.product?.id ===
                                        selectedProductItemId?.product?.id &&
                                      _.isEqual(
                                        selectedVarentId,
                                        productPrice?.variants.map(
                                          (item: any) => item.id
                                        )
                                      )
                                    );
                                  }
                                );
                              console.log(price, "price");
                              form.setValue("products", [
                                ...(form.getValues("products") || []),
                                {
                                  quantity: 1,
                                  productItemId: selectedProductItemId?.id,
                                  productItemImage:
                                    selectedProductItemId?.images[0]?.location,
                                  productItemName: selectedProductItemId?.name,
                                  variants: selectedVarentId,
                                  pricePerUnit: price?.offerPrice,
                                  totalAmount: 1 * price?.offerPrice,
                                },
                              ]);
                            }}
                          >
                            Submit
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <div className="flex flex-col gap-2 ">
                      <div className="grid grid-cols-12 pb-2 border-b border-gray">
                        <h5 className="col-span-8">Product</h5>
                        <h5 className="col-span-1 text-center">Quantity</h5>
                        <h5 className="col-span-2 text-center">Total</h5>
                      </div>
                      {form
                        .watch("products")
                        ?.map((item: any, index: number) => {
                          return (
                            <div className="grid grid-cols-12 pb-2 border-b border-gray items-center">
                              <div className="col-span-8 flex justify-center items-center">
                                <img
                                  src={item?.productItemImage}
                                  alt={`${index}-img`}
                                  width={100}
                                  height={100}
                                  className="h-25 w-25"
                                />
                                <div className="flex flex-col justify-start items-center">
                                  <h5>{item?.productItemName}</h5>
                                  <h6>{`₹ ${item?.pricePerUnit}.00`}</h6>
                                </div>
                              </div>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                className="col-span-1 text-center"
                                value={item?.quantity}
                                onChange={(e: any) => {
                                  const quantity = e.target.value;
                                  const products = form.getValues("products");
                                  products[index] = {
                                    ...products[index],
                                    quantity: parseInt(quantity) || 0,
                                    pricePerUnit:
                                      products[index]?.pricePerUnit || 0,
                                    totalAmount:
                                      (parseInt(quantity) || 0) *
                                      (products[index]?.pricePerUnit || 0),
                                  };
                                  const newTotalAmount = products.reduce(
                                    (sum, product) => sum + product.totalAmount,
                                    0
                                  );
                                  form.setValue("products", products);
                                  form.setValue("totalAmount", newTotalAmount);
                                }}
                              />
                              <h5 className="col-span-2 text-center">{`₹ ${item?.totalAmount}.00`}</h5>
                              <LuX size={20} onClick={}/>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-md col-span-8 flex flex-col gap-2 mt-5">
                    <h4>Payment</h4>
                    <div className="border-1 border-gray-700 p-2">
                      <div className="grid grid-cols-12">
                        <h5 className="col-span-3">Subtotal</h5>
                        <h5 className="col-span-3">item</h5>
                        <h5 className="col-span-6 text-end">{`₹ ${form.watch("totalAmount")}`}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrderContainer;

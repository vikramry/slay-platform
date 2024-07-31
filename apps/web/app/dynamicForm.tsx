"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui"
import { Input } from "@repo/ui"


export function DynamicForm() {


    const sampleModel = {
        model: {
            type: 'relationship',
            ref: 'Model',

        },
        name: {
            type: 'string',

        },
        managed: {
            type: 'boolean',

            default: true,
        },
        keyName: {
            type: 'number',

        },
        value: {
            type: 'date',
        },
        type: {
            type: 'enum',
            enum: ['number', 'string', 'boolean', 'date'], // Adding 'date' type
            enumType: 'string',
        },
        createdBy: {
            type: 'relationship',
            ref: 'User',
            many: true,

        },
        updatedBy: {
            type: 'relationship',
            ref: 'User',

        },
    };

    const formConfig = [];
    const getValidations = (value) => {
        let validations = {};

        switch (value.type) {
            case 'string':
            case 'number':
            case 'float':
                validations = { required: value.required ? true : false };
                break;
            case 'boolean':
                validations = { required: value.required ? true : false };
                break;
            case 'date':
                validations = { required: value.required ? true : false };
                break;
            case 'relationship':
            case 'enum':
                validations = { required: value.required ? true : false };
                break;
            default:
                break;
        }
        return validations;
    };

    Object.entries(sampleModel).forEach(([key, value]) => {
        const temp = {
            name: key,
            type: value.type,
            validations: getValidations(value),
        };
        if (value?.default) {
            temp.value = value.default;
        }
        if (value?.many) {
            temp.many = true;
        }

        if (value?.type == "enum") {
            temp.type = "select";
            temp.options = value.enum;
        }
        formConfig.push(temp);
    });

    const generateZodSchema = (field: any) => {
        let schema;

        switch (field.type) {
            case 'string':
                schema = z.string();
                break;
            case 'number':
                schema = z.number();
                break;
            case 'float':
                schema = z.number();
                break;
            case 'boolean':
                schema = z.boolean();
                break;
            case 'date':
                schema = z.string();
                break;
            case 'select':
                schema = z.enum(field.options);
                break;
            case 'relationship':
                schema = z.string();
                break;
            default:
                schema = z.any();
                break;
        }

        return schema;
    }

    const generateZodSchemaForFormConfig = (formConfig) => {
        const schemaFields = {};

        formConfig.forEach((field) => {
            schemaFields[field.name] = generateZodSchema(field);
        });

        return z.object(schemaFields);
    }
    const getRequiredSchema = () => {
        const reqObject = {};
        formConfig.map((field) => {
            if (field.validations.required)
                reqObject[field.name] = true;
        })
        return reqObject
    }


    let formSchema = generateZodSchemaForFormConfig(formConfig);

    formSchema = formSchema.required(getRequiredSchema())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center items-center flex-wrap gap-10">
                {formConfig.map((item) => (
                    <FormField
                        control={form.control}
                        key={item.name}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel className="mb-2">{item.name}</FormLabel>
                                <FormControl className="w-full">
                                    {item.type === 'select' ? (
                                        <Select {...field} className="w-full" value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.options.map((option) => (
                                                    <SelectItem key={option} value={option} className="capitalize">
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : item.type === 'boolean' ? (
                                        <div>

                                            <Checkbox {...field} />
                                        </div>
                                    ) : item.type === 'date' ?
                                        (
                                            <Input
                                                placeholder={item.name}
                                                type="date"
                                                {...field}
                                            />
                                        ) :
                                        (
                                            <Input
                                                placeholder={item.name}
                                                type={item.type === 'number' || item.type === 'float' ? 'number' : 'text'}
                                                {...field}
                                            />
                                        )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit">Submit</Button>

            </form>
        </Form>
    )
}

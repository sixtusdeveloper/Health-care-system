"use client";

import { Input }  from "@/components/ui/input";
import Image from "next/image";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import React from "react";
import { E164Number } from "libphonenumber-js/core";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Phone number input import
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// Date  Picker input import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { number } from "zod";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";



interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormate?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,

}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
   const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormate, renderSkeleton } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="mx-1"
                        />
                    )}

                    <FormControl>
                        <input 
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
            // case FormFieldType.TEXTAREA:
        case FormFieldType.TEXTAREA:
            return ( 
                <FormControl>
                    <Textarea 
                    placeholder={placeholder}
                    {...field}
                    className="shad-textArea"
                    disabled={props.disabled}
                    />
                </FormControl>
            );
            // case FormFieldType.PHONE_INPUT:
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                    defaultCountry="US"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className="input-phone"
                    />
                </FormControl>
            );
            // case Data Picker input field
        case FormFieldType.DATE_PICKER:
            return(
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image 
                       src="/assets/icons/calendar.svg"
                       height={24}
                       width={24}
                       alt="calendar"
                       className="mx-2"
                    />
                    <FormControl>
                        <DatePicker 
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormate ?? "MM/dd/yyyy"}
                            showTimeSelect={showTimeSelect ?? false}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )  
               // case SELECT input field
        case FormFieldType.SELECT: 
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder=
                                {placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent 
                          className="shad-select-content">
                          {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            ); 
            // case FormFieldType.SKELETON:
        case FormFieldType.SKELETON:  
            return(
                renderSkeleton ? renderSkeleton(field) : null
            )   
          
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox 
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
           default:
             
            break;
    }   
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props}/>

                    <FormMessage className="shad-error"/>
                
                </FormItem>
            )}
        />
    )
}

export default CustomFormField;






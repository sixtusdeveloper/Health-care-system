"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';

import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import CustomFormField from "@/components/CustomFormField";
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '@radix-ui/react-label';
import { Doctors, GenderOptions } from '@/constants/index';
import SubmitButton from "../SubmitButton";
import { SelectItem } from '@radix-ui/react-select';



const RegisterForm = ({ user }: { user: User}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    
    try {
      // Your submit logic here
      const userData = { name, email, phone }

      const user = await createUser(userData);
      if(user) router.push(`/patients/${user.$id}/register`);

    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
        

        <form onSubmit={form.handleSubmit(onSubmit)} 
           className="space-y-12 flex-1">

             <section className="space-y-4">
                <h1 className="header">Welcome 👋</h1>
                <p className="text-dark-700">Let us know more about yourself.</p>
            </section>

            <section className="space-y-6">
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Personal Information</h2>
                </div>
            </section>

            {/* FormField */}
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}  
                name = "name"
                label = "Full Name"
                placeholder = "John Doe"
                iconSrc = "/assets/icons/user.svg"
                iconAlt = "user"
            />
           

           {/* First double form field */}

            <div className='flex flex-col gap-6 xl:flex-row'>
                {/* Input field for Email */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}  
                    name = "email"
                    label = "Email"
                    placeholder = "johndoe@gmail.com"
                    iconSrc = "/assets/icons/email.svg"
                    iconAlt = "user"
                />
                {/* Input filed for Phone Number */}
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}  
                    name = "phone"
                    label = "Phone Number"
                    placeholder = "(+234) 903 222 123-4567"
                    iconSrc = "/assets/icons/user.svg"
                    iconAlt = "user"
                />

            </div>

            {/* Second double form field */}
             {/* Input field for Date Picker */}
            <div className='flex flex-col gap-6 xl:flex-row'>
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}  
                    name = "birthDate"
                    label = "Date of Birth"
                />
                 {/* Input field for SKELETON */}
                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}  
                    name = "gender"
                    label = "Gender"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange = {field.onChange}
                                defaultValue={field.value}>
                                {GenderOptions.map((option) => (
                                
                                <div key={option} className='radio-group'>
                                    <RadioGroupItem value={option} id={option}/>
                                    <Label htmlFor={option} className="cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />

            </div>

            {/* Third double form field */}
            
            <div className='flex flex-col gap-6 xl:flex-row'>
                {/* Address input field */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}  
                    name = "address"
                    label = "Address"
                    placeholder = "Plot 123, Street 123, Lagos"
                />
                {/* Occupation input field */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}  
                    name = "occupation"
                    label = "Occupation"
                    placeholder = "Software Engineer"
                />

            </div>

            <div className='flex flex-col gap-6 xl:flex-row'>
                {/* //    Emergency Contact Information */}
               <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}  
                    name = "emergencyContactName"
                    label = "Emergency contact name"
                    placeholder = "Guardian's Name"
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}  
                    name = "emergencyContactNumber"
                    label = "Emergency Contact Number"
                    placeholder = "(+234) 803 255 123-4099"
                />

            </div>

            <section className="space-y-6">
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Medical Information</h2>
                </div>
            </section> 

            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}  
                name = "primaryPhysician"
                label = "Primary Physician"
                placeholder = "Select a Physician"
            >
                {/* Select options */}
                {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name}>

                    </SelectItem>
                ))}
            </CustomFormField>
           


    
            <SubmitButton isLoading={isLoading}>
                Get Started
            </SubmitButton>
        </form>
    </Form>
  );
};

export default RegisterForm;





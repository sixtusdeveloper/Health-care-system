"use client";

import { useState } from 'react';
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserFormValidation } from '@/lib/validation';
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "../SubmitButton";
import { z } from 'zod';
import { useRouter } from 'next/router'; // Import the correct package
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { Appointment } from "@/types/appwrite.types";
import { SelectItem } from '../ui/select';
import Image from 'next/image'; // Import the Image component from the correct package



const AppointmentForm = ({ 
    userId, patientId, type
}: {
    userId: string;
    patientId: string;
    type: "create" | "cancel";
}) => {
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
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

            <section className="mb-12 space-y-4">
                <h1 className="header">New Appointment</h1>
                <p className="text-dark-700">Request a new appointment in 10 seconds. </p>
            </section>

            {type !== "cancel" && (
                <>
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary care physician"
                        placeholder="Select a doctor"
                    >
                        {Doctors.map((doctor, i) => (
                        <SelectItem key={doctor.name + i} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                            <Image
                                src={doctor.image}
                                width={32}
                                height={32}
                                alt="doctor"
                                className="rounded-full border border-dark-500"
                            />
                            <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                        ))}
                    </CustomFormField>
                    
                </>

            )}



    
            <SubmitButton isLoading={isLoading}>
                Get Started
            </SubmitButton>
        </form>
    </Form>
  );
};

export default AppointmentForm;






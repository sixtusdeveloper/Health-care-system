"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { PatientFormValidation, UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import CustomFormField from "@/components/CustomFormField";
import { createUser, registerPatient } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from "@/components/ui/label";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants/index';
import SubmitButton from "../SubmitButton";
import { SelectItem } from "@/components/ui/select";
import Image from 'next/image'; 
import FileUploader from '../FileUploader';
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { set, z } from 'zod';


const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
        const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

        // @ts-ignore
        const patient = await registerPatient(patientData);
        
        if(patient) router.push(`/patients/${user.$id}/new-appointment`);
        
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
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

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
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

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;












// "use client";

// import { useState } from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { set, z } from 'zod';

// import { Button } from "@/components/ui/button";
// import { Form, FormControl } from "@/components/ui/form";
// import { PatientFormValidation, UserFormValidation } from '@/lib/validation';
// import { useRouter } from 'next/navigation';
// import CustomFormField from "@/components/CustomFormField";
// import { createUser, registerPatient } from '@/lib/actions/patient.actions';
// import { FormFieldType } from './PatientForm';
// import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
// import { Label } from "@/components/ui/label";
// import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants/index';
// import SubmitButton from "../SubmitButton";
// import { SelectItem } from "@/components/ui/select";
// import Image from 'next/image'; // Import the correct component for the Image element
// import FileUploader from '../FileUploader';
// import "react-datepicker/dist/react-datepicker.css";
// import "react-phone-number-input/style.css";



// const RegisterForm = ({ user }: { user: User}) => {
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false); // Define isLoading state

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof PatientFormValidation>>({
//     resolver: zodResolver(PatientFormValidation),
//     defaultValues: {
//       ...PatientFormDefaultValues,
//       name: "",
//       email: "",
//       phone: "",
//     },
//   })
 
//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
//     setIsLoading(true);

//     let formData;
//     if (
//       values.identificationDocument &&
//       values.identificationDocument.length > 0
//     ) {
//       const blobFile = new Blob([values.identificationDocument[0]], {
//         type: values.identificationDocument[0].type,
//       });

//       formData = new FormData();
//       formData.append("blobFile", blobFile);
//       formData.append("fileName", values.identificationDocument[0].name);
//     }

//     try {
//       // Your submit logic here
//       const patientData = {
//         ...values,
//         userId: user.$id,
//         birthDate: new Date(values.birthDate),
//         identificationDocument: formData,
//       }
//       // @ts-ignore
//       const patient = await registerPatient(patientData);
      
//       if(patient) router.push(`/patients/${user.$id}/new-appointment`);
//     } 
//     catch (error) {
//       console.log(error);
//     }

//     setIsLoading(false);
//   }

//   return (
//     <Form {...form}>
        

//         <form onSubmit={form.handleSubmit(onSubmit)} 
//            className="space-y-12 flex-1">

//              <section className="space-y-4">
//                 <h1 className="header">Welcome 👋</h1>
//                 <p className="text-dark-700">Let us know more about yourself.</p>
//             </section>
//             {/* Heading */}
//             <section className="space-y-6">
//                 <div className='mb-9 space-y-1'>
//                 <h2 className="sub-header">Personal Information</h2>
//                 </div>
//             </section>

//             {/* FormField */}
//             {/* Full Name */}
//             <CustomFormField
//                 fieldType={FormFieldType.INPUT}
//                 control={form.control}  
//                 name = "name"
//                 label = "Full Name"
//                 placeholder = "John Doe"
//                 iconSrc = "/assets/icons/user.svg"
//                 iconAlt = "user"
//             />
           

//            {/* First double form field */}
//             {/* Email */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* Input field for Email */}
//                 <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "email"
//                     label = "Email"
//                     placeholder = "johndoe@gmail.com"
//                     iconSrc = "/assets/icons/email.svg"
//                     iconAlt = "user"
//                 />
//                 {/* Input filed for Phone Number */}
//                 <CustomFormField
//                     fieldType={FormFieldType.PHONE_INPUT}
//                     control={form.control}  
//                     name = "phone"
//                     label = "Phone Number"
//                     placeholder = "(+234) 903 222 123-4567"
//                     iconSrc = "/assets/icons/user.svg"
//                     iconAlt = "user"
//                 />

//             </div>

//             {/* Second double form field */}
//              {/* Input field for Date Picker */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 <CustomFormField
//                     fieldType={FormFieldType.DATE_PICKER}
//                     control={form.control}  
//                     name = "birthDate"
//                     label = "Date of Birth"
//                 />
//                  {/* Input field for SKELETON */}
//                 <CustomFormField
//                     fieldType={FormFieldType.SKELETON}
//                     control={form.control}  
//                     name = "gender"
//                     label = "Gender"
//                     renderSkeleton={(field) => (
//                         <FormControl>
//                             <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange = {field.onChange}
//                                 defaultValue={field.value}>
//                                 {GenderOptions.map((option) => (
                                
//                                 <div key={option} className='radio-group'>
//                                     <RadioGroupItem value={option} id={option}/>
//                                     <Label htmlFor={option} className="cursor-pointer">
//                                         {option}
//                                     </Label>
//                                 </div>
//                                 ))}
//                             </RadioGroup>
//                         </FormControl>
//                     )}
//                 />

//             </div>

//             {/* Third double form field */}
//             {/* Address input field */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* Address input field */}
//                 <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "address"
//                     label = "Address"
//                     placeholder = "Plot 123, Street 123, Lagos"
//                 />
//                 {/* Occupation input field */}
//                 <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "occupation"
//                     label = "Occupation"
//                     placeholder = "Software Engineer"
//                 />

//             </div>

//             {/* Emergency Contact Information  */}
//             {/* Input */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* //    Emergency Contact Information */}
//                <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "emergencyContactName"
//                     label = "Emergency Contact Name"
//                     placeholder = "Guardian's Name"
//                 />

//                 <CustomFormField
//                     fieldType={FormFieldType.PHONE_INPUT}
//                     control={form.control}  
//                     name = "emergencyContactNumber"
//                     label = "Emergency Contact Number"
//                     placeholder = "(+234) 803 255 123-4099"
//                 />

//             </div>

//             {/* Medical information */}
//             {/* Heading */}
//             <section className="space-y-6">
//                 <div className='mb-9 space-y-1'>
//                 <h2 className="sub-header">Medical Information</h2>
//                 </div>
//             </section> 

//             {/* Primary Physician */}
//             {/* SELECT Field */}
//             <CustomFormField
//                 fieldType={FormFieldType.SELECT}
//                 control={form.control}  
//                 name="primaryPhysician"
//                 label="Primary physician"
//                 placeholder="Select a Physician"
//             >
//                 {/* Select options */}
//                 {Doctors.map((doctor) => (
//                     <SelectItem key={doctor.name} value={doctor.name}>
//                         <div className="flex items-center cursor-pointer gap-2">
//                           <Image 
//                           src={doctor.image}
//                           width={32}
//                           height={32}
//                           alt={doctor.name}
//                           className="rounded-full border border-500"
//                           />
//                           <p>{doctor.name}</p>
//                         </div>
//                     </SelectItem>
//                 ))}
//             </CustomFormField>

//             {/* Insurance */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* //    Insurance Information */}
//                <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "insuranceProvider"
//                     label = "Insurance Provider"
//                     placeholder = "BlueCross BlueShield"
//                 />

//                 <CustomFormField
//                     fieldType={FormFieldType.INPUT}
//                     control={form.control}  
//                     name = "insurancePolicyNumber"
//                     label = "Insurance Policy Number"
//                     placeholder = "BCD-123-456-789"
//                 />

//             </div>

//             {/* Allergies */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* //    Allergies */}
//                <CustomFormField
//                     fieldType={FormFieldType.TEXTAREA}
//                     control={form.control}  
//                     name = "allergies"
//                     label = "Allergies (if any)"
//                     placeholder = "Penicillin, Pollen, Peanuts"
//                 />

//                 <CustomFormField
//                     fieldType={FormFieldType.TEXTAREA}
//                     control={form.control}  
//                     name = "currentMedications"
//                     label = "Current Medications (if any)"
//                     placeholder = "Ibuprofen, Paracetamol 500mg, Aspirin"
//                 />

//             </div>

//             {/* Medical History */}
//             <div className='flex flex-col gap-6 xl:flex-row'>
//                 {/* //    Family Medical History */}
//                <CustomFormField
//                     fieldType={FormFieldType.TEXTAREA}
//                     control={form.control}  
//                     name = "familyMedicalHistory"
//                     label = "Family Medical History"
//                     placeholder = "Diabetes, Hypertension, Cancer"
//                 />

//                 <CustomFormField
//                     fieldType={FormFieldType.TEXTAREA}
//                     control={form.control}  
//                     name = "pastMedicalHistory"
//                     label = "Past Medical History"
//                     placeholder = "Asthma, Appendectomy, Tonsillectomy"
//                 />

//             </div>

//             {/* Identification Verification */}
//             <section className="space-y-6">
//                 <div className='mb-9 space-y-1'>
//                 <h2 className="sub-header">Identification and Verification</h2>
//                 </div>
//             </section>
             
//             {/* Identification Types*/}
//             <CustomFormField
//                 fieldType={FormFieldType.SELECT}
//                 control={form.control}  
//                 name="identificationType"
//                 label="Identification Type"
//                 placeholder="Select an Identification Type"
//             >
//                 {/* Identification types */}
//                 {IdentificationTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                         {type}
//                     </SelectItem>
//                 ))}
//             </CustomFormField>

//             {/* FormField */}
//             <CustomFormField
//                 fieldType={FormFieldType.INPUT}
//                 control={form.control}  
//                 name = "identificationNumber"
//                 label = "Identification Number"
//                 placeholder = "40311156034"
//             />

//             {/* Identification uplaod */}
//             <CustomFormField
//                 fieldType={FormFieldType.SKELETON}
//                 control={form.control}  
//                 name = "identificationDocument"
//                 label = "Scanned Copy of Identification Document"
//                 renderSkeleton={(field) => (
//                     <FormControl>
//                         <FileUploader files={field.value} onChange={field.onChange} />    
//                     </FormControl>
//                 )}

//             />
//             {/* Consent Privacy Heading */}
//             <section className="space-y-6">
//                 <div className='mb-9 space-y-1'>
//                 <h2 className="sub-header">Consent and Privacy</h2>
//                 </div>
//             </section>
                
//                 {/* Consent */}
//             {/* Treatment Consent */}
//             <CustomFormField
//                 fieldType={FormFieldType.CHECKBOX}
//                 control={form.control}  
//                 name = "treatmentConsent"
//                 label = "I consent to treatment"
//                 renderSkeleton={(field) => (
//                     <FormControl>
//                         <FileUploader files={field.value} onChange={field.onChange} />    
//                     </FormControl>
//                 )}
//             />
             
//             {/* Disclosure Consent */}
//             <CustomFormField
//                 fieldType={FormFieldType.CHECKBOX}
//                 control={form.control}  
//                 name = "disclosureConsent"
//                 label = "I consent to disclosure of information"
//                 renderSkeleton={(field) => (
//                     <FormControl>
//                         <FileUploader files={field.value} onChange={field.onChange} />    
//                     </FormControl>
//                 )}
//             />
                
//             {/* Privacy Consent */}
//             <CustomFormField
//                 fieldType={FormFieldType.CHECKBOX}
//                 control={form.control}  
//                 name = "privacyConsent"
//                 label = "I consent to privacy policy"
//                 renderSkeleton={(field) => (
//                     <FormControl>
//                         <FileUploader files={field.value} onChange={field.onChange} />    
//                     </FormControl>
//                 )}

//             />


//             <SubmitButton isLoading={isLoading}>
//                 Get Started
//             </SubmitButton>
//         </form>
//     </Form>
//   );
// };

// export default RegisterForm;

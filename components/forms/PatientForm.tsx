"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomeFormField from "@/components/CustomFormField"; // Import the CustomeFormField component
import CustomFormField from "@/components/CustomFormField";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

            {/* FormField */}
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}  
            name = "name"
            label = "Full name"
            placeholder = "John Doe"
            iconSrc = "/assets/icons/user.svg"
            iconAlt = "user"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}  
            name = "email"
            label = "Email"
            placeholder = "johndoe@gmail.com"
            iconSrc = "/assets/icons/email.svg"
            iconAlt = "user"
            />

            <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}  
            name = "phone"
            label = "Phone Number"
            placeholder = "(+234) 903 222 123-4567"
            iconSrc = "/assets/icons/user.svg"
            iconAlt = "user"
            />

            <Button type="submit">Submit</Button>
        </form>
    </Form>
  );
};

export default PatientForm;





// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Form } from "@/components/ui/form";
// // import { createUser } from "@/lib/actions/patient.actions";
// // import { UserFormValidation } from "@/lib/validation";

// import "react-phone-number-input/style.css";
// // import CustomFormField, { FormFieldType } from "../CustomFormField";
// // import SubmitButton from "../SubmitButton";

// export const PatientForm = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof UserFormValidation>>({
//     resolver: zodResolver(UserFormValidation),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
//     setIsLoading(true);

//     try {
//       const user = {
//         name: values.name,
//         email: values.email,
//         phone: values.phone,
//       };

//       const newUser = await createUser(user);

//       if (newUser) {
//         router.push(`/patients/${newUser.$id}/register`);
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
//         <section className="mb-12 space-y-4">
//           <h1 className="header">Hi there 👋</h1>
//           <p className="text-dark-700">Get started with appointments.</p>
//         </section>

//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="name"
//           label="Full name"
//           placeholder="John Doe"
//           iconSrc="/assets/icons/user.svg"
//           iconAlt="user"
//         />

//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="email"
//           label="Email"
//           placeholder="johndoe@gmail.com"
//           iconSrc="/assets/icons/email.svg"
//           iconAlt="email"
//         />

//         <CustomFormField
//           fieldType={FormFieldType.PHONE_INPUT}
//           control={form.control}
//           name="phone"
//           label="Phone number"
//           placeholder="(555) 123-4567"
//         />

//         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//       </form>
//     </Form>
//   );
// };
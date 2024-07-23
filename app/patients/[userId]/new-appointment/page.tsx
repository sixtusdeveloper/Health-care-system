// import Image  from "next/image";
// import PatientForm from "@/components/forms/PatientForm";
// import Link from "next/link";
// import AppointmentForm from "@/components/forms/AppointmentForm";
// import { getPatient } from "@/lib/actions/patient.actions";


// export default async function NewAppointment({ params: { userId }}: SearchParamProps) {
//     const patient = await getPatient(userId);
//   return (
//     <div className="flex h-screen max-h-screen">
//         <section className="remove-scrollbar container">
//             <div className="sub-container max-w-[860px] flex-1 justify-between">
                
//                 <Image 
//                 src="/assets/icons/logo-full.svg"
//                 width={1000}
//                 height={1000}
//                 alt="Patient"
//                 className="mb-12 h-10 w-fit"
//                 />

//                 <AppointmentForm 
//                     type="create"
//                     userId={userId}
//                     patientId={patient?.$id}
//                 />

//                 <div className="text-14-regular mt-10 md:pb-6 pb-4 flex justify-between">
//                     <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 developed by Sixtusdev</p>
//                     <span className="text-dark-600 xl:text-right">
//                         All rights reserved
//                     </span>
//                 </div>
//             </div>
//         </section>

//       <Image 
//       src="/assets/images/appointment-img.png" 
//       width={1000}
//       height={1000}
//       alt="appointment"
//       className="max-w-[390px] side-img bg-bottom"
//       />
//     </div>
//   );
// }

// pages/patients/[userId]/new-appointment/page.tsx
import dynamic from 'next/dynamic';
import Image from 'next/image';
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
// import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";


// Dynamically import AppointmentForm with no SSR
const AppointmentForm = dynamic(() => import('@/components/forms/AppointmentForm'), { ssr: false });

export default async function NewAppointment({ params: { userId } }: { params: { userId: string } }) {
    const patient = await getPatient(userId);

    if (!patient) {
        return (
            <div className="flex h-screen max-h-screen justify-center items-center">
                <p className="text-red-500">Patient not found</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image 
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        alt="Patient"
                        className="mb-12 h-10 w-fit"
                    />

                    <AppointmentForm 
                        type="create"
                        userId={userId}
                        patientId={patient?.$id}
                    />

                    <div className="text-14-regular mt-10 md:pb-6 pb-4 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 developed by Sixtusdev</p>
                        
                    </div>
                </div>
            </section>

            <Image 
                src="/assets/images/appointment-img.png" 
                width={1000}
                height={1000}
                alt="appointment"
                className="max-w-[390px] side-img bg-bottom"
            />
        </div>
    );
}







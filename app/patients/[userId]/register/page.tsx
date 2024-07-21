import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/forms/RegisterForm';
import Link  from 'next/link';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);


    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">  
                    <Image 
                    src="/assets/icons/logo-full.svg"
                    width={1000}
                    height={1000}
                    alt="Patient"
                    className="mb-12 h-10 w-fit"
                    />

                    <RegisterForm user={user} />

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 developed by Sixtusdev</p>
                        <Link href="/?admin=true" className="text-green-500 ">
                          Admin
                        </Link>
                    </div>
                </div>
            </section>

            <Image 
                src="/assets/images/register-img.png" 
                width={1000}
                height={1000}
                alt="Patient"
                className="max-w-[390px] side-img"
            />
        </div>
  )
}

export default Register;    
import React from 'react';
import Image from 'next/image';
// import PatientForm from '@/components/forms/PatientForm';
import { Link } from 'lucide-react';

const Register = () => {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    {/* TODO: OTP Verification | PasskeyModal */}
                    
                    <Image 
                    src="/assets/icons/logo-full.svg"
                    width={1000}
                    height={1000}
                    alt="Patient"
                    className="mb-12 h-10 w-fit"
                    />

                    {/* <PatientForm /> */}

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

export default Register
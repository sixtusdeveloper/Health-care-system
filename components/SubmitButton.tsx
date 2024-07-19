import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'; // Import the correct component for the Image element

interface ButtonProps{
    isLoading: boolean,
    className?: string,
    children: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps ) => {
  return (
    <Button type="submit" disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
        {isLoading ? 
        
        <div className="flex gap-4 items-center">
            <Image 
            src="/assets/icons/loading.svg"
            alt="loading"
            width={24}
            height={24}
            className='animate-spin'
            />
            Loading ...
        </div> : children}
    </Button>
  )
}

export default SubmitButton;
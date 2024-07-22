'use client';

import { useDropzone } from 'react-dropzone';
import React, {useCallback} from 'react'
import { on } from 'events';
import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';


type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
    
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image 
            src={convertFileToUrl(files[0])}
            height={100}
            width={100}
            alt="uploaded file"
            className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (

        <>
            <Image 
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
        />

        <div className="file-upload_label">
            <p className='text-14-regular'>
                <span className='text-green-500'>Click to upload</span>
                &nbsp;or drag and drop a file here
            </p>
            <p>
                SVG, PNG, JPG, JPEG or Gif &nbsp;(Max &nbsp;800x400)
            </p>
        </div>
        </>
      )}
    </div>
  );
};

export default FileUploader
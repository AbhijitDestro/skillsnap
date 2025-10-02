import React, { useState } from 'react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils';

interface FileUploaderProps{
  onFileSelect?:(file:File | null)=>void;
}

const FileUploader = ({onFileSelect}:FileUploaderProps) => {
  const [file,setFile]=useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile: File | null = acceptedFiles[0] || null
    setFile(selectedFile)
    onFileSelect?.(selectedFile)
  }, [onFileSelect])

  const {getRootProps, getInputProps,isDragActive,acceptedFiles}=useDropzone({onDrop, multiple:false,accept:{'application/pdf':['.pdf']},maxSize:20*1024*1024})
  
  const Files = acceptedFiles.map((file: File) => (
    <div key={file.name}>
      {file.name} - {file.size} bytes
    </div>
  ))

  return (
    <div className='w-full gradient-border'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
            <div className='space-y-4 cursor-pointer'>

            {file ?(
              <div className='uploader-selected-file' onClick={(e)=>e.stopPropagation()}>
                <div className='flex items-center space-x-3'>
                  <img src="/images/pdf.png" className='size-10' alt="pdf" />
                  <div>
                    <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>
                       {file.name}
                    </p>
                    <p className='text-sm font-medium text-gray-500'>{formatSize(file.size)}</p>
                  </div>
                </div>
                <button className='p-2 cursor-pointer' 
                   onClick={()=>{setFile(null);
                   onFileSelect?.(null)}}>
                  <img src="/icons/cross.svg" className='w-4 h-4' alt="remove" />
                </button>
              </div>
            ):(
              <div>
                <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                <img src="/icons/info.svg" className='size-20' alt="upload" />
            </div>
                  <p className='text-lg text-gray-500'>
                      <span className='font-semibold'>
                        Click to upload
                      </span> or drag and drop
                  </p>
                  <p className='text-lg text-gray-500'>PDF (max 20 MB)</p>
                </div>
            )}
            </div>

        </div>
    </div>
  )
}

export default FileUploader
import React, { useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from '~/components/FileUploader'
import { usePuterStore } from '~/lib/puter'
import { useNavigate } from 'react-router'
import { convertPdfToImage } from '~/lib/pdf2img'
import { generateUUID } from '~/lib/utils'
import { prepareInstructions, AIResponseFormat } from '~/contants'
import { useUser } from '@clerk/clerk-react'

const upload = () => {
    const {fs,ai,kv}=usePuterStore() // Remove auth from Puter
    const { isSignedIn, user } = useUser() // Use Clerk authentication
    const navigate=useNavigate()
    const [isProcessing, setIsProcessing]=useState(false)
    const [statusText, setStatusText]=useState("")
    const [resumefile, setResumefile]=useState<File | null>(null)

    const handleFileSelect=(file: File | null)=>{
        setResumefile(file)
    }

    // Redirect to auth if not signed in with Clerk
    React.useEffect(() => {
        if (!isSignedIn) {
            navigate('/auth/sign-in?next=/upload')
        }
    }, [isSignedIn, navigate])

    const handleAnalyze=async({companyName, jobTitle, jobDescription,resumefile}:{companyName:string, jobTitle:string, jobDescription:string, resumefile:File | null})=>{
     setIsProcessing(true)
     setStatusText("Uploading resume...")
     
     if(!resumefile) {
         setStatusText("Error. Please select a resume file.")
         setIsProcessing(false)
         return
     }
     
     const uploadedFile=await fs.upload([resumefile])
     if(!uploadedFile) {
         setStatusText("Error uploading file.")
         setIsProcessing(false)
         return
     }
        setStatusText("Converting resume to image...")

        const imageFile=await convertPdfToImage(resumefile)
        if(!imageFile) return setStatusText("Failed to convert the resume to image.")
        setStatusText("Uploading image...")

        if(!imageFile.file) {
            setStatusText("Failed to convert the resume to image.")
            setIsProcessing(false)
            return
        }
        
        const uploadedImage=await fs.upload([imageFile.file])
        if(!uploadedImage) {
            setStatusText("Failed to upload the image.")
            setIsProcessing(false)
            return
        }

        setStatusText("Analyzing resume...")
        const uuid=generateUUID()
        const data={
            id:uuid,
            resumePath:uploadedFile.path,
            imagePath:uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback:" "
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data))

        setStatusText("Analyzing resume...")

        const feedback=await ai.feedback(
            uploadedFile.path, 
            prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
        )
        if(!feedback) {
            setStatusText("Failed to generate feedback.")
            setIsProcessing(false)
            return
        }
        
        const feedbackText = typeof feedback.message.content === "string" 
            ? feedback.message.content 
            : feedback.message.content[0]?.text || feedback.message.content[0]

            data.feedback = JSON.parse(feedbackText)
            await kv.set(`resume:${uuid}`, JSON.stringify(data))
            setStatusText("Analysis completed! Redirecting...")
            navigate(`/resume/${uuid}`)
    }


    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = e.currentTarget.closest("form");
        if(!form) return;
        const formData=new FormData(form)

        const companyName=formData.get("company-name") as string
        const jobTitle=formData.get("job-title") as string
        const jobDescription=formData.get("job-description") as string

        if(!resumefile) return;

        handleAnalyze({companyName, jobTitle, jobDescription, resumefile})
    }
  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
        <Navbar />

        <section className='main-section'>
            <div className='page-heading py-10'>
                 <h1>Smart Feedback For YOur Dream Job</h1>
                 {isProcessing ?(
                    <>
                    <h2>{statusText}</h2>
                    <img src="/images/resume-scan.gif" alt="loading" className='w-full'/>
                    </>
                 ):(
                    <h2>Drop Your Resume fo an ATS Score and Improvement Tips</h2>
                 )}
                 {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                             <div className='form-div'>
                                <label htmlFor='company-name'>Company Name</label>
                                <input type="text" name="company-name" id="company-name" placeholder='Company Name'/>
                             </div>
                             <div className='form-div'>
                                <label htmlFor='job-title'>Job Title</label>
                                <input type="text" name="job-title" id="job-title" placeholder='Job Title'/>
                             </div>
                             <div className='form-div'>
                                <label htmlFor='job-description'>Job Description</label>
                                 <textarea rows={5} name="job-description" id="job-description" placeholder='Job Description'/>
                             </div>

                             <div className='form-div'>
                                  <label htmlFor="uploader">Upload Resume</label>
                                   <FileUploader onFileSelect={handleFileSelect}/>
                             </div>

                             <button className='primary-button' type="submit">
                                 Analyze Resume
                             </button>
                    </form>
                 )}
            </div>

        </section>
    </main>
  )
}

export default upload



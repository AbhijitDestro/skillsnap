import { useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router"
import { SignUp, useUser } from '@clerk/clerk-react'
import { X } from 'lucide-react'

export const meta:()=>{title:string,name:string, content:string}[] = () => ([
    { title: "SkillSnap | Sign Up", name: "description", content: "Create your SkillSnap account" }
])

const signUp = () => {
    const { isSignedIn, user } = useUser()
    const location = useLocation()
    const next = location.search.split("next=")[1] || "/"
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(true)

    useEffect(() => {
        if(isSignedIn)
            navigate(next)
    },[isSignedIn,next])

    const handleClose = () => {
        setIsModalOpen(false)
        navigate('/')
    }
    
    if (!isModalOpen) return null

    return (
        <section className="bg-[url('/images/bg-main.svg')] bg-cover flex justify-center items-center h-screen">
            <div className="w-full h-screen flex">
                {/* Left div - Content, Modal, and Close button */}
                <div className="w-1/2 p-12 flex flex-col justify-center items-center relative">
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                    
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Join SkillSnap Today
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Create your account and start analyzing your resume with AI-powered insights. 
                            Get ATS scores, detailed feedback, and improve your job application success rate.
                        </p>
                    </div>
                    
                    <div className="w-[500px] min-h-[600px] flex flex-col justify-center items-center">
                        <SignUp 
                            signInUrl={`/auth/sign-in${location.search}`}
                            appearance={{
                                elements: {
                                    formButtonPrimary: '!w-full',
                                    socialButtonsBlockButton: '!w-full',
                                    card: '!w-full !max-w-full !min-w-full'
                                }
                            }}
                        />
                    </div>
                </div>
                
                {/* Right div - Only background image */}
                <div className="w-1/2 bg-[url('/images/signup.png')] bg-cover bg-center"></div>
            </div>
        </section>
    )
}

export default signUp

// =================================================================================
// MODAL IMPLEMENTATION CODE (REPLACE THE ABOVE CODE WITH THIS)
// =================================================================================
// import { useEffect, useState } from "react"
// import { useLocation, useNavigate, Link } from "react-router"
// import { SignUp, useUser } from '@clerk/clerk-react'
// import { X } from 'lucide-react'
//
// export const meta:()=>{title:string,name:string, content:string}[] = () => ([
//     { title: "SkillSnap | Sign Up", name: "description", content: "Create your SkillSnap account" }
// ])
//
// const signUp = () => {
//     const { isSignedIn, user } = useUser()
//     const location = useLocation()
//     const next = location.search.split("next=")[1] || "/"
//     const navigate = useNavigate()
//     const [isModalOpen, setIsModalOpen] = useState(true)
//
//     useEffect(() => {
//         if(isSignedIn)
//             navigate(next)
//     },[isSignedIn,next])
//
//     const handleClose = () => {
//         setIsModalOpen(false)
//         navigate('/')
//     }
//
//     if (!isModalOpen) return null
//
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg max-w-lg w-full mx-4 relative">
//                 <button 
//                     onClick={handleClose}
//                     className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                     <X size={20} className="text-gray-600" />
//                 </button>
//                 
//                 <div className="flex">
//                     <div className="w-[500px] min-h-[600px] p-12 flex flex-col justify-center">
//                         <SignUp 
//                             signInUrl={`/auth/sign-in${location.search}`}
//                             appearance={{
//                                 elements: {
//                                     formButtonPrimary: '!w-full',
//                                     socialButtonsBlockButton: '!w-full',
//                                     card: '!w-full !max-w-full !min-w-full'
//                                 }
//                             }}
//                         />
//                     </div>
//                     
//                     <div className="flex-1 p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//                         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                             Join SkillSnap Today
//                         </h2>
//                         <p className="text-lg text-gray-600 leading-relaxed">
//                             Create your account and start analyzing your resume with AI-powered insights. 
//                             Get ATS scores, detailed feedback, and improve your job application success rate.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default signUp
// =================================================================================
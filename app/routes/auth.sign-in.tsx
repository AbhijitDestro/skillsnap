import { useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router"
import { SignIn, useUser } from '@clerk/clerk-react'
import { X } from 'lucide-react'

export const meta:()=>{title:string,name:string, content:string}[] = () => ([
    { title: "SkillSnap | Sign In", name: "description", content: "Sign into your SkillSnap account" }
])

const signIn = () => {
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
                <div className="w-1/2 p-12 flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 relative">
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                    
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Welcome Back to SkillSnap
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Sign in to your account and continue analyzing your resume with AI-powered insights. 
                            Access your ATS scores, detailed feedback, and improve your job application success rate.
                        </p>
                    </div>
                    
                    <div className="w-[500px] min-h-[600px] flex flex-col justify-center items-center">
                        <SignIn 
                            signUpUrl={`/auth/sign-up${location.search}`}
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
                <div className="w-1/2 bg-[url('/images/signin.png')] bg-cover bg-center"></div>
            </div>
        </section>
    )
}

export default signIn


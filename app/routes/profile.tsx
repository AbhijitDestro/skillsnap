import { useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { UserProfile, useUser } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'

export const meta: () => { title: string, name: string, content: string }[] = () => ([
    { title: "SkillSnap | Profile", name: "description", content: "Manage your SkillSnap profile settings" }
])

const Profile = () => {
    const { isSignedIn } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/auth/sign-in?next=/profile')
        }
    }, [isSignedIn, navigate])

    if (!isSignedIn) {
        return null
    }

    return (
        <section className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back to Home Button */}
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Profile Settings
                    </h1>
                    
                    <div className="flex justify-center">
                        <div >
                            <UserProfile 
                                appearance={{
                                    elements: {
                                        card: "shadow-none border-none",
                                        navbar: "hidden",
                                        pageScrollBox: "p-0",
                                        // Fix OTP input text color
                                        otpCodeFieldInput: "color: black !important",
                                        formFieldInput: "color: black !important",
                                        // Additional input styling for better visibility
                                        "input[type='text']": "color: black !important",
                                        "input[type='email']": "color: black !important",
                                        "input[type='password']": "color: black !important"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
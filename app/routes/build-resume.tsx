import React, { useState } from 'react'
import { Link } from 'react-router'
import Navbar from '~/components/Navbar'
import ResumeBuilder from '~/components/ResumeBuilder'
import { FileText, Zap, CheckCircle, ArrowRight, Star, Users, PlusCircle, Sparkles } from 'lucide-react'

export const meta = () => ([
  { title: "SkillSnap | Build Your Resume", name: "description", content: "Create professional resumes with our AI-powered resume builder" }
])

const BuildResume = () => {
  const [selectedOption, setSelectedOption] = useState<'template' | 'scratch' | null>(null)

  const handleOptionSelect = (option: 'template' | 'scratch') => {
    setSelectedOption(option)
  }

  const renderChoiceSection = () => (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Build Your <span className="text-gradient">Perfect Resume</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
        Choose how you'd like to create your professional resume
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Template Option */}
        <div 
          onClick={() => handleOptionSelect('template')}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 group"
        >
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose from Templates</h3>
          <p className="text-gray-600 mb-6">
            Select from our professionally designed, ATS-friendly templates and customize them with your information.
          </p>
          <div className="flex items-center justify-center text-blue-600 font-semibold">
            <span>Browse Templates</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Build from Scratch Option */}
        <div 
          onClick={() => handleOptionSelect('scratch')}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500 group"
        >
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Build from Scratch</h3>
          <p className="text-gray-600 mb-6">
            Use our AI-powered step-by-step builder to create a completely custom resume tailored to your needs.
          </p>
          <div className="flex items-center justify-center text-purple-600 font-semibold">
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  )

  if (selectedOption === 'template') {
    // Redirect to templates page
    window.location.href = '/templates'
    return null
  }

  if (selectedOption === 'scratch') {
    return (
        <main>
      <div className="min-h-screen w-full bg-white relative overflow-hidden">
        {/* Green-Blue Gradient Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
              radial-gradient(circle at top right, rgba(34, 197, 94, 0.4), transparent 60%),
              radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.4), transparent 60%)
            `,
          }}
        />
        
        <div className="relative z-10">
          <Navbar />
          
          <main className="container mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Build Your Resume <span className="text-gradient">Step by Step</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our AI will help you create a professional resume tailored to your career goals
              </p>
            </div>

            {/* Resume Builder Component */}
            <ResumeBuilder onBack={() => setSelectedOption(null)} />
          </main>
        </div>
      </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Green-Blue Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top right, rgba(34, 197, 94, 0.4), transparent 60%),
            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.4), transparent 60%)
          `,
        }}
      />
      
      <main>
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-6 py-16">
          {renderChoiceSection()}
          
          {/* Features Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Our Resume Builder?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Templates</h3>
                <p className="text-gray-600">
                  Choose from ATS-friendly templates designed by HR professionals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Builder</h3>
                <p className="text-gray-600">
                  Get personalized suggestions and content optimization powered by AI.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Download</h3>
                <p className="text-gray-600">
                  Download your resume as PDF instantly and apply to jobs right away.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      </main>
    </div>
  )
}

export default BuildResume
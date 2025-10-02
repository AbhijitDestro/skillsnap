import React, { useState } from 'react'
import { Link } from 'react-router'
import Navbar from '~/components/Navbar'
import { Brain, MessageCircle, Target, PlayCircle, Users, TrendingUp, Award, Clock } from 'lucide-react'
import InterviewModel from '~/components/InterviewModel'

export const meta = () => ([
  { title: "SkillSnap | AI Interviewer", name: "description", content: "Practice interviews with our AI-powered interview simulator" }
])

const AIInterviewer = () => {
  const [interviewStep, setInterviewStep] = useState<'landing' | 'setup' | 'interview'>('landing')

  // Landing page (default view)
  if (interviewStep === 'landing') {
    return (
      <div className="min-h-screen w-full bg-white relative overflow-hidden">
        {/* Purple-Pink Gradient Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
              radial-gradient(circle at top left, rgba(168, 85, 247, 0.4), transparent 60%),
              radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.4), transparent 60%)
            `,
          }}
        />
        
        <main>
        <div className="relative z-10">
          <Navbar />
          
          <main className="container mx-auto px-6 py-16">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Master Your <span className="text-gradient">Interview Skills</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Practice with our AI-powered interview simulator. Get personalized feedback, 
                improve your answers, and boost your confidence before the real interview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setInterviewStep('setup')}
                  className="primary-button w-fit px-8 py-4 text-lg font-semibold flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Practice Interview
                </button>
                <Link 
                  to="/upload" 
                  className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-colors rounded-full px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  Upload Resume First
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">AI-Powered Questions</h3>
                <p className="text-gray-600 text-center">
                  Get personalized interview questions based on your resume, role, and industry requirements.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Real-time Feedback</h3>
                <p className="text-gray-600 text-center">
                  Receive instant feedback on your answers, communication style, and areas for improvement.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Role-Specific Practice</h3>
                <p className="text-gray-600 text-center">
                  Practice for specific roles with tailored questions for different industries and job levels.
                </p>
              </div>
            </div>

            {/* Interview Types */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Interview Types</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Behavioral</h3>
                  <p className="text-sm text-gray-600">STAR method practice</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical</h3>
                  <p className="text-sm text-gray-600">Role-specific skills</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                  <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Leadership</h3>
                  <p className="text-sm text-gray-600">Management scenarios</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
                  <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">General</h3>
                  <p className="text-sm text-gray-600">Common questions</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">25K+</div>
                <p className="text-gray-600">Interview Sessions</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">78%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
                <p className="text-gray-600">User Rating</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">15 min</div>
                <p className="text-gray-600">Average Session</p>
              </div>
            </div>
          </main>
        </div>
        </main>
      </div>
    )
  }

  // Setup steps (coming soon)
  if (interviewStep === 'setup') {
    return (
    
      <div className="min-h-screen w-full bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
              radial-gradient(circle at top left, rgba(168, 85, 247, 0.4), transparent 60%),
              radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.4), transparent 60%)
            `,
          }}
        />
        
        <main>
        <div className="relative z-10">
          <Navbar />
          
          <main className="container mx-auto px-6 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Setup Coming Soon!</h2>
                <p className="text-gray-600 mb-8">
                  The comprehensive interview setup with VAPI integration is being developed. 
                  This will include collecting your personal info, job details, and preferences.
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setInterviewStep('landing')}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Landing
                  </button>
                  <button 
                    onClick={() => setInterviewStep('interview')}
                    className="primary-button px-6 py-3 text-white"
                  >
                    Preview Interview Screen
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        </main>
      </div>
    )
  }

  // Interview screen
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top left, rgba(168, 85, 247, 0.4), transparent 60%),
            radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.4), transparent 60%)
          `,
        }}
      />
      
      <main>
      <div className="relative z-10">
        <InterviewModel />
      </div>
      </main>
    </div>
  )
}

export default AIInterviewer
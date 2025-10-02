import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Globe, Camera, Plus, X, ArrowLeft, ArrowRight } from 'lucide-react'

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  photo: File | null
}

interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
}

interface Certificate {
  name: string
  issuer: string
  date: string
  link?: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  skills: string[]
  languages: string[]
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  certificates: Certificate[]
}

interface ResumeBuilderProps {
  onBack: () => void
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      photo: null
    },
    professionalSummary: '',
    skills: [],
    languages: [],
    experiences: [],
    education: [],
    projects: [],
    certificates: []
  })

  const steps = [
    'Personal Information',
    'Professional Summary',
    'Work Experience',
    'Education',
    'Skills',
    'Projects',
    'Certificates',
    'Review & Generate'
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string | File | null) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }))
  }

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }))
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }))
    }
  }

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const addLanguage = (language: string) => {
    if (language.trim() && !resumeData.languages.includes(language.trim())) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, language.trim()]
      }))
    }
  }

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  const generateResume = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        alert('Gemini API key not configured. Please add your API key to the .env file.');
        return;
      }

      // Prepare the data for AI processing
      const resumePrompt = `
Generate a professional resume in HTML format based on the following information:

Personal Information:
- Name: ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone}
- Address: ${resumeData.personalInfo.address}, ${resumeData.personalInfo.city}, ${resumeData.personalInfo.state} ${resumeData.personalInfo.zipCode}

Professional Summary:
${resumeData.professionalSummary}

Skills:
${resumeData.skills.join(', ')}

Languages:
${resumeData.languages.join(', ')}

Work Experience:
${resumeData.experiences.map(exp => `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n  ${exp.description}`).join('\n')}

Education:
${resumeData.education.map(edu => `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`).join('\n')}

Projects:
${resumeData.projects.map(proj => `- ${proj.name}: ${proj.description}\n  Technologies: ${proj.technologies.join(', ')}`).join('\n')}

Certificates:
${resumeData.certificates.map(cert => `- ${cert.name} from ${cert.issuer} (${cert.date})`).join('\n')}

Please create a professional, ATS-friendly resume in clean HTML format with proper styling. Include CSS styling within the HTML. Make it modern and visually appealing while maintaining readability.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: resumePrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generatedHTML = data.candidates[0].content.parts[0].text;

      // Create a blob with the HTML content
      const blob = new Blob([generatedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Open the resume in a new window for preview and printing
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.document.title = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume`;
      }
      
      // Also provide a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.html`;
      downloadLink.click();
      
      alert('Resume generated successfully! You can print it as PDF from the new window.');
      
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Error generating resume. Please check your API key and try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic information</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.city}
                  onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.state}
                  onChange={(e) => handlePersonalInfoChange('state', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="NY"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
              <p className="text-gray-600">Write a brief summary about yourself and your career goals</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
              <textarea
                value={resumeData.professionalSummary}
                onChange={(e) => setResumeData(prev => ({ ...prev, professionalSummary: e.target.value }))}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a compelling summary that highlights your experience, skills, and career objectives..."
              />
              <p className="text-sm text-gray-500 mt-2">Tip: Keep it concise (2-3 sentences) and focus on your most relevant qualifications.</p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Skills & Languages</h2>
              <p className="text-gray-600">Add your technical and soft skills, plus languages you speak</p>
            </div>
            
            <div className="space-y-8">
              {/* Skills Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <X 
                        className="w-4 h-4 cursor-pointer hover:text-red-600" 
                        onClick={() => removeSkill(index)}
                      />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        addSkill(input.value)
                        input.value = ''
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('skillInput') as HTMLInputElement
                      addSkill(input.value)
                      input.value = ''
                    }}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Languages Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.languages.map((language, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {language}
                      <X 
                        className="w-4 h-4 cursor-pointer hover:text-red-600" 
                        onClick={() => removeLanguage(index)}
                      />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="languageInput"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a language and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        addLanguage(input.value)
                        input.value = ''
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('languageInput') as HTMLInputElement
                      addLanguage(input.value)
                      input.value = ''
                    }}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Review & Generate</h2>
              <p className="text-gray-600">Review your information and generate your professional resume</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Personal Information</h3>
                <p className="text-gray-600">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</p>
                <p className="text-gray-600">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
              </div>
              
              {resumeData.professionalSummary && (
                <div>
                  <h3 className="font-semibold text-gray-900">Professional Summary</h3>
                  <p className="text-gray-600">{resumeData.professionalSummary.substring(0, 100)}...</p>
                </div>
              )}
              
              {resumeData.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900">Skills ({resumeData.skills.length})</h3>
                  <p className="text-gray-600">{resumeData.skills.slice(0, 5).join(', ')}{resumeData.skills.length > 5 ? '...' : ''}</p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={generateResume}
                className="primary-button px-8 py-4 text-lg font-semibold text-white"
              >
                Generate Resume with AI
              </button>
              <p className="text-sm text-gray-500 mt-2">Your resume will be generated using AI and available for download as PDF</p>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step {currentStep} - {steps[currentStep - 1]}</h2>
            <p className="text-gray-600 mb-8">This step is coming soon! For now, let's skip to the review.</p>
            <button
              onClick={() => setCurrentStep(8)}
              className="primary-button px-6 py-3 text-white"
            >
              Skip to Review
            </button>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of {steps.length}</span>
          <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span 
              key={index} 
              className={`text-xs ${index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={currentStep === 1 ? onBack : handlePrevious}
          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 1 ? 'Back to Options' : 'Previous'}
        </button>
        
        {currentStep < steps.length && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 primary-button text-white"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ResumeBuilder
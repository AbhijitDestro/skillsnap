import React from 'react'
import { Link } from 'react-router'
import Navbar from '~/components/Navbar'
import { FileText, Download, Eye, Star, Filter } from 'lucide-react'

export const meta = () => ([
  { title: "SkillSnap | Resume Templates", name: "description", content: "Choose from professional resume templates designed for ATS compatibility" }
])

const templates = () => {
  // Mock template data
  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'modern', name: 'Modern', count: 8 },
    { id: 'classic', name: 'Classic', count: 6 },
    { id: 'creative', name: 'Creative', count: 5 },
    { id: 'minimal', name: 'Minimal', count: 5 }
  ]

  const templates = [
    { id: 1, name: 'Professional Modern', category: 'modern', rating: 4.9, downloads: 15420, preview: '/images/template-1.png', featured: true },
    { id: 2, name: 'Classic Executive', category: 'classic', rating: 4.8, downloads: 12300, preview: '/images/template-2.png', featured: true },
    { id: 3, name: 'Creative Designer', category: 'creative', rating: 4.7, downloads: 9800, preview: '/images/template-3.png', featured: false },
    { id: 4, name: 'Minimal Clean', category: 'minimal', rating: 4.9, downloads: 18200, preview: '/images/template-4.png', featured: true },
    { id: 5, name: 'Tech Specialist', category: 'modern', rating: 4.6, downloads: 7600, preview: '/images/template-5.png', featured: false },
    { id: 6, name: 'Corporate Standard', category: 'classic', rating: 4.8, downloads: 11400, preview: '/images/template-6.png', featured: false }
  ]

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Soft Blue Radial Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top center, rgba(59, 130, 246, 0.5),transparent 70%)
          `,
        }}
      />
      
      {/* All content with proper z-index layering */}
      <main>
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="text-gradient">Resume Templates</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our collection of professionally designed, ATS-friendly resume templates. 
              Each template is optimized for applicant tracking systems and approved by hiring managers.
            </p>
          </div>

          {/* Category Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    category.id === 'all' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Templates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.filter(template => template.featured).map((template) => (
                <div key={template.id} className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <div className="bg-gray-200 h-64 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <Link 
                        to={`/create-resume?template=${template.id}`}
                        className="flex-1 primary-button py-2 px-4 text-center text-white flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        Use This
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Templates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>{(template.downloads / 1000).toFixed(1)}k</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 text-sm">
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                      <Link 
                        to={`/create-resume?template=${template.id}`}
                        className="flex-1 primary-button py-2 px-3 text-center text-white flex items-center justify-center gap-1 text-sm">
                        <FileText className="w-3 h-3" />
                        Use
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find the Perfect Template?</h2>
            <p className="text-gray-600 mb-6">Let our AI create a custom resume layout based on your industry and preferences.</p>
            <Link 
              to="/build-resume" 
              className="primary-button w-fit px-8 py-4 text-lg font-semibold mx-auto flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Build Custom Resume
            </Link>
          </div>
        </main>
      </div>
      </main>
    </div>
  )
}

export default templates


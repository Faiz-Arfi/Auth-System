import React from 'react'
import { Mail, Github, Linkedin, Youtube, MapPin, Phone, Send, Code2, MessageSquare } from 'lucide-react'
import DevPhoto from '../assets/developerPhoto.png'
import CTA from '../components/public-pages/CTA'
import Hero from '../components/public-pages/Hero'

const Contact = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>
      <div className="max-w-6xl mx-auto">
        
        <Hero Icon={MessageSquare} title="Get In" highlight="Touch" description="Have questions about the project or want to collaborate? Feel free to reach out through any of the channels below." />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Code2 className="w-8 h-8 text-green-600" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Developer Info</h2>
            </div>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <img 
                src={DevPhoto} 
                alt="Developer" 
                className="w-24 h-24 rounded-full object-cover border-4 border-green-100 bg-green-200"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Faiz <span className='text-green-600'>Arfi</span></h3>
                <p className="text-green-600 font-medium">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">About the Developer</h3>
                <p className="text-gray-600 leading-relaxed">
                  Full-stack developer passionate about building secure, scalable web applications 
                  with modern technologies. This auth system showcases expertise in authentication, 
                  security best practices, and user experience design.
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">React</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Java</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Spring Boot</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">SQL</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">JWT</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Mail className="w-8 h-8 text-green-600" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Contact Info</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg mt-1">
                  <Mail className="w-5 h-5 text-green-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Personal Email</h3>
                  <a href="mailto:faiz@faizarif.dev" 
                     className="text-green-600 hover:text-green-700 transition">
                    faiz@faizarfi.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg mt-1">
                  <Mail className="w-5 h-5 text-green-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Auth-S Project Email</h3>
                  <a href="mailto:auths@faizarfi.dev" 
                     className="text-green-600 hover:text-green-700 transition">
                    auths@faizarfi.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg mt-1">
                  <MapPin className="w-5 h-5 text-green-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                  <p className="text-gray-600">Deoghar, Jharkhand (Ready to Reallocate)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg mt-1">
                  <Send className="w-5 h-5 text-green-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Response Time</h3>
                  <p className="text-gray-600">Usually within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Connect on <span className="text-green-600">Social Media</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <a href="https://github.com/Faiz-Arfi" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-md transition group">
              <div className="bg-gray-100 p-4 rounded-full group-hover:bg-green-100 transition">
                <Github className="w-10 h-10 text-gray-700 group-hover:text-green-600 transition" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-1">GitHub</h3>
                <p className="text-sm text-gray-600">View Projects</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/faiz-arfi/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-md transition group">
              <div className="bg-gray-100 p-4 rounded-full group-hover:bg-green-100 transition">
                <Linkedin className="w-10 h-10 text-gray-700 group-hover:text-green-600 transition" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-1">LinkedIn</h3>
                <p className="text-sm text-gray-600">Professional Profile</p>
              </div>
            </a>

            <a href="https://www.youtube.com/@FaizArfi" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-md transition group">
              <div className="bg-gray-100 p-4 rounded-full group-hover:bg-green-100 transition">
                <Youtube className="w-10 h-10 text-gray-700 group-hover:text-green-600 transition" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-1">YouTube</h3>
                <p className="text-sm text-gray-600">Watch Content</p>
              </div>
            </a>

            <a href="mailto:faiz@faizarfi.dev"
               className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-md transition group">
              <div className="bg-gray-100 p-4 rounded-full group-hover:bg-green-100 transition">
                <Mail className="w-10 h-10 text-gray-700 group-hover:text-green-600 transition" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                <p className="text-sm text-gray-600">Send Message</p>
              </div>
            </a>
          </div>
        </div>

        <CTA />

      </div>
    </div>
  )
}

export default Contact
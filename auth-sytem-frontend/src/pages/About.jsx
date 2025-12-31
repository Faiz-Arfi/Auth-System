import React from 'react'
import { Shield, Lock, Users, Zap, CheckCircle, Award, Key, RefreshCw, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTA from '../components/public-pages/CTA'
import Hero from '../components/public-pages/Hero'

const About = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6 md:p-10'>
      <div className="max-w-6xl mx-auto">

        <Hero Icon={Shield} title="About" highlight="Auth-S" description="A comprehensive, secure authentication system built to showcase modern web security practices, user management, role-based access control, and full-stack development skills." />

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Auth-S is a personal project built to demonstrate proficiency in creating robust authentication systems
            for modern web applications. This platform showcases industry-standard security practices including
            secure password management, session handling, email verification, password recovery, and role-based authorization.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            This project serves as a comprehensive reference implementation featuring interactive activities to
            explore authentication workflows, from basic user registration to advanced role-based access control
            and gamified user progression systems.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Lock className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Authentication</h3>
                <p className="text-gray-600">
                  Industry-standard encryption, secure password hashing with bcrypt, and JWT-based session management
                  to protect user credentials and data.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Users className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Role-Based Access Control</h3>
                <p className="text-gray-600">
                  Multi-tier user roles (Novice, Intermediate, Pro, Legend) with progressive feature unlocking
                  and activity-based progression system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email Verification</h3>
                <p className="text-gray-600">
                  Secure email verification system to ensure valid user registrations and prevent fraudulent
                  account creation with time-based verification links.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Key className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Password Recovery</h3>
                <p className="text-gray-600">
                  Secure password reset functionality with email-based verification and encrypted reset tokens
                  to help users regain account access safely.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Award className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Activity & Rewards System</h3>
                <p className="text-gray-600">
                  Interactive activities to explore platform features with point-based rewards system that
                  enables role upgrades and feature unlocking.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Zap className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time Dashboard</h3>
                <p className="text-gray-600">
                  Comprehensive user dashboard displaying authentication statistics, login history, account
                  creation details, and activity progress tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <Shield className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">OAuth 2.0 Integration</h3>
                <p className="text-gray-600">
                  Seamless Google OAuth authentication integration using Spring Security OAuth2 Client,
                  allowing users to sign in with their Google accounts securely.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0 h-fit">
                <FileText className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Activity Logging</h3>
                <p className="text-gray-600">
                  Comprehensive activity tracking and logging system that records user actions, login attempts,
                  password changes, and role modifications with timestamps for audit and security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Technology Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Frontend Technologies',
                items: [
                  'React.js 19 - Modern UI library',
                  'Vite 7 - Lightning-fast build tool',
                  'Tailwind CSS 4 - Utility-first styling',
                  'React Router 7 - Client-side routing',
                  'Axios - HTTP client',
                  'React Calendar - Date visualization'
                ]
              },
              {
                title: 'Backend Technologies',
                items: [
                  'Java 17 - Programming language',
                  'Spring Boot 3.5 - Application framework',
                  'Spring Security - Authentication',
                  'Spring OAuth2 Client - Google OAuth',
                  'Spring Data JPA - Database ORM',
                  'PostgreSQL/MySQL - Database'
                ]
              },
              {
                title: 'Security Implementation',
                items: [
                  'JWT (JJWT 0.12.7) - Token authentication',
                  'Bcrypt Password Hashing',
                  'Secure HTTP-only Cookies',
                  'OAuth 2.0 Google Integration',
                  'Email Verification System',
                  'RESTful API Architecture'
                ]
              },
              {
                title: 'Additional Tools',
                items: [
                  'JavaMail - Email services',
                  'Lombok - Code generation',
                  'Maven - Build automation',
                  'Git - Version control'
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  {section.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What I Achieve As A</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <Users className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Developer</h3>
              <p className="text-gray-600 text-sm">
                Learned authentication best practices, explored secure coding patterns, and understand user
                management workflows.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <Shield className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Businesses</h3>
              <p className="text-gray-600 text-sm">
                Reference implementation for secure user authentication systems, role management, and
                access control in enterprise applications.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <Award className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Student</h3>
              <p className="text-gray-600 text-sm">
                Hands-on learning platform to understand web security, authentication protocols, and
                modern web development practices.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Security & Implementation</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            This project implements industry-standard security protocols including <strong className="text-gray-800">JWT token authentication</strong> using JJWT library,
            <strong className="text-gray-800"> OAuth 2.0 integration</strong> with Google Sign-In,
            <strong className="text-gray-800"> secure password storage</strong> using Bcrypt, and
            <strong className="text-gray-800"> email verification systems</strong>. The implementation demonstrates
            <strong className="text-gray-800"> GDPR-compliant user data management</strong>, secure session handling,
            and <strong className="text-gray-800">role-based access control (RBAC)</strong> using Spring Security for modern web applications.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built with <strong className="text-gray-800">secure authentication best practices</strong>,
            <strong className="text-gray-800"> password reset functionality</strong>, <strong className="text-gray-800">account
            verification workflows</strong>, and <strong className="text-gray-800">RESTful API design patterns</strong>.
            Showcases full-stack development skills including <strong className="text-gray-800">Spring Boot backend architecture</strong>,
            <strong className="text-gray-800"> React frontend development</strong>, <strong className="text-gray-800">database design</strong>,
            and <strong className="text-gray-800"> secure login implementation</strong>.
          </p>
        </div>

        <CTA />

      </div>
    </div>
  )
}

export default About
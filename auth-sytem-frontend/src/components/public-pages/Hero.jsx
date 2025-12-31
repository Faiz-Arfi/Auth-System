import React from 'react'

const Hero = ({
    Icon,
    title,
    highlight,
    description
}) => {
  return (
     <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-6 rounded-full">
              <Icon className="w-16 h-16 text-green-600" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {title} <span className="text-green-600">{highlight}</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
  )
}

export default Hero
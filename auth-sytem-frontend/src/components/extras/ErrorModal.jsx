import { MessageCircleWarning, X } from 'lucide-react'
import React from 'react'

const ErrorModal = ({
  onClose = null,
  errorMessage = "An unexpected error has occurred. Please try again later."
}) => {

  if (!errorMessage) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <MessageCircleWarning className="w-12 h-12 text-red-600" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Error Occurred
        </h2>

        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          {errorMessage}
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
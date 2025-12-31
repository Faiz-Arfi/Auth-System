import React from 'react'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 text-center'>

        <div className='flex justify-center mb-6'>
          <div className='bg-red-100 p-6 rounded-full'>
            <AlertTriangle className='w-16 h-16 text-red-600' strokeWidth={1.5} />
          </div>
        </div>

        <h1 className='text-6xl md:text-7xl font-bold text-gray-800 mb-4'>
          404
        </h1>

        <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>
          Page Not Found
        </h2>

        <p className='text-gray-600 text-lg mb-8 leading-relaxed'>
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 bg-white border-2 border-gray-600 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-md w-full sm:w-auto'
          >
            <ArrowLeft className='w-5 h-5' />
            Go Back
          </button>

          <Link
            to='/'
            className='flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 hover:shadow-md w-full sm:w-auto'
          >
            <Home className='w-5 h-5' />
            Back to Home
          </Link>
        </div>

        <p className='text-gray-500 text-sm mt-8'>
          Need help? Check out <Link to='/' className='text-green-600 hover:text-green-700 font-semibold'>homepage</Link> or contact support.
        </p>
      </div>
    </div>
  )
}

export default ErrorPage
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-center'>404 - Page Not Found</h1>
        <p className='text-center mt-4'>The page you are looking for does not exist.</p>
        <a href='/' className='mt-6 text-blue-500 underline'>Go back to Home</a>
    </div>
  )
}

export default ErrorPage
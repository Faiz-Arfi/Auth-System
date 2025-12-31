import React from 'react'
import UserIcon from '../assets/secure-user.svg'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (<>
    <div className='hero-section flex flex-col-reverse md:flex-row justify-center md:justify-around items-center gap-8 md:gap-4 p-6 md:p-10 min-h-[calc(100vh-80px)]'>
        <div className='flex flex-col justify-center items-center md:items-start gap-6 w-full md:w-auto'>
            <h1 className='w-full md:w-3/4 lg:w-2/4 text-2xl md:text-3xl lg:text-4xl text-center md:text-left'> A <span className='text-green-600'>Secure</span> auth System for all Login and Signup requirements</h1>
            <p className='w-full md:w-4/5 lg:w-3/4 text-gray-600 text-center md:text-left'>The first step towards building a web service is it's authentication, here I have tried to do the same, why not try it yourself</p>
            <Link to="/login" className='bg-gray-900 text-white px-5 py-3 rounded-md hover:bg-gray-700 transition'>Get Started</Link>
        </div>
        <div className='w-full md:w-auto flex justify-center'>
            <img src={UserIcon} alt="hero-icon" className='w-64 md:w-80 lg:w-96' />
        </div>
    </div>
  </>
  )
}

export default HomePage
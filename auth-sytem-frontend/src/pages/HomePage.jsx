import React from 'react'
import UserIcon from '../assets/secure-user.svg'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (<>
    <div className='hero-section flex justify-around p-10'>
        <div className='flex flex-col justify-center items-start gap-6'>
            <h1 className='w-2/4 text-4xl'> A <span className='text-green-600'>Secure</span> auth System for all Login and Signup requirements</h1>
            <p className='w-3/4 text-gray-600'>The first step towards building a web service is it's authentication, here I have tried to do the same, why not try it yourself</p>
            <Link to="/login" className='bg-gray-900 text-white px-5 py-3 rounded-md hover:bg-gray-700 transition'>Get Started</Link>
        </div>
        <div>
            <img src={UserIcon} alt="hero-icon" className='w-100' />
        </div>
    </div>
  </>
  )
}

export default HomePage
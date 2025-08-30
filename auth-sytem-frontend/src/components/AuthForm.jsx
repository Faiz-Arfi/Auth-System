import { useState } from 'react'
import GoogleLogo from '../assets/google-icon-logo.svg'
import ShowPassIcon from '../assets/password-show.svg'
import HidePassIcon from '../assets/password-hide.svg'
import AuthMessage from './AuthMessage'

const AuthForm = ( { mode = "register"} ) => {
    const [showPass, setShowPass] = useState(false);
    const isLogin = mode === "login";

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [warn, setWarn] = useState('');
    const [success, setSuccess] = useState('');

    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // todo : login logic
    }

    const handleRegister = (e) => {
        e.preventDefault();
        // todo : register logic
    }
    
    return (<>
        
            {isLogin ?
            <div className='action-text w-full text-center'>
                <h1 className='text-4xl font-bold mb-2 '>Welcome Back,</h1>
                <p className='text-gray-600'>Please Log-in to continue</p>
            </div>
            :
            <div className='action-text w-full text-center'>
                <h1 className='text-4xl font-bold mb-2 '>Are you new User?</h1>
                <p className='text-gray-600'>Please Register yourself</p>
            </div>
        }
            <AuthMessage message={error} type="error" />
            <AuthMessage message={warn} type="warn" />
            <AuthMessage message={success} type="success" />
            <div className="goole-auth w-full">
                <a className='w-full flex items-center justify-center gap-3 border-2 border-gray-400 px-5 py-3 rounded-md hover:cursor-pointer hover:bg-gray-100 transition'>
                    <img src={GoogleLogo} alt="google-logo" className='w-6 h-6' />
                    <span>Continue with Google</span>
                </a>
            </div>
            <form 
                className='flex flex-col gap-4 w-full'
                onSubmit={isLogin ? handleLogin : handleRegister}
            >
                <h2 className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6">
                    <span className="block h-px bg-gray-400" />
                    <span className='text-gray-400'>Or</span>
                    <span className="block h-px bg-gray-400" />
                </h2>
                {isLogin ? null :
                    <div className='relative w-full'>
                    <label
                        htmlFor="username"
                        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                    >
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        className='border border-gray-400 rounded px-4 py-3 w-full focus:outline-none focus:border-green-500'
                    />
                </div>
                }
                
                <div className='relative w-full'>
                    <label
                        htmlFor='email'
                        className='absolute -top-2 left-4 bg-white text-sm text-gray-600'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='border border-gray-400 rounded px-4 py-3 w-full focus:outline-none focus:border-green-500'
                    />
                </div>
                <div className="relative w-full">
                    <label
                        htmlFor='password'
                        className='absolute -top-2 left-4 bg-white text-sm text-gray-600'
                    >
                        Password
                    </label>
                    <input
                        type={showPass ? 'text' : 'password'}
                        id='password'
                        className='border border-gray-400 rounded px-4 py-3 pr-10 w-full focus:outline-none focus:border-green-500'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer'>
                        <img src={showPass ? ShowPassIcon : HidePassIcon} alt="show password" className='w-6' />
                    </button>
                </div>
                {isLogin ?
                    <button type="submit" className='bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition'>Log-in</button>
                    :
                    <button type="submit" className='bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition'>Register</button>
            }
            </form>
    </>
    )
}

export default AuthForm
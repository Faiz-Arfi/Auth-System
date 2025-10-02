import { useEffect, useState } from 'react'
import GoogleLogo from '../assets/google-icon-logo.svg'
import ShowPassIcon from '../assets/password-show.svg'
import HidePassIcon from '../assets/password-hide.svg'
import AuthMessage from './AuthMessage'
import { login, register } from '../api/auth'
import { useNavigate } from 'react-router-dom'

const AuthForm = ({ mode = "register" }) => {
    const [showPass, setShowPass] = useState(false);
    const isLogin = mode === "login";

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [warn, setWarn] = useState('');
    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('verified') === 'true') {
            setSuccess("Registration successful! Please log in.");
        }
    }, []);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        setWarn('');
        setInfo('');
        try {
            const response = await login(email, password);
            setSuccess("Login successful!");
            setInfo("Redirecting...");
            setTimeout(() => {
                navigate('/user/dashboard');
            }, 2000);
            console.log(response);

        } catch (error) {
            console.error("Login failed:", error);
            if(error.response.status === 401) {
                setError(error.response.data.message);
            }
            else if (error.response.status === 403) {
                setWarn(error.response.data.message);
                setInfo("Please check your email for verification link.");
            }
            else {
                setError(error.response.data.message || "Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        setWarn('');
        setInfo('');
        console.log(userName, email, password, confirmPassword);
        try {
            const response = await register(userName, email, password, confirmPassword);
            setSuccess("Registration successful!");
            setInfo("Please check your email for verification link.");
            console.log(response);

        } catch (error) {
            console.error("Login failed:", error);
            setError(error.response.data.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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
        <div className='w-full flex flex-col gap-1'>
            <AuthMessage message={error} type="error" />
            <AuthMessage message={warn} type="warn" />
            <AuthMessage message={success} type="success" />
            <AuthMessage message={info} type="info" />
        </div>
        <div onClick={handleGoogleAuth} className="goole-auth w-full">
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
                        onChange={(e) => setUserName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-gray-400 rounded px-4 py-3 pr-10 w-full focus:outline-none focus:border-green-500'
                />
                <button
                    type='button'
                    onClick={() => setShowPass(!showPass)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer'>
                    <img src={showPass ? ShowPassIcon : HidePassIcon} alt="show password" className='w-6' />
                </button>
            </div>
            {isLogin ? null :
                <div className="relative w-full">
                    <label
                        htmlFor='confirmPassword'
                        className='absolute -top-2 left-4 bg-white text-sm text-gray-600'
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showPass ? 'text' : 'password'}
                        id='confirmPassword'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border border-gray-400 rounded px-4 py-3 pr-10 w-full focus:outline-none focus:border-green-500'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer'>
                        <img src={showPass ? ShowPassIcon : HidePassIcon} alt="show password" className='w-6' />
                    </button>
                </div>
            }
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
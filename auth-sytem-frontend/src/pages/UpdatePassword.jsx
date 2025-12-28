import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthMessage from '../components/AuthMessage'
import { confirmResetPassword } from '../api/auth'
import ShowPassIcon from '../assets/password-show.svg'
import HidePassIcon from '../assets/password-hide.svg'

const UpdatePassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing reset token');
        }
    }, [token]);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        setSuccess('');
        setError('');
        setInfo('');

        try {
            await confirmResetPassword(token, newPassword);
            setSuccess('Password updated successfully!');
            setInfo('Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login?password-reset=true');
            }, 2000);
        } catch (error) {
            console.error('Update password failed:', error);
            setError(error.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-4 auth-page flex flex-col justify-center items-center gap-6 p-6 w-full max-w-md md:max-w-lg lg:max-w-xl m-auto'>
            <div className='action-text w-full text-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>Update Password</h1>
                <p className='text-sm sm:text-base text-gray-600'>Enter your new password</p>
            </div>

            <div className='w-full flex flex-col gap-1'>
                <AuthMessage message={error} type="error" />
                <AuthMessage message={success} type="success" />
                <AuthMessage message={info} type="info" />
            </div>

            <form
                className='flex flex-col gap-4 w-full'
                onSubmit={handleUpdatePassword}
            >
                <div className='relative w-full'>
                    <label
                        htmlFor='newPassword'
                        className='absolute -top-2 left-4 bg-white text-sm text-gray-600'
                    >
                        New Password
                    </label>
                    <input
                        type={showNewPass ? 'text' : 'password'}
                        id='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className='border border-gray-400 rounded px-4 py-3 pr-12 w-full focus:outline-none focus:border-green-500'
                    />
                    <img
                        onClick={() => setShowNewPass(!showNewPass)}
                        src={showNewPass ? ShowPassIcon : HidePassIcon}
                        alt='toggle password visibility'
                        className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer'
                    />
                </div>

                <div className='relative w-full'>
                    <label
                        htmlFor='confirmPassword'
                        className='absolute -top-2 left-4 bg-white text-sm text-gray-600'
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPass ? 'text' : 'password'}
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className='border border-gray-400 rounded px-4 py-3 pr-12 w-full focus:outline-none focus:border-green-500'
                    />
                    <img
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        src={showConfirmPass ? ShowPassIcon : HidePassIcon}
                        alt='toggle password visibility'
                        className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer'
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !token}
                    className='bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>

                <div className='w-full text-center'>
                    <a href="/login" className='text-sm text-blue-600 hover:text-blue-800 hover:underline'>
                        Back to Login
                    </a>
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword
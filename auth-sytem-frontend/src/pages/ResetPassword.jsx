import { useState } from 'react'
import AuthMessage from '../components/AuthMessage'
import { forgetPassword } from '../api/auth';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        setInfo('');

        try {
            const response = await forgetPassword(email);
            console.log("Reset password response:", response);
            setSuccess("Password reset link sent!");
            setInfo("Please check your email for the reset link.");

        } catch (error) {
            console.error("Reset password failed:", error);
            setError(error.response?.data?.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-4 auth-page flex flex-col justify-center items-center gap-6 p-6 w-full max-w-md md:max-w-lg lg:max-w-xl m-auto'>
            <div className='action-text w-full text-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>Reset Password</h1>
                <p className='text-sm sm:text-base text-gray-600'>Enter your email to receive a password reset link</p>
            </div>

            <div className='w-full flex flex-col gap-1'>
                <AuthMessage message={error} type="error" />
                <AuthMessage message={success} type="success" />
                <AuthMessage message={info} type="info" />
            </div>

            <form
                className='flex flex-col gap-4 w-full'
                onSubmit={handleResetPassword}
            >
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='border border-gray-400 rounded px-4 py-3 w-full focus:outline-none focus:border-green-500'
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className='bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className='w-full text-center'>
                    <Link to="/login" className='text-sm text-blue-600 hover:text-blue-800 hover:underline'>
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
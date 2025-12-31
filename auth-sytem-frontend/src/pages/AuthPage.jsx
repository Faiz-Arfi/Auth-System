import { useState, useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [showExpiredMessage, setShowExpiredMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                navigate('/user/dashboard');
            }
        };
        checkUser();
    }, [navigate]);

    //check query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('verified') === 'true') {
            setIsLogin(true);
        }
        if (params.get('expired') === 'true') {
            setShowExpiredMessage(true);
            setIsLogin(true);
            // Hide message after 5 seconds
            setTimeout(() => setShowExpiredMessage(false), 5000);
        }
    }, []);

    return (<>
        <div className='mt-4 auth-page flex flex-col justify-center items-center gap-4 md:gap-6 p-4 md:p-6 w-full sm:w-5/6 md:w-3/4 lg:w-2/4 xl:w-2/6 m-auto'>
            {showExpiredMessage && (
                <div className='w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role="alert">
                    <strong className='font-bold'>Session Expired!</strong>
                    <span className='block sm:inline'> Your session has expired. Please log in again.</span>
                </div>
            )}
            <div className='action-btn flex gap-3 md:gap-4 w-full'>
                {isLogin ? 
                <button 
                    onClick={() => setIsLogin(false)}
                    className='
                        flex-1 bg-white text-black border-2 border-gray-600 py-2 md:py-2.5 rounded-md hover:bg-gray-800 hover:text-white transition text-sm md:text-base'>Sign up</button>
                     :
                    <button 
                    onClick={() => setIsLogin(false)}
                    className='
                        flex-1 bg-gray-800 text-white py-2 md:py-2.5 rounded-md hover:bg-gray-600 transition text-sm md:text-base'>Sign up</button>
                }
                {isLogin ? 
                <button 
                    onClick={() => setIsLogin(true)}
                    className='
                        flex-1 bg-gray-800 text-white py-2 md:py-2.5 rounded-md hover:bg-gray-600 transition text-sm md:text-base'>Log In</button>
                        :
                <button 
                    onClick={() => setIsLogin(true)}
                    className='
                        flex-1 bg-white text-black border-2 border-gray-600 py-2 md:py-2.5 rounded-md hover:bg-gray-800 hover:text-white transition text-sm md:text-base'>Log In</button>
                }
                
            </div>
            <AuthForm mode={isLogin ? "login" : "register"} />
        </div>
    </>
    )
}

export default AuthPage
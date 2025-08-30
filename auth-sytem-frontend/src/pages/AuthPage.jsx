import { useState, useEffect } from 'react'

import AuthForm from '../components/AuthForm'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();

        useEffect(() => {
            console.log("AuthPage mounted");
            const checkUser = async () => {
                const user = await getCurrentUser();
                if (user) {
                    navigate('/user/dashboard');
                }
            };
            checkUser();
        }, [navigate]);

    return (<>
        <div className='mt-4 auth-page flex flex-col justify-center items-center gap-6 p-6 w-2/6 m-auto'>
            <div className='action-btn flex gap-4 w-full'>
                {isLogin ? 
                <button 
                    onClick={() => setIsLogin(false)}
                    className='
                        flex-1 bg-white text-black border-2 border-gray-600 py-2 rounded-md hover:bg-gray-800 hover:text-white transition'>Sign up</button>
                     :
                    <button 
                    onClick={() => setIsLogin(false)}
                    className='
                        flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 transition'>Sign up</button>
                }
                {isLogin ? 
                <button 
                    onClick={() => setIsLogin(true)}
                    className='
                        flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 transition'>Log In</button>
                        :
                <button 
                    onClick={() => setIsLogin(true)}
                    className='
                        flex-1 bg-white text-black border-2 border-gray-600 py-2 rounded-md hover:bg-gray-800 hover:text-white transition'>Log In</button>
                }
                
            </div>
            <AuthForm mode={isLogin ? "login" : "register"} />
        </div>
    </>
    )
}

export default AuthPage
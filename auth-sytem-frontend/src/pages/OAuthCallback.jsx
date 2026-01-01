import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const token = searchParams.get('token');
            
            if (!token) {
                setError('Authentication failed - no token received');
                setTimeout(() => navigate('/login?error=oauth-failed'), 2000);
                return;
            }

            try {
                // Send token to backend to set as httpOnly cookie
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/set-oauth-cookie`,
                    { token },
                    { 
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                
                // Small delay to ensure cookie is set
                setTimeout(() => {
                    navigate('/user/dashboard');
                }, 500);
                
            } catch (error) {
                console.error('OAuth callback error:', error);
                setError('Failed to complete authentication');
                setTimeout(() => navigate('/login?error=oauth-failed'), 2000);
            }
        };

        handleOAuthCallback();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                {!error ? (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Completing Authentication
                        </h2>
                        <p className="text-gray-600">
                            Please wait while we sign you in...
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-red-600 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Authentication Failed
                        </h2>
                        <p className="text-gray-600">{error}</p>
                        <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default OAuthCallback;

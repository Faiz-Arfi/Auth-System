import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

const ProtectedRoutes = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we just came from OAuth redirect
    const isFromOAuth = location.pathname === '/user/dashboard' && retryCount === 0;

    const checkAuth = async () => {
        try {
            const user = await getCurrentUser();
            setIsAuthenticated(!!user);
            setRetryCount(0); // Reset retry count on success
        } catch (error) {
            console.error('ProtectedRoute: Auth check failed:', error);
            
            // Retry up to 3 times with a delay (for OAuth redirect scenarios)
            // Give more retries if potentially coming from OAuth
            const maxRetries = isFromOAuth ? 3 : 2;
            
            if (retryCount < maxRetries) {
                console.log(`ProtectedRoute: Retrying authentication check (${retryCount + 1}/${maxRetries})...`);
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 800); // Increased delay for better reliability
            } else {
                setIsAuthenticated(false);
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, [retryCount]); // Removed navigate from dependencies to avoid unnecessary re-checks

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);


    if (isAuthenticated === null) {
        checkAuth();
        return null;
    }

    return (
        <>
            {isAuthenticated
                ? children :
                null
            }
        </>
    )
}

export default ProtectedRoutes
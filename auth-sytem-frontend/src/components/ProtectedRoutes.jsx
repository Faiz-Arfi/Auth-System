import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

const ProtectedRoutes = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const user = await getCurrentUser();
            setIsAuthenticated(!!user);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [navigate]);

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
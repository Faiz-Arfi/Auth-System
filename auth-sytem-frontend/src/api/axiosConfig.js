import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true // This ensures cookies are sent with every request
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If token is expired or invalid (401/403), clear cookies and redirect
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear localStorage
            localStorage.clear();
            
            // Call backend to clear cookies
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/clear-cookie`,
                    {},
                    { withCredentials: true }
                );
            } catch (clearError) {
                console.error('Error clearing cookies:', clearError);
            }
            
            // Redirect to auth page with expired parameter
            if (window.location.pathname !== '/') {
                window.location.href = '/?expired=true';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
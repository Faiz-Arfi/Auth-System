import axios from "axios";

const baseUrl = 'http://localhost:8080/auth';

export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${baseUrl}/login`,
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (userName, email, password, confirmPassword) => {
    try {
        const response = await axios.post(
            `${baseUrl}/signup`,
            { userName, email, password, confirmPassword },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

// token is stored in httpOnly cookie
export const getCurrentUser = async () => {
    const response = await axios.get(
        `${baseUrl}/get-current-user`,
        { withCredentials: true }
    );
    return response.data;
}


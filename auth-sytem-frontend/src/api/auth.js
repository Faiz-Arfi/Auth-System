import axiosInstance from "./axiosConfig";

const baseUrl = 'http://localhost:8080/auth';

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/login`,
            { email, password }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (userName, email, password, confirmPassword) => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/signup`,
            { userName, email, password, confirmPassword }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/logout`,
            {}
        );
        localStorage.clear();
        return response.data;
    } catch (error) {
        throw error;
    }
}

// token is stored in httpOnly cookie
export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get(
            `${baseUrl}/get-current-user`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}


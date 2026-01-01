import { useParams } from "react-router-dom";
import axiosInstance from "./axiosConfig";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth`;

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

export const forgetPassword = async (email) => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/forget-password`,
            {},
            { params: { email } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const confirmResetPassword = async (token, newPassword) => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/confirm-reset-password`,
            { token, newPassword }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
}


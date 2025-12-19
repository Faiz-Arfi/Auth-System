import axiosInstance from "./axiosConfig";

const baseUrl = 'http://localhost:8080/login/oauth2/code';

export const loginWithGoogle = async () => {
    try {
        const response = await axiosInstance.get(
            `${baseUrl}/google`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
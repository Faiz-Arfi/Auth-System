import axiosInstance from './axiosConfig';
import { logout } from './auth';

const baseUrl = 'http://localhost:8080/user';

export const editName = async (userName) => {
    try {
        const response = await axiosInstance.put(
            `${baseUrl}/edit-profile`,
            { userName }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editPassword = async (formData) => {
    try {
        const response = await axiosInstance.put(
            `${baseUrl}/change-password`,
            formData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resetAccount = async () => {
    try {
        const response = await axiosInstance.put(
            `${baseUrl}/reset-account`,
            {}
        );
        //run the logout function from auth api after resetting account
        logout();
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAccount = async () => {
    try {
        const response = await axiosInstance.delete(
            `${baseUrl}/delete-account`
        );
        //run the logout function from auth api after deleting account
        logout();
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const checkPromoCode = async (promoCode, role) => {
    try {
        const response = await axiosInstance.get(
            `${baseUrl}/check-promo?promoCode=${promoCode}&role=${role}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const changeUserRole = async (role, promoCode) => {
    try {
        console.log('API call to changeUserRole with role:', role, 'and promoCode:', promoCode);
        const response = await axiosInstance.post(
            `${baseUrl}/change-plan?role=${role}&promoCode=${promoCode}`,
            {}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
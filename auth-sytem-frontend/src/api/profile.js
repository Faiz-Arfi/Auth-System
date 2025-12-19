import axios from 'axios';
import { logout } from './auth';

const baseUrl = 'http://localhost:8080/user';

export const editName = async (userName) => {
    try {
        const response = await axios.put(
            `${baseUrl}/edit-profile`,
            { userName },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editPassword = async (formData) => {
    try {
        const response = await axios.put(
            `${baseUrl}/change-password`,
            formData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resetAccount = async () => {
    try {
        const response = await axios.put(
            `${baseUrl}/reset-account`,
            {},
            { withCredentials: true }
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
        const response = await axios.delete(
            `${baseUrl}/delete-account`,
            { withCredentials: true }
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
        const response = await axios.get(
            `${baseUrl}/check-promo?promoCode=${promoCode}&role=${role}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const changeUserRole = async (role, promoCode) => {
    try {
        console.log('API call to changeUserRole with role:', role, 'and promoCode:', promoCode);
        const response = await axios.post(
            `${baseUrl}/change-plan?role=${role}&promoCode=${promoCode}`,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
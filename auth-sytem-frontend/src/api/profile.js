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

export const skipActivity2ForUser = async () => {
    try {
        const response = await axiosInstance.put(
            `${baseUrl}/skip-activity-2`,
            {}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getActivityLogsOfDate = async (date) => {
    // format for api call YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log('Fetching activity logs for date:', formattedDate);
    try {
        const response = await axiosInstance.get(
            `${baseUrl}/get-activity-log?date=${formattedDate}&size=1000&sort=recordedAt,desc`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const completeActivity5 = async () => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/complete-activity-5`,
            {}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const submitActivityFeedback = async (feedbackData) => {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/submit-feedback`,
            feedbackData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
} 
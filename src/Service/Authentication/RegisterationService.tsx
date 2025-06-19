// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const useRegisterService = () => {
    const { post, loading } = useApiHelper();

    const sendOTP = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const validateSponsor = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const registerMember = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_WEBSITEAPI_URL}/Register`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    
    return {
        sendOTP,
        registerMember,
        validateSponsor,
        loading,
    };
};

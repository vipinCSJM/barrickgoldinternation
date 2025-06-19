// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const useBotService = () => {
    const { post, loading } = useApiHelper();

    const getFXSTWalletBalance = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const ExecuteProcedure = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const doActivation = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ActivateBot`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const doAadharVerification = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/VerifyAadhar`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    return {
        getFXSTWalletBalance,
        doActivation,
        doAadharVerification,
        loading,
        ExecuteProcedure
    };
};

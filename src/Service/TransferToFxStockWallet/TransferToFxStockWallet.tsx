// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const useTransferFxstockService = () => {
    const { post, loading } = useApiHelper();

    const getWalletBalance = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const doTransfer = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
   
    return {
        getWalletBalance,
        doTransfer,
        loading,
    };
};

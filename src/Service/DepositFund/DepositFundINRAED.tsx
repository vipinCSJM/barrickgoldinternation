// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const useDepositFundService = () => {
    const { post, loading } = useApiHelper();

    const getDepositWalletBalance = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getBankByCurrency = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const doDeposit = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/RequestFundForProductwalletINR`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getCurrencyValue = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getTRC20Address = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/GenerateTRC20Address`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getBEP20Address = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/GenerateBEP20USDTAddress`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getBEP20AddressKYC = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/GenerateBEP20USDTAddressKYC`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getTRC20AddressKYC = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/GenerateTRC20USDTAddressKYC`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getFXSTTokenAddress = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/GenerateFXSTAddress`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const getDepositTransactions = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const verifyUTR = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/VerifyUTR`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    return {
        getDepositWalletBalance,
        getBankByCurrency,
        getCurrencyValue,
        doDeposit,
        getTRC20Address,
        getBEP20Address,
        getFXSTTokenAddress,
        getDepositTransactions,
        getBEP20AddressKYC,
        verifyUTR,
        getTRC20AddressKYC,
        loading,
    };
};

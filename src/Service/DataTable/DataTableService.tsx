// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const useDataTableService = () => {
    const { get, post, loading } = useApiHelper();

    const FetchDataTable = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    
    const GetBulkDataforDownline = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}GetBulkDataProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    return {
        FetchDataTable,
        GetBulkDataforDownline,
        loading,
    };
};

// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const Profile_Service = () => {
    const { post, loading } = useApiHelper();

    const UpdateUser_Profile = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const GetProfile_Details = async (payload:any) =>{
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }

    }

    return {
        UpdateUser_Profile,
        GetProfile_Details,
        loading,
    };
};

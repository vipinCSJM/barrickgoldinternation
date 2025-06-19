// service.js
import { useApiHelper } from '../../utils/helper/apiHelper';

export const SendOTP_Service = () => {
    const { post, loading } = useApiHelper();

    const SendOTP = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const SendAadharOTP = async (payload: any) => {
      try {
        return await post(`${process.env.REACT_APP_ADMIN_API_URL}/SendAadharOTP`, payload);
      } catch (error) {
          console.error('Error fetching dashboard data:', error);
          throw error;
      }
  };
    const StartTimer = (data:any) => {
        const {setOtpTimer, setIsOtpSent, secondsLeft} = data
        //setOtpTimer(secondsLeft - 1); // Subtract 1 to start the timer at 59 seconds
        const intervalId = setInterval(() => {
          setOtpTimer((prev:any) => {
            if (prev <= 0) {
              clearInterval(intervalId); // Stop timer when it reaches 0
              setIsOtpSent(false); // Reset OTP sent flag
              return 0; // Ensure it doesn't go below 0
            }
            return prev - 1; // Decrement the timer by 1 second
          });
        }, 1000);
    
        return () => clearInterval(intervalId);
      };

    // Helper function to format time
    const FormatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    // Always show two digits for seconds
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
    
    return {
        SendOTP,
        SendAadharOTP,
        StartTimer,
        FormatTime,
        loading,
    };
};

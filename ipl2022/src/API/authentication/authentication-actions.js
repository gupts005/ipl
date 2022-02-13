
import axios from 'axios';
import { authBaseURL, usersBaseURL } from '../../common/http-urls';
import { notificationActions } from '../notification/notification-slice';
import { authenticationActions } from './authentication-slice';

export const authentication = (loginData) => {

  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        notificationActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
  
      const response = await axios.post(authBaseURL, loginData);

      if (response.status !== 200) {
        throw new Error('Could not fetch user data!');
        // return response.data.message;
      }

      const data = await response.data;
      // console.log(data,' login file');

      return data;
    };

    try {
      const loginData = await fetchData();
      
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );

      dispatch(
        authenticationActions.replaceAuth({
          items : loginData || [],
          changed: true
        })
      );
    } catch (error) {
      
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending bet data failed!",
        })
      );

      dispatch(
        authenticationActions.replaceAuth({
          items : error.response.data.message || [],
          changed: true
        })
      );
    }
  };
};

import axios from "axios";
import { getErrorMessage } from '../../common/error-function';
import { authBaseURL, usersBaseURL } from "../../common/http-urls";
import { notificationActions } from "../notification/notification-slice";
import { authenticationActions } from "./authentication-slice";

export const authentication = (creds) => { 
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        notificationActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Verifying your credentials!",
        })
      );

      const response = await axios.post(authBaseURL, creds);

      if (response.status !== 200) {
        throw new Error(response);
        // return response.data.message;
      }

      // const data = await response.data;
      // console.log(response,' login file');

      return response;
    };

    try {
      const data = await fetchData();
      const loginData = await data.data;

      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully Logged In!",
        })
      );

      if (data.status === 200) {
        dispatch(
          authenticationActions.replaceAuth({
            items: loginData || [],
            changed: true,
          })
        );
      }
    } catch (error) {
      const processedError = getErrorMessage(error);
      // console.log(error);
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: processedError
        })
      );

      dispatch(
        authenticationActions.replaceAuth({
          items: error.response.data.message || [],
          changed: true,
        })
      );
    }
  };
};


import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { userByIdActions } from '../user-by-id/userById-slice';
import { userActions } from './user-slice';

export const fetchUsersData = (Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch user data!');
      }

      const data = await response.data;
      // console.log(data,' users file');

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        userActions.replaceUsers({
          items : userData || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const sendUserData = (user,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.post(usersBaseURL+ '/register',user,Token);

      if (response.status !== 201) {
        throw new Error('Could not send user data!');
      }

      const data = await response.data;
      console.log(data,' insert success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendUpdatedUserData = (userId,user,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.put(usersBaseURL+`/${userId}`,user,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not update user data!');
      }

      const data = await response.data;
      console.log(data,' update success');

      return data;
    };

    try {
      const resp = await sendRequest();
      dispatch(
        userByIdActions.updateUser({
          items : resp || []
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserData = (userId,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.delete(usersBaseURL+`/${userId}`,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not delete user data!');
      }

      const data = await response.data;
      console.log(data,' delete success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserStatus = (userId,status,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.put(usersBaseURL+`/${userId}/update-status/${status}`,{},Token);

      if (response.status !== 200) {
        throw new Error('Could not delete user data!');
      }

      const data = await response.data;
      console.log(data,' delete success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};
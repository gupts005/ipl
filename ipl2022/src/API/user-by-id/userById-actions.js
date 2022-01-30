
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { userByIdActions } from './userById-slice';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

export const fetchUserById = (userId) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+`/${userId}`,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch user data!');
      }

      const data = await response.data;
      console.log(data,' user by id file');

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        userByIdActions.replaceUserById({
          items : userData || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

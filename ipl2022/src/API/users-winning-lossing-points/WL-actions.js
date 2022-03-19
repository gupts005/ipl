
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { userWLPActions } from './WL-slice';

export const fetchUserWLP = (userId,Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+`/${userId}/winning-losing-points`,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch user data!');
      }

      const data = await response.data;
      // console.log(data,' user by id file');

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        userWLPActions.replaceUserWLP({
          items : userData || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

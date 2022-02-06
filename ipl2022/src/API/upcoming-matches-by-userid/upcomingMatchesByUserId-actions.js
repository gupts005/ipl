
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { upcomingMatchesByUserIdActions } from './upcomingMatchesByUserId-slice';

export const fetchupcomingMatchesByUserId = (userId,Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+`/${userId}/upcoming`,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      // console.log(data,' upcomingMatchesByUserId file');

      return data;
    };

    try {
      const upcomingMatchesByUserId = await fetchData();
      dispatch(
        upcomingMatchesByUserIdActions.replaceupcomingMatchesByUserId({
          items : upcomingMatchesByUserId || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

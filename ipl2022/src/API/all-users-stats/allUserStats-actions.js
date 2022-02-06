import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { allUserStatsActions } from './allUserStats-slice';

export const fetchallUserStats = (Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+'/statistics',Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch user data!');
      }

      const data = await response.data;
      // console.log(data,' allUserStats file');

      return data;
    };

    try {
      const allUserStats = await fetchData();
      dispatch(
        allUserStatsActions.replaceallUserStats({
          items : allUserStats || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

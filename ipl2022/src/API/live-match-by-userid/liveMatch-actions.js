
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { liveMatchActions } from './liveMatch-slice';

export const fetchliveMatch = (userId,Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+`/${userId}/live`,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      // console.log(data,' liveMatch file');

      return data;
    };

    try {
      const liveMatch = await fetchData();
      dispatch(
        liveMatchActions.replaceliveMatch({
          items : liveMatch || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

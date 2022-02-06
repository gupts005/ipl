
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { allMatchResultActions } from './allMatchResult-slice';

export const fetchallMatchResult = (userId,Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL+`/${userId}/result`,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      // console.log(data,' allMatchResult file');

      return data;
    };

    try {
      const allMatchResult = await fetchData();
      dispatch(
        allMatchResultActions.replaceallMatchResult({
          items : allMatchResult || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

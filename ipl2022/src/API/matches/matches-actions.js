
import axios from 'axios';
import { matchBaseURL } from '../../common/http-urls';
import { Token } from '../../UI/common/constants/data';
import { matchActions } from './matches-slice';


export const fetchMatchData = () => {
  
const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(matchBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' actions file');

      return data;
    };

    try {
      const matchData = await fetchData();
      dispatch(
        matchActions.replaceMatches({
          items : matchData || []
        })
      );
    } catch (error) {
      throw new Error(error);
      // dispatch(
      //   matchActions.showNotification({
      //     status: 'error',
      //     title: 'Error!',
      //     message: 'Fetching match data failed!',
      //   })
      // );
    }
  };
};
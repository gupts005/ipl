
import axios from 'axios';
import { matchBaseURL } from '../../common/http-urls';
import { upcomingMatchActions } from './upcomingMatches-slice';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

export const fetchUpcomingMatchData = () => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(matchBaseURL+'/upcoming',Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' upcoming matches file');

      return data;
    };

    try {
      const upcomingMatch = await fetchData();
      dispatch(
        upcomingMatchActions.replaceUpcomingMatches({
          items : upcomingMatch || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

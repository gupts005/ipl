
import axios from 'axios';
import { tournamentBaseURL } from '../../common/http-urls';
import { Token } from '../../UI/common/constants/data';
import { tournamentActions } from './tournament-slice';

export const fetchTournamentData = () => {
  const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(tournamentBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' actions file');

      return data;
    };

    try {
      const tournamentData = await fetchData();
      dispatch(
        tournamentActions.replaceTournament({
          items : tournamentData || []
        })
      );
    } catch (error) {
      throw new Error(error);
      // dispatch(
      //   tournamentActions.showNotification({
      //     status: 'error',
      //     title: 'Error!',
      //     message: 'Fetching match data failed!',
      //   })
      // );
    }
  };
};

import axios from 'axios';
import { teamBaseURL } from '../../common/http-urls';
import { Token } from '../../UI/common/constants/data';
import { teamActions } from './team-slice';


export const fetchTeamData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(teamBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' actions file');

      return data;
    };

    try {
      const teamData = await fetchData();
      dispatch(
        teamActions.replaceTeam({
          teamItems : teamData || []
        })
      );
    } catch (error) {
      throw new Error(error);
      // dispatch(
      //   teamActions.showNotification({
      //     status: 'error',
      //     title: 'Error!',
      //     message: 'Fetching match data failed!',
      //   })
      // );
    }
  };
};
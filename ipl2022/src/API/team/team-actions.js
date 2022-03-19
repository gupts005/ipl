
import axios from 'axios';
import { teamBaseURL } from '../../common/http-urls';
import { teamActions } from './team-slice';

export const fetchTeamData = (Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(teamBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      // console.log(data,' team file');

      return data;
    };

    try {
      const teamData = await fetchData();
      dispatch(
        teamActions.replaceTeam({
          items : teamData || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const sendTeamData = (team,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.post(teamBaseURL,team,Token);

      if (response.status !== 201) {
        throw new Error('Could not send team data!');
      }

      const data = await response.data;
      console.log(data,' insert success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendUpdatedTeamData = (teamId,team,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.put(teamBaseURL+`/${teamId}`,team,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not update team data!');
      }

      const data = await response.data;
      console.log(data,' update success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTeamData = (teamId,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.delete(teamBaseURL+`/${teamId}`,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not delete team data!');
      }

      const data = await response.data;
      console.log(data,' delete success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};

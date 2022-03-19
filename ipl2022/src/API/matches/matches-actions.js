
import axios from 'axios';
import { matchBaseURL } from '../../common/http-urls';
import { matchActions } from './matches-slice';

export const fetchMatchData = (Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(matchBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      // console.log(data,' matches file');

      return data;
    };

    try {
      const matchData = await fetchData();
      dispatch(
        matchActions.replaceMatches({
          items : matchData || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const sendMatchData = (match,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.post(matchBaseURL,match,Token);

      if (response.status !== 201) {
        throw new Error('Could not send match data!');
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

export const sendUpdatedMatchData = (match,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.put(matchBaseURL+`/${match.matchId}`,match,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not update match data!');
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

export const deleteMatchData = (matchId,Token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.delete(matchBaseURL+`/${matchId}`,Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not delete match data!');
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
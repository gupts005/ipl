
import axios from 'axios';
import { matchBaseURL } from '../../common/http-urls';
import { Token } from '../../common/LS';
import { oldMatchActions } from './oldMatches-slice';

export const fetchOldMatchData = (Token) => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(matchBaseURL+'/old-matches',Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' matches file');

      return data;
    };

    try {
      const oldMatchData = await fetchData();
      dispatch(
        oldMatchActions.replaceMatches({
          items : oldMatchData || []
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const updateMatchResult = (matchId,resultStatus,winnerTeamId) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.put(matchBaseURL+`/update-match/${matchId}/${resultStatus}/${winnerTeamId}`,{},Token);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Could not declare match result!');
      }

      const data = await response.data;
      console.log(data,' match declared success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      console.log(error);
    }
  };
};
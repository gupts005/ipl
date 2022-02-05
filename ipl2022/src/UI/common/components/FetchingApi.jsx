import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchallMatchResult } from '../../../API/all-matches-result/allMatchResult-actions';
import { fetchallUserFutureBets } from '../../../API/all-users-future-bets/allUsersFutureBets-actions';
import { fetchallUserStats } from '../../../API/all-users-stats/allUserStats-actions';
import AuthContext from '../../../API/auth-context';
import { fetchliveMatch } from '../../../API/live-match-by-userid/liveMatch-actions';
import { fetchMatchData } from '../../../API/matches/matches-actions';
import { fetchOldMatchData } from '../../../API/old-matches/oldMatches-actions';
import { fetchTeamData } from '../../../API/team/team-actions';
import { fetchTournamentData } from '../../../API/tournament/tournament-actions';
import { fetchupcomingMatchesByUserId } from '../../../API/upcoming-matches-by-userid/upcomingMatchesByUserId-actions';
import { fetchUpcomingMatchData } from '../../../API/upcoming-matches/upcomingMatches-actions';
import { fetchUserById } from '../../../API/user-by-id/userById-actions';
import { fetchUsersData } from '../../../API/users/user-actions';
import { fetchVenueData } from '../../../API/venue/venue-actions';


const FetchingApi = (props) => {

  const authCtx = useContext(AuthContext);
  // const userData = authCtx.userData || JSON.parse(localStorage.getItem('loginState'));
  const userData = authCtx.userData;
  const Token = {
    headers: { Authorization: `Bearer ${userData?.token}` }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      Promise.all([
      dispatch(fetchMatchData(Token)),
      dispatch(fetchTeamData(Token)),
      dispatch(fetchTournamentData(Token)),
      dispatch(fetchVenueData(Token)),
      dispatch(fetchUsersData(Token)),
      dispatch(fetchOldMatchData(Token)),
      dispatch(fetchUpcomingMatchData(Token)),
      dispatch(fetchUserById(userData.userId,Token)),
      dispatch(fetchallUserFutureBets(Token)),
      dispatch(fetchallUserStats(Token)),
      dispatch(fetchupcomingMatchesByUserId(userData.userId,Token)),
      dispatch(fetchallMatchResult(userData.userId,Token)),
      dispatch(fetchliveMatch(userData.userId,Token))
    ]).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
    }
  }, [dispatch]);

return (
  <React.Fragment>

  </React.Fragment>
)
}

export default FetchingApi;

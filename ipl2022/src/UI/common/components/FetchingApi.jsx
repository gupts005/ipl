import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchallMatchResult } from '../../../API/all-matches-result/allMatchResult-actions';
import { fetchallUserFutureBets } from '../../../API/all-users-future-bets/allUsersFutureBets-actions';
import { fetchallUserStats } from '../../../API/all-users-stats/allUserStats-actions';
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

const FetchingApi = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('loginState'));

  useEffect(() => {
    dispatch(fetchMatchData());
    dispatch(fetchTeamData());
    dispatch(fetchTournamentData());
    dispatch(fetchVenueData());
    dispatch(fetchUsersData());
    dispatch(fetchOldMatchData());
    dispatch(fetchUpcomingMatchData());
    dispatch(fetchUserById(userData.userId));
    dispatch(fetchallUserFutureBets());
    dispatch(fetchallUserStats());
    dispatch(fetchupcomingMatchesByUserId(userData.userId));
    dispatch(fetchallMatchResult(userData.userId));
    dispatch(fetchliveMatch(userData.userId));
  }, [dispatch]);

  return (
    <React.Fragment>

    </React.Fragment>
  )
}

export default FetchingApi;

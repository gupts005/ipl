import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchData, sendMatchData } from '../../../API/matches/matches-actions';
import { fetchTeamData } from '../../../API/team/team-actions';
import { fetchTournamentData } from '../../../API/tournament/tournament-actions';
import { fetchVenueData } from '../../../API/venue/venue-actions';

const FetchingApi = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchMatchData());
      dispatch(fetchTeamData());
      dispatch(fetchTournamentData());
      dispatch(fetchVenueData());
  }, [dispatch]);
  
  return (
    <React.Fragment>
      
    </React.Fragment>
  )
}

export default FetchingApi;

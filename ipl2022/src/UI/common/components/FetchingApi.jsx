import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchMatchData } from '../../../API/matches/matches-actions';
import { fetchTeamData } from '../../../API/team/team-actions';
import { fetchTournamentData } from '../../../API/tournament/tournament-actions';
import { fetchVenueData } from '../../../API/venue/venue-actions';

const FetchingApi = () => {
  const dispatch = useDispatch();
  // const showCart = useSelector((state) => state.ui.cartIsVisible);
  // const cart = useSelector((state) => state.cart);
  // const notification = useSelector((state) => state.ui.notification);

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

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classes from './betting-page.module.scss';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContestByMatchId } from '../../API/bot/bot-actions';
import { usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import BetTable from './components/BetTable';
import PlaceBet from './components/PlaceBet';
import { Token, userData } from '../../common/LS';

const BettingPage = (props) => {

  const location = useLocation();
  const [matchData, setMatchData] = useState(location.state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContestByMatchId(matchData.matchId));
  }, [matchData.matchId, dispatch]);

  const allContestData = useSelector((state) => state.bot.items);
  const teamData = useSelector((state) => state.team.items);
  const userByIdData = useSelector((state) => state.userById.items);
  const [state, setState] = useState(true);
  const [userbotData, setuserbotData] = useState({
    contestPoints: '',
    teamId: ''
  });

  useEffect(() => {
    getContestByUserMatchId(userData.userId, matchData.matchId);
  }, [matchData.matchId]);

  const getContestByUserMatchId = (userId, matchId) => {
    // setState(true);
    axios.get(usersBaseURL + `/${userId}/contest/${matchId}`, Token)
      .then((response) => {
        setuserbotData(response.data);
        // setState(false);
      })
      .catch((error) => {
        // alert(error);
        // setState(false);
      })
      .finally(() => {
        // setState(false);
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 2000)
  }, []);

  return (
    <React.Fragment>
      <div className={classes.parent}>
        {state &&
          <>
            <Box sx={{ width: '100%', marginTop: '70px', position: 'absolute' }}>
              <LinearProgress />
            </Box>
          </>
        }
        <div className={classes.child}>

          {!state &&
            <>
            
              <div className={classes.primary}>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
              </div>

              <PlaceBet
                allContestData={allContestData}
                matchData={matchData}
                teamData={teamData}
                userByIdData={userByIdData}
                userbotData={userbotData}
                userData={userData}
              />

              <BetTable allContestData={allContestData} />
            </>
          }
          {state &&
            <CircularProgress color="secondary" />
          }

        </div>
      </div>

    </React.Fragment>
  );
}

export default BettingPage;

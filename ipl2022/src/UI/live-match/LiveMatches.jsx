import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classes from './LiveMatches.module.scss';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContestByMatchId } from '../../API/bot/bot-actions';
import { usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import BetTable from './components/BetTable';
import ViewBet from './components/ViewBet';
import AuthContext from '../../API/auth-context';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

const LiveMatch = () => {

  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const [matchData, setMatchData] = useState(location.state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContestByMatchId(matchData.matchId,authCtx.Header));
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

  const UpdateStateData = (data) => {
    console.log(data, ' betting page update');
  };

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
              <ViewBet
                allContestData={allContestData}
                matchData={matchData}
                teamData={teamData}
                userByIdData={userByIdData}
                userbotData={userbotData}
                userData={userData}
                onClick={UpdateStateData}
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
};

export default LiveMatch;

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classes from './betting-page.module.scss';
import Box from '@mui/material/Box';
import { LinearProgress, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import AnimatedButton from '../common/components/AnimatedButton/AnimatedButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContestByMatchId, sendBetData, sendUpdatedBetData } from '../../API/bot/bot-actions';
import { matchBaseURL, usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { botActions } from '../../API/bot/bot-slice';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

const validationSchema = yup.object({
  contestPoints: yup.number().required('contestPoints is required'),
  teamId: yup.number().required('teamId is required')
});

const BettingPage = (props) => {

  const location = useLocation();
  const [matchData, setMatchData] = useState(location.state);

  const dispatch = useDispatch();
  const allContestData = useSelector((state) => state.bot.items);
  const teamData = useSelector((state) => state.team.items);
  const userByIdData = useSelector((state) => state.userById.items);
  console.log(userByIdData);

  const [value, setValue] = useState('female');
  const [state, setState] = useState(false);
  const [userbotData, setuserbotData] = useState({
    contestPoints: '',
    teamId: ''
  });
  console.log(userbotData, 'userbotData');
  console.log(allContestData, 'allContestData');

  useEffect(() => {
    dispatch(fetchAllContestByMatchId(matchData.matchId));
  }, [matchData.matchId, dispatch]);

  useEffect(() => {
    getContestByUserMatchId(userData.userId, matchData.matchId);
  }, [matchData.matchId]);
  
  const getContestByUserMatchId = (userId, matchId) => {
    setState(true);
    axios.get(usersBaseURL + `/${userId}/contest/${matchId}`, Token)
      .then((response) => {
        setuserbotData(response.data);
        setState(false);
      })
      .catch((error) => {
        // alert(error);
        setState(false);
      })
      .finally(() => {
        setState(false);
      })
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const selectedTeam = teamData.find(team => team?.teamId === userbotData?.teamId);
  const userContestDataForUpdate = allContestData.find(item => item.username === userData.username);

  const formik = useFormik({
    initialValues: {
      contestPoints: userbotData.contestPoints,
      teamId: userbotData.teamId
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selectedFormData) => {
      console.log(selectedFormData);
      const f = teamData.find(item => item.teamId == formik.values.teamId);
      console.log(f,' f');
      if (userbotData.contestPoints === '' && userbotData.teamId === '') {
        dispatch(
          botActions.addBet({
            firstName: userByIdData.firstName,
            lastName: userByIdData.lastName,
            profilePicture: userByIdData.profilePicture,
            teamShortName: f.shortName,
            contestPoints: selectedFormData.contestPoints,
            username: userData.username
          })
        );
        dispatch(sendBetData({
          contestId: 0,
          userId: userData.userId,
          matchId: matchData.matchId,
          contestPoints: selectedFormData.contestPoints,
          teamId: selectedFormData.teamId
        }));
      }
      if (userbotData.contestPoints !== '' && userbotData.teamId !== '') {
        dispatch(
          botActions.updateBet({
            contestId: userContestDataForUpdate.contestId,
            firstName: userByIdData.firstName,
            lastName: userByIdData.lastName,
            profilePicture: userContestDataForUpdate.profilePicture,
            teamShortName: f.shortName,
            username: userData.username
          })
        );
        dispatch(sendUpdatedBetData({
          contestId: userContestDataForUpdate.contestId,
          userId: userData.userId,
          matchId: matchData.matchId,
          contestPoints: selectedFormData.contestPoints,
          teamId: selectedFormData.teamId
        }));
      }
    }
  });

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
            <Box
              sx={{
                width: '90%',
                height: '80vh',
                backgroundColor: '#f5edde',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Paper
                sx={{
                  padding: '20px',
                  backgroundColor: '#531053',
                  borderRadius: '10px',
                }}
                elevation={3} >

                <form onSubmit={formik.handleSubmit}>

                  <div className={classes.form_heading}>
                    <p>Select a Team</p>
                  </div>

                  <div className={classes.radio_group}>
                    <div className={classes.left_radio}>
                      <label>
                        <input
                          type="radio"
                          onChange={formik.handleChange}
                          name="teamId"
                          value={matchData.team1Id}
                          defaultChecked={selectedTeam?.teamId ? true : false}
                        />
                        <img src={matchData.team1Logo} />
                      </label>
                    </div>
                    <div className={classes.right_radio}>
                      <label>
                        <input
                          type="radio"
                          onChange={formik.handleChange}
                          name='teamId'
                          value={matchData.team2Id}
                          defaultChecked={selectedTeam?.teamId ? true : false}
                        />
                        <img src={matchData.team2Logo} />
                      </label>
                    </div>
                  </div>

                  <div className={classes.form_content}>
                    <p>
                      Selected Team : {userbotData.contestPoints!=='' ? selectedTeam?.name : 'Select team to place bet'}
                    </p>
                    <TextField
                      className={classes.textField}
                      name='contestPoints'
                      value={formik.values?.contestPoints}
                      onChange={formik.handleChange}
                      focused={true}
                      label='Enter Points'
                      sx={{ input: { color: 'white' } }}
                      error={formik.touched.contestPoints && Boolean(formik.errors.contestPoints)}
                      helperText={formik.touched.contestPoints && formik.errors.contestPoints}
                    />
                    <AnimatedButton text={formik.values.contestPoints!==''?'Update Bet':'Place Bet'} />
                  </div>

                </form>

              </Paper>
            </Box>
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

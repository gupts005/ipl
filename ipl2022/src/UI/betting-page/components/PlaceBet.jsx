import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classes from './place-bet.module.scss';
import { sendBetData, sendUpdatedBetData } from '../../../API/bot/bot-actions';
import Box from '@mui/material/Box';
import { FormControlLabel, Paper, Radio, Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import AnimatedButton from '../../common/components/AnimatedButton/AnimatedButton';
import { useDispatch, useSelector } from 'react-redux';
import { botActions } from '../../../API/bot/bot-slice';
import AuthContext from '../../../API/auth-context';

const validationSchema = yup.object({
  contestPoints: yup.number().required('contestPoints is required'),
  teamId: yup.number().required('Team not Selected')
});

const PlaceBet = (props) => {

  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userbotData, setuserbotData] = useState(props.userbotData);
  console.log(props);

  let selectedTeam = props.teamData.find(team => team?.teamId === props.userbotData?.teamId);
  const [selectedTeamState, setselectedTeamState] = useState();
  const [oldBrowser, setOldBrowser] = useState(false);
  // console.log(selectedTeam, 'selectedTeamState');
  const userContestDataForUpdate = props.allContestData.find(item => item.username === props.userData.username);

  const formik = useFormik({
    initialValues: {
      contestPoints: userbotData?.contestPoints,
      teamId: userbotData?.teamId
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selectedFormData) => {
      // console.log(selectedFormData);
      const f = props.teamData.find(item => item.teamId == selectedFormData.teamId);
      // console.log(f, ' f');
      if (userbotData?.contestPoints === undefined && userbotData?.teamId === undefined) {
        dispatch(botActions.addBet({
          firstName: props.userByIdData.firstName,
          lastName: props.userByIdData.lastName,
          profilePicture: props.userByIdData.profilePicture,
          teamShortName: f.shortName,
          contestPoints: selectedFormData.contestPoints,
          username: props.userData.username
        })
        );
        setuserbotData({ contestPoints: selectedFormData.contestPoints, teamId: selectedFormData.teamId });
        setselectedTeamState(f.name);
        dispatch(sendBetData({
          contestId: 0,
          userId: props.userData.userId,
          matchId: props.matchData.matchId,
          contestPoints: selectedFormData.contestPoints,
          teamId: selectedFormData.teamId
        }, authCtx.Header));
      }
      if (userbotData?.contestPoints !== undefined && userbotData?.teamId !== undefined) {
        dispatch(botActions.updateBet({
          contestId: userContestDataForUpdate.contestId,
          firstName: props.userByIdData.firstName,
          lastName: props.userByIdData.lastName,
          profilePicture: userContestDataForUpdate.profilePicture,
          teamShortName: f.shortName,
          contestPoints: selectedFormData.contestPoints,
          username: props.userData.username
        })
        );
        setuserbotData({ contestPoints: selectedFormData.contestPoints, teamId: selectedFormData.teamId });
        dispatch(sendUpdatedBetData({
          contestId: userContestDataForUpdate.contestId,
          userId: props.userData.userId,
          matchId: props.matchData.matchId,
          contestPoints: selectedFormData.contestPoints,
          teamId: selectedFormData.teamId
        }, authCtx.Header));
      }
    }
  });

  const displayTeamName = (tt) => {
    const t = props.teamData.find((t) => t.teamId === tt);
    if (!!t) {
      setselectedTeamState(t?.name);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <Box
          sx={{
            width: '90%',
            height: '80vh',
            // backgroundColor: '#f5edde',
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

            <div className={classes.above_paper}>
              <FormControlLabel
                control={<Switch defaultChecked color="warning" />}
                label={oldBrowser ? 'Switch to normal' : "Not Working? Switch to Radio Button"}
                onChange={() => setOldBrowser(!oldBrowser)}
              />
            </div>

            <form onSubmit={formik.handleSubmit}>

              <div className={classes.form_heading}>
                <p> {props.matchData.team1Short} vs {props.matchData.team2Short} </p>
              </div>


              {oldBrowser ? (
                <div className={classes.radio_group}>
                  <div className={classes.normal_radio_left}>
                    <img src={props.matchData.team1Logo} />
                    <Radio
                      checked={selectedTeam?.teamId === props.matchData.team1Id ? true : false}
                      onChange={() =>  displayTeamName(props.matchData.team1Id)}
                      value={props.matchData.team1Id}
                      color="success"
                    />
                  </div>
                  <div className={classes.normal_radio_right}>
                    <img src={props.matchData.team2Logo} />
                    <Radio
                      checked={selectedTeam?.teamId === props.matchData.team2Id ? true : false}
                      onChange={() => displayTeamName(props.matchData.team2Id)}
                      value={props.matchData.team2Id}
                      color="success"
                    />
                  </div>
                </div>
              ) : (
                <div className={classes.radio_group}>
                  <div className={classes.left_radio}>
                    <label>
                      <input
                        type="radio"
                        onChange={formik.handleChange}
                        onClick={() => displayTeamName(props.matchData.team1Id)}
                        name="teamId"
                        value={props.matchData.team1Id}
                        defaultChecked={selectedTeam?.teamId === props.matchData.team1Id ? true : false}
                      />
                      <img src={props.matchData.team1Logo} />
                    </label>
                  </div>
                  <div className={classes.right_radio}>
                    <label>
                      <input
                        type="radio"
                        onChange={formik.handleChange}
                        onClick={() => displayTeamName(props.matchData.team2Id)}
                        name='teamId'
                        value={props.matchData.team2Id}
                        defaultChecked={selectedTeam?.teamId === props.matchData.team2Id ? true : false}
                      />
                      <img src={props.matchData.team2Logo} />
                    </label>
                  </div>
                </div>
              )}
              {formik.touched.teamId && Boolean(formik.errors.teamId) &&
                <span className={classes.formError}>{formik.errors.teamId}</span>
              }
              <div className={classes.form_content}>
                <p>
                  Selected Team : {userbotData?.contestPoints === undefined ? selectedTeamState || 'Select team to place bet' : selectedTeamState || selectedTeam?.name}
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
                <AnimatedButton
                  text={userbotData?.contestPoints !== undefined ? 'Update Bet' : 'Place Bet'} />
              </div>

            </form>
          </Paper>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default PlaceBet;

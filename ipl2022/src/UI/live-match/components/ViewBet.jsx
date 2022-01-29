import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classes from './match-result-inner.module.scss';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';

const validationSchema = yup.object({
  contestPoints: yup.number().required('contestPoints is required'),
  teamId: yup.number().required('teamId is required')
});

const ViewBet = (props) => {

  const [userbotData, setuserbotData] = useState({
    contestPoints: '',
    teamId: ''
  });
  console.log(userbotData);
  useEffect(() => {
    setuserbotData(props.userbotData);
  }, [props.userbotData]);

  let selectedTeam = props.teamData.find(team => team?.teamId === props.userbotData?.teamId);
  const [selectedTeamState, setselectedTeamState] = useState();
  // console.log(selectedTeam, 'selectedTeamState');
  // const userContestDataForUpdate = props.allContestData.find(item => item.username === props.userData.username);

  const formik = useFormik({
    initialValues: {
      contestPoints: userbotData.contestPoints,
      teamId: userbotData.teamId
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selectedFormData) => {
     
    }
  });

  const displayTeamName = (tt) => {
    const t = props.teamData.find((t) => t.teamId === tt);
    setselectedTeamState(t?.name);
  };

  return (
    <React.Fragment>
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
            </div>

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

            <div className={classes.form_content}>
              <p>
                Selected Team : {userbotData.contestPoints === '' ? selectedTeamState||'Select team to place bet' : selectedTeamState || selectedTeam?.name}
              </p>
              <TextField
                className={classes.textField}
                name='contestPoints'
                value={formik.values?.contestPoints}
                onChange={formik.handleChange}
                focused={true}
                label='Bet Points'
                InputProps={{
                  readOnly: true,
                }}
                sx={{ input: { color: 'white' } }}
                error={formik.touched.contestPoints && Boolean(formik.errors.contestPoints)}
                helperText={formik.touched.contestPoints && formik.errors.contestPoints}
              />
            </div>

          </form>

        </Paper>
      </Box>

    </React.Fragment>
  );
};

export default ViewBet;

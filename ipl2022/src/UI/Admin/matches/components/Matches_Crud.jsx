import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../../../../API/matches/matches-slice';
import { deleteMatchData, sendMatchData, sendUpdatedMatchData } from '../../../../API/matches/matches-actions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthContext from '../../../../API/auth-context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParentDiv = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
`;

const validationSchema = yup.object({
  matchId: yup.number().min(1, 'atleast 1 number is required').required('MatchId is required'),
  minimumPoints: yup.number().min(3, 'minimum 3 digits').required('minimum points is required'),
  name: yup.string().min(2, 'name should be of minimum 2 characters length').max(20, 'max 10 chars').required('name is required'),
  startDatetime: yup.date().required(),
  team1Id: yup.number().required(),
  team2Id: yup.number().required(),
  tournamentId: yup.number().required(),
  venueId: yup.number().required(),
});

export default function MatchesCrud(props) {

  const authCtx = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const tournamentData = useSelector((state) => state.tournament.items);
  const venueData = useSelector((state) => state.venue.items);
  const teamData = useSelector((state) => state.team.items);

  const [selected, setSelected] = React.useState({
    matchId: '',
    minimumPoints: '',
    name: '',
    resultStatus: '',
    startDatetime: '',
    team1: '',
    team1Id: '',
    team1Logo: '',
    team1Short: '',
    team2: '',
    team2Id: '',
    team2Logo: '',
    team2Short: '',
    tournamentId: '',
    venue: '',
    venueId: '',
    winnerTeamId: ''
  });

  React.useEffect(() => {
    setSelected(props.update);
  }, [props.update]);

  const formik = useFormik({
    initialValues: {
      matchId: selected.matchId,
      minimumPoints: selected.minimumPoints,
      name: selected.name,
      startDatetime: selected.startDatetime,
      team1Id: selected.team1Id,
      team2Id: selected.team2Id,
      tournamentId: selected.tournamentId,
      venueId: selected.venueId,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selected, { resetForm }) => {
      let tempTeamData = teamData;
      let tempVenueData = venueData;
      let indexOfTempTeam1Data = tempTeamData.findIndex(i => i.teamId === selected.team1Id);
      console.log(indexOfTempTeam1Data, 'indexOfTempTeam1Data');
      let indexOfTempTeam2Data = tempTeamData.findIndex(i => i.teamId === selected.team2Id);
      console.log(indexOfTempTeam2Data, 'indexOfTempTeam2Data');
      let indexOfTempVenueData = tempVenueData.findIndex(i => i.venueId === selected.venueId);
      console.log(indexOfTempVenueData, 'indexOfTempVenueData');
      if (props.update === '') {
        dispatch(
          matchActions.addMatches({
            matchId: selected.matchId,
            minimumPoints: selected.minimumPoints,
            name: selected.name,
            startDatetime: selected.startDatetime,
            team1: tempTeamData[indexOfTempTeam1Data].name,
            team1Short: tempTeamData[indexOfTempTeam1Data].shortName,
            team1Id: selected.team1Id,
            team1Logo: tempTeamData[indexOfTempTeam1Data].teamLogo,
            team2: tempTeamData[indexOfTempTeam2Data].name,
            team2Short: tempTeamData[indexOfTempTeam2Data].shortName,
            team2Id: selected.team2Id,
            team2Logo: tempTeamData[indexOfTempTeam2Data].teamLogo,
            tournamentId: selected.tournamentId,
            venue: tempVenueData[indexOfTempVenueData].name,
            venueId: selected.venueId,
            resultStatus: 0,
            winnerTeamId: 0
          })
        );
        dispatch(sendMatchData({
          matchId: selected.matchId,
          minimumPoints: selected.minimumPoints,
          name: selected.name,
          startDatetime: selected.startDatetime,
          team1: selected.team1Id,
          team2: selected.team2Id,
          tournamentId: selected.tournamentId,
          venueId: selected.venueId
        },authCtx.Header));
        resetForm();
        props.handleClose();
      }
      if (props.update !== '') {
        dispatch(
          matchActions.updateMatch({
            matchId: selected.matchId,
            minimumPoints: selected.minimumPoints,
            name: selected.name,
            startDatetime: selected.startDatetime,
            team1: tempTeamData[indexOfTempTeam1Data].name,
            team1Short: tempTeamData[indexOfTempTeam1Data].shortName,
            team1Id: selected.team1Id,
            team1Logo: tempTeamData[indexOfTempTeam1Data].teamLogo,
            team2: tempTeamData[indexOfTempTeam2Data].name,
            team2Short: tempTeamData[indexOfTempTeam2Data].shortName,
            team2Id: selected.team2Id,
            team2Logo: tempTeamData[indexOfTempTeam2Data].teamLogo,
            tournamentId: selected.tournamentId,
            venue: tempVenueData[indexOfTempVenueData].name,
            venueId: selected.venueId,
          })
        );
        dispatch(sendUpdatedMatchData({
          matchId: selected.matchId,
          minimumPoints: selected.minimumPoints,
          name: selected.name,
          startDatetime: selected.startDatetime,
          team1: selected.team1Id,
          team2: selected.team2Id,
          tournamentId: selected.tournamentId,
          venueId: selected.venueId
        },authCtx.Header));
        resetForm();
        props.handleClose();
      }
    },
  });

  const deleteMatchHandler = () => {
    dispatch(matchActions.deleteMatch(props.delete.matchId));
    dispatch(deleteMatchData(props.delete.matchId,authCtx.Header));
    props.handleClose();
  };

  return (
    <React.Fragment >

      {props.update !== false && props.delete === false &&
        <Dialog
          keepMounted
          onClose={props.handleClose}
          open={props.open}
          TransitionComponent={Transition}
        >
          <form onSubmit={formik.handleSubmit}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={props.handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {props.update ? 'Update Match Details' : 'Insert Match Details'}
                </Typography>
                {props.update !== '' &&
                  <Button autoFocus color="inherit" type='submit'>
                    Update
                  </Button>
                }
                {props.update === '' &&
                  <Button autoFocus color="inherit" type='submit'>
                    Insert
                  </Button>
                }
              </Toolbar>
            </AppBar>
            <Box
              // component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            // onSubmit={(e) => { e.preventDefault(); }}
            >
              <ParentDiv>

                <TextField
                  error={formik.touched.matchId && Boolean(formik.errors.matchId)}
                  helperText={formik.touched.matchId && formik.errors.matchId}
                  name='matchId'
                  value={formik.values.matchId || ''}
                  disabled={props.update === '' ? false : true}
                  focused={props.update ? true : false}
                  label='Match ID'
                  InputProps={{
                    readOnly: false,
                  }}
                  onChange={formik.handleChange}
                />

                <TextField
                  focused={props.update ? true : false}
                  select
                  label="Tournament"
                  error={formik.touched.tournamentId && Boolean(formik.errors.tournamentId)}
                  helperText={formik.touched.tournamentId && formik.errors.tournamentId}
                  name='tournamentId'
                  value={formik.values.tournamentId || ''}
                  onChange={formik.handleChange}
                >
                  {tournamentData.map((option) => (
                    <MenuItem
                      key={option.tournamentId}
                      value={option.tournamentId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  focused={props.update ? true : false}
                  name='name'
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={formik.values.name || ''}
                  onChange={formik.handleChange}
                />

                <LocalizationProvider dateAdapter={DateAdapter}>
                  <MobileDateTimePicker
                    name='startDatetime'
                    label='Start Date Time'
                    value={formik.values.startDatetime}
                    onChange={(v) => {
                      formik.setFieldValue('startDatetime', JSON.parse(JSON.stringify(v._d)))
                    }}
                    renderInput={(params) => <TextField
                      error={formik.touched.startDatetime && Boolean(formik.errors.startDatetime)}
                      helperText={formik.touched.startDatetime && formik.errors.startDatetime}
                      {...params} />}
                  />
                </LocalizationProvider>

                <TextField
                  error={formik.touched.venueId && Boolean(formik.errors.venueId)}
                  helperText={formik.touched.venueId && formik.errors.venueId}
                  id="outlined-select-currency"
                  select
                  label="Venue"
                  helperText="Please select a Venue"
                  name='venueId'
                  value={formik.values.venueId || ''}
                  onChange={formik.handleChange}
                >
                  {venueData.map((option) => (
                    <MenuItem
                      key={option.venueId}
                      value={option.venueId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  error={formik.touched.team1Id && Boolean(formik.errors.team1Id)}
                  helperText={formik.touched.team1Id && formik.errors.team1Id}
                  id="outlined-select-currency"
                  select
                  label="Team 1"
                  helperText="Please select a Team"
                  name='team1Id'
                  value={formik.values.team1Id || ''}
                  onChange={formik.handleChange}
                >
                  {teamData.map((option) => (
                    <MenuItem
                      key={option.teamId}
                      value={option.teamId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  error={formik.touched.team2Id && Boolean(formik.errors.team2Id)}
                  helperText={formik.touched.team2Id && formik.errors.team2Id}
                  id="outlined-select-currency"
                  select
                  label="Team 2"
                  helperText="Please select a team"
                  name='team2Id'
                  value={formik.values.team2Id || ''}
                  onChange={formik.handleChange}
                >
                  {teamData.map((option) => (
                    <MenuItem
                      key={option.teamId}
                      value={option.teamId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  error={formik.touched.minimumPoints && Boolean(formik.errors.minimumPoints)}
                  helperText={formik.touched.minimumPoints && formik.errors.minimumPoints}
                  focused={props.update ? true : false}
                  value={formik.values.minimumPoints || ''}
                  id="outlined-basic"
                  label="Minimum Points"
                  name='minimumPoints'
                  variant="outlined"
                  onChange={formik.handleChange}
                />

              </ParentDiv>
            </Box>
          </form>
        </Dialog>
      }

      {props.update === false && props.delete !== false &&
        <Dialog
          keepMounted
          onClose={props.handleClose}
          open={props.open}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              MatchId: {props.delete.matchId} <br />
              Name: {props.delete.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Disagree</Button>
            <Button onClick={deleteMatchHandler}>Agree</Button>
          </DialogActions>
        </Dialog>
      }

    </React.Fragment >
  );
}

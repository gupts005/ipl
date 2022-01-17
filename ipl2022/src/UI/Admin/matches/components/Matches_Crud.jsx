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
import moment from 'moment';
import { deleteMatchData } from '../../../../API/matches/matches-actions';

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

export default function MatchesCrud(props) {

  const dispatch = useDispatch();

  const tournamentData = useSelector((state) => state.tournament.items);
  const venueData = useSelector((state) => state.venue.items);
  const teamData = useSelector((state) => state.team.teamItems);

  const [selected, setSelected] = React.useState({
    matchId: '',
    minimumPoints: '',
    name: '',
    resultStatus: '',
    startDatetime: new Date(),
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
  }, [props]);

  const addMatchesHandler = () => {
    // e.preventDefault();
    console.log(selected, ' inserted data');
    dispatch(
      matchActions.addMatches({
        matchId: selected.matchId,
        minimumPoints: selected.minimumPoints,
        name: selected.name,
        startDatetime: selected.startDatetime.toString(),
        team1: selected.team1,
        team2: selected.team2,
        tournamentId: selected.tournamentId,
        venueId: selected.venueId
      })
    );
    props.onClick(selected);
    props.handleClose();
  };

  const updateMatchesHandler = () => {
    dispatch(
      matchActions.updateMatch({
        matchId: selected.matchId,
        minimumPoints: selected.minimumPoints,
        name: selected.name,
        startDatetime: selected.startDatetime.toString(),
        team1: selected.team1,
        team2: selected.team2,
        tournamentId: selected.tournamentId,
        venueId: selected.venueId
      })
    );
    props.onClick(selected);
    props.handleClose();
  }

  const deleteMatchHandler = () => {
    dispatch(matchActions.deleteMatch(props.delete.matchId));
    dispatch(deleteMatchData(props.delete.matchId));
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
                <Button autoFocus color="inherit" onClick={updateMatchesHandler}>
                  Update
                </Button>
              }
              {props.update === '' &&
                <Button autoFocus color="inherit" onClick={addMatchesHandler}>
                  Insert
                </Button>
              }
            </Toolbar>
          </AppBar>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => { e.preventDefault(); }}
          >
            <ParentDiv>

              <TextField
                value={selected.matchId || ''}
                disabled={props.update === '' ? false : true}
                id="outlined-disabled"
                focused={props.update ? true : false}
                label='Match ID'
                InputProps={{
                  readOnly: false,
                }}
                onChange={(e) => { setSelected(prevState => ({ ...prevState, matchId: e.target.value })) }}
              />

              <TextField
                focused={props.update ? true : false}
                id="outlined-select-currency"
                select
                label="Tournament"
                helperText="Please select a tournament"
                value={selected.tournamentId || ''}
                onChange={(e) => setSelected(prevState => ({ ...prevState, tournamentId: e.target.value }))}
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
                focused={props.update ? true : false}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={selected.name || ''}
                onChange={(e) => { setSelected(prevState => ({ ...prevState, name: e.target.value })) }}
              />

              <LocalizationProvider dateAdapter={DateAdapter}>
                <MobileDateTimePicker
                  value={selected.startDatetime || ''}
                  label='Start Date Time'
                  onChange={(newValue) => {
                    setSelected(prevState => ({ ...prevState, startDatetime: moment(newValue._i).format() }))
                    // console.log(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
                id="outlined-select-currency"
                select
                label="Venue"
                helperText="Please select a Venue"
                value={selected.venueId || ''}
                onChange={(e) => setSelected(prevState => ({ ...prevState, venueId: e.target.value }))}
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
                id="outlined-select-currency"
                select
                label="Team 1"
                helperText="Please select a Team"
                value={selected.team1Id || ''}
                onChange={(e) => setSelected(prevState => ({ ...prevState, team1Id: e.target.value }))}
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
                id="outlined-select-currency"
                select
                label="Team 2"
                helperText="Please select a team"
                value={selected.team2Id || ''}
                onChange={(e) => setSelected(prevState => ({ ...prevState, team2Id: e.target.value }))}
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
                focused={props.update ? true : false}
                value={selected.minimumPoints || ''}
                id="outlined-basic" label="Minimum Points"
                variant="outlined"
                onChange={(e) => { setSelected(prevState => ({ ...prevState, minimumPoints: e.target.value })) }}
              />

            </ParentDiv>
          </Box>
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

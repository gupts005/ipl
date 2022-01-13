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
import { MenuItem } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { useSelector } from 'react-redux';

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

  const tournamentData = useSelector((state) => state.tournament.items);
  const venueData = useSelector((state) => state.venue.items);
  const teamData = useSelector((state) => state.team.teamItems);

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
  }, [props]);

  return (
    <React.Fragment >

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
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              {props.update ? 'Update' : 'Insert'}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <ParentDiv>

            <TextField
              value={selected.matchId || ''}
              disabled={props.update ? false : true}
              id="outlined-disabled"
              focused={props.update ? true : false}
              label='Match ID'
              InputProps={{
                readOnly: false,
              }}
              onChange={(e) => { setSelected(prevState => ({ ...prevState, matchId: e.target.value })); console.log(e.target.value); }}
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
              onChange={(e) => { setSelected(prevState => ({ ...prevState, name: e.target.value })); console.log(e.target.value); }}
            />

            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDateTimePicker
                value={selected.startDatetime || ''}
                label='Start Date Time'
                onChange={(newValue) => {
                  // setValue(newValue);
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
              onChange={(e) => { setSelected(prevState => ({ ...prevState, minimumPoints: e.target.value })); console.log(e.target.value); }}
            />

          </ParentDiv>
        </Box>
      </Dialog>

    </React.Fragment>
  );
}

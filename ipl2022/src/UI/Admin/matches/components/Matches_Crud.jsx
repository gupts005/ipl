import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
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

  console.log(props);
  const tournamentData = useSelector((state) => state.tournament.items);
  const venueData = useSelector((state) => state.venue.items);
  const teamData = useSelector((state) => state.team.teamItems);

  const [tempData, setTempData] = React.useState();
  React.useEffect(() => {
    setTempData([props.update]);
  }, []);

  const [selected, setSelected] = React.useState({
    tournament: '',
    venue: '',
    team1: '',
    team2: ''
  });

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
              value={props.update.matchId || ''}
              disabled={props.update ? false : true}
              id="outlined-disabled"
              focused={props.update ? true : false}
              label='Match ID'
            />

            <TextField
              focused={props.update ? true : false}
              id="outlined-select-currency"
              select
              label="Tournament"
              value={props.update.tournamentId || selected.tournament}
              onChange={(e) => setSelected(prevState => ({ ...prevState, tournament: e.target.value }))}
              helperText="Please select a tournament"
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
              value={props.update.name || ''}
              focused={props.update ? true : false}
              id="outlined-basic"
              label="Name"
              variant="outlined" />

            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDateTimePicker
                value={props.update.startDatetime || ''}
                label='Start Date Time'
                onChange={(newValue) => {
                  // setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              value={props.update.venueId || ''}
              id="outlined-select-currency"
              select
              label="Venue"
              onChange={(e) => setSelected(prevState => ({ ...prevState, venue: e.target.value }))}
              helperText="Please select a Venue"
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
              value={props.update.team1Id || ''}
              id="outlined-select-currency"
              select
              label="Team 1"
              onChange={(e) => setSelected(prevState => ({ ...prevState, team1: e.target.value }))}
              helperText="Please select a Team"
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
              value={props.update.team2Id || ''}
              onChange={(e) => setSelected(prevState => ({ ...prevState, team2: e.target.value }))}
              helperText="Please select a team"
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
              value={props.update.minimumPoints || ''}
              id="outlined-basic" label="Minimum Points"
              variant="outlined"
            />

          </ParentDiv>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

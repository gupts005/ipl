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
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { oldMatchActions } from '../../../../API/old-matches/oldMatches-slice';
import { updateMatchResult } from '../../../../API/old-matches/oldMatches-actions';

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
  resultStatus: yup.number().required(),
  winnerTeamId: yup.number().required()
});

export default function WinnerCrud(props) {

  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState({
    matchId: '',
    resultStatus: '',
    winnerTeamId: '',
    team1: '',
    team1Id: '',
    team2: '',
    team2Id: '',
  });

  React.useEffect(() => {
    setSelected(props.update);
  }, [props]);

  const formik = useFormik({
    initialValues: {
      matchId: selected.matchId,
      resultStatus: selected.resultStatus,
      winnerTeamId: selected.winnerTeamId,
      team1: selected.team1,
      team1Id: selected.team1Id,
      team2: selected.team2,
      team2Id: selected.team2Id
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selected, { resetForm }) => {
      if (props.update !== '') {
        dispatch(oldMatchActions.updateMatchResult(formik.values.matchId));
        dispatch(updateMatchResult(formik.values.matchId,selected.resultStatus,selected.winnerTeamId));
        resetForm();
        props.handleClose();
      }
    },
  });

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
                  Update Match Result
                </Typography>
                  <Button autoFocus color="inherit" type='submit'>
                    Update
                  </Button>
              </Toolbar>
            </AppBar>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <ParentDiv>

                <TextField
                  focused={props.update ? true : false}
                  select
                  label="Select Result Status"
                  error={formik.touched.resultStatus && Boolean(formik.errors.resultStatus)}
                  helperText={formik.touched.resultStatus && formik.errors.resultStatus}
                  name='resultStatus'
                  value={formik.values.resultStatus || ''}
                  onChange={formik.handleChange}
                >
                    <MenuItem value={'0'}> Draw </MenuItem>
                    <MenuItem value={'1'}> Declared </MenuItem>
                    <MenuItem value={'2'}> Cancelled </MenuItem>
                </TextField>

                <TextField
                  focused={props.update ? true : false}
                  id="outlined-select-currency"
                  select
                  label="Select Winning Team"
                  error={formik.touched.winnerTeamId && Boolean(formik.errors.winnerTeamId)}
                  helperText={formik.touched.winnerTeamId && formik.errors.winnerTeamId}
                  name='winnerTeamId'
                  value={formik.values.winnerTeamId || ''}
                  onChange={formik.handleChange}
                >
                    <MenuItem value={formik.values.team1Id}> {formik.values.team1} </MenuItem>
                    <MenuItem value={formik.values.team2Id}> {formik.values.team2} </MenuItem>
                 </TextField>
            
              </ParentDiv>
            </Box>
          </form>
        </Dialog>
      }

    </React.Fragment >
  );
}

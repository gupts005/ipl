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
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { teamActions } from '../../../../API/team/team-slice';
import { deleteTeamData, sendTeamData, sendUpdatedTeamData } from '../../../../API/team/team-actions';

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
  name: yup.string().min(5, 'atleast 5 char is required').required(),
  shortName: yup.string().min(2, 'minimum 2 chars').required()
});

export default function TeamsCrud(props) {

  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState({
    teamId: '',
    name: '',
    shortName: '',
    teamLogo: ''
  });

  React.useEffect(() => {
    setSelected(props.update);
  }, [props.update]);

  const formik = useFormik({
    initialValues: {
      teamId: selected.teamId,
      name: selected.name,
      shortName: selected.shortName,
      teamLogo: selected.teamLogo,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selected, { resetForm }) => {
      var formData = new FormData();
      if (props.update === '') {
        dispatch(
          teamActions.addTeam({
            name: selected.name,
            shortName: selected.shortName,
            teamLogo: selected.teamLogo
          })
        );
        formData.append("name", selected.name);
        formData.append("shortName", selected.shortName);
        formData.append("teamLogo", selected.teamLogo);
        dispatch(sendTeamData(formData));
        resetForm();
        props.handleClose();
      }
      if (props.update !== '') {
        dispatch(
          teamActions.updateTeam({
            teamId: formik.values.teamId,
            name: selected.name,
            shortName: selected.shortName,
            teamLogo: selected.teamLogo
          })
        );
        formData.append("name", selected.name);
        formData.append("shortName", selected.shortName);
        formData.append("teamLogo", selected.teamLogo);
        dispatch(sendUpdatedTeamData(formik.values.teamId,formData));
        resetForm();
        props.handleClose();
      }
    },
  });

  const deleteTeamHandler = () => {
    dispatch(teamActions.deleteUser(props.delete.teamId));
    dispatch(deleteTeamData(props.delete.teamId));
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
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  name='name'
                  value={formik.values.name || ''}
                  label='Team Name'
                  InputProps={{
                    readOnly: false,
                  }}
                  onChange={formik.handleChange}
                />

                <TextField
                  error={formik.touched.shortName && Boolean(formik.errors.shortName)}
                  helperText={formik.touched.shortName && formik.errors.shortName}
                  name='shortName'
                  label="Short Name"
                  variant="outlined"
                  value={formik.values.shortName || ''}
                  onChange={formik.handleChange}
                />
            
                <TextField
                  label="Team Logo"
                  type='file'
                  name='teamLogo'
                  value={formik.values.teamLogo || ''}
                  onChange={formik.handleChange}
                  focused={true}
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
              Team Name: {props.delete.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button onClick={deleteTeamHandler}>Delete</Button>
          </DialogActions>
        </Dialog>
      }

    </React.Fragment >
  );
}

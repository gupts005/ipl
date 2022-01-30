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
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { usersBaseURL } from '../../../common/http-urls';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

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
  oldPassword: yup.string().min(3, 'atleast 3 char is required').required('Username is required'),
  newPassword: yup.string().min(3, 'minimum 3 digits').required(),
  confNewPassword: yup.string().oneOf([yup.ref('newPassword'),null],'Passwords must match').min(3).required()
});

export default function UpdatePassword(props) {

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confNewPassword: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selected, { resetForm }) => {
      console.log(selected);
      if (selected.newPassword === selected.confNewPassword) {
        const {oldPassword, newPassword} = selected;
        const userId = userData.userId;
        var t = { oldPassword, newPassword, userId};
        console.log(t);
        const response = axios.put(usersBaseURL + '/update-password', t, Token);
        if (response.status !== 200) {
          throw new Error('Could not fetch user data!');
        }
        const dataa = response.data;
        alert(dataa);
        resetForm();
        props.handleClose();
      }
    },
  });

  return (
    <React.Fragment >

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
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Update your Password
              </Typography>
              <Button autoFocus color="inherit" type='submit' >
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
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                name='oldPassword'
                label='Current Password'
                onChange={formik.handleChange}
              />

              <TextField
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                name='newPassword'
                label="New Password"
                variant="outlined"
                onChange={formik.handleChange}
              />

              <TextField
                error={formik.touched.confNewPassword && Boolean(formik.errors.confNewPassword)}
                helperText={formik.touched.confNewPassword && formik.errors.confNewPassword}
                name='confNewPassword'
                label="Confirm New Password"
                variant="outlined"
                onChange={formik.handleChange}
              />

            </ParentDiv>
          </Box>
        </form>
      </Dialog>

    </React.Fragment >
  );
}

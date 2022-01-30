import React from 'react';
import classes from './forgot-password.module.scss';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import Button from '@mui/material/Button';

const detailsValidationSchema = yup.object({
  mobileNumber: yup.number().required(),
  email: yup.string().email().required()
});

const otpValidationSchema = yup.object({
  otp: yup.number().required(),
  password: yup.string().required(),
  confPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').min(3).required()
});

const ForgotPassword = () => {

  const detailsFormik = useFormik({
    initialValues: {
      mobileNumber: '',
      email: '',
    },
    enableReinitialize: true,
    validationSchema: detailsValidationSchema,
    onSubmit: async (selected, { resetForm }) => {
      console.log(selected);
      if (selected.mobileNumber !== '' && selected.email !== '') {
        const response = await axios.post(usersBaseURL + '/forget-password', selected);
        if (response.status !== 200) {
          throw new Error('Could not fetch user data!');
        }
        const dataa = await response.data;
        if (dataa) {
          localStorage.setItem('userId', dataa.userId);
          alert(dataa);
        }
        resetForm();
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: otpValidationSchema,
    onSubmit: (selected, { resetForm }) => {
      console.log(selected);
      if (selected.password === selected.confPassword) {
        const { otp, password } = selected;
        let userId = localStorage.getItem('userId');
        var t = { otp, password, userId };
        console.log(t);
        const response = axios.put(usersBaseURL + '/forget-password', t);
        if (response.status !== 200) {
          throw new Error('Could not fetch user data!');
        }
        const dataa = response.data;
        if (dataa) {
          localStorage.removeItem('userId');
          alert(dataa);
        }
        resetForm();
      }
    },
  });

  return (
    <div className={classes.parent}>
      <div className={classes.child_1}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <p>OTP WILL BE SENT TO YOUR REGISTERED EMAIL</p>
          <form onSubmit={detailsFormik.handleSubmit}>
            <div className={classes.textField}>
              <TextField
                label="Mobile No"
                error={detailsFormik.touched.mobileNumber && Boolean(detailsFormik.errors.mobileNumber)}
                helperText={detailsFormik.touched.mobileNumber && detailsFormik.errors.mobileNumber}
                name='mobileNumber'
                value={detailsFormik.values.mobileNumber || ''}
                onChange={detailsFormik.handleChange}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                error={detailsFormik.touched.email && Boolean(detailsFormik.errors.email)}
                helperText={detailsFormik.touched.email && detailsFormik.errors.email}
                label="Email"
                name='email'
                value={detailsFormik.values.email || ''}
                onChange={detailsFormik.handleChange}
              />
            </div>
            <div className={classes.textField}>
              <Button variant="contained" type='submit'>
                Send OTP
              </Button>
            </div>
          </form>
        </Box>
      </div>

      <div className={classes.child_2}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >

          <p>ENTER THE OTP RECIEVED ON EMAIL AND NEW PASSWORD</p>
          <form onSubmit={otpFormik.handleSubmit}>

            <div className={classes.textField}>
              <TextField
                error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
                helperText={otpFormik.touched.otp && otpFormik.errors.otp}
                name='otp'
                label='OTP'
                onChange={otpFormik.handleChange}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                error={otpFormik.touched.newPassword && Boolean(otpFormik.errors.newPassword)}
                helperText={otpFormik.touched.newPassword && otpFormik.errors.newPassword}
                name='password'
                label="New Password"
                variant="outlined"
                onChange={otpFormik.handleChange}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                error={otpFormik.touched.confNewPassword && Boolean(otpFormik.errors.confNewPassword)}
                helperText={otpFormik.touched.confNewPassword && otpFormik.errors.confNewPassword}
                name='confPassword'
                label="Confirm New Password"
                variant="outlined"
                onChange={otpFormik.handleChange}
              />
            </div>
            <div className={classes.textField}>
              <Button variant="contained" type='submit' text={'Update'} >
                Update
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default ForgotPassword;
import React, { useState } from 'react'
import classes from './registration.module.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = yup.object({
  username: yup.string().min(3, 'atleast 3 char is required').required('Username is required'),
  firstName: yup.string().min(3, 'minimum 3 digits').required(),
  lastName: yup.string().min(3, 'name should be of minimum 2 characters length').required(),
  genderId: yup.number().required().oneOf([1 , 2], 'Selecting the gender field is required'),
  mobileNumber: yup.number().required(),
  email: yup.string().email().required(),
  password: yup.string().min(3, 'minimum 3 digits').required(),
  confPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').min(3).required()
});

const SignUp = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      genderId: '',
      availablePoints: '',
      profilePicture: '',
      mobileNumber: '',
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (selected, { resetForm }) => {
      console.log(selected, ' selected data');
      var formData = new FormData();
      formData.append("username", selected.username);
      formData.append("firstName", selected.firstName);
      formData.append("lastName", selected.lastName);
      formData.append("email", selected.email);
      formData.append("mobileNumber", selected.mobileNumber);
      formData.append("genderId", selected.genderId);
      formData.append("profilePicture", selected.profilePicture);
      formData.append("password", selected.password);
      formData.append("availablePoints", 500);
      formData.append("roleId", 2);
      const resp = await axios.post(usersBaseURL+ '/register',formData);
      if (resp.status!==200) {
        // setOpen(true);
        // setData(resp.data);
        return;
      }
      const data = await resp.data;
      if (data) {
        // setOpen(true);
        // setData('Registration Success, please wait till Admin approves your request');
      }
      resetForm();
    },
  });

  const gotoLogin = () => {
    navigate('/login');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // const action = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  return (
    <div className={classes.parent}>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={data}
        action={action}
      /> */}
      <div className={classes.left}>
        <div className={classes.left_inner}>
          <h2>Sign up to start winning Big</h2>
          <p>Place Bets on your favourite team</p>
        </div>
      </div>
      <div className={classes.right}>
        <p className={classes.right_p}>
          Sign Up
        </p>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.right_form}>
              <div className={classes.textfield}>

                <TextField
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  name='username'
                  value={formik.values.username || ''}
                  label='Username'
                  onChange={formik.handleChange}
                />

              </div>
              <div className={classes.textfield}>

                <TextField
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  name='firstName'
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName || ''}
                  onChange={formik.handleChange}
                />

              </div>
              <div className={classes.textfield}>

                <TextField
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  name='lastName'
                  label="Last Name"
                  variant="outlined"
                  value={formik.values.lastName || ''}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.textfield}>

                <TextField
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name='email'
                  value={formik.values.email || ''}
                  onChange={formik.handleChange}
                />

              </div>
              <div className={classes.textfield}>


                <TextField
                  label="Mobile No"
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  name='mobileNumber'
                  value={formik.values.mobileNumber || ''}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.textfield}>


                <TextField
                  label="Profile Pic"
                  type='file'
                  name='profilePicture'
                  value={formik.values.profilePicture || ''}
                  onChange={formik.handleChange}
                  focused={true}
                />
              </div>
              <div className={classes.textfield}>
                <TextField
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  name='password'
                  label="Password"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.textfield}>

                <TextField
                  error={formik.touched.confPassword && Boolean(formik.errors.confPassword)}
                  helperText={formik.touched.confPassword && formik.errors.confPassword}
                  name='confPassword'
                  label="Confirm Password"
                  variant="outlined"
                  onChange={formik.handleChange}
                />
              </div>
              <div>

                <RadioGroup
                  row aria-label="gender"
                  name="genderId">
                  <FormControlLabel
                    onChange={formik.handleChange}
                    value={2}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value={1}
                    onChange={formik.handleChange}
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                {formik.touched.genderId && formik.errors.genderId && (
                  <span style={{ color: "red"}}>
                    {formik.touched.genderId && formik.errors.genderId}
                  </span>
                )}
              </div>
            </div>
            <div className={classes.btn}>
              <button type='submit' className={classes.btn_sub}>Submit</button>
              <p className={classes.btn_p}>already signed up? <a onClick={gotoLogin}>Login Now</a></p>
            </div>
          </form>
        </Box>
      </div>
    </div>
  )
}

export default SignUp;
